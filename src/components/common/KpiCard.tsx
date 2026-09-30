import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'cyan' | 'blue' | 'amber' | 'red' | 'emerald';
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'cyan'
}) => {
  const colorMap = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10 group-hover:border-cyan-500/60',
    blue: 'border-blue-500/30 text-blue-400 bg-blue-500/10 group-hover:border-blue-500/60',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10 group-hover:border-amber-500/60',
    red: 'border-red-500/30 text-red-400 bg-red-500/10 group-hover:border-red-500/60',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 group-hover:border-emerald-500/60'
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group bg-oil-navy-900/90 border border-oil-navy-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-cyan-950/30"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          <div className="text-3xl font-bold tracking-tight text-white mt-1.5 font-mono">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg border ${colorMap[color]} transition-colors duration-300`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-oil-navy-800/80 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${trend.isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
            {trend.value}
          </span>
          <span className="text-slate-500">vs historical baseline</span>
        </div>
      )}
    </motion.div>
  );
};
