import React from 'react';
import { Compass, Sparkles, BookOpen, Layers, Award, Bike, Volume2, VolumeX, Type, Tv, Maximize, Minimize, Wifi, WifiOff, Languages, Globe } from 'lucide-react';
import { ExplorerMode, AppLanguage } from '../types';
import { stopSpeech, speakArabicText, speakEnglishText } from '../utils/speech';

interface HeaderProps {
  currentMode: ExplorerMode;
  onSelectMode: (mode: ExplorerMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  largeFont: boolean;
  onToggleFontSize: () => void;
  language?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onOpenSmartViewGuide?: () => void;
  isOffline?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  soundEnabled,
  onToggleSound,
  largeFont,
  onToggleFontSize,
  language = 'ar',
  onSelectLanguage,
  isFullscreen,
  onToggleFullscreen,
  onOpenSmartViewGuide,
  isOffline = false,
}) => {
  const isEn = language === 'en';

  const handleNavClick = (mode: ExplorerMode) => {
    stopSpeech();
    onSelectMode(mode);
    if (soundEnabled) {
      if (isEn) {
        const enTitles: Record<ExplorerMode, string> = {
          explore: 'Interactive Circle Board',
          compass: 'Compass Drawing Workshop',
          cards: 'Circle Concepts and Definitions',
          realworld: 'Circles in Real Everyday Life',
          quiz: 'Geometry Champion Quiz and Puzzles',
        };
        speakEnglishText(enTitles[mode] || 'Tab selected');
      } else {
        const arTitles: Record<ExplorerMode, string> = {
          explore: 'السَّبُّورَةُ التَّفَاعُلِيَّةُ لِاسْتِكْشَافِ الدَّائِرَةِ',
          compass: 'وَرْشَةُ الْفِرْجَارِ لِرَسْمِ الدَّائِرَةِ خَطْوَةً بِخَطْوَةٍ',
          cards: 'بِطَاقَاتُ الْمَفَاهِيمِ وَالشُّرُوحَاتِ الْهَنْدَسِيَّةِ',
          realworld: 'الدَّائِرَةُ فِي حَيَاتِنَا الْيَوْمِيَّةِ',
          quiz: 'تَحَدِّي بَطَلِ الْهَنْدَسَةِ وَالْأَلْغَازِ الْبَصَرِيَّةِ',
        };
        speakArabicText(arTitles[mode] || 'تَمَّ اخْتِيَارُ التَّبْوِيبِ');
      }
    }
  };

  const handleFontSizeClick = () => {
    const nextVal = !largeFont;
    onToggleFontSize();
    if (soundEnabled) {
      if (isEn) {
        speakEnglishText(nextVal ? 'Large font size activated for easy reading.' : 'Returned to normal font size.');
      } else {
        speakArabicText(nextVal ? 'تَمَّ تَكْبِيرُ حَجْمِ الْخَطِّ لِتَسْهِيلِ الْقِرَاءَةِ' : 'تَمَّتِ الْعَوْدَةُ إِلَى حَجْمِ الْخَطِّ الْعَادِيِّ');
      }
    }
  };

  const handleLanguageChange = (newLang: AppLanguage) => {
    if (onSelectLanguage) {
      onSelectLanguage(newLang);
      if (soundEnabled) {
        if (newLang === 'ar') {
          speakArabicText('تَمَّ اخْتِيَارُ اللُّغَةِ الْعَرَبِيَّةِ الْمَشْكُولَةِ بِالْكَامِلِ');
        } else {
          speakEnglishText('American English mode activated. Let us explore circles!');
        }
      }
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-200/80 sticky top-0 z-30 shadow-sm" id="app-header">
      {/* Curriculum notification ribbon */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-amber-100 px-4 py-1.5 text-xs md:text-sm font-semibold flex items-center justify-between border-b border-emerald-700/50">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-300"></span>
            <span className="tracking-wide">
              {isEn 
                ? 'Mathematics - Primary Education (Grades 4 & 5) • Algerian Curriculum' 
                : 'الرياضيات - الطور الابتدائي (السنة 4 و 5) • مناهج الجيل الثاني (الجزائر)'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-medium">
            {/* Active Language Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/40 text-amber-200 font-bold">
              <span>{isEn ? '🇺🇸' : '🇩🇿'}</span>
              <span>{isEn ? 'English (US)' : 'العَرَبِيَّة'}</span>
            </span>

            {/* Offline Badge in top ribbon */}
            <span 
              onClick={onOpenSmartViewGuide}
              className="cursor-pointer bg-emerald-950/60 hover:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/50 flex items-center gap-1.5 transition-colors"
              title={isEn ? "Works Offline in Classrooms" : "التطبيق يعمل بدون اتصال بالإنترنت (Offline) وجاهز للعرض في الأقسام"}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-300" /> : <Wifi className="w-3.5 h-3.5 text-emerald-300" />}
              <span className="font-bold text-amber-200">{isEn ? 'Works Offline' : 'يعمل بدون إنترنت (Offline)'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Main Title & Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-2 ring-amber-200/70">
                <Compass className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>{isEn ? 'Interactive Circle Explorer' : 'مُستكشِف الدَّائرة التَّفاعُلي'}</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs border border-amber-300">
                    {isEn ? 'Kids Edition' : 'مبسَّط للأطفال'}
                  </span>
                </h1>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {isEn 
                    ? 'Explore Center, Radius, Diameter, and Chord with Interactive Visuals'
                    : 'اكتشف المركز، نصف القطر، القطر، والوتر بتجارب بصرية تفاعلية'}
                </p>
              </div>
            </div>

            {/* Quick settings controls for mobile */}
            <div className="flex items-center gap-1.5 md:hidden">
              {/* Language Toggle for Mobile */}
              {onSelectLanguage && (
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shadow-xs">
                  <button
                    id="lang-ar-mobile-btn"
                    onClick={() => handleLanguageChange('ar')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                      language === 'ar'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                    title="اللغة العربية المشكولة"
                  >
                    <span>🇩🇿</span>
                    <span>عربي</span>
                  </button>
                  <button
                    id="lang-en-mobile-btn"
                    onClick={() => handleLanguageChange('en')}
                    className={`px-2 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                      language === 'en'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                    title="American English"
                  >
                    <span>🇺🇸</span>
                    <span>EN</span>
                  </button>
                </div>
              )}

              {/* Smart View Guide Modal Trigger Mobile */}
              {onOpenSmartViewGuide && (
                <button
                  id="smart-view-guide-btn-mobile"
                  onClick={onOpenSmartViewGuide}
                  className="p-2.5 rounded-xl border text-sm font-bold bg-indigo-50 text-indigo-700 border-indigo-200 shadow-xs"
                  title={isEn ? "Data Show & Smart View Guide" : "دليل العرض على الداتاشو وSmart View"}
                >
                  <Tv className="w-4 h-4 text-indigo-600" />
                </button>
              )}

              {/* Fullscreen Mobile */}
              {onToggleFullscreen && (
                <button
                  id="fullscreen-toggle-btn-mobile"
                  onClick={onToggleFullscreen}
                  className="p-2.5 rounded-xl border text-sm font-bold bg-slate-100 text-slate-700 border-slate-200 shadow-xs"
                  title={isEn ? "Full Screen" : "ملء الشاشة"}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              )}

              {/* Font Size Toggle Mobile */}
              <button
                id="font-size-toggle-btn-mobile"
                onClick={handleFontSizeClick}
                className={`p-2.5 rounded-xl border text-sm font-black flex items-center gap-1 transition-all shadow-xs ${
                  largeFont
                    ? 'bg-indigo-100 text-indigo-950 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={largeFont ? (isEn ? 'Normal Font' : 'إعادة حجم الخط العادي') : (isEn ? 'Large Font' : 'تكبير الخط')}
              >
                <Type className="w-4 h-4 text-indigo-700" />
              </button>

              {/* Sound toggle button for mobile */}
              <button
                id="sound-toggle-btn-mobile"
                onClick={onToggleSound}
                className={`p-2.5 rounded-xl border text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                  soundEnabled
                    ? 'bg-amber-100/80 text-amber-900 border-amber-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
                title={soundEnabled ? (isEn ? 'Mute' : 'تعطيل القراءة الصوتية') : (isEn ? 'Enable Sound' : 'تفعيل القراءة الصوتية')}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions & Settings (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5 flex-wrap justify-end">
            {/* Prominent Language Switcher with Algerian & US flags */}
            {onSelectLanguage && (
              <div 
                id="language-switcher-group"
                className="flex items-center bg-white p-1 rounded-2xl border-2 border-emerald-300 shadow-sm ring-2 ring-emerald-100"
                title={isEn ? "Choose Language: Algerian Arabic 🇩🇿 or American English 🇺🇸" : "اختر لغة العرض: العربية الجزائرية 🇩🇿 أو الإنجليزية الأمريكية 🇺🇸"}
              >
                <button
                  id="lang-ar-btn"
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    language === 'ar'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border border-emerald-700 shadow-md ring-2 ring-emerald-300/60'
                      : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                  title="عرض كامل باللغة العربية المشكولة مع النطق الصوتي العربي"
                >
                  <span className="text-base">🇩🇿</span>
                  <span>عَرَبِيّ</span>
                </button>

                <button
                  id="lang-en-btn"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border border-blue-700 shadow-md ring-2 ring-blue-300/60'
                      : 'text-slate-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                  title="Full American English with slow & clear audio for 8-year-old students"
                >
                  <span className="text-base">🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            )}

            {/* Smart View / Projector Guide Button */}
            {onOpenSmartViewGuide && (
              <button
                id="smart-view-guide-btn"
                onClick={onOpenSmartViewGuide}
                className="px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200 transition-all shadow-xs"
                title={isEn ? "Classroom Data Show & Smart View Guide" : "دليل ومساعد العرض على جهاز العرض داتاشو والشاشات الذكية Smart View"}
              >
                <Tv className="w-4 h-4 text-indigo-600" />
                <span>{isEn ? 'Data Show & Smart View' : 'داتاشو & Smart View'}</span>
              </button>
            )}

            {/* Fullscreen Button */}
            {onToggleFullscreen && (
              <button
                id="fullscreen-toggle-btn"
                onClick={onToggleFullscreen}
                className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                  isFullscreen
                    ? 'bg-indigo-600 text-white border-indigo-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                title={isEn ? "Toggle Fullscreen" : "تفعيل وضع ملء الشاشة الكامل"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                <span>{isFullscreen ? (isEn ? 'Normal View' : 'شاشة عادية') : (isEn ? 'Full Screen' : 'ملء الشاشة')}</span>
              </button>
            )}

            {/* Font Size Toggle Button */}
            <button
              id="font-size-toggle-btn"
              onClick={handleFontSizeClick}
              className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                largeFont
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-300/60'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
              title={isEn ? "Change font size" : "تغيير حجم خط النصوص لتسهيل القراءة"}
            >
              <Type className={`w-4 h-4 ${largeFont ? 'text-white' : 'text-indigo-600'}`} />
              <span>{largeFont ? (isEn ? 'Font: Large' : 'الخط: كَبِير') : (isEn ? 'Font: Normal' : 'الخط: عَادِي')}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                soundEnabled
                  ? 'bg-amber-100/80 text-amber-950 border-amber-300 hover:bg-amber-200/80 ring-2 ring-amber-200/50'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>{isEn ? 'Sound ON' : 'الصوت مُفعَّل'}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span>{isEn ? 'Sound OFF' : 'الصوت متوقف'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-2 sm:gap-2.5 mt-3.5 overflow-x-auto pb-1 text-sm font-bold no-scrollbar">
          <button
            id="nav-tab-explore"
            onClick={() => handleNavClick('explore')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all text-xs sm:text-sm font-black border ${
              currentMode === 'explore'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-300/40'
                : 'bg-amber-50/70 border-amber-200/60 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? 'Interactive Board' : 'السَّبُّورَةُ التَّفَاعُلِيَّةُ'}</span>
          </button>

          <button
            id="nav-tab-compass"
            onClick={() => handleNavClick('compass')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all text-xs sm:text-sm font-black border ${
              currentMode === 'compass'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-600/25 ring-2 ring-indigo-300/40'
                : 'bg-amber-50/70 border-amber-200/60 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isEn ? 'Compass Workshop' : 'وَرْشَةُ الْفِرْجَارِ (الْمِدْوَرِ)'}</span>
          </button>

          <button
            id="nav-tab-cards"
            onClick={() => handleNavClick('cards')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all text-xs sm:text-sm font-black border ${
              currentMode === 'cards'
                ? 'bg-teal-600 text-white border-teal-700 shadow-md shadow-teal-600/25 ring-2 ring-teal-300/40'
                : 'bg-amber-50/70 border-amber-200/60 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'Circle Concepts' : 'الْمَفَاهِيمُ وَالشُّرُوحَاتُ'}</span>
          </button>

          <button
            id="nav-tab-realworld"
            onClick={() => handleNavClick('realworld')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all text-xs sm:text-sm font-black border ${
              currentMode === 'realworld'
                ? 'bg-orange-600 text-white border-orange-700 shadow-md shadow-orange-600/25 ring-2 ring-orange-300/40'
                : 'bg-amber-50/70 border-amber-200/60 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>{isEn ? 'Real Life Circles' : 'فِي حَيَاتِنَا الْيَوْمِيَّةِ'}</span>
          </button>

          <button
            id="nav-tab-quiz"
            onClick={() => handleNavClick('quiz')}
            className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all text-xs sm:text-sm font-black border ${
              currentMode === 'quiz'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md shadow-amber-500/25 ring-2 ring-amber-300'
                : 'bg-amber-50/70 border-amber-200/60 text-slate-700 hover:bg-amber-100/70 hover:border-amber-300'
            }`}
          >
            <Award className="w-4 h-4 text-amber-950" />
            <span>{isEn ? 'Quiz & Visual Puzzles' : 'تَحَدِّي الْبَطَلِ الرِّيَاضِيِّ'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
