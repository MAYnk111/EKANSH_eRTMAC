import React from 'react';
import { EventSeverity } from '../../types';

interface RiskBadgeProps {
  severity: EventSeverity | string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  severity,
  size = 'md',
  showPulse = false
}) => {
  const norm = severity.toLowerCase();

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotColor = 'bg-slate-400';

  if (norm === 'critical' || norm.includes('elevated') || norm.includes('high')) {
    styles = 'bg-red-500/15 text-red-400 border-red-500/40 shadow-red-950/20';
    dotColor = 'bg-red-500';
  } else if (norm === 'warning' || norm === 'medium' || norm.includes('moderate')) {
    styles = 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-amber-950/20';
    dotColor = 'bg-amber-500';
  } else if (norm === 'safe' || norm === 'low' || norm === 'successful' || norm === 'resolved') {
    styles = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-emerald-950/20';
    dotColor = 'bg-emerald-500';
  } else if (norm === 'info' || norm === 'normal') {
    styles = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40 shadow-cyan-950/20';
    dotColor = 'bg-cyan-400';
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-mono tracking-wide ${styles} ${sizeClasses[size]}`}>
      <span className="relative flex h-2 w-2">
        {showPulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span className="uppercase">{severity}</span>
    </span>
  );
};
