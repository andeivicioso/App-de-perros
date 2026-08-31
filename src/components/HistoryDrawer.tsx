import React from 'react';
import { X, Trash2, ArrowRight, Dog, Sparkles } from 'lucide-react';
import { DogMatchResult } from '../types';
import { findDogBreedInfo } from '../data/dogBreeds';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DogMatchResult[];
  onSelectResult: (result: DogMatchResult) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <div>
              <h3 className="text-base font-black text-slate-900 font-display">
                Historial de Escaneos
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {history.length} {history.length === 1 ? 'coincidencia guardada' : 'coincidencias guardadas'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-history"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-2xl mb-3 border border-amber-200">
                🐶
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1">
                Aún no has analizado ninguna foto
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                Sube tu foto o prueba una muestra para ver los resultados guardados aquí.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const breedInfo = findDogBreedInfo(item.breedName);
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-amber-200/90 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
                >
                  {/* Human Mini Photo */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-amber-300">
                    <img
                      src={item.userImageBase64}
                      alt="Humano"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dog Mini Photo */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-amber-300 bg-slate-100 hidden sm:block">
                    <img
                      src={item.dogBreedPhotoUrl || breedInfo.imageUrl}
                      alt={item.breedName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-extrabold text-slate-900 truncate">
                        {item.breedName}
                      </span>
                      <span className="text-xs">{item.dogEmoji}</span>
                    </div>
                    <p className="text-[11px] text-amber-800 font-bold truncate">
                      {item.alterEgoTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                        {item.compatibilityPercentage}% Match
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors shrink-0" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Clear All */}
        {history.length > 0 && (
          <div className="p-4 border-t border-amber-100 bg-amber-50/40 flex justify-between items-center">
            <button
              id="btn-clear-history"
              onClick={onClearHistory}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar historial</span>
            </button>
            <span className="text-[11px] text-slate-400">Guardado local</span>
          </div>
        )}
      </div>
    </div>
  );
};
