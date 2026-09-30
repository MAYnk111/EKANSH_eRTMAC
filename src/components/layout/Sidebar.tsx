import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Search, Compass, Share2, 
  AlertTriangle, FileText, Radio, Kanban, 
  Bot, Bell, User, Settings, ShieldCheck, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useDrilling } from '../../context/DrillingContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { unreadNotificationsCount } = useDrilling();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Well Explorer', path: '/wells', icon: Search },
    { label: 'Nearby Wells Map', path: '/nearby-map', icon: Compass },
    { label: 'Knowledge Graph', path: '/knowledge-graph', icon: Share2 },
    { label: 'Risk Analysis', path: '/risk-analysis', icon: AlertTriangle, badge: 'Active' },
    { label: 'Reports / OCR', path: '/reports', icon: FileText },
    { label: 'eRTMAC Live', path: '/ertmac-live', icon: Radio, pulse: true },
    { label: 'Operations Board', path: '/operations', icon: Kanban },
    { label: 'AI Assistant', path: '/ai-assistant', icon: Bot },
    { 
      label: 'Notifications', 
      path: '/notifications', 
      icon: Bell, 
      count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined 
    },
    { label: 'User Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-oil-navy-950 border-r border-oil-navy-800 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-oil-navy-800/80 bg-oil-navy-900/60">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* OIL Logo Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-cyan-900/40 border border-cyan-400/40">
            <span className="tracking-tighter text-sm font-mono">OIL</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white tracking-wider text-sm flex items-center gap-1.5">
                eRTMAC <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">NWIS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Nearby Wells Intelligence</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-oil-navy-800 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-oil-navy-900/80'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                {item.pulse && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                )}
              </div>

              {!collapsed && <span className="truncate">{item.label}</span>}

              {!collapsed && item.badge && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-mono">
                  {item.badge}
                </span>
              )}

              {!collapsed && item.count !== undefined && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold">
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* System Status Footer */}
      <div className="p-3 border-t border-oil-navy-800/80 bg-oil-navy-950">
        {!collapsed ? (
          <div className="bg-oil-navy-900/80 rounded-xl p-3 border border-oil-navy-800 text-[11px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                OIL Telemetry Grid
              </span>
              <span className="font-mono text-emerald-400 font-bold">CONNECTED</span>
            </div>
            <p className="text-[10px] text-slate-500">Asset: Assam / Nahorkatiya Basin</p>
          </div>
        ) : (
          <div className="flex justify-center" title="Telemetry Grid Connected">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
    </aside>
  );
};
