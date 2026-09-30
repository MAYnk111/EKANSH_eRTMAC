import React, { useState } from 'react';
import { Bell, AlertTriangle, ShieldCheck, Info, Check, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDrilling } from '../context/DrillingContext';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead } = useDrilling();
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter(n => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'critical') return n.type === 'critical';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-oil-navy-900/60 p-6 rounded-2xl border border-oil-navy-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-white flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-cyan-400" />
            <span>Operational Alerts & Notification Log</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry threshold triggers, offset danger zone warnings, and workflow updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['all', 'unread', 'critical'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterType === f
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-oil-navy-950 text-slate-400 hover:text-white border border-oil-navy-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-oil-navy-900/60 p-12 rounded-2xl border border-oil-navy-800 text-center text-slate-500 text-xs">
            No notifications in this filter category.
          </div>
        ) : (
          filtered.map((item) => {
            const getIcon = () => {
              switch (item.type) {
                case 'critical':
                  return <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />;
                case 'warning':
                  return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
                case 'success':
                  return <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />;
                default:
                  return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
              }
            };

            return (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationAsRead(item.id);
                  if (item.link) navigate(item.link);
                }}
                className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start justify-between gap-4 text-xs ${
                  !item.read
                    ? 'bg-oil-navy-900/90 border-cyan-500/50 shadow-md'
                    : 'bg-oil-navy-950/60 border-oil-navy-800 text-slate-400 hover:bg-oil-navy-900'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">{getIcon()}</div>
                  <div className="space-y-1">
                    <div className="font-bold text-slate-100 text-sm">
                      {item.title}
                    </div>
                    <p className="text-slate-300 leading-relaxed max-w-3xl">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
                      <span>{item.timestamp}</span>
                      {item.link && (
                        <span className="text-cyan-400 hover:underline">
                          Inspect in System &rarr;
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!item.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
