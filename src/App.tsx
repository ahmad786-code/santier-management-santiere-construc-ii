import React from 'react';
import { ConstructionProvider, useConstruction } from './context/ConstructionContext';
import { TopNav } from './components/TopNav';
import { OfficeDashboard } from './components/OfficeDashboard';
import { SupervisorMobileApp } from './components/SupervisorMobileApp';
import { SplitDemoView } from './components/SplitDemoView';
import { LiveToast } from './components/LiveToast';

const MainContent: React.FC = () => {
  const { activeView } = useConstruction();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
      {activeView === 'desktop' && <OfficeDashboard />}
      {activeView === 'mobile' && <SupervisorMobileApp asStandalone={true} />}
      {activeView === 'split' && <SplitDemoView />}
    </main>
  );
};

export default function App() {
  return (
    <ConstructionProvider>
      <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-900">
        <TopNav />
        <MainContent />
        <LiveToast />

        <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <strong>Șantier</strong> · Concept MVP pentru companii de construcții din România
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              Fără ERP stufos · Fără mesaje WhatsApp pierdute · Doar control de execuție
            </span>
          </div>
        </footer>
      </div>
    </ConstructionProvider>
  );
}
