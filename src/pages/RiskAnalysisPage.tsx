import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, ShieldAlert, BarChart3, TrendingUp, 
  Layers, Clock, CheckCircle2, ChevronRight, Compass 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { dataStorage } from '../services/dataStorage';
import { WellEvent, RiskAlert } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { useNavigate } from 'react-router-dom';

export const RiskAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<WellEvent[]>([]);
  const [activeAlert, setActiveAlert] = useState<RiskAlert | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Mud Loss');

  useEffect(() => {
    const load = async () => {
      const evts = await dataStorage.getEvents();
      const alert = await dataStorage.getRiskAlert();
      setEvents(evts);
      setActiveAlert(alert);
    };
    load();
  }, []);

  const riskCategories = [
    { name: 'Mud Loss', count: 4, severity: 'Critical', avgNpt: '12.5 hrs', color: '#EF4444' },
    { name: 'Stuck Pipe', count: 2, severity: 'High', avgNpt: '26.0 hrs', color: '#F97316' },
    { name: 'Kick / Gas Show', count: 1, severity: 'High', avgNpt: '8.0 hrs', color: '#F59E0B' },
    { name: 'Torque Spike', count: 3, severity: 'Medium', avgNpt: '3.5 hrs', color: '#38BDF8' },
    { name: 'Wellbore Instability', count: 2, severity: 'Medium', avgNpt: '7.0 hrs', color: '#A855F7' },
    { name: 'Cementing Issue', count: 1, severity: 'Low', avgNpt: '4.0 hrs', color: '#10B981' },
  ];

  // Depth risk curve data: Depth vs Historical Risk Probability (%)
  const depthRiskCurve = [
    { depth: '1800m', riskScore: 15, event: 'Normal Drilling', formation: 'Tipam' },
    { depth: '2000m', riskScore: 22, event: 'Tight Hole Cavings', formation: 'Tipam' },
    { depth: '2200m', riskScore: 35, event: 'Shale Microfracture', formation: 'Girujan Clay' },
    { depth: '2400m', riskScore: 58, event: 'Pre-Loss Seepage', formation: 'Upper Sandstone' },
    { depth: '2420m', riskScore: 84, event: 'Severe Loss Zone Peak', formation: 'Upper Sandstone (Trouble Zone)' },
    { depth: '2450m', riskScore: 82, event: 'Active Well Depth', formation: 'Upper Sandstone (Current)' },
    { depth: '2480m', riskScore: 78, event: 'Loss Zone Base', formation: 'Upper Sandstone' },
    { depth: '2600m', riskScore: 45, event: 'Casing Seat', formation: 'Upper Sandstone' },
    { depth: '2800m', riskScore: 62, event: 'Barail Gas Interval', formation: 'Barail Coal' },
    { depth: '3000m', riskScore: 40, event: 'TD Section', formation: 'Barail Sand' },
  ];

  const categoryDistribution = [
    { name: 'Mud Loss', value: 45, color: '#EF4444' },
    { name: 'Stuck Pipe', value: 25, color: '#F97316' },
    { name: 'Torque Spike', value: 15, color: '#38BDF8' },
    { name: 'Wellbore Instability', value: 10, color: '#A855F7' },
    { name: 'Kick / Gas', value: 5, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span>Multi-Category Risk Analytics & Depth Hazard Modeling</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Empirical historical failure modeling across Upper Sandstone, Barail, and Tipam formations.
          </p>
        </div>

        <button
          onClick={() => navigate('/operations')}
          className="px-4 py-2 bg-oil-navy-800 hover:bg-oil-navy-700 text-cyan-300 border border-oil-navy-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Operations Board</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {riskCategories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all text-xs space-y-1 ${
                isSelected
                  ? 'bg-oil-navy-900 border-cyan-400 shadow-md shadow-cyan-950/40'
                  : 'bg-oil-navy-950/80 border-oil-navy-800 hover:border-oil-navy-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white truncate">{cat.name}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              </div>
              <div className="text-slate-400 text-[11px] font-mono">
                {cat.count} Events • Avg {cat.avgNpt}
              </div>
              <div className="pt-1">
                <RiskBadge severity={cat.severity} size="sm" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Depth Risk Probability Curve (Area Chart) */}
        <div className="lg:col-span-2 bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Depth-Aware Risk Hazard Profile (0–3200 m)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Multi-offset incident probability curve highlighting 2420–2480 m trouble zone
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
              Peak: 2420–2480m (84%)
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={depthRiskCurve} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="depth" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderColor: '#1E3E62', borderRadius: '8px', fontSize: '11px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="riskScore" 
                  name="Risk Probability (%)" 
                  stroke="#EF4444" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#riskGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Category Distribution (Donut Chart) */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="border-b border-oil-navy-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              NPT Incident Distribution
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Historical failure frequency by classification
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B192C', borderColor: '#1E3E62', borderRadius: '8px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                </div>
                <span className="font-mono font-bold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Incident Precedents Table */}
      <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-oil-navy-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Verified Historical Trouble Zone Precedents (Category: {selectedCategory})
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {events.filter(e => e.eventType.toLowerCase().includes(selectedCategory.toLowerCase())).length} Records Found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-oil-navy-950 text-slate-400 uppercase font-mono border-b border-oil-navy-800">
              <tr>
                <th className="py-3 px-4">Well</th>
                <th className="py-3 px-4">Interval</th>
                <th className="py-3 px-4">Formation</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Recorded Parameters</th>
                <th className="py-3 px-4">Executed Mitigation</th>
                <th className="py-3 px-4">NPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-oil-navy-800/80 text-slate-300">
              {events
                .filter(e => e.eventType.toLowerCase().includes(selectedCategory.toLowerCase()))
                .map((ev) => (
                  <tr key={ev.id} className="hover:bg-oil-navy-800/50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-white">{ev.wellName}</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">{ev.depthStart}–{ev.depthEnd} m</td>
                    <td className="py-3 px-4">{ev.formation}</td>
                    <td className="py-3 px-4"><RiskBadge severity={ev.severity} size="sm" /></td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      MW: {ev.parameters?.mudWeight || '1.20 SG'} | SPP: {ev.parameters?.standpipePressure || '2850 psi'}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-[11px] text-slate-200">
                      {ev.mitigation}
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-400 font-bold">{ev.nptHours} hrs</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
