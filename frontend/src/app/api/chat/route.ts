import { NextRequest, NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/ai/groq-client';
import { checkRateLimit, getRemainingRequests } from '@/lib/ai/rate-limiter';
import { ChatMessage } from '@/lib/ai/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getClientIp(req: NextRequest): string | null {
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) return xForwardedFor.split(',')[0]?.trim() || null;

  const xRealIp = req.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  return null;
}

/**
 * POST /api/chat
 * Handle chat messages with AI assistant
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, userId } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate user ID if not provided (use IP or generate random)
    const effectiveUserId = userId || getClientIp(req) || `user-${Date.now()}`;

    // Check rate limit (10 messages per hour per user)
    if (!checkRateLimit(effectiveUserId, 10)) {
      const remaining = getRemainingRequests(effectiveUserId, 10);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
          remainingRequests: remaining,
          resetTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        },
        { status: 429 }
      );
    }

    // Validate and clean history
    const conversationHistory: ChatMessage[] = Array.isArray(history)
      ? history
          .filter((msg: any) => msg.role && msg.content)
          .slice(-10) // Keep only last 10 messages for context
          .map((msg: any) => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp,
          }))
      : [];

    // Check if API key is available
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI service is currently unavailable. Please try again later.',
          response: "I apologize, but I'm currently unable to process your request. Please feel free to explore our collections directly or contact our team for assistance."
        },
        { status: 503 }
      );
    }

    // Get AI response
    const response = await chatWithAI(message, conversationHistory);

    // Extract product IDs from response for recommendation tracking
    const productIds = extractProductIds(response);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      productRecommendations: productIds,
      remainingRequests: getRemainingRequests(effectiveUserId, 10),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process your message. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * Get chat status and rate limit info
 */
export async function GET(req: NextRequest) {
  const userId =
    req.nextUrl.searchParams.get('userId') || getClientIp(req) || 'anonymous';
  const remaining = getRemainingRequests(userId, 10);

  return NextResponse.json({
    status: 'operational',
    model: 'llama-3.3-70b-versatile',
    provider: 'Groq',
    rateLimit: {
      limit: 10,
      remaining,
      window: '1 hour',
    },
    timestamp: new Date().toISOString(),
  });
}

/**
 * Extract product IDs mentioned in AI response
 * Helps track which products are being recommended
 */
function extractProductIds(response: string): string[] {
  const productIds: string[] = [];
  
  // All product IDs from the catalog
  const allProductIds = [
    'eternal-oud',
    'out-of-crabia-iii',
    'eit-of-crabia',
    'royal-amber',
    'gold',
    'amber-rouge',
    'grecia',
    'olena',
    'cherry-intense',
    'natural-intense',
    'coffee',
    'liquid-brun',
    'dimmah',
    'della',
    'afnan',
    'ajwad',
    'haya',
    'leen',
    'khadlaj'
  ];

  // Check which product IDs appear in the response (case-insensitive)
  const lowerResponse = response.toLowerCase();
  allProductIds.forEach(id => {
    // Match various formats: "eternal-oud", 'eternal-oud', eternal-oud, ETERNAL_OUD, etc.
    if (lowerResponse.includes(id.toLowerCase()) || 
        lowerResponse.includes(id.replace(/-/g, '_')) ||
        lowerResponse.includes(id.replace(/-/g, ' '))) {
      productIds.push(id);
    }
  });

  return [...new Set(productIds)]; // Remove duplicates
}

