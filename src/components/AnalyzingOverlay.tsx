import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Search } from 'lucide-react';

const ANALYSIS_STEPS = [
  { icon: '🔍', title: 'Escaneando fisionomía...', desc: 'Midiendo la curvatura de la sonrisa y expresión facial' },
  { icon: '🦴', title: 'Calculando índice perruno...', desc: 'Evaluando nivel de ganas de dormir siestas vs ganas de correr' },
  { icon: '🐩', title: 'Analizando pelaje y peinado...', desc: 'Comparando volumen capilar con razas esponjosas' },
  { icon: '👀', title: 'Detectando mirada de cachorrito...', desc: 'Midiendo efectividad para conseguir snacks gratis' },
  { icon: '✨', title: 'Consultando la Real Academia Canina...', desc: 'Generando veredicto y apodo honorífico' }
];

interface AnalyzingOverlayProps {
  userImageBase64: string;
}

export const AnalyzingOverlay: React.FC<AnalyzingOverlayProps> = ({ userImageBase64 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const currentStep = ANALYSIS_STEPS[currentStepIndex];

  return (
    <div className="w-full max-w-xl mx-auto py-10 px-4 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-200 shadow-2xl shadow-amber-900/10 relative overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl" />

        {/* User Image with Scanning Radar */}
        <div className="relative w-36 h-36 mx-auto mb-6">
          <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-amber-400 shadow-lg relative bg-slate-100">
            <img
              src={userImageBase64}
              alt="Escaneando"
              className="w-full h-full object-cover filter brightness-95"
            />
            {/* Animated Laser Scanning Bar */}
            <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#f59e0b] animate-bounce" />
          </div>

          {/* Orbiting Dog Emojis */}
          <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 flex items-center justify-center text-lg animate-bounce">
            🐶
          </div>
          <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 flex items-center justify-center text-lg animate-pulse">
            🐾
          </div>
        </div>

        {/* Dynamic Funny Step */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold mb-3">
            <span className="text-sm">{currentStep.icon}</span>
            <span>Paso {currentStepIndex + 1} de {ANALYSIS_STEPS.length}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 font-display">
            {currentStep.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto h-10 flex items-center justify-center">
            {currentStep.desc}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-amber-100 rounded-full h-2.5 mb-6 overflow-hidden p-0.5 border border-amber-200">
          <div
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800/80">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Gemini 3.7 Vision está descifrando tu ADN canino...</span>
        </div>
      </div>
    </div>
  );
};
