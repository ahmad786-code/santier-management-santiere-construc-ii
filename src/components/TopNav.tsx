import React from 'react';
import { useConstruction } from '../context/ConstructionContext';
import { Monitor, Smartphone, Columns2, RotateCcw } from 'lucide-react';

export const TopNav: React.FC = () => {
  const { activeView, setActiveView, resetDemoData } = useConstruction();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-md bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm tracking-tighter shadow-xs">
            ȘT
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Șantier
          </span>
        </div>

        {/* Zone 2: Clean Segmented View Switcher */}
        <nav className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveView('desktop')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-amber-600" />
            <span>Panou Birou</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('mobile')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600" />
            <span>Aplicație Mobilă</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('split')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
              activeView === 'split'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Afișează biroul și mobilul în paralel pentru demonstrații"
          >
            <Columns2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Demonstrație Live</span>
            <span className="sm:hidden">Split</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={resetDemoData}
            title="Reinițializează datele demonstrative"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Reset demo</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-none">Andrei V.</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-none">Director Proiecte</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
