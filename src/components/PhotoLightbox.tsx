import React from 'react';
import { SitePhoto } from '../types';
import { X, Clock, User, Calendar } from 'lucide-react';

interface PhotoLightboxProps {
  photo: SitePhoto | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={photo.url}
            alt={photo.note || 'Fotografie șantier'}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 bg-white">
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-2 font-mono">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {photo.date}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {photo.time}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <User className="w-3.5 h-3.5 text-slate-400" />
              {photo.author}
            </span>
          </div>

          <p className="text-base text-slate-900 font-medium leading-relaxed">
            "{photo.note}"
          </p>
        </div>
      </div>
    </div>
  );
};
