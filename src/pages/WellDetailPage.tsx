import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Drill, Layers, AlertTriangle, Clock, ArrowLeft, 
  ShieldCheck, FileText, CheckCircle2, Compass, Share2 
} from 'lucide-react';
import { dataStorage } from '../services/dataStorage';
import { Well, WellEvent } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { SimilarityBreakdown } from '../components/common/SimilarityBreakdown';

export const WellDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [well, setWell] = useState<Well | null>(null);
  const [events, setEvents] = useState<WellEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const targetId = id || 'well-aa-12';
      const w = await dataStorage.getWellById(targetId);
      if (w) {
        setWell(w);
        const evts = await dataStorage.getEventsByWell(w.id);
        setEvents(evts);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400 text-sm">
        Loading stratigraphic well profile...
      </div>
    );
  }

  if (!well) {
    return (
      <div className="text-center py-20 space-y-3">
        <h2 className="text-xl font-bold text-white">Well Not Found</h2>
        <button
          onClick={() => navigate('/wells')}
          className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs"
        >
          Return to Well Explorer
        </button>
      </div>
    );
  }

  const lithologyLayers = [
    { name: 'Alluvium & Upper Tipam', start: 0, end: 1200, type: 'Sand/Shale', color: 'bg-amber-900/40 border-amber-700/50' },
    { name: 'Lower Tipam Sandstone', start: 1200, end: 2100, type: 'Coarse Sandstone', color: 'bg-yellow-900/40 border-yellow-700/50' },
    { name: 'Girujan Clay / Siltstone', start: 2100, end: 2420, type: 'Impermeable Clay', color: 'bg-stone-800/80 border-stone-700' },
    { name: 'Upper Sandstone (Trouble Interval)', start: 2420, end: 2600, type: 'Porous Sandstone', color: 'bg-red-950/60 border-red-500/70', alert: true },
    { name: 'Barail Coal-Shale Group', start: 2600, end: 3200, type: 'Coal & Interbedded Shales', color: 'bg-slate-900 border-slate-700' }
  ];

  return (
    <div className="space-y-6">
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/knowledge-graph')}
            className="px-3.5 py-1.5 rounded-lg bg-oil-navy-900 border border-oil-navy-700 hover:border-cyan-400 text-xs text-cyan-300 font-semibold flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>View in Knowledge Graph</span>
          </button>
        </div>
      </div>

      {/* Well Header Card */}
      <div className="bg-gradient-to-r from-oil-navy-900 via-oil-navy-900 to-oil-navy-950 p-6 rounded-2xl border border-oil-navy-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white font-mono">WELL {well.name}</h1>
              <span className="text-xs px-2.5 py-1 rounded-full uppercase font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {well.status}
              </span>
              <span className="text-xs text-slate-400 font-mono bg-oil-navy-950 px-2 py-0.5 rounded border border-oil-navy-800">
                {well.asset} • {well.field}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Rig: <strong className="text-slate-200">{well.rigName}</strong> • Spud: <strong className="text-slate-200">{well.spudDate}</strong> • Operator: {well.operator}
            </p>
          </div>

          {well.similarityScore && (
            <div className="bg-oil-navy-950 p-3 rounded-xl border border-oil-navy-800 text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Contextual Similarity</span>
              <span className="font-mono text-2xl font-black text-cyan-400">{well.similarityScore}%</span>
            </div>
          )}
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-2 text-xs">
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">Total Depth</span>
            <span className="font-mono font-bold text-white text-base mt-0.5 block">{well.totalDepth} m</span>
          </div>
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">Target Formation</span>
            <span className="font-mono font-bold text-cyan-400 text-base mt-0.5 block truncate">{well.formation}</span>
          </div>
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">Trajectory</span>
            <span className="font-mono font-bold text-white text-base mt-0.5 block">{well.trajectory}</span>
          </div>
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">BHA Type</span>
            <span className="font-mono text-slate-200 text-xs mt-0.5 block truncate">{well.bhaType}</span>
          </div>
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">Mud System</span>
            <span className="font-mono text-slate-200 text-xs mt-0.5 block truncate">{well.mudType}</span>
          </div>
          <div className="p-3 bg-oil-navy-950/80 rounded-xl border border-oil-navy-800">
            <span className="text-slate-500 text-[10px] block">Total Recorded NPT</span>
            <span className="font-mono font-bold text-amber-400 text-base mt-0.5 block">{well.nptTotalHours} hrs</span>
          </div>
        </div>
      </div>

      {/* Lithology & Historical Events Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Stratigraphic Column */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Lithology & Depth Stratigraphy
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Total: {well.totalDepth}m</span>
          </div>

          <div className="space-y-2 text-xs">
            {lithologyLayers.map((layer, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex flex-col justify-between ${layer.color}`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-white">{layer.name}</span>
                  <span className="font-mono text-cyan-300">{layer.start}–{layer.end} m</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>{layer.type}</span>
                  {layer.alert && (
                    <span className="text-red-400 font-bold flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3.5 h-3.5" /> High Risk Zone
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Historical Drilling Events for this well */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Historical Incident & Trouble Memory ({events.length} Events)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified operational events, loss zones, and executed mitigations.
                </p>
              </div>
            </div>

            {events.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No recorded operational failure incidents for this well.
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 bg-oil-navy-950 rounded-xl border border-oil-navy-800 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RiskBadge severity={ev.severity} size="sm" />
                        <span className="font-mono font-bold text-white text-sm">{ev.eventType}</span>
                        <span className="text-slate-400 font-mono">
                          ({ev.depthStart}–{ev.depthEnd} m)
                        </span>
                      </div>
                      <span className="font-mono text-amber-400 font-bold">
                        {ev.nptHours} hrs NPT
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {ev.description}
                    </p>

                    {/* Parameters */}
                    {ev.parameters && (
                      <div className="bg-oil-navy-900/70 p-2.5 rounded-lg border border-oil-navy-800/80 flex flex-wrap gap-4 text-[11px] font-mono text-slate-300">
                        {Object.entries(ev.parameters).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-slate-500 mr-1">{k}:</span>
                            <span className="text-white font-bold">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mitigation applied */}
                    <div className="bg-cyan-950/20 border border-cyan-800/40 p-3 rounded-lg text-slate-200">
                      <strong className="text-cyan-400 block mb-0.5">Applied Mitigation Protocol:</strong>
                      <p>{ev.mitigation}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Outcome: {ev.outcome}
                      </span>
                      <span className="font-mono text-slate-500">Source: {ev.sourceDocName || 'DDR Archival'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Similarity to active well AA-12 if offset */}
          {well.name !== 'AA-12' && well.similarityBreakdown && (
            <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                Contextual Similarity Matrix to Active Well AA-12:
              </h4>
              <SimilarityBreakdown
                score={well.similarityScore || 85}
                breakdown={well.similarityBreakdown}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
