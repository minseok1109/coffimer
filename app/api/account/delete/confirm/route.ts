import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, confirmText } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 확인 문구 검증
    if (confirmText !== '계정을 삭제합니다') {
      return NextResponse.json(
        { error: '확인 문구가 일치하지 않습니다.' },
        { status: 400 }
      );
    }

    // 사용자 및 삭제 요청 확인
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, deletion_confirmed_at, deletion_scheduled_for')
      .eq('email', email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: '계정을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    if (!user.deletion_confirmed_at || !user.deletion_scheduled_for) {
      return NextResponse.json(
        { error: '먼저 이메일 인증을 완료해주세요.' },
        { status: 400 }
      );
    }

    // Soft delete 실행
    const { error: deleteError } = await supabase
      .from('users')
      .update({
        deleted_at: new Date().toISOString(),
        deletion_reason: 'user_requested',
        email: `deleted_${user.id}@deleted.com`,
        display_name: 'Deleted User'
      })
      .eq('id', user.id);

    if (deleteError) {
      console.error('Failed to soft delete user:', deleteError);
      return NextResponse.json(
        { error: '계정 삭제 처리에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 연관 데이터 처리
    // 1. 레시피 소유권 익명화 또는 삭제
    await supabase
      .from('recipes')
      .update({ 
        deleted_at: new Date().toISOString(),
        owner_id: user.id // 참조는 유지하되 deleted_at으로 구분
      })
      .eq('owner_id', user.id);

    // 2. 좋아요 삭제
    await supabase
      .from('likes')
      .delete()
      .eq('user_id', user.id);

    // 3. 저장된 레시피 삭제
    await supabase
      .from('saved_recipes')
      .delete()
      .eq('user_id', user.id);

    // 4. 활동 로그 익명화
    await supabase
      .from('user_activity_logs')
      .update({ user_id: null })
      .eq('user_id', user.id);

    // 5. 레시피 조회 기록 익명화
    await supabase
      .from('recipe_views')
      .update({ user_id: null })
      .eq('user_id', user.id);

    // 6. 최근 조회 기록 삭제
    await supabase
      .from('recent_views')
      .delete()
      .eq('user_id', user.id);

    // 7. 레시피 상호작용 익명화
    await supabase
      .from('recipe_interactions')
      .update({ user_id: null })
      .eq('user_id', user.id);

    // 8. 사용자 세션 종료
    await supabase
      .from('user_sessions')
      .update({ 
        ended_at: new Date().toISOString(),
        is_active: false 
      })
      .eq('user_id', user.id)
      .is('ended_at', null);

    return NextResponse.json(
      { 
        success: true,
        message: '계정이 성공적으로 삭제되었습니다. 30일 이내에 로그인하시면 계정을 복구할 수 있습니다.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Account deletion confirmation error:', error);
    return NextResponse.json(
      { error: '계정 삭제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}