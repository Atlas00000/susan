import { NextRequest, NextResponse } from 'next/server';
import { processSearchQuery } from '@/lib/ai/groq-client';
import { checkRateLimit } from '@/lib/ai/rate-limiter';
import { mockProducts } from '@/data/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/search
 * Natural language search with AI
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, userId } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Rate limiting
    const effectiveUserId = userId || req.ip || `search-${Date.now()}`;
    if (!checkRateLimit(effectiveUserId, 20, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many search requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Process query with AI (fallback to simple search if API key unavailable)
    let interpretation = `Searching for: ${query}`;
    let filters: Record<string, any> = {
      categories: [],
      moods: [],
      notes: [],
    };

    if (process.env.GROQ_API_KEY) {
      try {
        const result = await processSearchQuery(query);
        interpretation = result.interpretation;
        filters = result.filters;
      } catch (error) {
        console.error('AI search processing failed, using fallback:', error);
      }
    }

    // Apply filters to products
    let filteredProducts = mockProducts;

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        filters.categories.includes(p.category)
      );
    }

    // Filter by moods
    if (filters.moods && filters.moods.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        filters.moods.includes(p.mood)
      );
    }

    // Filter by price
    if (filters.priceMax) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.priceMax);
    }

    if (filters.priceMin) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.priceMin);
    }

    // Filter by notes (if any note matches)
    if (filters.notes && filters.notes.length > 0) {
      filteredProducts = filteredProducts.filter(p =>
        p.notes.some(note =>
          filters.notes.some((filterNote: string) =>
            note.toLowerCase().includes(filterNote.toLowerCase())
          )
        )
      );
    }

    // If no specific filters matched, do simple text search
    if (filteredProducts.length === 0 && mockProducts.length > 0) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredProducts = mockProducts.filter(p =>
        searchTerms.some(term =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.notes.some(note => note.toLowerCase().includes(term))
        )
      );
    }

    return NextResponse.json({
      query,
      interpretation,
      filters,
      results: filteredProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        mood: p.mood,
        images: p.images,
        availability: p.availability,
      })),
      count: filteredProducts.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process search. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search
 * Get popular searches or suggestions
 */
export async function GET() {
  const popularSearches = [
    'luxury oud fragrances',
    'fresh scents for daily wear',
    'romantic evening perfumes',
    'bold mysterious fragrances',
    'something under 60000',
    'gifts for special occasions',
  ];

  return NextResponse.json({
    popularSearches,
    categories: [
      'Oud & Rich',
      'Amber & Gold',
      'Floral & Fresh',
      'Gourmand & Unique',
      'Signature Editions',
    ],
    timestamp: new Date().toISOString(),
  });
}

