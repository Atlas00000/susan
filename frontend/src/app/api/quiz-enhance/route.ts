import { NextRequest, NextResponse } from 'next/server';
import { enhanceQuizResults } from '@/lib/ai/groq-client';
import { checkRateLimit } from '@/lib/ai/rate-limiter';
import { mockProducts } from '@/data/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/quiz-enhance
 * Enhance quiz results with AI-generated personalization
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, recommendedProductIds, userId } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Quiz answers are required' },
        { status: 400 }
      );
    }

    if (!recommendedProductIds || !Array.isArray(recommendedProductIds)) {
      return NextResponse.json(
        { error: 'Recommended product IDs are required' },
        { status: 400 }
      );
    }

    // Rate limiting (less strict for quiz results)
    const effectiveUserId = userId || req.ip || `quiz-${Date.now()}`;
    if (!checkRateLimit(effectiveUserId, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many quiz submissions. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Get product details for recommended products
    const topProducts = recommendedProductIds
      .slice(0, 6)
      .map(id => mockProducts.find(p => p.id === id))
      .filter(Boolean)
      .map(p => ({
        id: p!.id,
        name: p!.name,
        category: p!.category,
        description: p!.description,
        mood: p!.mood,
      }));

    if (topProducts.length === 0) {
      return NextResponse.json(
        { error: 'No valid products found for recommendations' },
        { status: 400 }
      );
    }

    // Get AI-enhanced results
    const enhancement = await enhanceQuizResults(answers, topProducts);

    return NextResponse.json({
      ...enhancement,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Quiz enhancement error:', error);
    
    // Fallback to basic enhancement
    return NextResponse.json(
      { 
        profileTitle: 'The Fragrance Enthusiast',
        personalizedDescription: 'Based on your preferences, you have a sophisticated appreciation for fragrances. Your choices reflect a balanced approach to scent, valuing both tradition and innovation in perfumery.',
        recommendations: [],
        error: 'AI enhancement unavailable, using fallback',
      },
      { status: 200 }
    );
  }
}

