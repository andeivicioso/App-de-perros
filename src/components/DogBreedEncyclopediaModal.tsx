import React, { useState } from 'react';
import { X, Search, BookOpen, Sparkles } from 'lucide-react';
import { DOG_BREEDS_CATALOG } from '../data/dogBreeds';

interface DogBreedEncyclopediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DogBreedEncyclopediaModal: React.FC<DogBreedEncyclopediaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const breeds = Object.values(DOG_BREEDS_CATALOG).filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.personalityKeywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      b.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] flex flex-col border border-amber-300 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-xl text-amber-800">
              📖
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Enciclopedia Canina de Razas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Explora las personalidades, fotos y particularidades de los candidatos caninos.
              </p>
            </div>
          </div>

          <button
            id="btn-close-encyclopedia"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por raza, origen o rasgo (ej: Golden, Leal, Dramático, México...)"
            className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 rounded-xl border border-amber-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        {/* Breeds Grid */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pr-1">
          {breeds.map((breed, idx) => (
            <div
              key={idx}
              className="bg-amber-50/30 rounded-2xl border border-amber-200/80 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                <img
                  src={breed.imageUrl}
                  alt={breed.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-slate-950/70 text-white text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {breed.origin}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-base">{breed.emoji}</span>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {breed.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {breed.description}
                  </p>
                </div>

                {/* Keywords Chips */}
                <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-amber-100">
                  {breed.personalityKeywords.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-amber-900 border border-amber-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
