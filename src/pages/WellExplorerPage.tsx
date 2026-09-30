import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Layers, Compass, Eye, ShieldCheck, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { Well } from '../types';
import { SimilarityBreakdown } from '../components/common/SimilarityBreakdown';
import { RiskBadge } from '../components/common/RiskBadge';

export const WellExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [wells, setWells] = useState<Well[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormation, setSelectedFormation] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minSimilarity, setMinSimilarity] = useState<number>(60);
  const [sortBy, setSortBy] = useState<'similarity' | 'distance' | 'depth'>('similarity');

  useEffect(() => {
    const load = async () => {
      const data = await dataStorage.getWells();
      setWells(data);
    };
    load();
  }, []);

  // Filter wells
  const filteredWells = wells
    .filter(w => {
      const matchesSearch = 
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.formation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.rigName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFormation = 
        selectedFormation === 'all' || w.formation.toLowerCase().includes(selectedFormation.toLowerCase());

      const matchesStatus = 
        selectedStatus === 'all' || w.status === selectedStatus;

      const matchesSim = (w.similarityScore || 0) >= minSimilarity;

      return matchesSearch && matchesFormation && matchesStatus && matchesSim;
    })
    .sort((a, b) => {
      if (sortBy === 'similarity') return (b.similarityScore || 0) - (a.similarityScore || 0);
      if (sortBy === 'distance') return (a.distanceFromActive || 0) - (b.distanceFromActive || 0);
      return b.totalDepth - a.totalDepth;
    });

  const formations = Array.from(new Set(wells.map(w => w.formation)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <Search className="w-6 h-6 text-cyan-400" />
            <span>Well Explorer & Stratigraphic Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Searchable institutional repository of completed and active offset wells across Assam Asset.
          </p>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-oil-navy-950 px-3 py-1.5 rounded-lg border border-oil-navy-800">
          Total Wells Indexed: <strong className="text-cyan-400">{wells.length}</strong>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-oil-navy-900/80 p-4 rounded-xl border border-oil-navy-800 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by well name (e.g. AA-05), formation, field, or rig..."
              className="w-full bg-oil-navy-950 border border-oil-navy-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Formation Filter */}
          <select
            value={selectedFormation}
            onChange={(e) => setSelectedFormation(e.target.value)}
            className="bg-oil-navy-950 border border-oil-navy-700 text-slate-300 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-cyan-400"
          >
            <option value="all">All Formations</option>
            {formations.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-oil-navy-950 border border-oil-navy-700 text-slate-300 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-cyan-400 capitalize"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Drilling</option>
            <option value="completed">Completed Wells</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-oil-navy-950 border border-oil-navy-700 text-slate-300 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-cyan-400 font-mono"
          >
            <option value="similarity">Sort: Contextual Similarity</option>
            <option value="distance">Sort: Distance (Nearest)</option>
            <option value="depth">Sort: Total Depth</option>
          </select>
        </div>

        {/* Min similarity slider */}
        <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
          <span>Min Contextual Similarity:</span>
          <input
            type="range"
            min="50"
            max="95"
            value={minSimilarity}
            onChange={(e) => setMinSimilarity(Number(e.target.value))}
            className="accent-cyan-400 w-36"
          />
          <span className="font-mono text-cyan-400 font-bold">{minSimilarity}%</span>
        </div>
      </div>

      {/* Wells Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWells.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-slate-500 text-xs">
            No wells matched your search criteria.
          </div>
        ) : (
          filteredWells.map((well) => {
            const hasLoss = well.name === 'AA-05' || well.name === 'AA-09' || well.name === 'AA-03';
            const isActive = well.status === 'active';

            return (
              <div
                key={well.id}
                className="bg-oil-navy-900/90 border border-oil-navy-700/80 hover:border-cyan-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xl font-bold text-white">{well.name}</span>
                        {isActive ? (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                            OFFSET
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 mt-0.5 block">
                        {well.field} • {well.asset}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-cyan-400 text-base">
                        {well.similarityScore || 70}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">Match</span>
                    </div>
                  </div>

                  <div className="mt-3.5 space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-oil-navy-800/80 text-slate-400">
                      <span>Formation:</span>
                      <strong className="text-slate-200">{well.formation}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-oil-navy-800/80 text-slate-400">
                      <span>Total Depth:</span>
                      <span className="font-mono text-slate-200">{well.totalDepth} m</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-oil-navy-800/80 text-slate-400">
                      <span>Distance to Active:</span>
                      <span className="font-mono text-cyan-400">{well.distanceFromActive} km</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-oil-navy-800/80 text-slate-400">
                      <span>Historical NPT:</span>
                      <span className="font-mono text-amber-400 font-semibold">{well.nptTotalHours} hrs</span>
                    </div>
                  </div>

                  {hasLoss && (
                    <div className="mt-3 p-2 bg-red-950/40 border border-red-500/30 rounded-lg text-[11px] text-red-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Trouble Zone: Mud Loss recorded at 2420–2480m</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate(`/wells/${well.id}`)}
                    className="w-full py-2 rounded-xl bg-oil-navy-950 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-oil-navy-700 hover:border-cyan-500 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Complete Well Profile</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
