import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentRecord } from '../../types';
import { X, FileText, CheckCircle2, AlertTriangle, Layers, Download, ExternalLink } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

interface DocumentViewerModalProps {
  document: DocumentRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  isOpen,
  onClose
}) => {
  if (!isOpen || !document) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-oil-navy-900 border border-oil-navy-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-oil-navy-800 bg-oil-navy-950/70 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {document.documentType}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {document.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-mono">
                  <span>Well: <strong className="text-slate-200">{document.wellName}</strong></span>
                  <span>• Date: {document.date}</span>
                  <span>• Size: {document.fileSize}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-oil-navy-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
            {/* Extracted Drilling Intelligence Card */}
            <div className="bg-oil-navy-950 rounded-xl p-4 border border-oil-navy-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-oil-navy-800">
                <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Extracted Drilling Intelligence:
                </span>
                {document.extractedData.severity && (
                  <RiskBadge severity={document.extractedData.severity} size="sm" />
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-oil-navy-900/80 p-2.5 rounded-lg border border-oil-navy-800">
                  <span className="text-slate-500 text-[10px] block">Depth Interval:</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">
                    {document.extractedData.depthInterval || 'N/A'}
                  </span>
                </div>
                <div className="bg-oil-navy-900/80 p-2.5 rounded-lg border border-oil-navy-800">
                  <span className="text-slate-500 text-[10px] block">Formation:</span>
                  <span className="font-mono font-bold text-slate-200 text-sm">
                    {document.extractedData.formation || 'N/A'}
                  </span>
                </div>
                <div className="bg-oil-navy-900/80 p-2.5 rounded-lg border border-oil-navy-800">
                  <span className="text-slate-500 text-[10px] block">Entities Parsed:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    {document.extractedData.entitiesCount || 18} Nodes
                  </span>
                </div>
              </div>

              {/* Detected Events */}
              {document.extractedData.detectedEvents && (
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold">Incident Flags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {document.extractedData.detectedEvents.map((ev, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-mono text-[11px]">
                        {ev}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Parameters */}
              {document.extractedData.parameters && (
                <div>
                  <span className="text-slate-400 block mb-1 font-semibold">Recorded Telemetry Parameters:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(document.extractedData.parameters).map(([k, v]) => (
                      <div key={k} className="p-2 bg-oil-navy-900/60 rounded border border-oil-navy-800">
                        <span className="text-[10px] text-slate-500 block truncate">{k}</span>
                        <span className="font-mono font-bold text-slate-200">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mitigation & Outcome */}
              {document.extractedData.mitigationApplied && (
                <div className="bg-oil-navy-900 p-3 rounded-lg border border-oil-navy-800 space-y-1">
                  <strong className="text-cyan-400 block">Mitigation Applied:</strong>
                  <p className="text-slate-300 leading-relaxed">
                    {document.extractedData.mitigationApplied}
                  </p>
                </div>
              )}

              {document.extractedData.outcome && (
                <div className="flex items-center gap-2 text-emerald-400 pt-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span><strong>Outcome:</strong> {document.extractedData.outcome}</span>
                </div>
              )}
            </div>

            {/* Source Citations & Audit Trail */}
            {document.extractedData.citations && (
              <div className="space-y-2">
                <span className="font-bold text-slate-300 text-xs block">
                  Explainable OCR Citations & Source Text Excerpts:
                </span>
                <div className="space-y-1.5">
                  {document.extractedData.citations.map((cite, i) => (
                    <div key={i} className="p-2.5 bg-oil-navy-950 rounded-lg border border-oil-navy-800 font-mono text-[11px] text-slate-300">
                      {cite}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-oil-navy-800 bg-oil-navy-950 flex items-center justify-between">
            <span className="text-slate-500 text-[11px] font-mono">
              Archival Record ID: {document.id}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-oil-navy-800 hover:bg-oil-navy-700 text-slate-300 text-xs font-semibold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
