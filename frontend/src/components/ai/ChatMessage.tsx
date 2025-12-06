'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  productRecommendations?: string[];
}

export function ChatMessage({ role, content, timestamp, productRecommendations }: ChatMessageProps) {
  const isUser = role === 'user';
  
  // Don't render system messages (internal only)
  if (role === 'system') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isUser
              ? 'bg-luxury-cream text-luxury-charcoal'
              : 'bg-luxury-gold text-luxury-charcoal'
          }`}
        >
          {isUser ? 'Y' : 'AI'}
        </div>

        {/* Message Bubble */}
        <div className="flex flex-col gap-1">
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? 'bg-luxury-cream text-luxury-charcoal'
                : 'bg-luxury-charcoal/80 text-luxury-cream border border-luxury-gold/20'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>

          {/* Product Recommendations */}
          {!isUser && productRecommendations && productRecommendations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {productRecommendations.map((productId) => (
                <Link
                  key={productId}
                  href={`/products/${productId}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-charcoal transition-all text-xs font-semibold group shadow-lg"
                  title={`View ${productId.replace(/-/g, ' ').toUpperCase()}`}
                >
                  <span className="capitalize">{productId.replace(/-/g, ' ')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              ))}
            </div>
          )}

          {/* Timestamp */}
          {timestamp && (
            <span className={`text-xs ${isUser ? 'text-right' : 'text-left'} text-luxury-cream/50`}>
              {new Date(timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

