// Simple in-memory rate limiter for AI API calls

import { RateLimitInfo } from './types';

const rateLimitMap = new Map<string, RateLimitInfo>();

/**
 * Check if a user has exceeded their rate limit
 * @param userId - Unique identifier for the user (can be session ID)
 * @param limit - Maximum requests allowed per time window (default: 10)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 * @returns true if within limit, false if exceeded
 */
export function checkRateLimit(
  userId: string,
  limit: number = 10,
  windowMs: number = 60 * 60 * 1000 // 1 hour
): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(userId);

  // No previous record or window expired - allow request
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(userId, {
      userId,
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  // Check if limit exceeded
  if (userLimit.count >= limit) {
    return false;
  }

  // Increment count and allow
  userLimit.count++;
  return true;
}

/**
 * Get remaining requests for a user
 */
export function getRemainingRequests(userId: string, limit: number = 10): number {
  const userLimit = rateLimitMap.get(userId);
  if (!userLimit) return limit;
  
  const now = Date.now();
  if (now > userLimit.resetTime) return limit;
  
  return Math.max(0, limit - userLimit.count);
}

/**
 * Reset rate limit for a specific user (for testing or admin purposes)
 */
export function resetRateLimit(userId: string): void {
  rateLimitMap.delete(userId);
}

/**
 * Cleanup expired entries (run periodically)
 */
export function cleanupExpiredLimits(): void {
  const now = Date.now();
  for (const [userId, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(userId);
    }
  }
}

// Cleanup every hour
if (typeof window === 'undefined') {
  // Only run on server
  setInterval(cleanupExpiredLimits, 60 * 60 * 1000);
}

