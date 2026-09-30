import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, 
  ExternalLink, FileText, Compass, X, ArrowRight, Layers 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RiskAlert } from '../../types';
import { RiskBadge } from './RiskBadge';

interface ExplainableAlertModalProps {
  alert: RiskAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onMoveToKanban?: () => void;
}

export const ExplainableAlertModal: React.FC<ExplainableAlertModalProps> = ({
  alert,
  isOpen,
  onClose,
  onMoveToKanban
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'why' | 'evidence' | 'action'>('why');

  if (!isOpen || !alert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-oil-navy-900 border border-oil-navy-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-oil-navy-800 bg-gradient-to-r from-red-950/40 via-oil-navy-900 to-oil-navy-900 flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <RiskBadge severity={alert.riskLevel} size="md" showPulse />
                  <span className="text-xs font-mono text-slate-400">Target Well: {alert.wellName}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  Historical Trouble Zone Approaching: {alert.troubleZoneStart}–{alert.troubleZoneEnd} m
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-oil-navy-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Confidence banner */}
          <div className="px-6 py-3 bg-oil-navy-950/60 border-b border-oil-navy-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">System Confidence:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{alert.confidence}%</span>
              <span className="text-slate-500">| Multi-Offset Geological Convergence</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-slate-400">
              <span>Current Depth: <strong className="text-cyan-400">{alert.currentDepth} m</strong></span>
              <span>• Trouble Interval: <strong className="text-amber-400">{alert.troubleZoneStart}–{alert.troubleZoneEnd} m</strong></span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-oil-navy-800 bg-oil-navy-900/90 px-6">
            <button
              onClick={() => setActiveTab('why')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'why'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>WHY THIS ALERT?</span>
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'evidence'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>HISTORICAL EVIDENCE ({alert.historicalEvidence.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('action')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'action'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>RECOMMENDED ACTION</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {activeTab === 'why' && (
              <div className="space-y-3.5">
                <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Deterministic Grounding Factors:
                </div>
                <div className="space-y-2.5">
                  {alert.whyAlert.map((reason, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="bg-oil-navy-950/70 border border-oil-navy-800 rounded-xl p-3.5 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{reason}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'evidence' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Verified archival drilling events within 5 km proximity matching identical stratigraphy:
                </p>
                {alert.historicalEvidence.map((ev, i) => (
                  <div key={i} className="bg-oil-navy-950/80 border border-oil-navy-800 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-base">{ev.wellName}</span>
                        <span className="text-xs px-2 py-0.5 bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded">
                          {ev.formation}
                        </span>
                        <span className="text-xs font-mono text-amber-400">
                          Depth: {ev.depthRange}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        Similarity: {ev.similarity}%
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-red-400 flex items-center gap-2">
                      <span>Event: {ev.event}</span>
                    </div>

                    <p className="text-xs text-slate-300 bg-oil-navy-900/90 p-2.5 rounded border border-oil-navy-800">
                      <strong className="text-slate-400">Mitigation Used:</strong> {ev.mitigationUsed}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Outcome: {ev.outcome}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">Source: {ev.sourceDoc}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'action' && (
              <div className="space-y-4">
                <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-xl p-5 space-y-3">
                  <div className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    Recommended Operational Procedure:
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {alert.recommendedAction}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-oil-navy-950/60 border border-oil-navy-800 rounded-lg p-3 text-xs">
                    <span className="font-bold text-slate-300 block mb-1">Pre-Job Rig Check:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>Inspect shear pumps & mud hopper availability</li>
                      <li>Confirm 40 bbl CaCO3 LCM stock on site</li>
                      <li>Review trip tank zeroing protocols</li>
                    </ul>
                  </div>
                  <div className="bg-oil-navy-950/60 border border-oil-navy-800 rounded-lg p-3 text-xs">
                    <span className="font-bold text-slate-300 block mb-1">Telemetry Thresholds:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400">
                      <li>Alarm if SPP drops &gt; 80 psi within 2 mins</li>
                      <li>Alarm if pit level drops &gt; 5 bbl</li>
                      <li>Throttle flow rate to &le; 2100 L/min</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer action buttons */}
          <div className="p-4 border-t border-oil-navy-800 bg-oil-navy-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  navigate('/nearby-map');
                }}
                className="px-3.5 py-2 rounded-lg bg-oil-navy-800 hover:bg-oil-navy-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                View Similar Wells
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/reports');
                }}
                className="px-3.5 py-2 rounded-lg bg-oil-navy-800 hover:bg-oil-navy-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                View Historical Report
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/knowledge-graph');
                }}
                className="px-3.5 py-2 rounded-lg bg-oil-navy-800 hover:bg-oil-navy-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-4 h-4 text-purple-400" />
                View Knowledge Graph
              </button>
            </div>

            <div className="flex items-center gap-2">
              {onMoveToKanban && (
                <button
                  onClick={() => {
                    onMoveToKanban();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  Move Risk to Operations Board
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Acknowledge Alert
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
