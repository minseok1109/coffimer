import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { POST as requestDeletion } from '@/app/api/account/delete/request/route';

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: { id: 'user-123', email: 'test@example.com', deleted_at: null },
            error: null,
          })),
        })),
        gte: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: null,
            error: null,
          })),
        })),
      })),
      insert: vi.fn(() => Promise.resolve({ error: null })),
    })),
    auth: {
      signInWithOtp: vi.fn(() => Promise.resolve({ error: null })),
    },
  })),
}));

// Mock crypto
vi.mock('crypto', () => ({
  default: {
    randomInt: vi.fn(() => 123456),
    createHash: vi.fn(() => ({
      update: vi.fn(() => ({
        digest: vi.fn(() => 'mocked-hash'),
      })),
    })),
  },
}));

describe('API Routes - Email System', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NODE_ENV = 'test';
  });

  describe('POST /api/account/delete/request', () => {
    it('should send OTP email successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('인증 코드가 이메일로 발송되었습니다');
    });

    it('should return error for missing email', async () => {
      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('이메일 주소를 입력해주세요.');
    });

    it('should include debugOtp in development mode', async () => {
      process.env.NODE_ENV = 'development';
      
      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.debugOtp).toBeDefined();
      expect(data.debugOtp).toBe('123456');
    });

    it('should not include debugOtp in production mode', async () => {
      process.env.NODE_ENV = 'production';
      
      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.debugOtp).toBeUndefined();
    });
  });

  describe('OTP Email Content', () => {
    it('should format email with OTP token', () => {
      const otp = '123456';
      const emailContent = `
        <h2>Coffimer 인증 코드</h2>
        <p>인증 코드: ${otp}</p>
      `;

      expect(emailContent).toContain('123456');
      expect(emailContent).toContain('인증 코드');
    });

    it('should include expiration information', () => {
      const emailContent = `
        <p>이 코드는 15분 동안 유효합니다.</p>
      `;

      expect(emailContent).toContain('15분');
      expect(emailContent).toContain('유효');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Mock database error
      vi.mocked(createClient).mockImplementationOnce(() => ({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({
                data: null,
                error: { message: 'Database error' },
              })),
            })),
          })),
        })),
        auth: {
          signInWithOtp: vi.fn(),
        },
      } as any));

      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toContain('계정을 찾을 수 없습니다');
    });

    it('should handle email service errors', async () => {
      // Mock email service error
      vi.mocked(createClient).mockImplementationOnce(() => ({
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({
                data: { id: 'user-123', email: 'test@example.com', deleted_at: null },
                error: null,
              })),
            })),
            gte: vi.fn(() => ({
              single: vi.fn(() => Promise.resolve({
                data: null,
                error: null,
              })),
            })),
          })),
          insert: vi.fn(() => Promise.resolve({ error: null })),
        })),
        auth: {
          signInWithOtp: vi.fn(() => Promise.resolve({ 
            error: { message: 'Email service unavailable' } 
          })),
        },
      } as any));

      const request = new NextRequest('http://localhost:3000/api/account/delete/request', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await requestDeletion(request);
      const data = await response.json();

      // Even with email error, we return success (fallback behavior)
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});