import React, { useState } from 'react';
import { Well } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Compass, ChevronRight, Eye, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SimilarityBreakdown } from '../common/SimilarityBreakdown';

interface OffsetWellsRankingCardProps {
  wells: Well[];
}

export const OffsetWellsRankingCard: React.FC<OffsetWellsRankingCardProps> = ({ wells }) => {
  const navigate = useNavigate();
  const [expandedWellId, setExpandedWellId] = useState<string>('well-aa-05');

  // Filter offset wells and sort by similarity score descending
  const offsetWells = wells
    .filter(w => w.name !== 'AA-12')
    .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0))
    .slice(0, 5);

  return (
    <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Contextual Offset Well Intelligence Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked by multi-factor stratigraphic, depth, and historical operational similarity.
          </p>
        </div>
        <button
          onClick={() => navigate('/wells')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
        >
          <span>View All Offset Wells</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {offsetWells.map((well) => {
          const isExpanded = expandedWellId === well.id;
          const score = well.similarityScore || 75;

          return (
            <div
              key={well.id}
              className={`rounded-xl border transition-all text-xs overflow-hidden ${
                isExpanded
                  ? 'bg-oil-navy-950/90 border-cyan-500/50 shadow-md'
                  : 'bg-oil-navy-950/40 border-oil-navy-800/80 hover:border-oil-navy-700'
              }`}
            >
              {/* Row Header */}
              <div
                onClick={() => setExpandedWellId(isExpanded ? '' : well.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-oil-navy-800 border border-oil-navy-700 flex items-center justify-center font-mono font-bold text-white text-xs">
                    {well.name.replace('AA-', '')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-mono text-sm">{well.name}</span>
                      <span className="text-[10px] text-slate-400">({well.distanceFromActive} km away)</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {well.formation} • {well.trajectory}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono font-bold text-cyan-400 text-sm">{score}%</span>
                    <span className="text-[10px] text-slate-500 block">Similarity</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-90 text-cyan-400' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Breakdown */}
              {isExpanded && (
                <div className="p-4 pt-1 border-t border-oil-navy-800/80 bg-oil-navy-950/60 space-y-3">
                  <SimilarityBreakdown score={score} breakdown={well.similarityBreakdown} />

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Recorded NPT: <strong className="text-amber-400 font-mono">{well.nptTotalHours} hrs</strong></span>
                    <button
                      onClick={() => navigate(`/wells/${well.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Complete Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
