import React, { useState } from 'react';
import { 
  Bell, MapPin, Radio, Shield, User, LogOut, 
  ChevronDown, Search, Activity, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDrilling } from '../../context/DrillingContext';
import { UserRole } from '../../types';

interface TopbarProps {
  onOpenNotifications: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenNotifications }) => {
  const navigate = useNavigate();
  const { currentUser, logout, switchRole } = useAuth();
  const { 
    activeWell, telemetry, isStreaming, toggleStreaming, 
    unreadNotificationsCount, userCoords 
  } = useDrilling();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roles: UserRole[] = [
    'Drilling Engineer',
    'eRTMAC Operator',
    'Operations Manager',
    'OIL Management'
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-oil-navy-950/90 backdrop-blur-md border-b border-oil-navy-800/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left: Active Well telemetry pill & Geolocation */}
      <div className="flex items-center gap-3">
        {/* Active Well Status Pill */}
        <div 
          onClick={() => navigate('/wells/well-aa-12')}
          className="cursor-pointer group flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-oil-navy-900 border border-cyan-500/30 hover:border-cyan-500 transition-all shadow-sm"
        >
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-xs font-bold text-white font-mono">
              ACTIVE WELL: {activeWell?.name || 'AA-12'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300 font-mono border-l border-oil-navy-700 pl-2">
            <span>{telemetry.depth.toFixed(1)} m</span>
            <span className="text-cyan-400 font-bold">({activeWell?.formation || 'Upper Sandstone'})</span>
          </div>
        </div>

        {/* Real Geolocation status */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-oil-navy-900/60 px-3 py-1.5 rounded-lg border border-oil-navy-800">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="truncate max-w-[200px]">
            {userCoords?.label || 'Assam Asset (Nahorkatiya)'}
          </span>
        </div>

        {/* Synthetic Demo Data Disclaimer Pill */}
        <span className="hidden xl:inline-flex text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/50">
          Simulated OIL eRTMAC Stream
        </span>
      </div>

      {/* Right: Telemetry toggle, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Live Streaming Toggle */}
        <button
          onClick={toggleStreaming}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isStreaming
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
          }`}
          title={isStreaming ? "Telemetry streaming is LIVE" : "Telemetry is PAUSED"}
        >
          <Radio className={`w-3.5 h-3.5 ${isStreaming ? 'animate-pulse text-emerald-400' : 'text-amber-400'}`} />
          <span className="hidden sm:inline font-mono">{isStreaming ? 'STREAMING' : 'PAUSED'}</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-oil-navy-900 transition-colors border border-transparent hover:border-oil-navy-700"
          title="Notification Center"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-md shadow-red-950">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-oil-navy-900 border border-oil-navy-700 hover:border-cyan-500/50 transition-all text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
              {currentUser?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="hidden lg:block text-xs leading-none">
              <div className="font-semibold text-white truncate max-w-[120px]">
                {currentUser?.displayName || 'Bhaskar Borah'}
              </div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                {currentUser?.role || 'Drilling Engineer'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* User Menu Modal / Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-oil-navy-900 border border-oil-navy-700 rounded-xl shadow-2xl p-2 z-50 text-xs">
              <div className="p-2.5 border-b border-oil-navy-800">
                <div className="font-bold text-white">{currentUser?.displayName}</div>
                <div className="text-[11px] text-slate-400 truncate">{currentUser?.email}</div>
                <div className="text-[10px] text-cyan-300 font-mono mt-1">{currentUser?.organization}</div>
              </div>

              {/* Role Switcher for quick evaluator demo */}
              <div className="py-2 border-b border-oil-navy-800">
                <span className="px-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Operational Role:
                </span>
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setUserMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      currentUser?.role === r 
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold' 
                        : 'text-slate-300 hover:bg-oil-navy-800'
                    }`}
                  >
                    <span>{r}</span>
                    {currentUser?.role === r && <Shield className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>

              <div className="pt-1.5">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-oil-navy-800 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  View Profile & Permissions
                </button>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center gap-2 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
