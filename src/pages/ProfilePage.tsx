import React from 'react';
import { User, Shield, Building, Mail, Clock, Key, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const ProfilePage: React.FC = () => {
  const { currentUser, switchRole, logout } = useAuth();

  const roles: { role: UserRole; desc: string; perms: string[] }[] = [
    {
      role: 'Drilling Engineer',
      desc: 'Operational field leader executing real-time drilling programs, ECD checks, and LCM pill spot procedures.',
      perms: ['Read all offset data', 'Acknowledge alerts', 'Log operational trouble cards', 'Simulate telemetry']
    },
    {
      role: 'eRTMAC Operator',
      desc: 'Real-time telemetry specialist monitoring high-frequency WITSML / OPC-UA parameters at 1.0 Hz.',
      perms: ['Read all telemetry', 'Trigger manual risk zones', 'Upload DDR & Mud logs', 'Acknowledge alarms']
    },
    {
      role: 'Operations Manager',
      desc: 'Drilling management authority overseeing multi-rig NPT mitigation and budget compliance.',
      perms: ['Full read/write permissions', 'Approve mitigation protocols', 'Re-seed Firestore database', 'Manage board']
    },
    {
      role: 'OIL Management',
      desc: 'Executive stakeholder reviewing basin-wide drilling efficiency, historical learning curves, and asset ROI.',
      perms: ['Executive summary view', 'Cross-asset analytics export', 'Institutional memory audit']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-oil-navy-900 via-oil-navy-900 to-oil-navy-950 p-6 rounded-2xl border border-oil-navy-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-black text-2xl shadow-lg border border-cyan-400/50">
            {currentUser?.displayName?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{currentUser?.displayName}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {currentUser?.role}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {currentUser?.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {currentUser?.organization}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 text-xs font-bold transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Role Switcher & Operational Privileges */}
      <div className="bg-oil-navy-900/90 border border-oil-navy-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Switch Operational Role (Demo Persona Simulator)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test how eRTMAC NWIS permissions and perspectives adapt for different Oil India personas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {roles.map((r) => {
            const isCurrent = currentUser?.role === r.role;
            return (
              <div
                key={r.role}
                onClick={() => switchRole(r.role)}
                className={`p-4 rounded-xl border cursor-pointer transition-all text-xs space-y-2.5 ${
                  isCurrent
                    ? 'bg-oil-navy-950 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                    : 'bg-oil-navy-950/60 border-oil-navy-800 hover:border-oil-navy-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{r.role}</span>
                  {isCurrent ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold">
                      ACTIVE PERSONA
                    </span>
                  ) : (
                    <span className="text-[10px] text-cyan-400 hover:underline">
                      Switch to Role &rarr;
                    </span>
                  )}
                </div>

                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {r.desc}
                </p>

                <div className="space-y-1 pt-1 border-t border-oil-navy-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                    Granted Permissions:
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                    {r.perms.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
