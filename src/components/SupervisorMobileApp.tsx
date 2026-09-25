import React, { useState } from 'react';
import { useConstruction } from '../context/ConstructionContext';
import { SAMPLE_PHOTOS } from '../data/initialData';
import {
  CheckCircle2,
  Circle,
  Plus,
  Camera,
  ArrowLeft,
  Upload,
  Check,
  MapPin,
  Clock,
  Sparkles,
  Wifi,
  BatteryMedium,
  Send,
} from 'lucide-react';

interface SupervisorMobileAppProps {
  asStandalone?: boolean;
}

export const SupervisorMobileApp: React.FC<SupervisorMobileAppProps> = ({ asStandalone = false }) => {
  const {
    selectedSite,
    toggleCheckIn,
    toggleTask,
    addPhotoUpdate,
    submitDailyReport,
  } = useConstruction();

  // Screens within the mobile app: 'home' | 'add_update' | 'daily_report'
  const [currentScreen, setCurrentScreen] = useState<'home' | 'add_update' | 'daily_report'>('home');

  // Add Update Form State
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [updateText, setUpdateText] = useState<string>('Lucrările la fundație continuă conform graficului.');
  const [problemText, setProblemText] = useState<string>('');
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  // Daily Report Form State
  const [reportLucrari, setReportLucrari] = useState<string>(
    selectedSite.dailyReport?.lucrariEfectuate || 'Pregătire și cofrare fundație.'
  );
  const [reportMateriale, setReportMateriale] = useState<string>(
    selectedSite.dailyReport?.materialeNecesare || 'Beton programat pentru mâine.'
  );
  const [reportProbleme, setReportProbleme] = useState<string>(
    selectedSite.dailyReport?.probleme || 'Nu sunt probleme.'
  );
  const [reportObservatii, setReportObservatii] = useState<string>(
    selectedSite.dailyReport?.observatii || 'Lucrările sunt conform planului.'
  );
  const [reportSubmittedSuccess, setReportSubmittedSuccess] = useState<boolean>(
    selectedSite.dailyReport?.submitted || false
  );

  const activePhotoUrl = customPhotoUrl || SAMPLE_PHOTOS[selectedPhotoIndex]?.url;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          setCustomPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateText.trim()) return;

    addPhotoUpdate(selectedSite.id, {
      photoUrl: activePhotoUrl,
      note: updateText.trim(),
      probleme: problemText.trim(),
    });

    setUpdateSuccess(true);
    setTimeout(() => {
      setUpdateSuccess(false);
      setCurrentScreen('home');
    }, 1200);
  };

  const handleSendDailyReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitDailyReport(selectedSite.id, {
      lucrariEfectuate: reportLucrari.trim(),
      materialeNecesare: reportMateriale.trim(),
      probleme: reportProbleme.trim(),
      observatii: reportObservatii.trim(),
    });

    setReportSubmittedSuccess(true);
    setTimeout(() => {
      setCurrentScreen('home');
    }, 1500);
  };

  return (
    <div className={`flex justify-center ${asStandalone ? 'py-4 sm:py-8' : ''}`}>
      {/* Mobile Shell / Device Frame */}
      <div className="w-full max-w-[390px] bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-900">
        {/* Device Notch & Status Bar */}
        <div className="bg-slate-950 rounded-[28px] overflow-hidden border border-slate-800 flex flex-col min-h-[680px] max-h-[820px]">
          {/* Phone Status Bar */}
          <div className="px-6 pt-3 pb-1 flex items-center justify-between text-white text-[11px] font-mono tracking-tight select-none">
            <span>07:54</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-300">
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* App Top Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
            {currentScreen === 'home' ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  ȘT
                </div>
                <span className="font-extrabold text-base tracking-tight">Șantier</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentScreen('home')}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-amber-500" />
                <span>Înapoi la șantier</span>
              </button>
            )}

            <div className="text-[11px] font-mono text-slate-400">
              {currentScreen === 'home' && 'Mihai P.'}
              {currentScreen === 'add_update' && 'Actualizare nouă'}
              {currentScreen === 'daily_report' && 'Raport de zi'}
            </div>
          </div>

          {/* Main App Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-900 p-4 space-y-4">
            {/* SCREEN 1: HOME */}
            {currentScreen === 'home' && (
              <div className="space-y-4">
                {/* Greeting & Site Header */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-400">Șef de șantier</span>
                    <span className="text-[11px] font-mono text-slate-400">Teren Brașov</span>
                  </div>

                  <h1 className="text-xl font-bold text-slate-900">
                    Bună dimineața, Mihai
                  </h1>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold">{selectedSite.name}</span>
                  </div>

                  {/* Status Indicator */}
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between mb-3 text-xs">
                    <span className="text-slate-500">Status prezență:</span>
                    {selectedSite.isCheckedIn ? (
                      <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Pe șantier
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-bold text-amber-700">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        În așteptare check-in
                      </span>
                    )}
                  </div>

                  {/* Check-in Button */}
                  <button
                    type="button"
                    onClick={() => toggleCheckIn(selectedSite.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98 ${
                      selectedSite.isCheckedIn
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {selectedSite.isCheckedIn ? 'Check-in efectuat' : 'Check-in'}
                    </span>
                  </button>

                  {/* After check-in note */}
                  {selectedSite.isCheckedIn && (
                    <p className="text-center text-xs font-mono text-emerald-800 mt-2 font-medium">
                      Check-in efectuat la {selectedSite.checkInTime || '07:54'}
                    </p>
                  )}
                </div>

                {/* Today's Tasks */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-slate-900">
                      Sarcinile de astăzi
                    </h2>
                    <span className="text-xs font-mono text-slate-500">
                      {selectedSite.tasks.filter(t => t.completed).length}/{selectedSite.tasks.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedSite.tasks.map(task => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(selectedSite.id, task.id)}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs transition-all cursor-pointer active:bg-slate-100 ${
                          task.completed
                            ? 'bg-emerald-50/50 border-emerald-300 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span>{task.title}</span>
                        </div>
                        {task.completed && (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold">
                            GATA ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Apasă pe o sarcină pentru a o bifa ca finalizată
                  </p>
                </div>

                {/* Primary Action 1: Add Update */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('add_update')}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-98"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>+ Adaugă actualizare</span>
                </button>

                {/* Primary Action 2: Daily Report */}
                <button
                  type="button"
                  onClick={() => setCurrentScreen('daily_report')}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl font-semibold text-xs shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {selectedSite.dailyReport?.submitted
                      ? 'Raport zilnic (Trimis ✓)'
                      : 'Completează Raport zilnic'}
                  </span>
                </button>
              </div>
            )}

            {/* SCREEN 2: ADD UPDATE */}
            {currentScreen === 'add_update' && (
              <form onSubmit={handleSendUpdate} className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Actualizare foto pe șantier
                    </h2>
                    <p className="text-xs text-slate-500">
                      Transmite biroului situația din teren în timp real
                    </p>
                  </div>

                  {/* Section: Fotografie */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Fotografie
                    </label>

                    {/* Preview box */}
                    <div className="relative aspect-4/3 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shadow-2xs mb-2">
                      <img
                        src={activePhotoUrl}
                        alt="Previzualizare fotografie șantier"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 rounded text-[10px] text-white font-mono flex items-center gap-1">
                        <Camera className="w-3 h-3 text-amber-400" />
                        Camera foto șantier
                      </div>
                    </div>

                    {/* Choose between preset authentic site photos or upload custom */}
                    <div className="grid grid-cols-4 gap-1.5 mb-2">
                      {SAMPLE_PHOTOS.map((sp, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedPhotoIndex(idx);
                            setCustomPhotoUrl(null);
                            if (!updateText || updateText === 'Lucrările la fundație continuă.') {
                              setUpdateText(sp.defaultNote);
                            }
                          }}
                          className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                            !customPhotoUrl && selectedPhotoIndex === idx
                              ? 'border-amber-500 ring-2 ring-amber-300'
                              : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={sp.url}
                            alt={sp.label}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>

                    {/* File upload button */}
                    <label className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>Încarcă fotografie din galerie</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Section: Ce s-a lucrat astăzi? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Ce s-a lucrat astăzi?
                    </label>
                    <textarea
                      rows={3}
                      value={updateText}
                      onChange={e => setUpdateText(e.target.value)}
                      placeholder="Ex: Lucrările la fundație continuă conform planului..."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 resize-none"
                      required
                    />
                  </div>

                  {/* Section: Probleme / observații */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Probleme / observații
                    </label>
                    <input
                      type="text"
                      value={problemText}
                      onChange={e => setProblemText(e.target.value)}
                      placeholder="Ex: Nicio problemă sau necesar verificare fier..."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={updateSuccess}
                    className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
                  >
                    {updateSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-950" />
                        <span>Actualizare trimisă cu succes!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Trimite actualizarea</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* SCREEN 3: DAILY REPORT */}
            {currentScreen === 'daily_report' && (
              <form onSubmit={handleSendDailyReport} className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <h2 className="text-sm font-bold text-slate-900">
                      Raport zilnic
                    </h2>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedSite.name}
                    </span>
                  </div>

                  {reportSubmittedSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-bold">Raport trimis ✓</span>
                    </div>
                  )}

                  {/* Field 1: Lucrări efectuate */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Lucrări efectuate
                    </label>
                    <textarea
                      rows={2}
                      value={reportLucrari}
                      onChange={e => setReportLucrari(e.target.value)}
                      placeholder="Pregătire și cofrare fundație."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 resize-none"
                      required
                    />
                  </div>

                  {/* Field 2: Materiale necesare */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Materiale necesare
                    </label>
                    <input
                      type="text"
                      value={reportMateriale}
                      onChange={e => setReportMateriale(e.target.value)}
                      placeholder="Beton programat pentru mâine."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      required
                    />
                  </div>

                  {/* Field 3: Probleme */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Probleme
                    </label>
                    <input
                      type="text"
                      value={reportProbleme}
                      onChange={e => setReportProbleme(e.target.value)}
                      placeholder="Nu sunt probleme."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      required
                    />
                  </div>

                  {/* Field 4: Observații */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Observații
                    </label>
                    <input
                      type="text"
                      value={reportObservatii}
                      onChange={e => setReportObservatii(e.target.value)}
                      placeholder="Lucrările sunt conform planului."
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>Trimite raportul</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-mono">
                    Raportul va ajunge imediat pe panoul directorului din birou.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Phone Bottom Home Bar */}
          <div className="bg-slate-950 py-2.5 flex items-center justify-center border-t border-slate-800">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
