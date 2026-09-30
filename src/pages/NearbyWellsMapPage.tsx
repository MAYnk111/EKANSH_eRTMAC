import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Layers, AlertTriangle, ShieldCheck, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dataStorage } from '../services/dataStorage';
import { Well } from '../types';
import { useDrilling } from '../context/DrillingContext';
import { WellMap } from '../components/map/WellMap';
import { SimilarityBreakdown } from '../components/common/SimilarityBreakdown';

export const NearbyWellsMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeWell, userCoords, selectedRadiusKm, setSelectedRadiusKm } = useDrilling();
  const [wells, setWells] = useState<Well[]>([]);
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await dataStorage.getWells();
      setWells(data);
      setSelectedWell(data.find(w => w.name === 'AA-05') || data[1]);
    };
    load();
  }, []);

  const nearbyWellsWithinRadius = wells
    .filter(w => (w.distanceFromActive || 0) <= selectedRadiusKm)
    .sort((a, b) => (a.distanceFromActive || 0) - (b.distanceFromActive || 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-cyan-400" />
            <span>Nearby Wells Spatial & Stratigraphic Intelligence Map</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real geographic GIS mapping of active and offset wells within Nahorkatiya & Moran blocks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs bg-oil-navy-950 px-3 py-1.5 rounded-lg border border-oil-navy-800 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{userCoords?.label || 'Assam Asset Control Center'}</span>
          </div>
        </div>
      </div>

      {/* Main Map + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real Leaflet Map */}
        <div className="lg:col-span-2">
          <WellMap
            wells={wells}
            activeWell={activeWell}
            userCoords={userCoords}
            selectedRadiusKm={selectedRadiusKm}
            onRadiusChange={setSelectedRadiusKm}
            height="640px"
            showControls={true}
          />
        </div>

        {/* Selected Well Inspector / Proximity List */}
        <div className="space-y-4">
          {/* Selected Well Card */}
          {selectedWell && (
            <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-start justify-between border-b border-oil-navy-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    Selected Offset Analog
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Well {selectedWell.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedWell.field} ({selectedWell.distanceFromActive} km away)
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-400 text-base">
                    {selectedWell.similarityScore}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">Similarity</span>
                </div>
              </div>

              {/* Contextual Breakdown */}
              <SimilarityBreakdown
                score={selectedWell.similarityScore || 80}
                breakdown={selectedWell.similarityBreakdown}
              />

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Target Formation:</span>
                  <strong className="text-slate-200">{selectedWell.formation}</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Total Depth:</span>
                  <span className="font-mono text-slate-200">{selectedWell.totalDepth} m</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Rig / Spud:</span>
                  <span className="text-slate-200">{selectedWell.rigName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Historical NPT:</span>
                  <span className="font-mono text-amber-400 font-bold">{selectedWell.nptTotalHours} hrs</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/wells/${selectedWell.id}`)}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-cyan-950"
              >
                <Eye className="w-4 h-4" />
                <span>Open Complete Stratigraphic Profile</span>
              </button>
            </div>
          )}

          {/* List of wells within radius */}
          <div className="bg-oil-navy-900/70 border border-oil-navy-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Wells within {selectedRadiusKm}km Radius</span>
              <span className="font-mono text-cyan-400">{nearbyWellsWithinRadius.length} wells</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto">
              {nearbyWellsWithinRadius.map(w => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWell(w)}
                  className={`cursor-pointer p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                    selectedWell?.id === w.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                      : 'bg-oil-navy-950 border-oil-navy-800 hover:border-oil-navy-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{w.name}</span>
                    <span className="text-[11px] text-slate-400">({w.formation})</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    {w.distanceFromActive} km
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
