/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PhotoUploader } from './components/PhotoUploader';
import { AnalyzingOverlay } from './components/AnalyzingOverlay';
import { ResultCard } from './components/ResultCard';
import { DogIdBadgeModal } from './components/DogIdBadgeModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { DogBreedEncyclopediaModal } from './components/DogBreedEncyclopediaModal';
import { DogMatchResult } from './types';
import { AlertCircle, RotateCcw } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'doggomatch_history_v1';
const SOUND_SETTING_KEY = 'doggomatch_sound_v1';

export default function App() {
  const [currentResult, setCurrentResult] = useState<DogMatchResult | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<string | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sound and UI modals
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [history, setHistory] = useState<DogMatchResult[]>([]);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Load persistent history and preferences on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      const savedSound = localStorage.getItem(SOUND_SETTING_KEY);
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }
    } catch {
      // Ignore local storage parse errors
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newResult: DogMatchResult) => {
    setHistory((prev) => {
      const updated = [newResult, ...prev.filter((item) => item.id !== newResult.id)].slice(0, 30);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage limit protection
      }
      return updated;
    });
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_SETTING_KEY, String(next));
      return next;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Trigger Gemini Analysis via API
  const handleAnalyze = async (imageBase64: string, name: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setAnalyzingImage(imageBase64);
    setCurrentUserName(name);

    // Scroll to top for smooth viewing
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/analyze-dog-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          userName: name,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo completar el análisis perruno.');
      }

      const matchResult: DogMatchResult = {
        ...data.result,
        userImageBase64: imageBase64,
      };

      setCurrentResult(matchResult);
      saveToHistory(matchResult);
    } catch (err: unknown) {
      console.error('Error al analizar:', err);
      const msg = err instanceof Error ? err.message : 'Ocurrió un error inesperado. Por favor intenta con otra foto.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
      setAnalyzingImage(null);
    }
  };

  const handleResetToHome = () => {
    setCurrentResult(null);
    setErrorMessage(null);
    setAnalyzingImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] selection:bg-amber-200 selection:text-amber-900 font-sans">
      {/* Header Bar */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetToHome={handleResetToHome}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Error Alert Message */}
        {errorMessage && (
          <div className="w-full max-w-2xl mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 shadow-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-sm">No pudimos procesar la imagen</h4>
              <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-900 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* State 1: Analyzing in Progress */}
        {isLoading && analyzingImage ? (
          <AnalyzingOverlay userImageBase64={analyzingImage} />
        ) : currentResult ? (
          /* State 2: Result Card */
          <ResultCard
            result={currentResult}
            userName={currentUserName || 'Amigo'}
            onReset={handleResetToHome}
            onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
            soundEnabled={soundEnabled}
          />
        ) : (
          /* State 3: Upload & Welcome Screen */
          <PhotoUploader
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-amber-200/60 bg-amber-50/50 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🐶</span>
            <span className="font-bold text-slate-700">DoggoMatch IA</span>
            <span>— Descubre tu raza canina de forma divertida</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Desarrollado con Gemini 3.7 Flash</span>
            <span>•</span>
            <span>Diversión garantizada 🐾</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <DogIdBadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        result={currentResult}
        userName={currentUserName || 'Amigo'}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(res) => {
          setCurrentResult(res);
          setCurrentUserName('');
        }}
        onClearHistory={handleClearHistory}
      />

      <DogBreedEncyclopediaModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </div>
  );
}
