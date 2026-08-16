import React, { useState } from 'react';
import { ExplorerMode } from './types';
import { Header } from './components/Header';
import { InteractiveCircleExplorer } from './components/InteractiveCircleExplorer';
import { CompassWorkshop } from './components/CompassWorkshop';
import { ConceptCards } from './components/ConceptCards';
import { EverydayCircleGallery } from './components/EverydayCircleGallery';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { Compass, BookOpen, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ExplorerMode>('explore');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [largeFont, setLargeFont] = useState<boolean>(false);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const toggleFontSize = () => {
    setLargeFont((prev) => !prev);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-50/80 text-slate-800 flex flex-col justify-between selection:bg-amber-300 selection:text-amber-950 transition-all ${largeFont ? 'large-font-mode' : ''}`}>
      {/* Top Application Header */}
      <div>
        <Header
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          largeFont={largeFont}
          onToggleFontSize={toggleFontSize}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full">
          {currentMode === 'explore' && (
            <InteractiveCircleExplorer soundEnabled={soundEnabled} />
          )}

          {currentMode === 'compass' && (
            <CompassWorkshop soundEnabled={soundEnabled} />
          )}

          {currentMode === 'cards' && (
            <ConceptCards soundEnabled={soundEnabled} />
          )}

          {currentMode === 'realworld' && (
            <EverydayCircleGallery soundEnabled={soundEnabled} />
          )}

          {currentMode === 'quiz' && (
            <InteractiveQuiz soundEnabled={soundEnabled} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer id="app-footer" className="border-t border-amber-200/80 bg-white/90 backdrop-blur-xs py-6 mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium text-center sm:text-right">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-300"></span>
            <span className="font-bold text-slate-700">
              مستكشف الدائرة التفاعلي - التعلم الممتع - سميرة عبد الصدوق - جميع الحقوق محفوظة
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-slate-500 font-semibold dir-ltr">
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
