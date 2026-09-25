import React from 'react';
import { useConstruction } from '../context/ConstructionContext';
import { Bell, X } from 'lucide-react';

export const LiveToast: React.FC = () => {
  const { liveSyncNotification, dismissNotification } = useConstruction();

  if (!liveSyncNotification) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-3 transition-all animate-bounce-short"
    >
      <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
        <Bell className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white tracking-tight">
            {liveSyncNotification.title}
          </p>
          <span className="text-[10px] font-mono text-slate-400">
            {liveSyncNotification.time}
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-0.5 leading-snug">
          {liveSyncNotification.subtitle}
        </p>
      </div>

      <button
        type="button"
        onClick={dismissNotification}
        className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
        aria-label="Închide notificare"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
