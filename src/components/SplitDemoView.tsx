import React from 'react';
import { OfficeDashboard } from './OfficeDashboard';
import { SupervisorMobileApp } from './SupervisorMobileApp';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const SplitDemoView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Demo helper banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-100 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-amber-500 text-slate-950 rounded-md shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Flux demonstrativ de vânzări (Live Sync)
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Apasă pe mobil (în dreapta) pentru <strong>Check-in</strong>, <strong>Bifează sarcini</strong> sau <strong>Adaugă actualizare</strong> — biroul (în stânga) se actualizează instantaneu fără apeluri sau WhatsApp!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sincronizare activă în timp real</span>
          </div>
        </div>
      </div>

      {/* Side-by-side presentation */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Side: Office Desktop Dashboard */}
        <div className="xl:col-span-8 bg-slate-50/50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              1. Birou Central — Desktop (Andrei)
            </span>
            <span className="text-xs font-mono text-emerald-700 font-semibold">
              ● Conectat la șantiere
            </span>
          </div>
          <OfficeDashboard compact={true} />
        </div>

        {/* Right Side: Supervisor Phone */}
        <div className="xl:col-span-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-200 px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              2. Șantier Brașov — Mobil (Mihai)
            </span>
            <span className="text-xs font-mono text-amber-700 font-semibold flex items-center gap-1">
              <span>Telefon șef șantier</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <SupervisorMobileApp />
        </div>
      </div>
    </div>
  );
};
