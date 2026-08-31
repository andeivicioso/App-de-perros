import React from 'react';
import { Sparkles, History, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { playDogBarkSound } from '../utils/soundEffects';

interface NavbarProps {
  historyCount: number;
  onOpenHistory: () => void;
  onOpenCatalog: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  historyCount,
  onOpenHistory,
  onOpenCatalog,
  soundEnabled,
  onToggleSound,
  onResetToHome,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-amber-50/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="btn-nav-home"
          onClick={() => {
            if (soundEnabled) playDogBarkSound();
            onResetToHome();
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer transition-transform active:scale-95"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:rotate-6 transition-transform">
            <span className="text-xl">🐶</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight font-display">
                Doggo<span className="text-amber-600">Match</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300/60">
                IA 🐾
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              ¿A qué raza de perro te pareces?
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            id="btn-nav-sound-toggle"
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar efectos' : 'Activar efectos sonoros'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-100/70 border-amber-300 text-amber-800 hover:bg-amber-200/80'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Breed Catalog */}
          <button
            id="btn-nav-catalog"
            onClick={onOpenCatalog}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-amber-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 transition-all shadow-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Enciclopedia Canina</span>
            <span className="sm:hidden">Razas</span>
          </button>

          {/* History */}
          <button
            id="btn-nav-history"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-xs shadow-amber-600/20 cursor-pointer"
          >
            <History className="w-4 h-4" />
            <span>Historial</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-extrabold bg-amber-200 text-amber-900">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
