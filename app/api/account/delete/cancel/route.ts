import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();

    if (!email && !userId) {
      return NextResponse.json(
        { error: '이메일 또는 사용자 ID를 제공해주세요.' },
        { status: 400 }
      );
    }

    // 삭제된 사용자 찾기
    let query = supabase
      .from('users')
      .select('id, email, deleted_at, deletion_scheduled_for');

    if (email) {
      // 삭제된 계정의 이메일은 변경되었으므로 원본 이메일로 찾기 어려움
      // account_deletion_requests 테이블에서 찾기
      const { data: deletionRequest } = await supabase
        .from('account_deletion_requests')
        .select('user_id')
        .eq('user_email', email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (deletionRequest) {
        query = query.eq('id', deletionRequest.user_id);
      } else {
        return NextResponse.json(
          { error: '해당 이메일로 삭제 요청된 계정을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }
    } else {
      query = query.eq('id', userId);
    }

    const { data: user, error: userError } = await query.single();

    if (userError || !user) {
      return NextResponse.json(
        { error: '계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (!user.deleted_at) {
      return NextResponse.json(
        { error: '삭제되지 않은 계정입니다.' },
        { status: 400 }
      );
    }

    // 30일 이내인지 확인
    const deletedAt = new Date(user.deleted_at);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (deletedAt < thirtyDaysAgo) {
      return NextResponse.json(
        { error: '계정 복구 기간(30일)이 지났습니다.' },
        { status: 400 }
      );
    }

    // 계정 복구
    const { error: restoreError } = await supabase
      .from('users')
      .update({
        deleted_at: null,
        deletion_reason: null,
        deletion_confirmed_at: null,
        deletion_scheduled_for: null,
        email: email || user.email, // 원래 이메일로 복구
        display_name: 'Recovered User' // 사용자가 나중에 변경 가능
      })
      .eq('id', user.id);

    if (restoreError) {
      console.error('Failed to restore user account:', restoreError);
      return NextResponse.json(
        { error: '계정 복구에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 삭제 요청 취소 표시
    await supabase
      .from('account_deletion_requests')
      .update({
        cancelled_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .is('cancelled_at', null);

    // 레시피 복구
    await supabase
      .from('recipes')
      .update({ deleted_at: null })
      .eq('owner_id', user.id);

    return NextResponse.json(
      { 
        success: true,
        message: '계정이 성공적으로 복구되었습니다. 다시 로그인해주세요.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Account restoration error:', error);
    return NextResponse.json(
      { error: '계정 복구 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}