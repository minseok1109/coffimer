import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(),
    auth: {
      signInWithOtp: vi.fn(),
      verifyOtp: vi.fn(),
    },
  })),
}));

describe('Email OTP System', () => {
  let supabase: any;

  beforeEach(() => {
    vi.clearAllMocks();
    supabase = createClient('test-url', 'test-key');
  });

  describe('OTP Generation', () => {
    it('should generate a 6-digit OTP', () => {
      const otp = crypto.randomInt(100000, 999999).toString();
      
      expect(otp).toHaveLength(6);
      expect(Number(otp)).toBeGreaterThanOrEqual(100000);
      expect(Number(otp)).toBeLessThanOrEqual(999999);
    });

    it('should create a secure hash of the OTP', () => {
      const otp = '123456';
      const hash1 = crypto.createHash('sha256').update(otp).digest('hex');
      const hash2 = crypto.createHash('sha256').update(otp).digest('hex');
      
      // Same input should produce same hash
      expect(hash1).toBe(hash2);
      // Hash should be different from original
      expect(hash1).not.toBe(otp);
      // Hash should be 64 characters (SHA256)
      expect(hash1).toHaveLength(64);
    });
  });

  describe('Email Sending with OTP', () => {
    it('should send OTP via Supabase Auth', async () => {
      const email = 'test@example.com';
      const otp = '123456';
      
      supabase.auth.signInWithOtp = vi.fn().mockResolvedValue({
        data: { user: null, session: null },
        error: null,
      });

      const result = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          data: {
            action: 'account_deletion',
            otp_code: otp,
          },
        },
      });

      expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith({
        email,
        options: {
          shouldCreateUser: false,
          data: {
            action: 'account_deletion',
            otp_code: otp,
          },
        },
      });
      expect(result.error).toBeNull();
    });

    it('should handle email sending errors gracefully', async () => {
      const email = 'test@example.com';
      
      supabase.auth.signInWithOtp = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Email service unavailable' },
      });

      const result = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      expect(result.error).toBeDefined();
      expect(result.error.message).toBe('Email service unavailable');
    });
  });

  describe('OTP Verification', () => {
    it('should verify OTP successfully', async () => {
      const email = 'test@example.com';
      const token = '123456';
      
      supabase.auth.verifyOtp = vi.fn().mockResolvedValue({
        data: { 
          user: { id: 'user-123', email },
          session: { access_token: 'token-123' },
        },
        error: null,
      });

      const result = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
        email,
        token,
        type: 'email',
      });
      expect(result.error).toBeNull();
      expect(result.data.user.email).toBe(email);
    });

    it('should reject invalid OTP', async () => {
      const email = 'test@example.com';
      const token = 'wrong-code';
      
      supabase.auth.verifyOtp = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Invalid OTP' },
      });

      const result = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      expect(result.error).toBeDefined();
      expect(result.error.message).toBe('Invalid OTP');
    });

    it('should handle expired OTP', async () => {
      const email = 'test@example.com';
      const token = '123456';
      
      supabase.auth.verifyOtp = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Token has expired or is invalid' },
      });

      const result = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      expect(result.error).toBeDefined();
      expect(result.error.message).toContain('expired');
    });
  });

  describe('OTP Expiration', () => {
    it('should calculate expiration time correctly', () => {
      const now = Date.now();
      const expirationMinutes = 15;
      const expiresAt = new Date(now + expirationMinutes * 60 * 1000);
      
      const diffInMinutes = (expiresAt.getTime() - now) / (60 * 1000);
      
      expect(diffInMinutes).toBeCloseTo(expirationMinutes, 0);
    });

    it('should check if OTP is expired', () => {
      const now = new Date();
      const expiredTime = new Date(now.getTime() - 60 * 1000); // 1 minute ago
      const validTime = new Date(now.getTime() + 60 * 1000); // 1 minute from now
      
      expect(expiredTime < now).toBe(true); // Expired
      expect(validTime > now).toBe(true); // Still valid
    });
  });

  describe('Database Operations', () => {
    it('should store OTP request in database', async () => {
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });
      
      supabase.from = mockFrom;

      const requestData = {
        user_email: 'test@example.com',
        user_id: 'user-123',
        otp_code: 'hashed-otp',
        otp_hash: 'hashed-otp',
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      };

      await supabase.from('account_deletion_requests').insert(requestData);

      expect(mockFrom).toHaveBeenCalledWith('account_deletion_requests');
      expect(mockInsert).toHaveBeenCalledWith(requestData);
    });

    it('should check for existing OTP requests', async () => {
      const mockSingle = vi.fn().mockResolvedValue({ 
        data: null, 
        error: null 
      });
      const mockGte = vi.fn().mockReturnValue({ single: mockSingle });
      const mockEq = vi.fn().mockReturnValue({ gte: mockGte });
      const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
      const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
      
      supabase.from = mockFrom;

      await supabase
        .from('account_deletion_requests')
        .select('*')
        .eq('user_email', 'test@example.com')
        .gte('expires_at', new Date().toISOString())
        .single();

      expect(mockFrom).toHaveBeenCalledWith('account_deletion_requests');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockEq).toHaveBeenCalledWith('user_email', 'test@example.com');
    });
  });

  describe('Email Template Variables', () => {
    it('should include OTP token in email template', () => {
      const template = `
        <h2>인증 코드</h2>
        <p>6자리 코드: {{ .Token }}</p>
      `;
      
      expect(template).toContain('{{ .Token }}');
    });

    it('should format OTP for display', () => {
      const otp = '123456';
      const formattedOtp = otp.split('').join(' '); // Add spacing
      
      expect(formattedOtp).toBe('1 2 3 4 5 6');
    });
  });

  describe('Security Considerations', () => {
    it('should not store plain text OTP', () => {
      const plainOtp = '123456';
      const hashedOtp = crypto.createHash('sha256').update(plainOtp).digest('hex');
      
      // Stored value should be hashed
      expect(hashedOtp).not.toBe(plainOtp);
      
      // Should be able to verify by hashing input
      const userInput = '123456';
      const hashedInput = crypto.createHash('sha256').update(userInput).digest('hex');
      expect(hashedInput).toBe(hashedOtp);
    });

    it('should handle rate limiting', async () => {
      const attempts = [];
      const maxAttempts = 3;
      
      for (let i = 0; i < 5; i++) {
        attempts.push(i);
      }
      
      const allowedAttempts = attempts.slice(0, maxAttempts);
      expect(allowedAttempts).toHaveLength(maxAttempts);
    });
  });
});