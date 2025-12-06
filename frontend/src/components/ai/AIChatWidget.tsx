'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QuickActions } from './QuickActions';
import { ChatMessage as ChatMessageType } from '@/lib/ai/types';

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  // Ensure component is mounted (avoid SSR issues)
  useEffect(() => {
    setIsMounted(true);
    console.log('🎨 AIChatWidget mounted!');
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load messages from sessionStorage
  useEffect(() => {
    if (!isMounted) return;
    const saved = sessionStorage.getItem('chatHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed);
        setHasShownWelcome(true);
      } catch (e) {
        console.error('Failed to parse chat history:', e);
      }
    }
  }, [isMounted]);

  // Save messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Show welcome message when first opening chat
  useEffect(() => {
    if (isOpen && !hasShownWelcome && messages.length === 0) {
      const welcomeMessage: ChatMessageType = {
        role: 'assistant',
        content: "Welcome to Sanaya's Scents! I'm your personal fragrance consultant. How can I help you discover your perfect scent today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
      setHasShownWelcome(true);
    }
  }, [isOpen, hasShownWelcome, messages.length]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    console.log('📤 Sending message:', content);

    // Add user message
    const userMessage: ChatMessageType = {
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-10), // Last 10 messages for context
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('📥 AI response received:', data);

      // Add AI response with product recommendations
      const aiMessage: ChatMessageType = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp,
        productRecommendations: data.productRecommendations || [],
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: ChatMessageType = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment, or explore our collections directly.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem('chatHistory');
    setHasShownWelcome(false);
    console.log('🧹 Chat cleared');
  };

  // Don't render until mounted to avoid SSR issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => {
          console.log('🖱️ Chat button clicked! isOpen:', isOpen);
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-luxury-gold rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        style={{ zIndex: 9999 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6 text-luxury-charcoal"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.div
              key="chat"
              className="text-2xl"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              💬
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Badge */}
        {!isOpen && messages.length === 0 && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            !
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-6 w-[400px] h-[600px] bg-luxury-charcoal rounded-2xl shadow-2xl border border-luxury-gold/30 flex flex-col overflow-hidden"
            style={{ 
              maxWidth: 'calc(100vw - 48px)', 
              maxHeight: 'calc(100vh - 160px)',
              zIndex: 9999
            }}
          >
            {/* Header */}
            <div className="bg-luxury-gold/10 border-b border-luxury-gold/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-charcoal text-xl font-bold">
                  S
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-luxury-cream text-sm">
                    Sanaya's Scents
                  </h3>
                  <p className="text-xs text-luxury-cream/70">Your Fragrance Consultant</p>
                </div>
              </div>
              
              <button
                onClick={clearChat}
                className="text-luxury-cream/50 hover:text-luxury-cream transition-colors text-xs"
                title="Clear chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && <QuickActions onSelect={handleQuickAction} disabled={isLoading} />}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-luxury-charcoal/50">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index} 
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  productRecommendations={msg.productRecommendations}
                />
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 mb-4"
                >
                  <div className="w-8 h-8 rounded-full bg-luxury-gold flex items-center justify-center text-luxury-charcoal text-xs font-semibold">
                    AI
                  </div>
                  <div className="bg-luxury-charcoal/80 border border-luxury-gold/20 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-luxury-gold/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-luxury-gold/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-luxury-gold/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
