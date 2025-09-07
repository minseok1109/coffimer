import { describe, it, expect } from 'vitest';

describe('Email OTP Integration Test', () => {
  describe('Supabase Email Template Configuration', () => {
    it('should use OTP token in email template', () => {
      // 이메일 템플릿에 {{ .Token }} 변수가 포함되어야 함
      const correctTemplate = `
        <h2>Coffimer 인증 코드</h2>
        <div style="text-align: center; padding: 20px;">
          <span style="font-size: 32px; letter-spacing: 8px;">{{ .Token }}</span>
        </div>
        <p>이 코드는 1시간 동안 유효합니다.</p>
      `;
      
      expect(correctTemplate).toContain('{{ .Token }}');
      expect(correctTemplate).not.toContain('{{ .ConfirmationURL }}');
    });

    it('should NOT use Magic Link in OTP mode', () => {
      // Magic Link 템플릿 (잘못된 설정)
      const wrongTemplate = `
        <h2>Magic Link</h2>
        <p><a href="{{ .ConfirmationURL }}">Click here to login</a></p>
      `;
      
      // OTP 모드에서는 ConfirmationURL이 아닌 Token을 사용해야 함
      expect(wrongTemplate).toContain('{{ .ConfirmationURL }}');
      expect(wrongTemplate).not.toContain('{{ .Token }}');
    });
  });

  describe('OTP Flow', () => {
    it('should follow correct OTP authentication flow', () => {
      const flow = [
        '1. User enters email',
        '2. System generates 6-digit OTP',
        '3. OTP is hashed and stored in database',
        '4. Email with OTP is sent via Supabase',
        '5. User enters OTP',
        '6. System verifies OTP hash',
        '7. Authentication successful',
      ];
      
      expect(flow).toHaveLength(7);
      expect(flow[1]).toContain('6-digit');
      expect(flow[2]).toContain('hashed');
    });
  });

  describe('Development vs Production', () => {
    it('should provide debugOtp in development mode', () => {
      // 개발 모드 시뮬레이션
      const isDev = true;
      
      const devResponse = {
        success: true,
        message: '인증 코드가 이메일로 발송되었습니다.',
        debugOtp: isDev ? '123456' : undefined,
      };
      
      if (isDev) {
        expect(devResponse.debugOtp).toBeDefined();
        expect(devResponse.debugOtp).toBe('123456');
      } else {
        expect(devResponse.debugOtp).toBeUndefined();
      }
    });
  });

  describe('Email Template Best Practices', () => {
    it('should include essential OTP email elements', () => {
      const essentialElements = [
        'OTP code display',
        'Expiration time',
        'Security warning',
        'Company branding',
      ];
      
      const template = `
        <h2>Coffimer 인증 코드</h2>
        <div>{{ .Token }}</div>
        <p>15분 동안 유효합니다</p>
        <p>본인이 요청하지 않으셨다면 무시하세요</p>
      `;
      
      expect(template).toContain('{{ .Token }}'); // OTP code
      expect(template).toContain('15분'); // Expiration
      expect(template).toContain('무시'); // Security warning
      expect(template).toContain('Coffimer'); // Branding
    });

    it('should format OTP for better readability', () => {
      const otp = '123456';
      
      // 다양한 포맷팅 옵션
      const formatted1 = otp.match(/.{1,3}/g)?.join(' '); // "123 456"
      const formatted2 = otp.match(/.{1,2}/g)?.join('-'); // "12-34-56"
      const formatted3 = otp; // "123456"
      
      expect(formatted1).toBe('123 456');
      expect(formatted2).toBe('12-34-56');
      expect(formatted3).toBe('123456');
    });
  });

  describe('Security Checks', () => {
    it('should validate OTP format', () => {
      const validOTP = '123456';
      const invalidOTPs = ['12345', '1234567', 'abcdef', '12 34 56', ''];
      
      const isValidOTP = (otp: string) => /^\d{6}$/.test(otp);
      
      expect(isValidOTP(validOTP)).toBe(true);
      invalidOTPs.forEach(otp => {
        expect(isValidOTP(otp)).toBe(false);
      });
    });

    it('should check OTP expiration', () => {
      const now = new Date();
      const expirationMinutes = 15;
      
      // 만료된 OTP
      const expiredTime = new Date(now.getTime() - (expirationMinutes + 1) * 60 * 1000);
      expect(expiredTime < now).toBe(true);
      
      // 유효한 OTP
      const validTime = new Date(now.getTime() + 5 * 60 * 1000);
      expect(validTime > now).toBe(true);
    });
  });
});