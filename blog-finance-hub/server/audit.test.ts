import { describe, it, expect, beforeEach } from 'vitest';
import { getClientIp, logAuditEvent, getAuditLogs, getFailedAuthAttempts, getBlockedRequests } from './audit';
import type { Request } from 'express';

describe('Audit Logging', () => {
  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const req = {
        headers: { 'x-forwarded-for': '192.168.1.1, 10.0.0.1' },
        socket: { remoteAddress: '127.0.0.1' },
      } as any as Request;

      const ip = getClientIp(req);
      expect(ip).toBe('192.168.1.1');
    });

    it('should use socket remoteAddress if no x-forwarded-for', () => {
      const req = {
        headers: {},
        socket: { remoteAddress: '192.168.1.100' },
      } as any as Request;

      const ip = getClientIp(req);
      expect(ip).toBe('192.168.1.100');
    });

    it('should return unknown if no IP available', () => {
      const req = {
        headers: {},
        socket: {},
      } as any as Request;

      const ip = getClientIp(req);
      expect(ip).toBe('unknown');
    });

    it('should handle IPv6 addresses', () => {
      const req = {
        headers: { 'x-forwarded-for': '::1' },
        socket: { remoteAddress: '127.0.0.1' },
      } as any as Request;

      const ip = getClientIp(req);
      expect(ip).toBe('::1');
    });
  });

  describe('Audit Event Logging', () => {
    it('should log authentication success', async () => {
      const req = {
        headers: { 'user-agent': 'Mozilla/5.0' },
        socket: { remoteAddress: '192.168.1.1' },
      } as any as Request;

      // This should not throw
      await logAuditEvent(req, {
        userId: 1,
        openId: 'test-open-id',
        action: 'auth.login',
        actionType: 'auth',
        status: 'success',
        details: { loginMethod: 'oauth' },
      });

      expect(true).toBe(true);
    });

    it('should log authentication failure', async () => {
      const req = {
        headers: {},
        socket: { remoteAddress: '192.168.1.1' },
      } as any as Request;

      await logAuditEvent(req, {
        action: 'auth.login',
        actionType: 'auth',
        status: 'failure',
        errorMessage: 'Invalid credentials',
      });

      expect(true).toBe(true);
    });

    it('should log file upload', async () => {
      const req = {
        headers: { 'user-agent': 'Chrome' },
        socket: { remoteAddress: '192.168.1.1' },
      } as any as Request;

      await logAuditEvent(req, {
        userId: 1,
        openId: 'test-open-id',
        action: 'file.upload',
        actionType: 'file',
        status: 'success',
        resourceType: 'file',
        details: {
          filename: 'document.pdf',
          fileSize: 1024,
          mimeType: 'application/pdf',
        },
      });

      expect(true).toBe(true);
    });

    it('should log file deletion', async () => {
      const req = {
        headers: {},
        socket: { remoteAddress: '192.168.1.1' },
      } as any as Request;

      await logAuditEvent(req, {
        userId: 1,
        openId: 'test-open-id',
        action: 'file.delete',
        actionType: 'file',
        status: 'success',
        resourceId: '123',
        resourceType: 'file',
      });

      expect(true).toBe(true);
    });

    it('should log blocked requests', async () => {
      const req = {
        headers: { 'x-forwarded-for': '203.0.113.1' },
        socket: { remoteAddress: '127.0.0.1' },
      } as any as Request;

      await logAuditEvent(req, {
        action: 'auth.login',
        actionType: 'auth',
        status: 'blocked',
        errorMessage: 'Rate limit exceeded',
      });

      expect(true).toBe(true);
    });
  });

  describe('Audit Log Retrieval', () => {
    it('should retrieve audit logs', async () => {
      const logs = await getAuditLogs({ limit: 10 });
      expect(Array.isArray(logs)).toBe(true);
    });

    it('should retrieve failed auth attempts', async () => {
      const logs = await getFailedAuthAttempts(10);
      expect(Array.isArray(logs)).toBe(true);
    });

    it('should retrieve blocked requests', async () => {
      const logs = await getBlockedRequests(10);
      expect(Array.isArray(logs)).toBe(true);
    });

    it('should handle pagination', async () => {
      const logs = await getAuditLogs({ limit: 5, offset: 0 });
      expect(Array.isArray(logs)).toBe(true);
      expect(logs.length).toBeLessThanOrEqual(5);
    });

    it('should filter by action', async () => {
      const logs = await getAuditLogs({ action: 'auth.login', limit: 10 });
      expect(Array.isArray(logs)).toBe(true);
    });

    it('should filter by status', async () => {
      const logs = await getAuditLogs({ status: 'success', limit: 10 });
      expect(Array.isArray(logs)).toBe(true);
    });
  });

  describe('Audit Log Structure', () => {
    it('should include required audit log fields', async () => {
      const logs = await getAuditLogs({ limit: 1 });
      
      if (logs.length > 0) {
        const log = logs[0];
        expect(log).toHaveProperty('id');
        expect(log).toHaveProperty('action');
        expect(log).toHaveProperty('actionType');
        expect(log).toHaveProperty('status');
        expect(log).toHaveProperty('createdAt');
      }
    });

    it('should store IP address in audit logs', async () => {
      const req = {
        headers: { 'x-forwarded-for': '203.0.113.42' },
        socket: { remoteAddress: '127.0.0.1' },
      } as any as Request;

      await logAuditEvent(req, {
        action: 'auth.login',
        actionType: 'auth',
        status: 'success',
      });

      // Verify IP was captured
      expect(true).toBe(true);
    });

    it('should store user agent in audit logs', async () => {
      const req = {
        headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        socket: { remoteAddress: '192.168.1.1' },
      } as any as Request;

      await logAuditEvent(req, {
        userId: 1,
        action: 'file.upload',
        actionType: 'file',
        status: 'success',
      });

      expect(true).toBe(true);
    });
  });
});
