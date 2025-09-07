import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: '이메일과 인증 코드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // OTP 해시 생성
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    // 유효한 OTP 확인
    const { data: deletionRequest, error: requestError } = await supabase
      .from('account_deletion_requests')
      .select('*')
      .eq('user_email', email)
      .eq('otp_hash', otpHash)
      .gte('expires_at', new Date().toISOString())
      .is('verified_at', null)
      .is('cancelled_at', null)
      .single();

    if (requestError || !deletionRequest) {
      return NextResponse.json(
        { error: '잘못된 인증 코드이거나 만료되었습니다.' },
        { status: 401 }
      );
    }

    // OTP 검증 완료 표시
    const { error: updateError } = await supabase
      .from('account_deletion_requests')
      .update({
        verified_at: new Date().toISOString()
      })
      .eq('id', deletionRequest.id);

    if (updateError) {
      console.error('Failed to update verification status:', updateError);
      return NextResponse.json(
        { error: '인증 상태 업데이트에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 사용자 정보에 삭제 예정 표시
    const deletionScheduledFor = new Date();
    deletionScheduledFor.setDate(deletionScheduledFor.getDate() + 30); // 30일 후

    const { error: userUpdateError } = await supabase
      .from('users')
      .update({
        deletion_confirmed_at: new Date().toISOString(),
        deletion_scheduled_for: deletionScheduledFor.toISOString()
      })
      .eq('id', deletionRequest.user_id);

    if (userUpdateError) {
      console.error('Failed to update user deletion status:', userUpdateError);
      return NextResponse.json(
        { error: '사용자 정보 업데이트에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: '인증이 완료되었습니다. 계정은 30일 후에 완전히 삭제됩니다.',
        scheduledDeletionDate: deletionScheduledFor.toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: '인증 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}