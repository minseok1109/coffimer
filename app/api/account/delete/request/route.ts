import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { Resend } from 'resend';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: '이메일 주소를 입력해주세요.' }, { status: 400 });
        }

        // 사용자 확인
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, email, deleted_at')
            .eq('email', email)
            .single();

        if (userError || !user) {
            return NextResponse.json(
                { error: '해당 이메일로 등록된 계정을 찾을 수 없습니다.' },
                { status: 404 },
            );
        }

        if (user.deleted_at) {
            return NextResponse.json({ error: '이미 삭제 요청된 계정입니다.' }, { status: 400 });
        }

        // 기존 요청 확인 (15분 이내)
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
        const { data: existingRequest } = await supabase
            .from('account_deletion_requests')
            .select('*')
            .eq('user_email', email)
            .gte('expires_at', new Date().toISOString())
            .single();

        // if (existingRequest) {
        //   return NextResponse.json(
        //     { error: '이미 발송된 인증 코드가 있습니다. 이메일을 확인해주세요.' },
        //     { status: 400 }
        //   );
        // }

        // 6자리 OTP 생성
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

        // OTP 저장
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15분 후 만료
        const { error: insertError } = await supabase.from('account_deletion_requests').insert({
            user_email: email,
            user_id: user.id,
            otp_code: otpHash, // 해시된 값 저장
            otp_hash: otpHash,
            expires_at: expiresAt.toISOString(),
        });

        if (insertError) {
            console.error('Failed to save OTP:', insertError);
            return NextResponse.json({ error: '인증 코드 생성에 실패했습니다.' }, { status: 500 });
        }

        // 동일한 OTP를 직접 이메일로 발송
        try {
            const resendApiKey = process.env.RESEND_API_KEY;
            if (!resendApiKey) {
                // 프로덕션에서는 키 없으면 실패, 개발/테스트 환경에서는 디버그 코드 반환
                if (process.env.NODE_ENV === 'production') {
                    return NextResponse.json(
                        { error: '이메일 발송 설정이 올바르지 않습니다.' },
                        { status: 500 },
                    );
                }
                return NextResponse.json(
                    {
                        success: true,
                        message: '인증 코드가 이메일로 발송되었습니다.',
                        debugOtp: otp,
                    },
                    { status: 200 },
                );
            }

            const resend = new Resend(resendApiKey);
            const from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';
            const subject = 'Coffimer 계정 삭제 인증 코드';
            const html = `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
                <h2 style="margin: 0 0 12px;">Coffimer 인증 코드</h2>
                <p style="margin: 0 0 16px; color: #4B5563;">계정 삭제를 진행하려면 아래 인증 코드를 입력해주세요.</p>
                <div style="text-align: center; padding: 16px 0 20px;">
                  <span style="display: inline-block; font-size: 28px; letter-spacing: 10px; font-weight: 700; color: #111827;">${otp}</span>
                </div>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">이 코드는 15분 동안 유효합니다. 본인이 요청하지 않았다면 이 이메일을 무시하셔도 됩니다.</p>
              </div>
            `;
            const text = `Coffimer 인증 코드: ${otp}\n이 코드는 15분 동안 유효합니다.`;

            const { error: emailError } = await resend.emails.send({
                from,
                to: [email],
                subject,
                html,
                text,
                headers: {
                    'X-Entity-Ref-ID': 'account-deletion-otp',
                    'X-Coffimer-Category': 'account_deletion',
                },
            });

            if (emailError) {
                console.error('Failed to send OTP email via Resend:', emailError);
                if (process.env.NODE_ENV === 'production') {
                    return NextResponse.json(
                        { error: '인증 이메일 발송에 실패했습니다.' },
                        { status: 500 },
                    );
                }
                return NextResponse.json(
                    {
                        success: true,
                        message: '인증 코드가 이메일로 발송되었습니다.',
                        debugOtp: otp,
                    },
                    { status: 200 },
                );
            }
        } catch (e) {
            console.error('Unexpected error while sending OTP email:', e);
            if (process.env.NODE_ENV === 'production') {
                return NextResponse.json(
                    { error: '인증 이메일 발송 중 오류가 발생했습니다.' },
                    { status: 500 },
                );
            }
            return NextResponse.json(
                {
                    success: true,
                    message: '인증 코드가 이메일로 발송되었습니다.',
                    debugOtp: otp,
                },
                { status: 200 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: '인증 코드가 이메일로 발송되었습니다. 15분 이내에 입력해주세요.',
            },
            { status: 200 },
        );
    } catch (error) {
        console.error('Account deletion request error:', error);
        return NextResponse.json({ error: '요청 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
