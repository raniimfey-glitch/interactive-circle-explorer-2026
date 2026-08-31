import React, { useState, useEffect } from 'react';
import { ExplorerMode, AppLanguage } from './types';
import { Header } from './components/Header';
import { InteractiveCircleExplorer } from './components/InteractiveCircleExplorer';
import { CompassWorkshop } from './components/CompassWorkshop';
import { ConceptCards } from './components/ConceptCards';
import { EverydayCircleGallery } from './components/EverydayCircleGallery';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { PresentationToolbar } from './components/PresentationToolbar';
import { SmartViewGuideModal } from './components/SmartViewGuideModal';
import { Compass, BookOpen, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<ExplorerMode>('explore');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [largeFont, setLargeFont] = useState<boolean>(false);
  const [language, setLanguage] = useState<AppLanguage>('ar');

  // Presentation & Data Show State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isProjectorContrast, setIsProjectorContrast] = useState<boolean>(false);
  const [classroomZoom, setClassroomZoom] = useState<number>(1);
  const [isSmartViewModalOpen, setIsSmartViewModalOpen] = useState<boolean>(false);

  // Offline detection state
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  useEffect(() => {
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = language === 'en' ? 'en' : 'ar';
  }, [language]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const toggleFontSize = () => {
    setLargeFont((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen error:', err);
        });
      }
    }
  };

  const toggleProjectorContrast = () => {
    setIsProjectorContrast((prev) => !prev);
  };

  const isEn = language === 'en';

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-50/80 text-slate-800 flex flex-col justify-between selection:bg-amber-300 selection:text-amber-950 transition-all ${
        largeFont ? 'large-font-mode' : ''
      } ${isProjectorContrast ? 'projector-contrast-mode' : ''} ${
        classroomZoom === 1.15 ? 'classroom-zoom-115' : classroomZoom === 1.3 ? 'classroom-zoom-130' : ''
      }`}
    >
      {/* Top Application Header with Flag Language Switcher */}
      <div>
        <Header
          currentMode={currentMode}
          onSelectMode={setCurrentMode}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          largeFont={largeFont}
          onToggleFontSize={toggleFontSize}
          language={language}
          onSelectLanguage={setLanguage}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onOpenSmartViewGuide={() => setIsSmartViewModalOpen(true)}
          isOffline={isOffline}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full">
          {currentMode === 'explore' && (
            <InteractiveCircleExplorer soundEnabled={soundEnabled} language={language} />
          )}

          {currentMode === 'compass' && (
            <CompassWorkshop soundEnabled={soundEnabled} language={language} />
          )}

          {currentMode === 'cards' && (
            <ConceptCards soundEnabled={soundEnabled} language={language} />
          )}

          {currentMode === 'realworld' && (
            <EverydayCircleGallery soundEnabled={soundEnabled} language={language} />
          )}

          {currentMode === 'quiz' && (
            <InteractiveQuiz soundEnabled={soundEnabled} language={language} />
          )}
        </main>
      </div>

      {/* Floating Presentation & Data Show / Smart View Toolbar */}
      <PresentationToolbar
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isProjectorContrast={isProjectorContrast}
        onToggleProjectorContrast={toggleProjectorContrast}
        classroomZoom={classroomZoom}
        onChangeClassroomZoom={setClassroomZoom}
        isOffline={isOffline}
      />

      {/* Standalone Smart View & Data Show Modal (Triggerable from Header) */}
      <SmartViewGuideModal
        isOpen={isSmartViewModalOpen}
        onClose={() => setIsSmartViewModalOpen(false)}
        isOffline={isOffline}
      />

      {/* Footer */}
      <footer id="app-footer" className="border-t border-amber-200/80 bg-white/90 backdrop-blur-xs py-6 mt-12 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium text-center sm:text-right">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-300"></span>
            <span className="font-bold text-slate-700">
              {isEn
                ? 'Interactive Circle Explorer - Fun Elementary Mathematics • Samira Abdel-Sadouk • All Rights Reserved'
                : 'مستكشف الدائرة التفاعلي - التعلم الممتع في الرياضيات - إعداد: سميرة عبد الصدوق - جميع الحقوق محفوظة'}
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
