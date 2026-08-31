import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Share2,
  Download,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Heart,
  Smile,
  Shield,
  Coffee,
  Bell,
  Cookie,
  Flame,
  Dog,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DogMatchResult } from '../types';
import { findDogBreedInfo } from '../data/dogBreeds';
import { speakText, stopSpeaking, playDogBarkSound, playCelebrationChime } from '../utils/soundEffects';

interface ResultCardProps {
  result: DogMatchResult;
  userName: string;
  onReset: () => void;
  onOpenBadgeModal: () => void;
  soundEnabled: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  userName,
  onReset,
  onOpenBadgeModal,
  soundEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'verdict' | 'attributes' | 'daily' | 'runnerUps'>('verdict');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const breedDetails = findDogBreedInfo(result.breedName);
  const dogPhoto = result.dogBreedPhotoUrl || breedDetails.imageUrl;

  // Trigger celebration on mount
  useEffect(() => {
    if (soundEnabled) {
      playCelebrationChime();
      setTimeout(() => playDogBarkSound(), 400);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fb923c', '#d97706', '#fbbf24', '#fde047'],
      });
    } catch {
      // Ignore
    }

    return () => {
      stopSpeaking();
    };
  }, [soundEnabled]);

  // Handle Speech Synthesis
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `¡Veredicto para ${userName}! Eres un ${result.breedName}. ${result.summaryPunchline}. ${result.whyThisBreed}. Tu consejo canino es: ${result.dogAdvice}`;
      speakText(textToRead, () => setIsSpeaking(false));
    }
  };

  // Copy result text for WhatsApp / Socials
  const handleCopySummary = async () => {
    const text = `🐶 ¡Descubrí qué raza de perro soy en DoggoMatch!\n\n🐾 Resultado para ${userName}: ${result.breedName} ${result.dogEmoji} (${result.compatibilityPercentage}% de compatibilidad)\n✨ Título: "${result.alterEgoTitle}"\n💬 Veredicto: ${result.summaryPunchline}\n\n👉 ¡Pruébalo tú también!`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Header Card: Side by Side Portraits */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-amber-200/90 shadow-xl shadow-amber-900/5 relative overflow-hidden">
        {/* Decorative corner background */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full pointer-events-none -z-0" />

        <div className="relative z-10">
          {/* Tag & Compatibility Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{result.dogEmoji || '🐶'}</span>
              <div>
                <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                  {result.breedOrigin || 'Origen Canino'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full shadow-md shadow-amber-500/20 font-black text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{result.compatibilityPercentage}% Compatible</span>
            </div>
          </div>

          {/* Side by Side Image Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Person Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-300 shadow-md group aspect-4/3 sm:aspect-square">
              <img
                src={result.userImageBase64}
                alt={userName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 sm:p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Humano Evaluado
                </span>
                <h3 className="text-base sm:text-lg font-extrabold truncate">
                  {userName || 'Tú'}
                </h3>
              </div>
            </div>

            {/* Dog Breed Match Card */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-amber-400 shadow-md group aspect-4/3 sm:aspect-square">
              <img
                src={dogPhoto}
                alt={result.breedName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 sm:p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  Alma Gemela Canina
                </span>
                <h3 className="text-base sm:text-lg font-extrabold truncate">
                  {result.breedName}
                </h3>
              </div>

              {/* Match Badge Ribbon */}
              <div className="absolute top-3 right-3 bg-amber-500 text-white p-2 rounded-xl shadow-lg border border-white/40 flex items-center gap-1.5 text-xs font-black">
                <Award className="w-4 h-4 text-amber-100" />
                <span>¡Match!</span>
              </div>
            </div>
          </div>

          {/* Title & Alter Ego Heading */}
          <div className="text-center md:text-left border-t border-amber-100 pt-5">
            <div className="inline-block px-3 py-1 rounded-lg bg-orange-100 text-orange-900 font-extrabold text-xs mb-2">
              🏆 Apodo Oficial: "{result.alterEgoTitle}"
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display mb-2">
              Eres un <span className="text-amber-600 underline decoration-amber-300">{result.breedName}</span> {result.dogEmoji}
            </h2>
            <p className="text-slate-700 text-base sm:text-lg font-medium italic bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/60">
              "{result.summaryPunchline}"
            </p>

            {/* Vibe keywords */}
            {result.personVibeKeywords && result.personVibeKeywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {result.personVibeKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-amber-200 text-slate-700 shadow-xs"
                  >
                    ✨ {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Bar: Audio Narrator, DNI, Copy, New */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-amber-100">
            <div className="flex flex-wrap items-center gap-2">
              {/* TTS Voice Narrator */}
              <button
                id="btn-voice-narrator"
                type="button"
                onClick={handleToggleSpeak}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-600/25 animate-pulse'
                    : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
                <span>{isSpeaking ? 'Detener Voz' : 'Escuchar Veredicto 🎙️'}</span>
              </button>

              {/* DNI Canino Badge Generator */}
              <button
                id="btn-open-badge-modal"
                type="button"
                onClick={onOpenBadgeModal}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 shadow-md shadow-slate-900/15 transition-all cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Generar Carnet Canino (DNI) 🪪</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Copy Result */}
              <button
                id="btn-copy-result"
                type="button"
                onClick={handleCopySummary}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white border border-amber-300 hover:bg-amber-50 text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-amber-600" />}
                <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
              </button>

              {/* Reset to Test Another */}
              <button
                id="btn-try-another"
                type="button"
                onClick={onReset}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-md shadow-amber-600/20 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Otra Foto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-amber-200 gap-2 overflow-x-auto pb-1">
        <button
          id="tab-verdict"
          onClick={() => setActiveTab('verdict')}
          className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'verdict'
              ? 'bg-white border-t-2 border-amber-600 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
          }`}
        >
          <span>🐶</span>
          <span>¿Por qué esta raza?</span>
        </button>

        <button
          id="tab-attributes"
          onClick={() => setActiveTab('attributes')}
          className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'attributes'
              ? 'bg-white border-t-2 border-amber-600 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
          }`}
        >
          <span>📊</span>
          <span>Radar de Atributos</span>
        </button>

        <button
          id="tab-daily"
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'daily'
              ? 'bg-white border-t-2 border-amber-600 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
          }`}
        >
          <span>🐾</span>
          <span>Tu Vida de Perro</span>
        </button>

        <button
          id="tab-runner-ups"
          onClick={() => setActiveTab('runnerUps')}
          className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'runnerUps'
              ? 'bg-white border-t-2 border-amber-600 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/50'
          }`}
        >
          <span>🥈</span>
          <span>Otras Razas Finalistas</span>
        </button>
      </div>

      {/* Tab 1: Detailed Verdict & Visual Clues */}
      {activeTab === 'verdict' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
          {/* Main detailed reason */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-2 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Análisis Científico-Perruno de tu Aura</span>
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {result.whyThisBreed}
            </p>
          </div>

          {/* Visual Clues Comparisons */}
          {result.visualClues && result.visualClues.length > 0 && (
            <div className="border-t border-amber-100 pt-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-800 mb-3">
                🔍 Evidencias Visuales Detectadas en la Foto:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {result.visualClues.map((clue, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 hover:bg-amber-50 transition-colors"
                  >
                    <span className="inline-block px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900 text-[11px] font-bold mb-1.5">
                      {clue.trait}
                    </span>
                    <p className="text-xs text-slate-700 mb-1.5 font-medium">
                      <strong className="text-slate-900">En ti:</strong> {clue.observation}
                    </p>
                    <p className="text-xs text-amber-900 font-semibold bg-white p-2 rounded-xl border border-amber-200/60">
                      🐾 <strong className="text-amber-950">En el {result.breedName}:</strong> {clue.dogEquivalent}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dog Advice Box */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white shadow-md shadow-amber-500/15">
            <div className="flex items-center gap-2 mb-1.5">
              <Award className="w-5 h-5 text-amber-200" />
              <h4 className="font-extrabold text-sm uppercase tracking-wider">
                Consejo Canino de Supervivencia:
              </h4>
            </div>
            <p className="text-amber-50 text-sm font-medium leading-relaxed">
              "{result.dogAdvice}"
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Canine Attributes Radar / Bars */}
      {activeTab === 'attributes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1 font-display">
              📊 Métricas de Personalidad Canina
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Así puntúas en los parámetros fundamentales del reino perruno:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Loyalty */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-red-500" /> Lealtad Incondicional
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.loyalty}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-red-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.loyalty}%` }}
                />
              </div>
            </div>

            {/* Energy */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" /> Nivel de Energía / Jugabilidad
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.energyLevel}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.energyLevel}%` }}
                />
              </div>
            </div>

            {/* Sleep Need */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-indigo-500" /> Ganas de Dormir Siestas
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.sleepNeed}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.sleepNeed}%` }}
                />
              </div>
            </div>

            {/* Sociability */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-emerald-500" /> Sociabilidad & Hacer Amigos
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.sociability}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.sociability}%` }}
                />
              </div>
            </div>

            {/* Drama */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-purple-500" /> Nivel de Drama & Expresividad
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.dramaQuotient}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.dramaQuotient}%` }}
                />
              </div>
            </div>

            {/* Mischief */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-orange-500" /> Nivel de Travesuras / Pillería
                </span>
                <span className="text-xs font-black text-amber-900">
                  {result.personalityProfile.mischiefLevel}%
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.personalityProfile.mischiefLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Daily Life in Dog Form */}
      {activeTab === 'daily' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1 font-display">
              🐾 Si fueras un perro por un día:
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Así se desarrollaría tu jornada según los algoritmos caninos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Morning Routine */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Rutina Mañanera
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {result.dailyLifePrediction.morningRoutine}
                </p>
              </div>
            </div>

            {/* Doorbell Reaction */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Cuando tocan el timbre
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {result.dailyLifePrediction.reactionToDoorbell}
                </p>
              </div>
            </div>

            {/* Favorite Treat */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Snack Irresistible
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {result.dailyLifePrediction.favoriteTreat}
                </p>
              </div>
            </div>

            {/* Secret Superpower */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-200 text-amber-900 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Superpoder Oculto
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {result.dailyLifePrediction.secretSuperpower}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Runner-up Breeds */}
      {activeTab === 'runnerUps' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1 font-display">
              🥈 Razas Finalistas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Estuvieron muy cerca en la puntuación:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.runnerUpBreeds && result.runnerUpBreeds.map((runner, idx) => {
              const details = findDogBreedInfo(runner.breedName);
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 items-center"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200 border border-amber-300 shadow-xs">
                    <img
                      src={details.imageUrl}
                      alt={runner.breedName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-slate-900">
                        {runner.breedName}
                      </span>
                      <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {runner.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {runner.quickReason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
