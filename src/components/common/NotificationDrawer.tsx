import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Bell, AlertTriangle, ShieldCheck, Info, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDrilling } from '../../context/DrillingContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { notifications, markNotificationAsRead } = useDrilling();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-oil-navy-950 border-l border-oil-navy-800 h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-oil-navy-800 flex items-center justify-between bg-oil-navy-900/60">
            <div className="flex items-center gap-2.5">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold text-white tracking-wide">
                OPERATIONAL NOTIFICATIONS
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-oil-navy-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No active notifications
              </div>
            ) : (
              notifications.map((item) => {
                const getIcon = () => {
                  switch (item.type) {
                    case 'critical':
                      return <AlertTriangle className="w-4 h-4 text-red-400" />;
                    case 'warning':
                      return <AlertTriangle className="w-4 h-4 text-amber-400" />;
                    case 'success':
                      return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
                    default:
                      return <Info className="w-4 h-4 text-cyan-400" />;
                  }
                };

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      markNotificationAsRead(item.id);
                      if (item.link) {
                        navigate(item.link);
                        onClose();
                      }
                    }}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all text-xs space-y-1.5 ${
                      !item.read
                        ? 'bg-oil-navy-900/90 border-cyan-500/40 hover:border-cyan-400 shadow-sm'
                        : 'bg-oil-navy-900/40 border-oil-navy-800/80 hover:bg-oil-navy-900 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-200">
                        {getIcon()}
                        <span className="truncate">{item.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{item.timestamp}</span>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {item.message}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-cyan-400 hover:underline">
                        View Details &rarr;
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-oil-navy-800 bg-oil-navy-900/80 text-center">
            <button
              onClick={() => {
                notifications.forEach(n => markNotificationAsRead(n.id));
              }}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Mark all as read
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
