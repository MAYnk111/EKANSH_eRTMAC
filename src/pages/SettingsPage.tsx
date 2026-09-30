import React, { useState } from 'react';
import { Settings, Database, Cloud, Radio, Sliders, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { getFirebaseProjectInfo } from '../services/firebase';
import { dataStorage } from '../services/dataStorage';
import { useDrilling } from '../context/DrillingContext';

export const SettingsPage: React.FC = () => {
  const { refreshAllData } = useDrilling();
  const projectInfo = getFirebaseProjectInfo();
  const [seeding, setSeeding] = useState<boolean>(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  // Settings states
  const [unitSystem, setUnitSystem] = useState<'metric' | 'field'>('metric');
  const [streamFrequency, setStreamFrequency] = useState<number>(3);
  const [lossThresholdBbl, setLossThresholdBbl] = useState<number>(10);
  const [sppAnomalyPsi, setSppAnomalyPsi] = useState<number>(80);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await dataStorage.seedFirestoreDatabase();
      setSeedResult(res);
      await refreshAllData();
    } catch (err: any) {
      setSeedResult({ success: false, message: err?.message || 'Seeding failed' });
    } finally {
      setSeeding(false);
    }
  };

  const handleResetData = () => {
    dataStorage.resetAllData();
    refreshAllData();
    setSeedResult({
      success: true,
      message: 'Application store reset to default Oil India synthetic dataset.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>Platform Configuration & Firebase Connection</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Telemetry ingestion rates, anomaly sensitivities, unit standards, and database seeding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${projectInfo.isLive ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
          <span className="font-mono text-xs text-slate-300">
            {projectInfo.isLive ? 'Cloud Firestore (Live)' : 'eRTMAC In-Memory + Local Storage Sync'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firebase & Data Seeding Card */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-oil-navy-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Firebase Firestore & Storage Engine
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Production data model with collections: wells, wellEvents, riskAlerts, documents, kanbanCards.
            </p>
          </div>

          <div className="p-3.5 bg-oil-navy-950 rounded-xl border border-oil-navy-800 text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Project ID:</span>
              <span className="text-white font-bold">{projectInfo.projectId}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Auth Domain:</span>
              <span className="text-white truncate max-w-[200px]">{projectInfo.authDomain}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Storage Bucket:</span>
              <span className="text-white truncate max-w-[200px]">{projectInfo.projectId}.appspot.com</span>
            </div>
          </div>

          {seedResult && (
            <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              seedResult.success 
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                : 'bg-red-500/15 border-red-500/40 text-red-300'
            }`}>
              {seedResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{seedResult.message}</span>
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                seeding
                  ? 'bg-oil-navy-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding Firestore...' : 'Seed Synthetic Data to Firestore'}</span>
            </button>

            <button
              onClick={handleResetData}
              className="px-4 py-2.5 rounded-xl bg-oil-navy-950 border border-oil-navy-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Telemetry & Alarm Parameters Card */}
        <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-oil-navy-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              Drilling Telemetry & Alarm Thresholds
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize real-time alert trigger sensitivities for active well AA-12.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Unit System */}
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Standard Drilling Unit System</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`py-2 px-3 rounded-lg border font-mono transition-colors ${
                    unitSystem === 'metric'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-oil-navy-950 border-oil-navy-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Metric (Meters, SG, kPa)
                </button>
                <button
                  onClick={() => setUnitSystem('field')}
                  className={`py-2 px-3 rounded-lg border font-mono transition-colors ${
                    unitSystem === 'field'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-oil-navy-950 border-oil-navy-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Oilfield (Feet, PPG, PSI)
                </button>
              </div>
            </div>

            {/* Standpipe Pressure Drop Threshold */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>SPP Sudden Loss Alarm Threshold:</span>
                <span className="font-mono text-cyan-400 font-bold">-{sppAnomalyPsi} psi</span>
              </div>
              <input
                type="range"
                min="40"
                max="150"
                value={sppAnomalyPsi}
                onChange={e => setSppAnomalyPsi(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Pit Level Drop Sensitivity */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Pit Volume Drop Threshold (Mud Loss):</span>
                <span className="font-mono text-amber-400 font-bold">{lossThresholdBbl} bbl</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={lossThresholdBbl}
                onChange={e => setLossThresholdBbl(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
