'use client'

import { motion } from 'framer-motion';

interface QuickActionsProps {
  onSelect: (action: string) => void;
  disabled?: boolean;
}

const quickActions = [
  { id: 'recommend', label: 'Recommend a scent', icon: '' },
  { id: 'occasion', label: 'Scent for occasion', icon: '' },
  { id: 'gift', label: 'Gift suggestions', icon: '' },
  { id: 'quiz', label: 'Take the quiz', icon: '' },
];

export function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="p-4 border-b border-luxury-gold/20">
      <h4 className="text-xs font-medium text-luxury-cream/70 mb-3">Quick Actions</h4>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelect(action.label)}
            disabled={disabled}
            className="px-3 py-2 rounded-lg bg-luxury-gold/10 hover:bg-luxury-gold/20 border border-luxury-gold/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <span className="text-xs text-luxury-cream font-medium">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

