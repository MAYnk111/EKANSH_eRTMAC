import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KnowledgeNode, KnowledgeEdge } from '../../types';
import { 
  Share2, ZoomIn, ZoomOut, RotateCcw, Filter, 
  ExternalLink, Layers, CheckCircle, AlertTriangle, FileText 
} from 'lucide-react';

interface KnowledgeGraphVisualizerProps {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export const KnowledgeGraphVisualizer: React.FC<KnowledgeGraphVisualizerProps> = ({
  nodes: initialNodes,
  edges: initialEdges
}) => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(initialNodes[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Compute layout coordinates for nodes in structured enterprise graph
  // Arrangement: Well (Left) -> Formation -> Depth -> Event -> Mitigation -> Outcome (Right)
  const nodePositions: Record<string, { x: number; y: number; color: string }> = {
    'node-well-aa12': { x: 120, y: 150, color: '#00E5FF' },
    'node-well-aa05': { x: 120, y: 320, color: '#3B82F6' },
    'node-formation-upper-sand': { x: 340, y: 230, color: '#8B5CF6' },
    'node-depth-interval': { x: 540, y: 230, color: '#F59E0B' },
    'node-event-mudloss': { x: 740, y: 230, color: '#EF4444' },
    'node-param-mudweight': { x: 740, y: 380, color: '#EC4899' },
    'node-mitigation-lcm': { x: 940, y: 230, color: '#10B981' },
    'node-outcome-recovery': { x: 1140, y: 230, color: '#06B6D4' },
    'node-document-source': { x: 340, y: 400, color: '#64748B' },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const filteredNodes = initialNodes.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  return (
    <div className="bg-oil-navy-950 border border-oil-navy-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
      {/* Control Header */}
      <div className="p-4 bg-oil-navy-900 border-b border-oil-navy-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">
            eRTMAC Drilling Institutional Knowledge Graph
          </span>
          <span className="text-[10px] text-slate-400 font-mono bg-oil-navy-950 px-2 py-0.5 rounded border border-oil-navy-800">
            Ontology: Well &rarr; Formation &rarr; Trouble Zone &rarr; Mitigation
          </span>
        </div>

        {/* Filters & Zoom */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-oil-navy-950 p-1 rounded-lg border border-oil-navy-800">
            {['all', 'well', 'formation', 'event', 'mitigation'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold capitalize transition-colors ${
                  filterType === f
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-oil-navy-950 p-1 rounded-lg border border-oil-navy-800 text-slate-400">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.8))} 
              className="p-1 hover:text-white hover:bg-oil-navy-800 rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.5))} 
              className="p-1 hover:text-white hover:bg-oil-navy-800 rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={resetView} 
              className="p-1 hover:text-white hover:bg-oil-navy-800 rounded"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Area + Details Inspector */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Interactive Canvas */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex-1 h-full cursor-grab active:cursor-grabbing overflow-hidden bg-radial from-oil-navy-900/40 to-oil-navy-950 select-none relative"
        >
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #00E5FF 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          <svg
            className="w-full h-full"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="28"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#38BDF8" opacity="0.7" />
              </marker>
            </defs>

            {/* Render Edges */}
            {initialEdges.map((edge) => {
              const srcPos = nodePositions[edge.source];
              const tgtPos = nodePositions[edge.target];
              if (!srcPos || !tgtPos) return null;

              const isHighlighted = 
                selectedNode?.id === edge.source || selectedNode?.id === edge.target;

              return (
                <g key={edge.id}>
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={isHighlighted ? '#00E5FF' : '#1E3E62'}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    strokeDasharray={edge.label.includes('Similarity') ? '5,5' : 'none'}
                    markerEnd="url(#arrowhead)"
                    className="transition-colors duration-300"
                  />
                  {/* Edge label pill */}
                  <text
                    x={(srcPos.x + tgtPos.x) / 2}
                    y={(srcPos.y + tgtPos.y) / 2 - 8}
                    fill="#94A3B8"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none bg-oil-navy-950"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 300, y: 300, color: '#3B82F6' };
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNode(node);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Glow ring if selected */}
                  {isSelected && (
                    <circle
                      r="32"
                      fill="none"
                      stroke={pos.color}
                      strokeWidth="2.5"
                      strokeDasharray="4, 4"
                      className="animate-spin-slow"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    r="24"
                    fill="#0B192C"
                    stroke={pos.color}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-transform duration-200 group-hover:scale-110"
                    filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.6))"
                  />

                  {/* Icon or Type label */}
                  <text
                    y="3"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                    className="select-none pointer-events-none"
                  >
                    {node.type.substring(0, 3).toUpperCase()}
                  </text>

                  {/* Node Label Below */}
                  <text
                    y="38"
                    textAnchor="middle"
                    fill={isSelected ? '#00E5FF' : '#E2E8F0'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="select-none pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="w-80 border-l border-oil-navy-800 bg-oil-navy-900/90 p-5 overflow-y-auto space-y-4 shrink-0">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {selectedNode.category}
                </span>
                <h3 className="text-base font-bold text-white mt-2">
                  {selectedNode.details.title}
                </h3>
                {selectedNode.details.subtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedNode.details.subtitle}
                  </p>
                )}
              </div>

              <div className="p-3 bg-oil-navy-950 rounded-xl border border-oil-navy-800 text-xs text-slate-300 leading-relaxed">
                {selectedNode.details.description}
              </div>

              {selectedNode.details.metrics && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Parameters & Verification:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(selectedNode.details.metrics).map(([k, v]) => (
                      <div key={k} className="p-2 rounded-lg bg-oil-navy-950 border border-oil-navy-800">
                        <span className="text-slate-500 text-[10px] block truncate">{k}</span>
                        <span className="font-mono font-bold text-slate-200 mt-0.5 block truncate">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.details.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedNode.details.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-oil-navy-800 text-slate-300 border border-oil-navy-700">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Click any node in the graph to inspect drilling ontology relations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
