import React, { useState } from 'react';
import { useConstruction } from '../context/ConstructionContext';
import { ConstructionSite, SitePhoto, SiteStatus } from '../types';
import { PhotoLightbox } from './PhotoLightbox';
import {
  Building2,
  Users,
  FileCheck2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Circle,
  Camera,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface OfficeDashboardProps {
  compact?: boolean;
}

export const OfficeDashboard: React.FC<OfficeDashboardProps> = ({ compact = false }) => {
  const { sites, selectedSiteId, selectSite, selectedSite } = useConstruction();
  const [selectedPhoto, setSelectedPhoto] = useState<SitePhoto | null>(null);

  // Dynamic calculated counts or fallback to standard presentation
  const activeSitesCount = sites.length;
  const onSiteTeamsCount = sites.filter(s => s.status === 'pe_santier').length;
  const reportsTodayCount = sites.filter(s => s.dailyReport?.submitted).length;
  const issuesReportedCount = sites.filter(s => s.status === 'problema').length;

  const getStatusBadge = (status: SiteStatus, text: string) => {
    switch (status) {
      case 'pe_santier':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Pe șantier</span>
          </span>
        );
      case 'in_asteptare':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>În așteptare</span>
          </span>
        );
      case 'problema':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Problemă</span>
          </span>
        );
      default:
        return <span className="text-xs text-slate-500">{text}</span>;
    }
  };

  return (
    <div className={`space-y-6 ${compact ? 'text-sm' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Bună dimineața, Andrei
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitorizare șantiere în execuție · Edificia Construct România
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Joi, 25 Septembrie 2026</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Actualizat live
          </span>
        </div>
      </div>

      {/* 4 Simple Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Șantiere active */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Șantiere active</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
              {activeSitesCount}
            </span>
            <span className="text-xs text-slate-500">obiective</span>
          </div>
        </div>

        {/* Card 2: Echipe pe șantier */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Echipe pe șantier</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-emerald-700">
              {onSiteTeamsCount}
            </span>
            <span className="text-xs text-slate-500">active acum</span>
          </div>
        </div>

        {/* Card 3: Rapoarte astăzi */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Rapoarte astăzi</span>
            <FileCheck2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
              {reportsTodayCount}
            </span>
            <span className="text-xs text-slate-500">transmise</span>
          </div>
        </div>

        {/* Card 4: Probleme raportate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Probleme raportate</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-rose-600">
              {issuesReportedCount}
            </span>
            <span className="text-xs text-rose-600 font-medium">necesită atenție</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column View on Desktop or Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Sites Table (5 cols on large desktop, or 12 if compact) */}
        <div className={compact ? 'lg:col-span-12' : 'lg:col-span-5'}>
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Șantiere</h2>
                <p className="text-xs text-slate-500">Selectează un obiectiv pentru fișa detaliată</p>
              </div>
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {sites.length} obiective
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {sites.map(site => {
                const isSelected = site.id === selectedSiteId;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => selectSite(site.id)}
                    className={`w-full text-left p-3.5 transition-colors cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-amber-50/50 border-l-4 border-l-amber-500'
                        : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900 line-clamp-1">
                        {site.name}
                      </span>
                      <span className="shrink-0">
                        {getStatusBadge(site.status, site.statusText)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Responsabil: {site.responsabil}</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        {site.ultimaActualizare}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Site Detail (7 cols on large desktop, or 12) */}
        <div className={compact ? 'lg:col-span-12' : 'lg:col-span-7'}>
          {selectedSite ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {/* Site Header */}
              <div className="p-5 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {selectedSite.name}
                    </h2>
                    <p className="text-xs text-slate-500">{selectedSite.city}</p>
                  </div>
                  <div>{getStatusBadge(selectedSite.status, selectedSite.statusText)}</div>
                </div>

                {/* Key Site Metadata (Responsabil, Echipă, Check-in) */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Responsabil</span>
                    <span className="font-semibold text-slate-800">{selectedSite.responsabil}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Echipă</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {selectedSite.echipa} persoane
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Check-in</span>
                    <span className="font-semibold text-slate-800 font-mono">
                      {selectedSite.checkInTime || 'Neefectuat'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 1: Activitate astăzi */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Activitate astăzi
                </h3>
                <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedSite.activities.map((act, index) => (
                    <div key={act.id || index} className="relative flex items-start justify-between text-xs gap-3">
                      <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-white" />
                      <span className="font-medium text-slate-800">
                        {act.description}
                      </span>
                      <span className="text-slate-400 font-mono shrink-0">
                        {act.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Progres */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Progres
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {selectedSite.tasks.filter(t => t.completed).length} / {selectedSite.tasks.length} finalizate
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(selectedSite.tasks.filter(t => t.completed).length / selectedSite.tasks.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="space-y-2">
                  {selectedSite.tasks.map(task => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                        task.completed
                          ? 'bg-emerald-50/40 border-emerald-200 text-slate-800'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {task.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span className={task.completed ? 'font-medium' : ''}>
                          {task.title}
                        </span>
                      </div>
                      {task.completed && task.completedAt && (
                        <span className="text-[11px] font-mono text-emerald-700">
                          {task.completedAt}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Fotografii */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-slate-700" />
                    Fotografii
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedSite.photos.length} imagini transmise
                  </span>
                </div>

                {selectedSite.photos.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    Nicio fotografie încărcată astăzi pentru acest șantier.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedSite.photos.map(photo => (
                      <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className="group relative bg-slate-900 rounded-lg overflow-hidden border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
                          <img
                            src={photo.url}
                            alt={photo.note}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          {photo.isNew && (
                            <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded shadow-xs flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              Nou
                            </span>
                          )}
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-0.5">
                              <span>{photo.time}</span>
                              <span>{photo.author}</span>
                            </div>
                            <p className="text-xs font-medium text-white line-clamp-2">
                              "{photo.note}"
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 4: Raport zilnic */}
              <div className="p-5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-700" />
                    Raport zilnic
                  </h3>
                  {selectedSite.dailyReport?.submitted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Trimis la {selectedSite.dailyReport.submittedAt || '12:05'}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-700 font-mono">
                      În curs de completare
                    </span>
                  )}
                </div>

                <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      Lucrări efectuate:
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                      "{selectedSite.dailyReport?.lucrariEfectuate || 'Pregătire și cofrare fundație.'}"
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      Materiale necesare:
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                      "{selectedSite.dailyReport?.materialeNecesare || 'Beton programat pentru mâine.'}"
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      Probleme:
                    </span>
                    <p className={`p-2 rounded border ${
                      selectedSite.dailyReport?.probleme &&
                      selectedSite.dailyReport.probleme !== 'Nu sunt probleme.' &&
                      selectedSite.dailyReport.probleme !== 'Niciuna.'
                        ? 'bg-rose-50 text-rose-800 border-rose-100 font-medium'
                        : 'bg-slate-50 text-slate-700 border-slate-100'
                    }`}>
                      "{selectedSite.dailyReport?.probleme || 'Nu sunt probleme.'}"
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">
                      Notă:
                    </span>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-100">
                      "{selectedSite.dailyReport?.observatii || 'Lucrările sunt conform planului.'}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              Selectează un șantier din listă pentru detalii.
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
};
