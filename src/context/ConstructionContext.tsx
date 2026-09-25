import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConstructionSite, DailyReport, SitePhoto } from '../types';
import { INITIAL_SITES } from '../data/initialData';

interface ConstructionContextType {
  sites: ConstructionSite[];
  selectedSiteId: string;
  selectedSite: ConstructionSite;
  activeView: 'desktop' | 'mobile' | 'split';
  setActiveView: (view: 'desktop' | 'mobile' | 'split') => void;
  selectSite: (siteId: string) => void;
  toggleCheckIn: (siteId: string) => void;
  toggleTask: (siteId: string, taskId: string) => void;
  addPhotoUpdate: (
    siteId: string,
    update: { photoUrl: string; note: string; probleme?: string }
  ) => void;
  submitDailyReport: (siteId: string, report: Omit<DailyReport, 'submitted' | 'submittedAt'>) => void;
  resetDemoData: () => void;
  liveSyncNotification: { title: string; subtitle: string; time: string } | null;
  dismissNotification: () => void;
}

const STORAGE_KEY = 'santier_demo_data_v1';

const ConstructionContext = createContext<ConstructionContextType | undefined>(undefined);

function getCurrentTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
}

export const ConstructionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ConstructionSite[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_SITES;
  });

  const [selectedSiteId, setSelectedSiteId] = useState<string>('brasov-rezidential');
  const [activeView, setActiveView] = useState<'desktop' | 'mobile' | 'split'>('desktop');
  const [liveSyncNotification, setLiveSyncNotification] = useState<{
    title: string;
    subtitle: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
    } catch {
      // storage limit or disabled
    }
  }, [sites]);

  const showLiveAlert = (title: string, subtitle: string) => {
    const time = getCurrentTimeString();
    setLiveSyncNotification({ title, subtitle, time });
    setTimeout(() => {
      setLiveSyncNotification(prev => (prev?.time === time ? null : prev));
    }, 4500);
  };

  const selectedSite = sites.find(s => s.id === selectedSiteId) || sites[0];

  const selectSite = (siteId: string) => {
    setSelectedSiteId(siteId);
  };

  const toggleCheckIn = (siteId: string) => {
    const nowTime = '07:54'; // Authentic to prompt demo: "Check-in: 07:54" or dynamic
    setSites(prevSites =>
      prevSites.map(site => {
        if (site.id !== siteId) return site;
        const newCheckedIn = !site.isCheckedIn;
        const newStatus = newCheckedIn ? 'pe_santier' : 'in_asteptare';
        const newStatusText = newCheckedIn ? 'Pe șantier' : 'În așteptare';
        const newTime = newCheckedIn ? (site.checkInTime || nowTime) : null;

        const newActivities = [...site.activities];
        if (newCheckedIn) {
          newActivities.unshift({
            id: `act-${Date.now()}`,
            time: newTime || '07:54',
            description: 'Echipa a ajuns pe șantier',
            author: site.responsabil,
            type: 'check_in',
          });
        }

        return {
          ...site,
          isCheckedIn: newCheckedIn,
          status: newStatus,
          statusText: newStatusText,
          checkInTime: newTime,
          ultimaActualizare: getCurrentTimeString(),
          activities: newActivities,
        };
      })
    );

    const site = sites.find(s => s.id === siteId);
    showLiveAlert(
      'Check-in înregistrat',
      `${site?.responsabil || 'Șef de șantier'} a efectuat check-in la ${site?.name || 'șantier'}`
    );
  };

  const toggleTask = (siteId: string, taskId: string) => {
    let taskName = '';
    let isNowCompleted = false;

    setSites(prevSites =>
      prevSites.map(site => {
        if (site.id !== siteId) return site;
        const updatedTasks = site.tasks.map(t => {
          if (t.id === taskId) {
            taskName = t.title;
            isNowCompleted = !t.completed;
            return {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? getCurrentTimeString() : undefined,
            };
          }
          return t;
        });

        const updatedActivities = [...site.activities];
        if (isNowCompleted) {
          updatedActivities.unshift({
            id: `act-${Date.now()}`,
            time: getCurrentTimeString(),
            description: `Sarcină bifată: ${taskName}`,
            author: site.responsabil,
            type: 'task',
          });
        }

        return {
          ...site,
          tasks: updatedTasks,
          ultimaActualizare: getCurrentTimeString(),
          activities: updatedActivities,
        };
      })
    );

    showLiveAlert(
      isNowCompleted ? 'Sarcină finalizată' : 'Sarcină actualizată',
      `"${taskName}" marcată pe ${selectedSite.name}`
    );
  };

  const addPhotoUpdate = (
    siteId: string,
    update: { photoUrl: string; note: string; probleme?: string }
  ) => {
    const time = getCurrentTimeString();
    const site = sites.find(s => s.id === siteId) || selectedSite;

    const newPhoto: SitePhoto = {
      id: `photo-${Date.now()}`,
      url: update.photoUrl,
      time: `Astăzi, ${time}`,
      date: 'Astăzi',
      author: site.responsabil,
      note: update.note,
      isNew: true,
    };

    setSites(prevSites =>
      prevSites.map(s => {
        if (s.id !== siteId) return s;

        const newActivities = [
          {
            id: `act-${Date.now()}`,
            time,
            description: update.probleme
              ? `Actualizare foto și sesizare: "${update.probleme}"`
              : `Fotografie nouă pe șantier: "${update.note}"`,
            author: s.responsabil,
            type: 'photo' as const,
          },
          ...s.activities,
        ];

        // If a problem was reported, update status if appropriate
        const newStatus = update.probleme && update.probleme.trim().length > 0 && update.probleme.toLowerCase() !== 'nu' && !update.probleme.toLowerCase().includes('nu sunt') ? 'problema' : s.status;
        const newStatusText = newStatus === 'problema' ? 'Problemă' : s.statusText;

        return {
          ...s,
          photos: [newPhoto, ...s.photos],
          status: newStatus,
          statusText: newStatusText,
          ultimaActualizare: time,
          activities: newActivities,
        };
      })
    );

    showLiveAlert(
      'Fotografie și actualizare trimisă!',
      `${site.responsabil} a transmis o nouă poză de pe teren (${site.name})`
    );
  };

  const submitDailyReport = (
    siteId: string,
    reportData: Omit<DailyReport, 'submitted' | 'submittedAt'>
  ) => {
    const time = getCurrentTimeString();
    const site = sites.find(s => s.id === siteId) || selectedSite;

    setSites(prevSites =>
      prevSites.map(s => {
        if (s.id !== siteId) return s;
        return {
          ...s,
          ultimaActualizare: time,
          dailyReport: {
            ...reportData,
            submitted: true,
            submittedAt: time,
            author: s.responsabil,
          },
          activities: [
            {
              id: `act-${Date.now()}`,
              time,
              description: 'Raportul zilnic de execuție a fost transmis la birou',
              author: s.responsabil,
              type: 'report' as const,
            },
            ...s.activities,
          ],
        };
      })
    );

    showLiveAlert(
      'Raport zilnic înregistrat',
      `Raportul de la ${site.name} a fost recepționat de biroul central`
    );
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSites(INITIAL_SITES);
    setSelectedSiteId('brasov-rezidential');
    showLiveAlert('Date resetate', 'Scenariul de vânzări a fost reinițializat la starea inițială.');
  };

  return (
    <ConstructionContext.Provider
      value={{
        sites,
        selectedSiteId,
        selectedSite,
        activeView,
        setActiveView,
        selectSite,
        toggleCheckIn,
        toggleTask,
        addPhotoUpdate,
        submitDailyReport,
        resetDemoData,
        liveSyncNotification,
        dismissNotification: () => setLiveSyncNotification(null),
      }}
    >
      {children}
    </ConstructionContext.Provider>
  );
};

export const useConstruction = () => {
  const context = useContext(ConstructionContext);
  if (!context) {
    throw new Error('useConstruction must be used within ConstructionProvider');
  }
  return context;
};
