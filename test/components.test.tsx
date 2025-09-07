import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmailStep } from '@/components/account-deletion/EmailStep';
import { OtpStep } from '@/components/account-deletion/OtpStep';

describe('Email System Components', () => {
  describe('EmailStep Component', () => {
    it('should render email input form', () => {
      const mockSubmit = vi.fn();
      
      render(
        <EmailStep 
          onSubmit={mockSubmit} 
          isLoading={false} 
          error={null}
        />
      );

      expect(screen.getByText('이메일 확인')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일 주소')).toBeInTheDocument();
      expect(screen.getByText('인증 코드 발송')).toBeInTheDocument();
    });

    it('should validate email format', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(
        <EmailStep 
          onSubmit={mockSubmit} 
          isLoading={false} 
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('이메일 주소');
      const button = screen.getByText('인증 코드 발송');

      // Invalid email
      await user.type(input, 'invalid-email');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText(/유효한 이메일/i)).toBeInTheDocument();
      });
    });

    it('should submit valid email', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      
      render(
        <EmailStep 
          onSubmit={mockSubmit} 
          isLoading={false} 
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('이메일 주소');
      const button = screen.getByText('인증 코드 발송');

      await user.type(input, 'test@example.com');
      await user.click(button);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
        });
      });
    });

    it('should display error message', () => {
      const mockSubmit = vi.fn();
      
      render(
        <EmailStep 
          onSubmit={mockSubmit} 
          isLoading={false} 
          error="네트워크 오류가 발생했습니다."
        />
      );

      expect(screen.getByText('네트워크 오류가 발생했습니다.')).toBeInTheDocument();
    });

    it('should disable form when loading', () => {
      const mockSubmit = vi.fn();
      
      render(
        <EmailStep 
          onSubmit={mockSubmit} 
          isLoading={true} 
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('이메일 주소');
      const button = screen.getByText('발송 중...');

      expect(input).toBeDisabled();
      expect(button).toBeDisabled();
    });
  });

  describe('OtpStep Component', () => {
    it('should render OTP input form', () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error={null}
        />
      );

      expect(screen.getByText('인증 코드 입력')).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('6자리 숫자')).toBeInTheDocument();
      expect(screen.getByText('인증 확인')).toBeInTheDocument();
      expect(screen.getByText('다시 발송')).toBeInTheDocument();
    });

    it('should only accept numeric input', async () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      const user = userEvent.setup();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('6자리 숫자') as HTMLInputElement;
      
      // Type mixed characters
      await user.type(input, 'abc123def456');
      
      // Only numbers should remain
      expect(input.value).toBe('123456');
    });

    it('should limit input to 6 digits', async () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      const user = userEvent.setup();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('6자리 숫자') as HTMLInputElement;
      
      await user.type(input, '1234567890');
      
      expect(input.value).toBe('123456');
    });

    it('should submit valid OTP', async () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      const user = userEvent.setup();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('6자리 숫자');
      const button = screen.getByText('인증 확인');

      await user.type(input, '123456');
      await user.click(button);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          email: 'test@example.com',
          otp: '123456',
        });
      });
    });

    it('should handle resend OTP', async () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      const user = userEvent.setup();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error={null}
        />
      );

      const resendButton = screen.getByText('다시 발송');
      await user.click(resendButton);

      expect(mockResend).toHaveBeenCalled();
    });

    it('should display error message', () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={false}
          error="잘못된 인증 코드입니다."
        />
      );

      expect(screen.getByText('잘못된 인증 코드입니다.')).toBeInTheDocument();
    });

    it('should disable form when loading', () => {
      const mockSubmit = vi.fn();
      const mockResend = vi.fn();
      
      render(
        <OtpStep 
          email="test@example.com"
          onSubmit={mockSubmit}
          onResend={mockResend}
          isLoading={true}
          error={null}
        />
      );

      const input = screen.getByPlaceholderText('6자리 숫자');
      const submitButton = screen.getByText('확인 중...');
      const resendButton = screen.getByText('다시 발송');

      expect(input).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(resendButton).toBeDisabled();
    });
  });
});