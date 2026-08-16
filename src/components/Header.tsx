import React from 'react';
import { Compass, Sparkles, BookOpen, Layers, Award, Bike, Volume2, VolumeX, Type } from 'lucide-react';
import { ExplorerMode } from '../types';
import { stopArabicSpeech, speakArabicText } from '../utils/speech';

interface HeaderProps {
  currentMode: ExplorerMode;
  onSelectMode: (mode: ExplorerMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  largeFont: boolean;
  onToggleFontSize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  soundEnabled,
  onToggleSound,
  largeFont,
  onToggleFontSize,
}) => {
  const handleNavClick = (mode: ExplorerMode) => {
    stopArabicSpeech();
    onSelectMode(mode);
  };

  const handleFontSizeClick = () => {
    const nextVal = !largeFont;
    onToggleFontSize();
    if (soundEnabled) {
      speakArabicText(nextVal ? 'تَمَّ تَكْبِيرُ حَجْمِ الْخَطِّ لِتَسْهِيلِ الْقِرَاءَةِ' : 'تَمَّتِ الْعَوْدَةُ إِلَى حَجْمِ الْخَطِّ الْعَادِيِّ');
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-200/80 sticky top-0 z-30 shadow-sm" id="app-header">
      {/* Algerian curriculum notification ribbon with vibrant accent */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-amber-100 px-4 py-1.5 text-xs md:text-sm font-semibold flex items-center justify-between border-b border-emerald-700/50">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-300"></span>
            <span className="tracking-wide">الرياضيات - الطور الابتدائي (السنة 4 و 5) • مناهج الجيل الثاني (الجزائر)</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-emerald-200 text-xs font-medium">
            <span className="bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-600/40">مفهوم الدائرة والقرص وعناصرها دون تعقيد</span>
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
                  <span>مُستكشِف الدَّائرة التَّفاعُلي</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs border border-amber-300">
                    مبسَّط للأطفال
                  </span>
                </h1>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  اكتشف المركز، نصف القطر، القطر، والوتر بتجارب بصرية تفاعلية
                </p>
              </div>
            </div>

            {/* Quick settings controls for mobile */}
            <div className="flex items-center gap-1.5 md:hidden">
              {/* Font Size Toggle Mobile */}
              <button
                id="font-size-toggle-btn-mobile"
                onClick={handleFontSizeClick}
                className={`p-2.5 rounded-xl border text-sm font-black flex items-center gap-1 transition-all shadow-xs ${
                  largeFont
                    ? 'bg-indigo-100 text-indigo-950 border-indigo-300 ring-2 ring-indigo-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
                title={largeFont ? 'إعادة حجم الخط العادي' : 'تكبير الخط لإمكانية الوصول'}
              >
                <Type className="w-4 h-4 text-indigo-700" />
                <span className="text-xs">{largeFont ? 'كبير' : 'عادي'}</span>
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
                title={soundEnabled ? 'تعطيل القراءة الصوتية' : 'تفعيل القراءة الصوتية'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Actions & Settings (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Font Size Toggle Button (Accessibility) */}
            <button
              id="font-size-toggle-btn"
              onClick={handleFontSizeClick}
              className={`px-3.5 py-2 rounded-xl border text-xs font-black flex items-center gap-2 transition-all shadow-xs ${
                largeFont
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-300/60'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
              title="تغيير حجم خط النصوص لتسهيل القراءة ودعم إمكانية الوصول"
            >
              <Type className={`w-4 h-4 ${largeFont ? 'text-white' : 'text-indigo-600'}`} />
              <span>{largeFont ? 'حجم الخط: كَبِير (مُفَعَّل)' : 'حجم الخط: عَادِي (اِضْغَطْ لِلتَّكْبِيرِ)'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className={`px-3.5 py-2 rounded-xl border text-xs font-black flex items-center gap-2 transition-all shadow-xs ${
                soundEnabled
                  ? 'bg-amber-100/80 text-amber-950 border-amber-300 hover:bg-amber-200/80 ring-2 ring-amber-200/50'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  <span>الصوت مُفعَّل (استمع للشرح)</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span>الصوت متوقف</span>
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
            <span>السبورة التفاعلية</span>
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
            <span>ورشة الفرجار (المدور)</span>
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
            <span>المفاهيم والشروحات</span>
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
            <span>في حياتنا اليومية</span>
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
            <span>تحدي البطل الرياضي</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
