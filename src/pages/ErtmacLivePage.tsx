import React from 'react';
import { 
  Radio, Play, Pause, FastForward, Activity, AlertTriangle, 
  Gauge, Droplets, Flame, RefreshCw, Clock 
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area 
} from 'recharts';
import { useDrilling } from '../context/DrillingContext';
import { RiskBadge } from '../components/common/RiskBadge';

export const ErtmacLivePage: React.FC = () => {
  const { 
    activeWell, telemetry, telemetryHistory, isStreaming, toggleStreaming, advanceDrillingDepth 
  } = useDrilling();

  const parameterGauges = [
    { label: 'Bit Depth', value: `${telemetry.depth.toFixed(1)} m`, sub: 'Current Penetration', status: 'optimal', color: '#00E5FF' },
    { label: 'ROP (Penetration)', value: `${telemetry.rop} m/hr`, sub: 'Target 12-16 m/hr', status: 'optimal', color: '#10B981' },
    { label: 'WOB (Weight on Bit)', value: `${telemetry.wob} kN`, sub: 'Safe: 130-160 kN', status: 'optimal', color: '#38BDF8' },
    { label: 'Top Drive RPM', value: `${telemetry.rpm}`, sub: 'Continuous Rotation', status: 'optimal', color: '#818CF8' },
    { label: 'Torque', value: `${telemetry.torque} kNm`, sub: 'Critical > 18 kNm', status: 'warning', color: '#F59E0B' },
    { label: 'Mud Flow Rate', value: `${telemetry.flowRate} L/min`, sub: 'ECD Driver', status: 'optimal', color: '#06B6D4' },
    { label: 'Active Mud Weight', value: `${telemetry.mudWeight} SG`, sub: 'Threshold 1.16 SG', status: 'warning', color: '#F97316' },
    { label: 'Standpipe Pressure', value: `${telemetry.standpipePressure} psi`, sub: 'Loss indicator: -80 psi', status: 'warning', color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-oil-navy-900 via-oil-navy-900 to-oil-navy-950 p-6 rounded-2xl border border-oil-navy-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isStreaming ? 'bg-cyan-400 opacity-75' : 'bg-amber-400 opacity-75'}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isStreaming ? 'bg-cyan-400' : 'bg-amber-400'}`} />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              OIL INDIA LIMITED • eRTMAC REAL-TIME STREAMING TELEMETRY
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1.5 flex items-center gap-3">
            <span>Rig 09 Stream — Well {activeWell?.name || 'AA-12'}</span>
            <RiskBadge severity="ELEVATED RISK" size="sm" showPulse />
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Streaming WITSML / OPC-UA parameters at 1.0 Hz with real-time offset hazard cross-correlation.
          </p>
        </div>

        {/* Streaming Controls */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
            SIMULATED eRTMAC STREAM
          </span>

          <button
            onClick={() => advanceDrillingDepth(3)}
            className="px-3.5 py-2 rounded-xl bg-oil-navy-950 border border-oil-navy-700 text-slate-300 hover:text-white hover:border-cyan-500 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step +3m</span>
          </button>

          <button
            onClick={toggleStreaming}
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isStreaming
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isStreaming ? 'Streaming Live' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Live 8 Parameter Telemetry Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {parameterGauges.map((g, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              g.status === 'warning'
                ? 'bg-amber-950/20 border-amber-500/30 shadow-md'
                : 'bg-oil-navy-900/80 border-oil-navy-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{g.label}</span>
              {g.status === 'warning' && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-1.5" style={{ color: g.color }}>
              {g.value}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              {g.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Streaming Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Standpipe Pressure & Torque */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Standpipe Pressure (SPP) vs Top Drive Torque
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Surge/swab micro-fluctuations matching AA-05 pre-loss signature
              </p>
            </div>
            <span className="font-mono text-xs text-cyan-400 font-bold">1 Hz Live</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderColor: '#1E3E62', borderRadius: '8px', fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="standpipePressure" 
                  name="Pressure (psi)" 
                  stroke="#00E5FF" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="torque" 
                  name="Torque (kNm)" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Rate of Penetration & Weight on Bit */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                Rate of Penetration (ROP) vs Weight on Bit (WOB)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Mechanical specific energy (MSE) drilling efficiency tracking
              </p>
            </div>
            <span className="font-mono text-xs text-emerald-400 font-bold">Optimal MSE</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryHistory} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ropGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="timestamp" stroke="#64748B" fontSize={10} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderColor: '#1E3E62', borderRadius: '8px', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="rop" 
                  name="ROP (m/hr)" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#ropGrad)" 
                  isAnimationActive={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
