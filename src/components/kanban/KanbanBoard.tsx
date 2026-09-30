import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  KanbanCard, KanbanColumnId, EventSeverity 
} from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { 
  Plus, MoreVertical, Clock, User, ArrowRight, 
  CheckCircle, AlertTriangle, ShieldCheck, ChevronRight, Filter 
} from 'lucide-react';

interface KanbanBoardProps {
  cards: KanbanCard[];
  onUpdateColumn: (cardId: string, newCol: KanbanColumnId) => void;
  onAddCard?: (card: Partial<KanbanCard>) => void;
}

const COLUMNS: { id: KanbanColumnId; label: string; color: string; badgeBg: string }[] = [
  { id: 'detected', label: '1. Detected', color: 'border-blue-500/40', badgeBg: 'bg-blue-500/10 text-blue-400' },
  { id: 'investigating', label: '2. Investigating', color: 'border-purple-500/40', badgeBg: 'bg-purple-500/10 text-purple-400' },
  { id: 'action_required', label: '3. Action Required', color: 'border-red-500/40', badgeBg: 'bg-red-500/10 text-red-400' },
  { id: 'monitoring', label: '4. Monitoring', color: 'border-amber-500/40', badgeBg: 'bg-amber-500/10 text-amber-400' },
  { id: 'resolved', label: '5. Resolved', color: 'border-emerald-500/40', badgeBg: 'bg-emerald-500/10 text-emerald-400' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  cards,
  onUpdateColumn,
  onAddCard
}) => {
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newWell, setNewWell] = useState('AA-12');
  const [newDepth, setNewDepth] = useState('2450 m');
  const [newSeverity, setNewSeverity] = useState<EventSeverity>('high');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    if (onAddCard) {
      onAddCard({
        id: `card-${Date.now()}`,
        columnId: 'detected',
        risk: newTitle,
        well: newWell,
        depth: newDepth,
        severity: newSeverity,
        confidence: 85,
        assignedEngineer: 'B. Borah (Drilling Lead)',
        timestamp: 'Just now',
        description: `Operational risk alert logged for Well ${newWell} at depth ${newDepth}.`,
        evidenceCount: 3,
        recommendedAction: 'Verify active pit levels and circulate bottoms-up.',
        tags: ['New Alert', 'Operator Logged']
      });
    }
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-oil-navy-900/60 p-4 rounded-xl border border-oil-navy-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Rig Operations & Risk Workflow Board</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Live eRTMAC Coordination
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track, verify, and resolve depth-triggered drilling trouble zone events.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-950"
        >
          <Plus className="w-4 h-4" />
          Log Operational Risk
        </button>
      </div>

      {/* 5 Column Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colCards = cards.filter(c => c.columnId === col.id);

          return (
            <div
              key={col.id}
              className={`bg-oil-navy-950/90 border rounded-xl flex flex-col min-w-[260px] h-[650px] shadow-lg ${col.color}`}
            >
              {/* Column Header */}
              <div className="p-3 border-b border-oil-navy-800 flex items-center justify-between bg-oil-navy-900/50 rounded-t-xl">
                <span className="font-semibold text-xs text-slate-200">
                  {col.label}
                </span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${col.badgeBg}`}>
                  {colCards.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {colCards.length === 0 ? (
                  <div className="text-center py-10 text-[11px] text-slate-600 border border-dashed border-oil-navy-800/80 rounded-lg">
                    No active risks
                  </div>
                ) : (
                  colCards.map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      whileHover={{ scale: 1.02 }}
                      className="bg-oil-navy-900/90 border border-oil-navy-700/80 hover:border-cyan-500/50 rounded-xl p-3.5 shadow-md cursor-pointer space-y-2.5 transition-all text-xs"
                      onClick={() => setSelectedCard(card)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <RiskBadge severity={card.severity} size="sm" />
                        <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                          {card.confidence}% Conf.
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-xs leading-snug line-clamp-2">
                        {card.risk}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="text-slate-200 font-bold">{card.well}</span>
                        <span>{card.depth}</span>
                      </div>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {card.description}
                      </p>

                      <div className="pt-2 border-t border-oil-navy-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <div className="flex items-center gap-1 truncate max-w-[120px]">
                          <User className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{card.assignedEngineer}</span>
                        </div>
                        <span>{card.timestamp}</span>
                      </div>

                      {/* Quick Move dropdown / button */}
                      <div className="pt-2 flex items-center gap-1.5 justify-end">
                        <select
                          value={card.columnId}
                          onChange={(e) => {
                            e.stopPropagation();
                            onUpdateColumn(card.id, e.target.value as KanbanColumnId);
                          }}
                          className="bg-oil-navy-950 text-slate-300 border border-oil-navy-700 text-[10px] rounded px-1.5 py-0.5 outline-none hover:border-cyan-500 cursor-pointer"
                        >
                          {COLUMNS.map(c => (
                            <option key={c.id} value={c.id}>Move: {c.label}</option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-oil-navy-900 border border-oil-navy-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <RiskBadge severity={selectedCard.severity} size="md" />
                <h3 className="text-lg font-bold text-white mt-2">{selectedCard.risk}</h3>
                <span className="text-xs font-mono text-cyan-400">
                  Target: {selectedCard.well} | Interval: {selectedCard.depth}
                </span>
              </div>
              <button 
                onClick={() => setSelectedCard(null)} 
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-oil-navy-950 p-4 rounded-xl border border-oil-navy-800 text-xs text-slate-300 space-y-2">
              <strong className="text-slate-200 block">Incident Narrative:</strong>
              <p>{selectedCard.description}</p>
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800/40 p-4 rounded-xl text-xs text-cyan-200 space-y-1">
              <strong className="text-cyan-400 block">Action Protocol:</strong>
              <p>{selectedCard.recommendedAction}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-oil-navy-800">
              <span>Assigned: <strong className="text-white">{selectedCard.assignedEngineer}</strong></span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const nextColMap: Record<KanbanColumnId, KanbanColumnId> = {
                      detected: 'investigating',
                      investigating: 'action_required',
                      action_required: 'monitoring',
                      monitoring: 'resolved',
                      resolved: 'resolved'
                    };
                    onUpdateColumn(selectedCard.id, nextColMap[selectedCard.columnId]);
                    setSelectedCard(null);
                  }}
                  className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1"
                >
                  Advance Stage &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <form onSubmit={handleAddSubmit} className="bg-oil-navy-900 border border-oil-navy-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Log Operational Risk Card</h3>
            <div>
              <label className="text-slate-400 block mb-1">Risk Title / Incident</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Total Mud Loss at 2450m"
                className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Target Well</label>
                <input
                  type="text"
                  value={newWell}
                  onChange={e => setNewWell(e.target.value)}
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Depth Window</label>
                <input
                  type="text"
                  value={newDepth}
                  onChange={e => setNewDepth(e.target.value)}
                  className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Severity</label>
              <select
                value={newSeverity}
                onChange={e => setNewSeverity(e.target.value as EventSeverity)}
                className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-lg p-2.5 text-white outline-none focus:border-cyan-400"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-oil-navy-800 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
              >
                Create Card
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
