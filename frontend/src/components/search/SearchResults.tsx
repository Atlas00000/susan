'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/types';
import { Container } from '@/components/ui/Container';

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search');
  
  const [results, setResults] = useState<Product[]>([]);
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      setResults(data.results || []);
      setInterpretation(data.interpretation || '');
      
      console.log('Search results:', data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    router.push('/products');
  };

  if (!searchQuery) {
    return null;
  }

  return (
    <Container className="py-12">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-luxury-cream mb-2">
              Search Results
            </h1>
            <p className="text-luxury-cream/70">
              Searching for: <span className="text-luxury-gold font-medium">"{searchQuery}"</span>
            </p>
          </div>
          
          <button
            onClick={clearSearch}
            className="px-4 py-2 bg-luxury-charcoal/50 hover:bg-luxury-gold/20 border border-luxury-gold/30 rounded-lg text-luxury-cream transition-colors text-sm"
          >
            Clear Search
          </button>
        </div>

        {/* AI Interpretation */}
        {interpretation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <div>
                <div className="text-sm font-medium text-luxury-gold mb-1">
                  AI Understanding:
                </div>
                <p className="text-sm text-luxury-cream/80">
                  {interpretation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-luxury-gold/30 border-t-luxury-gold rounded-full mb-4"
          />
          <p className="text-luxury-cream/70">Searching with AI...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center"
        >
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => performSearch(searchQuery)}
            className="mt-4 px-6 py-2 bg-luxury-gold text-luxury-charcoal rounded-lg hover:bg-luxury-gold/90 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Results */}
      {!isLoading && !error && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <p className="text-luxury-cream/70">
              Found <span className="text-luxury-gold font-semibold">{results.length}</span> {results.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {!isLoading && !error && results.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <h3 className="text-2xl font-heading font-bold text-luxury-cream mb-2">
            No products found
          </h3>
          <p className="text-luxury-cream/70 mb-6">
            Try adjusting your search or browse our collections
          </p>
          <button
            onClick={clearSearch}
            className="px-8 py-3 bg-luxury-gold text-luxury-charcoal rounded-lg hover:bg-luxury-gold/90 transition-colors font-semibold"
          >
            View All Products
          </button>
        </motion.div>
      )}
    </Container>
  );
}

