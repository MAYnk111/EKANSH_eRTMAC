import React, { useState, useEffect } from 'react';
import { Share2, Info, Layers, Compass, BookOpen } from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { KnowledgeNode, KnowledgeEdge } from '../types';
import { KnowledgeGraphVisualizer } from '../components/graph/KnowledgeGraphVisualizer';

export const KnowledgeGraphPage: React.FC = () => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);

  useEffect(() => {
    const graphData = dataStorage.getKnowledgeGraph();
    setNodes(graphData.nodes);
    setEdges(graphData.edges);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800 space-y-2">
        <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
          <Share2 className="w-6 h-6 text-cyan-400" />
          <span>Interactive Drilling Knowledge Graph & Institutional Memory</span>
        </h1>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Traverse connected drilling ontology from <strong>Wells &rarr; Formations &rarr; Trouble Depth Intervals &rarr; Incidents &rarr; Mitigations &rarr; Validated Outcomes</strong>. Click any node to inspect operational parameters.
        </p>
      </div>

      {/* Visualizer Component */}
      <KnowledgeGraphVisualizer nodes={nodes} edges={edges} />

      {/* Ontology explanation legend */}
      <div className="bg-oil-navy-900/70 p-5 rounded-2xl border border-oil-navy-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-cyan-500/30">
          <span className="font-mono text-cyan-400 font-bold block mb-1">WELL</span>
          <span className="text-slate-400 text-[11px]">Active & offset wellbore entities</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-purple-500/30">
          <span className="font-mono text-purple-400 font-bold block mb-1">FORMATION</span>
          <span className="text-slate-400 text-[11px]">Upper Sandstone, Barail, Tipam</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-amber-500/30">
          <span className="font-mono text-amber-400 font-bold block mb-1">DEPTH</span>
          <span className="text-slate-400 text-[11px]">2420–2480 m target window</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-red-500/30">
          <span className="font-mono text-red-400 font-bold block mb-1">EVENT</span>
          <span className="text-slate-400 text-[11px]">Total/Partial Mud Loss & Kick</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-pink-500/30">
          <span className="font-mono text-pink-400 font-bold block mb-1">PARAMETER</span>
          <span className="text-slate-400 text-[11px]">Mud Weight 1.18+ SG, Flow Rate</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-emerald-500/30">
          <span className="font-mono text-emerald-400 font-bold block mb-1">MITIGATION</span>
          <span className="text-slate-400 text-[11px]">CaCO3 LCM Pill & ECD control</span>
        </div>
        <div className="p-3 bg-oil-navy-950 rounded-xl border border-blue-500/30">
          <span className="font-mono text-blue-400 font-bold block mb-1">DOCUMENT</span>
          <span className="text-slate-400 text-[11px]">DDR #24, WCR & Mud Logs</span>
        </div>
      </div>
    </div>
  );
};
