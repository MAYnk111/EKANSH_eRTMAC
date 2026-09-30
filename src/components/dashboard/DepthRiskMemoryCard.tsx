import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2, History, FileText } from 'lucide-react';
import { useDrilling } from '../../context/DrillingContext';
import { RiskBadge } from '../common/RiskBadge';

interface DepthRiskMemoryCardProps {
  onOpenExplainableModal: () => void;
}

export const DepthRiskMemoryCard: React.FC<DepthRiskMemoryCardProps> = ({
  onOpenExplainableModal
}) => {
  const { riskAlert, telemetry } = useDrilling();

  if (!riskAlert) return null;

  return (
    <div className="bg-gradient-to-br from-red-950/40 via-oil-navy-900 to-oil-navy-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-4">
      {/* Top Tag & Title */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <RiskBadge severity={riskAlert.riskLevel} size="sm" showPulse />
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Depth-Aware Risk Memory
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">
              Historical Trouble Zone Approaching: {riskAlert.troubleZoneStart}–{riskAlert.troubleZoneEnd} m
            </h3>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">Confidence</span>
          <span className="text-xl font-black text-emerald-400">{riskAlert.confidence}%</span>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-xs text-slate-300 leading-relaxed bg-oil-navy-950/70 p-3.5 rounded-xl border border-oil-navy-800">
        Active drill bit depth (<strong className="text-cyan-400">{telemetry.depth.toFixed(1)} m</strong>) overlaps known micro-fractured sandstone zone. <strong>4 of 5 similar offset wells</strong> (AA-05, AA-09, AA-03, AA-02) suffered mud loss in this exact layer under current 1.18 SG mud weight.
      </p>

      {/* Quick Evidence Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-oil-navy-950 p-2.5 rounded-lg border border-oil-navy-800">
          <span className="text-slate-500 text-[10px] block">Offset Analog #1:</span>
          <div className="flex justify-between font-mono mt-0.5">
            <span className="font-bold text-white">AA-05 (2.3 km)</span>
            <span className="text-red-400 font-bold">45 bbl/hr Loss</span>
          </div>
        </div>
        <div className="bg-oil-navy-950 p-2.5 rounded-lg border border-oil-navy-800">
          <span className="text-slate-500 text-[10px] block">Offset Analog #2:</span>
          <div className="flex justify-between font-mono mt-0.5">
            <span className="font-bold text-white">AA-09 (3.1 km)</span>
            <span className="text-amber-400 font-bold">28 bbl Drop</span>
          </div>
        </div>
        <div className="bg-oil-navy-950 p-2.5 rounded-lg border border-oil-navy-800">
          <span className="text-slate-500 text-[10px] block">Validated Mitigation:</span>
          <div className="truncate font-mono text-emerald-400 font-bold mt-0.5">
            CaCO3 LCM Pill (40 ppb)
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-oil-navy-800">
        <span className="text-[11px] text-slate-400 font-mono">
          Advisory: Prepare 40 bbl LCM pill on surface before 2460 m.
        </span>

        <button
          onClick={onOpenExplainableModal}
          className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg shadow-red-950"
        >
          <span>Examine Explainable Evidence & Mitigation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
