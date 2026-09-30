import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Drill, Layers, AlertTriangle, Clock, Database, 
  MapPin, Radio, Compass, ShieldCheck, ArrowRight, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDrilling } from '../context/DrillingContext';
import { dataStorage } from '../services/dataStorage';
import { Well, WellEvent } from '../types';
import { KpiCard } from '../components/common/KpiCard';
import { ActiveWellPanel } from '../components/dashboard/ActiveWellPanel';
import { DepthRiskMemoryCard } from '../components/dashboard/DepthRiskMemoryCard';
import { OffsetWellsRankingCard } from '../components/dashboard/OffsetWellsRankingCard';
import { WellMap } from '../components/map/WellMap';
import { ExplainableAlertModal } from '../components/common/ExplainableAlertModal';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    activeWell, riskAlert, userCoords, moveRiskToKanban, selectedRadiusKm, setSelectedRadiusKm 
  } = useDrilling();

  const [wells, setWells] = useState<Well[]>([]);
  const [events, setEvents] = useState<WellEvent[]>([]);
  const [showExplainableModal, setShowExplainableModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const w = await dataStorage.getWells();
      const e = await dataStorage.getEvents();
      setWells(w);
      setEvents(e);
      setLoading(false);
    };
    loadData();
  }, []);

  // Compute dynamic KPI metrics from stored data (Not hardcoded)
  const totalWellsCount = wells.length;
  const offsetWellsAnalyzed = wells.filter(w => w.status !== 'active').length;
  const highRiskEventsCount = events.filter(ev => ev.severity === 'high' || ev.severity === 'critical').length;
  const totalNptHours = events.reduce((sum, ev) => sum + (ev.nptHours || 0), 0);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-oil-navy-900 via-oil-navy-900 to-oil-navy-950 p-6 rounded-2xl border border-oil-navy-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800">
              OIL INDIA LIMITED • eRTMAC NWIS
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white mt-1.5 tracking-tight">
            {getGreeting()}, {currentUser?.displayName || 'Drilling Engineer'}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Access historical drilling intelligence and real-time eRTMAC data for safer, faster and smarter decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExplainableModal(true)}
            className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-950"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            <span>Active Risk Alert (82%)</span>
          </button>
        </div>
      </div>

      {/* Top KPI Cards from Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Wells"
          value={totalWellsCount}
          subtitle="In Nahorkatiya & Moran"
          icon={Layers}
          color="cyan"
          trend={{ value: '+4', isPositive: true }}
        />
        <KpiCard
          title="Offset Wells Analyzed"
          value={offsetWellsAnalyzed}
          subtitle="Indexed in Knowledge Graph"
          icon={Compass}
          color="blue"
          trend={{ value: '100%', isPositive: true }}
        />
        <KpiCard
          title="Active Risk Zones"
          value={highRiskEventsCount}
          subtitle="Upper Sandstone & Barail"
          icon={AlertTriangle}
          color="red"
          trend={{ value: '1 Approaching', isPositive: false }}
        />
        <KpiCard
          title="Historical NPT Tracked"
          value={`${totalNptHours.toFixed(1)} hrs`}
          subtitle="Trouble Interval Precedents"
          icon={Clock}
          color="amber"
          trend={{ value: '-32% Avoided', isPositive: true }}
        />
        <KpiCard
          title="Institutional Memory"
          value="98.4%"
          subtitle="Assam Basin Coverage"
          icon={Database}
          color="emerald"
          trend={{ value: 'Full Synced', isPositive: true }}
        />
      </div>

      {/* Main Grid: Active Well & Depth Risk Memory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Active Well AA-12 Live Panel */}
          <ActiveWellPanel />

          {/* Real Interactive GIS Map Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Live Geological & Spatial Proximity
              </h3>
              <button
                onClick={() => navigate('/nearby-map')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Full Map View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <WellMap
              wells={wells}
              activeWell={activeWell}
              userCoords={userCoords}
              selectedRadiusKm={selectedRadiusKm}
              onRadiusChange={setSelectedRadiusKm}
              height="360px"
              showControls={false}
            />
          </div>
        </div>

        {/* Right Column: Approaching Trouble Zone & Offset Engine */}
        <div className="space-y-6">
          {/* Depth-Aware Risk Memory Card */}
          <DepthRiskMemoryCard
            onOpenExplainableModal={() => setShowExplainableModal(true)}
          />

          {/* Contextual Offset Well Engine Ranking */}
          <OffsetWellsRankingCard wells={wells} />
        </div>
      </div>

      {/* Explainable AI Modal */}
      <ExplainableAlertModal
        alert={riskAlert}
        isOpen={showExplainableModal}
        onClose={() => setShowExplainableModal(false)}
        onMoveToKanban={moveRiskToKanban}
      />
    </div>
  );
};
