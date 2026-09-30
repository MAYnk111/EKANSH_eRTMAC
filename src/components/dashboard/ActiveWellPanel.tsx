import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Gauge, Wind, FastForward, Play, Pause, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDrilling } from '../../context/DrillingContext';
import { RiskBadge } from '../common/RiskBadge';

export const ActiveWellPanel: React.FC = () => {
  const navigate = useNavigate();
  const { 
    activeWell, telemetry, isStreaming, toggleStreaming, advanceDrillingDepth 
  } = useDrilling();

  if (!activeWell) return null;

  const progressPercent = Math.min(
    Math.round((telemetry.depth / activeWell.totalDepth) * 100), 
    100
  );

  const telemetryParams = [
    { label: 'ROP', value: `${telemetry.rop} m/hr`, desc: 'Rate of Penetration', status: 'optimal' },
    { label: 'WOB', value: `${telemetry.wob} kN`, desc: 'Weight on Bit', status: 'optimal' },
    { label: 'RPM', value: `${telemetry.rpm}`, desc: 'Rotary Speed', status: 'optimal' },
    { label: 'Torque', value: `${telemetry.torque} kNm`, desc: 'Top Drive Torque', status: 'warning' },
    { label: 'Flow Rate', value: `${telemetry.flowRate} L/min`, desc: 'Mud Flow In', status: 'optimal' },
    { label: 'Mud Weight', value: `${telemetry.mudWeight} SG`, desc: 'Active Pit Density', status: 'warning' },
    { label: 'Standpipe Press.', value: `${telemetry.standpipePressure} psi`, desc: 'Circulating SPP', status: 'warning' },
    { label: 'Gas Units', value: `${telemetry.gasUnits} u`, desc: 'Mud Logging Gas', status: 'optimal' },
  ];

  return (
    <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-5">
      {/* Top Banner */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-oil-navy-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white font-mono tracking-tight">
              WELL {activeWell.name}
            </h2>
            <RiskBadge severity="ELEVATED RISK" size="sm" showPulse />
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
              {activeWell.asset}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Rig: <strong className="text-slate-200">{activeWell.rigName}</strong> • Target Formation: <strong className="text-cyan-400">{activeWell.formation}</strong>
          </p>
        </div>

        {/* Depth & Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => advanceDrillingDepth(2)}
            className="px-3 py-1.5 rounded-lg bg-oil-navy-950 border border-oil-navy-700 text-slate-300 hover:text-white hover:border-cyan-500 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Simulate drilling ahead +2 meters"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>Drill +2m</span>
          </button>

          <button
            onClick={toggleStreaming}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isStreaming
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isStreaming ? 'Stream Active' : 'Resume'}</span>
          </button>

          <button
            onClick={() => navigate('/ertmac-live')}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <span>Live Stream</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Depth Progress Bar */}
      <div className="bg-oil-navy-950 p-4 rounded-xl border border-oil-navy-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Depth:</span>
            <span className="text-xl font-bold text-cyan-400">
              {telemetry.depth.toFixed(1)} m
            </span>
            <span className="text-slate-500">/ {activeWell.totalDepth} m Planned TD</span>
          </div>
          <span className="text-slate-400 font-bold">{progressPercent}% Profile Complete</span>
        </div>

        <div className="w-full bg-oil-navy-900 rounded-full h-2.5 overflow-hidden border border-oil-navy-800 relative">
          {/* Depth progress */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
          {/* Trouble zone marker at 2420 - 2480m (approx 75% to 78%) */}
          <div
            className="absolute top-0 bottom-0 bg-red-500/60 border-x border-red-400"
            style={{ left: '75%', width: '3%' }}
            title="Trouble Zone: 2420–2480m"
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-0.5">
          <span>Spud: {activeWell.spudDate}</span>
          <span className="text-amber-400 font-semibold">Approaching Trouble Zone: 2420–2480 m</span>
          <span>Target TD: {activeWell.totalDepth} m</span>
        </div>
      </div>

      {/* Live Drilling Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {telemetryParams.map((p, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border transition-all ${
              p.status === 'warning'
                ? 'bg-amber-950/20 border-amber-500/30'
                : 'bg-oil-navy-950/70 border-oil-navy-800'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{p.label}</span>
              {p.status === 'warning' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              {p.value}
            </div>
            <div className="text-[10px] text-slate-500 truncate mt-0.5">
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
