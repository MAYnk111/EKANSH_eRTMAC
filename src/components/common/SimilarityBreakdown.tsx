import React from 'react';
import { motion } from 'framer-motion';

interface SimilarityBreakdownProps {
  score: number;
  breakdown?: {
    geography: number;
    formation: number;
    depthOverlap: number;
    drillingProfile: number;
    historicalEvents: number;
  };
  compact?: boolean;
}

export const SimilarityBreakdown: React.FC<SimilarityBreakdownProps> = ({
  score,
  breakdown = {
    geography: 90,
    formation: 95,
    depthOverlap: 91,
    drillingProfile: 89,
    historicalEvents: 94
  },
  compact = false
}) => {
  const factors = [
    { label: 'Formation Match', value: breakdown.formation, color: 'bg-cyan-400' },
    { label: 'Depth Overlap', value: breakdown.depthOverlap, color: 'bg-blue-400' },
    { label: 'Historical Events', value: breakdown.historicalEvents, color: 'bg-amber-400' },
    { label: 'Drilling Profile', value: breakdown.drillingProfile, color: 'bg-emerald-400' },
    { label: 'Geographic Proximity', value: breakdown.geography, color: 'bg-purple-400' },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 bg-oil-navy-800 rounded-full h-2 overflow-hidden border border-oil-navy-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" 
            style={{ width: `${score}%` }} 
          />
        </div>
        <span className="font-mono font-bold text-cyan-400 text-xs">{score}%</span>
      </div>
    );
  }

  return (
    <div className="bg-oil-navy-950/80 border border-oil-navy-800 rounded-lg p-3.5 space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-oil-navy-800/80">
        <span className="text-xs font-semibold text-slate-300">Contextual Similarity Score</span>
        <span className="font-mono font-bold text-lg text-cyan-400">{score}%</span>
      </div>

      <div className="space-y-2">
        {factors.map((f, i) => (
          <div key={i} className="text-xs">
            <div className="flex justify-between items-center mb-1 text-slate-400">
              <span>{f.label}</span>
              <span className="font-mono text-slate-200">{f.value}%</span>
            </div>
            <div className="w-full bg-oil-navy-900 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.value}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`h-full ${f.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
