'use client'

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
  text: string;
  icon: string;
}

const popularSearches: SearchSuggestion[] = [
  { text: 'luxury oud fragrances', icon: '' },
  { text: 'fresh scents for daily wear', icon: '' },
  { text: 'romantic evening perfumes', icon: '' },
  { text: 'bold mysterious fragrances', icon: '' },
  { text: 'something under 60000', icon: '' },
  { text: 'gifts for special occasions', icon: '' },
];

export function AISearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>(popularSearches);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setIsOpen(false);

    try {
      // Encode the query and redirect to products page with search param
      const encodedQuery = encodeURIComponent(searchQuery);
      router.push(`/products?search=${encodedQuery}`);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show suggestions when typing
    if (value.length > 0) {
      setIsOpen(true);
      // Filter suggestions based on input
      const filtered = popularSearches.filter(s => 
        s.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : popularSearches);
    } else {
      setSuggestions(popularSearches);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsOpen(true)}
          placeholder="Search fragrances naturally... (e.g., 'bold scents under 60k')"
          className="w-full px-5 py-3 pr-12 bg-luxury-charcoal/80 border border-luxury-gold/30 rounded-xl text-luxury-cream placeholder-luxury-cream/50 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 focus:border-luxury-gold transition-all"
          disabled={isSearching}
        />
        
        {/* Search Icon / Loading */}
        <button
          onClick={() => handleSearch(query)}
          disabled={isSearching || !query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-luxury-gold/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-luxury-gold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </motion.div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-luxury-gold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          )}
        </button>

        {/* AI Badge */}
        <div className="absolute -top-2 left-3 px-2 py-0.5 bg-luxury-gold rounded-full text-[10px] font-bold text-luxury-charcoal">
          AI
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-luxury-charcoal/95 backdrop-blur-lg border border-luxury-gold/30 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {/* Popular Searches */}
            <div className="p-4">
              <div className="text-xs font-medium text-luxury-cream/70 mb-3">
                <span>Popular Searches</span>
              </div>
              
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-luxury-gold/10 transition-colors group"
                  >
                    <span className="text-sm text-luxury-cream group-hover:text-luxury-gold transition-colors">
                      {suggestion.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="border-t border-luxury-gold/20 p-4 bg-luxury-gold/5">
              <div className="text-xs text-luxury-cream/60">
                <span className="font-medium text-luxury-gold">Tip:</span> Try natural language like 
                "something romantic under 55k" or "bold oud fragrances"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

