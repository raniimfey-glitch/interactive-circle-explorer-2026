import React, { useState, useEffect } from 'react';
import { Compass, Play, RotateCcw, CheckCircle2, Ruler, Pencil, Sparkles, Volume2, Globe } from 'lucide-react';
import { AppLanguage } from '../types';
import { speakArabicText, speakEnglishText } from '../utils/speech';

interface CompassWorkshopProps {
  soundEnabled: boolean;
  language?: AppLanguage;
}

export const CompassWorkshop: React.FC<CompassWorkshopProps> = ({ 
  soundEnabled,
  language = 'bilingual'
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [radiusChoice, setRadiusChoice] = useState<number>(3.5); // cm
  const [drawProgress, setDrawProgress] = useState<number>(0); // 0 to 360 deg
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const scale = 36;
  const radiusPx = radiusChoice * scale;
  const center = { x: 250, y: 220 };

  // Step descriptions
  const stepsData = [
    {
      num: 1,
      title: 'تَحْدِيدُ الْمَرْكَزِ عَلَى الْوَرَقَةِ',
      titleEn: 'Marking the Center Point',
      desc: 'نَضَعُ نُقْطَةً وَاضِحَةً فِي الْمَكَانِ الْمُنَاسِبِ وَنُسَمِّيهَا "الْمَرْكَزَ". هَذِهِ النُّقْطَةُ سَنُثَبِّتُ عَلَيْهَا إِبْرَةَ الْفِرْجَارِ.',
      descEn: 'Place a clear dot on the notebook paper and call it the center. We will anchor the compass needle here.',
      sound: 'الْخَطْوَةُ الْأُولَى: نُحَدِّدُ نُقْطَةَ الْمَرْكَزِ عَلَى الْكُرَّاسِ بِوَضْعِ عَلَامَةٍ صَغِيرَةٍ بِالْقَلَمِ.',
      soundEn: 'Step 1: Mark the center point on the notebook paper with a small pencil dot.'
    },
    {
      num: 2,
      title: 'ضَبْطُ فَتْحَةِ الْفِرْجَارِ بِالْمِسْطَرَةِ',
      titleEn: 'Setting Compass Radius with Ruler',
      desc: `نَضَعُ إِبْرَةَ الْفِرْجَارِ عِنْدَ الصِّفْرِ عَلَى الْمِسْطَرَةِ الْمُدَرَّجَةِ، وَنَفْتَحُ السَّاقَ الْأُخْرَى حَتَّى تَصِلَ إِلَى قِيَاسِ نِصْفِ الْقُطْرِ (${radiusChoice} سَم).`,
      descEn: `Place the compass needle at zero on the ruler, and open the pencil arm to match the radius (${radiusChoice} cm).`,
      sound: `الْخَطْوَةُ الثَّانِيَةُ: نَفْتَحُ سَاقَيِ الْفِرْجَارِ بِالْمِسْطَرَةِ الْمُدَرَّجَةِ بِمِقْدَارِ نِصْفِ الْقُطْرِ، وَهُوَ ${radiusChoice} سَنْتِيمِتْراً.`,
      soundEn: `Step 2: Open the compass arms using the graduated ruler to the radius of ${radiusChoice} centimeters.`
    },
    {
      num: 3,
      title: 'تَثْبِيتُ الْإِبْرَةِ فِي الْمَرْكَزِ وَالتَّدْوِيرُ',
      titleEn: 'Planting Needle and Rotating Compass',
      desc: 'نَغْرِسُ إِبْرَةَ الْفِرْجَارِ فِي نُقْطَةِ الْمَرْكَزِ بِإِحْكَامٍ، وَنُمْسِكُ الْفِرْجَارَ مِنَ الْمَقْبَضِ الْعُلْوِيِّ وَنُدِيرُهُ بِلُطْفٍ لِرَسْمِ الْمُحِيطِ.',
      descEn: 'Press the compass needle firmly into the center point, hold the top handle, and gently rotate to draw the circle.',
      sound: 'الْخَطْوَةُ الثَّالِثَةُ: نُثَبِّتُ إِبْرَةَ الْفِرْجَارِ فِي الْمَرْكَزِ وَنُدِيرُ الْقَلَمَ لِرَسْمِ الدَّائِرَةِ كَامِلَةً.',
      soundEn: 'Step 3: Anchor the needle at the center and rotate the compass smoothly to draw the full circle.'
    },
    {
      num: 4,
      title: 'مَبْرُوكٌ! اِكْتَمَلَ رَسْمُ الدَّائِرَةِ',
      titleEn: 'Congratulations! Circle Complete',
      desc: `حَصَلْنَا عَلَى دَائِرَةٍ جَمِيلَةٍ مَرْكَزُهَا وَاضِحٌ، وَنِصْفُ قُطْرِهَا ${radiusChoice} سَم، وَقُطْرُهَا الْكُلِّيُّ ${radiusChoice * 2} سَم.`,
      descEn: `We now have a precise circle with a clear center, radius of ${radiusChoice} cm, and total diameter of ${radiusChoice * 2} cm.`,
      sound: `أَحْسَنْتَ يَا بَطَلُ! اِكْتَمَلَ رَسْمُ الدَّائِرَةِ بِنَجَاحٍ، طُولُ نِصْفِ قُطْرِهَا ${radiusChoice} سَنْتِيمِتْراً وَطُولُ قُطْرِهَا ${radiusChoice * 2} سَنْتِيمِتْراً.`,
      soundEn: `Well done champion! The circle is completely drawn with radius ${radiusChoice} cm and diameter ${radiusChoice * 2} cm.`
    }
  ];

  // Auto-animate drawing when in step 3 and drawing is triggered
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDrawing && drawProgress < 360) {
      interval = setInterval(() => {
        setDrawProgress((prev) => {
          if (prev >= 355) {
            setIsDrawing(false);
            setStep(4);
            if (soundEnabled) {
              if (language === 'en') {
                speakEnglishText(stepsData[3].soundEn);
              } else {
                speakArabicText(stepsData[3].sound);
              }
            }
            return 360;
          }
          return prev + 6;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isDrawing, drawProgress, soundEnabled, language]);

  const handleStartDraw = () => {
    setDrawProgress(0);
    setIsDrawing(true);
    if (soundEnabled) {
      if (language === 'en') {
        speakEnglishText('Rotating compass smoothly to draw the circle.');
      } else {
        speakArabicText('جَارِي تَدْوِيرُ الْفِرْجَارِ لِرَسْمِ الدَّائِرَةِ بِدِقَّةٍ.');
      }
    }
  };

  const handleReset = () => {
    setIsDrawing(false);
    setDrawProgress(0);
    setStep(1);
  };

  const handleStepClick = (s: 1 | 2 | 3 | 4) => {
    setStep(s);
    if (soundEnabled) {
      if (language === 'en') {
        speakEnglishText(stepsData[s - 1].soundEn);
      } else {
        speakArabicText(stepsData[s - 1].sound);
      }
    }
    if (s === 3 && drawProgress === 0) {
      handleStartDraw();
    }
  };

  const handleSpeakArabicCurrent = () => {
    speakArabicText(stepsData[step - 1].sound);
  };

  const handleSpeakEnglishCurrent = () => {
    speakEnglishText(stepsData[step - 1].soundEn);
  };

  // Pencil coordinates based on drawProgress
  const currentAngleRad = (drawProgress * Math.PI) / 180;
  const pencilPos = {
    x: center.x + radiusPx * Math.cos(currentAngleRad),
    y: center.y - radiusPx * Math.sin(currentAngleRad)
  };

  // Path arc calculation for the drawn stroke
  const getArcPath = () => {
    if (drawProgress <= 0) return '';
    if (drawProgress >= 360) {
      return `M ${center.x + radiusPx} ${center.y} A ${radiusPx} ${radiusPx} 0 1 0 ${center.x - radiusPx} ${center.y} A ${radiusPx} ${radiusPx} 0 1 0 ${center.x + radiusPx} ${center.y}`;
    }
    const startX = center.x + radiusPx;
    const startY = center.y;
    const endX = pencilPos.x;
    const endY = pencilPos.y;
    const largeArcFlag = drawProgress > 180 ? 1 : 0;
    return `M ${startX} ${startY} A ${radiusPx} ${radiusPx} 0 ${largeArcFlag} 0 ${endX} ${endY}`;
  };

  return (
    <div className="space-y-6" id="compass-workshop">
      {/* Workshop Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md shadow-teal-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Compass className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="font-black text-lg md:text-xl">
              {language === 'en' ? 'Virtual Compass Workshop' : 'وَرْشَةُ الْفِرْجَارِ (الْمِدْوَرِ) الِافْتِرَاضِيِّ'}
            </h2>
            <p className="text-xs md:text-sm text-teal-100 font-medium">
              {language === 'en'
                ? 'Learn step-by-step how to draw a perfect geometric circle using a compass and a ruler'
                : 'تَعَلَّمْ كَيْفَ تَرْسُمُ دَائِرَةً هَنْدَسِيَّةً مُتْقَنَةً خَطْوَةً بِخَطْوَةٍ بِالْفِرْجَارِ وَالْمِسْطَرَةِ الْمُدَرَّجَةِ'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (language === 'en') {
              speakEnglishText(stepsData[step - 1].soundEn);
            } else {
              speakArabicText(stepsData[step - 1].sound);
            }
          }}
          className="self-start md:self-auto px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-2 transition-all border border-white/30 shadow-xs"
        >
          <Volume2 className="w-4 h-4 text-amber-300" />
          <span>{language === 'en' ? 'Listen to Step Guide' : 'اِسْتَمِعْ لِإِرْشَادَاتِ الْخَطْوَةِ'}</span>
        </button>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stepsData.map((st) => (
          <button
            key={st.num}
            onClick={() => handleStepClick(st.num as 1 | 2 | 3 | 4)}
            className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2.5 ${
              step === st.num
                ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-4 ring-amber-300/40 font-black'
                : 'bg-white/90 border-amber-200/80 text-slate-700 hover:bg-amber-100/50 hover:border-amber-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shadow-xs ${
                  step === st.num ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 text-amber-900'
                }`}
              >
                {st.num}
              </span>
              {step > st.num ? (
                <CheckCircle2 className={`w-5 h-5 ${step === st.num ? 'text-slate-950' : 'text-emerald-600'}`} />
              ) : null}
            </div>
            <div>
              <div className={`text-xs ${step === st.num ? 'font-black text-slate-950' : 'font-bold text-slate-800'}`}>
                {language === 'en' ? st.titleEn : st.title}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Drawing Board */}
        <div className="lg:col-span-8 bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 flex flex-col items-center justify-between min-h-[460px]">
          {/* Controls Bar above drawing */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-800">
                {language === 'en' ? 'Compass Opening (Radius):' : 'فَتْحَةُ الْفِرْجَارِ (نِصْفُ الْقُطْرِ):'}
              </span>
              <div className="flex items-center gap-1.5 bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200">
                {[2.5, 3.5, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRadiusChoice(r);
                      setDrawProgress(0);
                      setStep(2);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                      radiusChoice === r
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-amber-950 hover:bg-amber-200/70'
                    }`}
                  >
                    {r} {language === 'en' ? 'cm' : 'سَم'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-2xl border border-amber-200/80 bg-amber-50/50 text-xs font-bold text-slate-700 hover:bg-amber-100/60 flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Clear Paper' : 'إِعَادَةُ الْوَرَقَةِ فَارِغَةً'}</span>
              </button>

              {drawProgress < 360 ? (
                <button
                  onClick={handleStartDraw}
                  disabled={isDrawing}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {isDrawing
                      ? (language === 'en' ? 'Drawing...' : 'جَارِي الرَّسْمُ...')
                      : (language === 'en' ? 'Rotate & Draw' : 'دَوِّرِ الْفِرْجَارَ وَارْسُمْ')}
                  </span>
                </button>
              ) : (
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'en' ? 'Perfect Circle Complete!' : 'دَائِرَةٌ كَامِلَةٌ وَمُتْقَنَةٌ!'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Canvas SVG */}
          <div className="w-full flex items-center justify-center py-4 relative">
            <svg
              viewBox="0 0 500 420"
              className="w-full max-w-[480px] h-[360px] bg-amber-50/40 rounded-3xl border border-amber-200/80 shadow-inner"
            >
              {/* Paper Grid Lines */}
              <defs>
                <pattern id="compass-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#fcd34d" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>
              </defs>
              <rect width="500" height="420" fill="url(#compass-grid)" />

              {/* Step 2: Virtual Ruler measuring the compass gap */}
              {step === 2 && (
                <g transform="translate(70, 340)">
                  <rect x="0" y="0" width="360" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                  {Array.from({ length: 11 }).map((_, i) => (
                    <g key={i}>
                      <line x1={i * scale} y1="0" x2={i * scale} y2="14" stroke="#92400e" strokeWidth="1.5" />
                      <text x={i * scale + 2} y="24" fill="#92400e" fontSize="10" fontWeight="bold">
                        {i}
                      </text>
                    </g>
                  ))}
                  {/* Compass opening indicator */}
                  <line
                    x1="0"
                    y1="-12"
                    x2={radiusPx}
                    y2="-12"
                    stroke="#dc2626"
                    strokeWidth="3.5"
                    strokeDasharray="4 2"
                  />
                  <text x={radiusPx / 2} y="-18" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="black">
                    فتحة نصف القطر = {radiusChoice} سم
                  </text>
                </g>
              )}

              {/* Drawn Arc/Circle */}
              <path
                d={getArcPath()}
                fill="none"
                stroke="#059669"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Center point and marker */}
              <g>
                <circle cx={center.x} cy={center.y} r="7" fill="#dc2626" />
                <line x1={center.x - 12} y1={center.y} x2={center.x + 12} y2={center.y} stroke="#dc2626" strokeWidth="2" />
                <line x1={center.x} y1={center.y - 12} x2={center.x} y2={center.y + 12} stroke="#dc2626" strokeWidth="2" />
                <text x={center.x - 10} y={center.y + 26} fill="#dc2626" fontSize="12" fontWeight="black">
                  المركز
                </text>
              </g>

              {/* Virtual Compass Instrument Overlay */}
              {(step >= 2 || isDrawing) && (
                <g>
                  {/* Needle leg (from joint to center) */}
                  <line
                    x1={center.x}
                    y1={center.y}
                    x2={(center.x + pencilPos.x) / 2}
                    y2={center.y - 120}
                    stroke="#475569"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  {/* Pencil leg (from joint to pencil tip) */}
                  <line
                    x1={pencilPos.x}
                    y1={pencilPos.y}
                    x2={(center.x + pencilPos.x) / 2}
                    y2={center.y - 120}
                    stroke="#3b82f6"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  {/* Compass Top Handle & Hinge */}
                  <circle cx={(center.x + pencilPos.x) / 2} cy={center.y - 120} r="10" fill="#1e293b" />
                  <rect
                    x={(center.x + pencilPos.x) / 2 - 4.5}
                    y={center.y - 148}
                    width="9"
                    height="28"
                    rx="4"
                    fill="#334155"
                  />

                  {/* Sharp Metal Needle Tip at Center */}
                  <circle cx={center.x} cy={center.y} r="3.5" fill="#0f172a" />

                  {/* Pencil Lead Tip at Drawing point */}
                  <polygon
                    points={`${pencilPos.x},${pencilPos.y} ${pencilPos.x - 5},${pencilPos.y - 14} ${pencilPos.x + 5},${pencilPos.y - 14}`}
                    fill="#2563eb"
                  />
                  <circle cx={pencilPos.x} cy={pencilPos.y} r="3.5" fill="#10b981" />
                </g>
              )}

              {/* In step 4: Show full radius line and measurement labels */}
              {step === 4 && (
                <g>
                  <line
                    x1={center.x}
                    y1={center.y}
                    x2={center.x + radiusPx}
                    y2={center.y}
                    stroke="#d97706"
                    strokeWidth="3.5"
                    strokeDasharray="4 2"
                  />
                  <rect
                    x={center.x + radiusPx / 2 - 45}
                    y={center.y - 26}
                    width="90"
                    height="20"
                    rx="6"
                    fill="#fffbeb"
                    stroke="#fde68a"
                    strokeWidth="1.5"
                  />
                  <text
                    x={center.x + radiusPx / 2}
                    y={center.y - 12}
                    textAnchor="middle"
                    fill="#b45309"
                    fontSize="11"
                    fontWeight="black"
                  >
                    نصف القطر: {radiusChoice} سم
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Interactive slider for manual drawing */}
          <div className="w-full bg-amber-100/50 p-4 rounded-2xl border border-amber-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-amber-950">
              <span>أو دوّر الفرجار يدوياً بإصبعك:</span>
              <span className="text-emerald-700 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">
                {Math.round((drawProgress / 360) * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={drawProgress}
              onChange={(e) => {
                const val = Number(e.target.value);
                setDrawProgress(val);
                if (val >= 360) setStep(4);
                else setStep(3);
              }}
              className="w-full accent-emerald-600 cursor-pointer h-2.5 bg-amber-200/80 rounded-lg"
            />
          </div>
        </div>

        {/* Instructions & Curriculum Tips */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-3.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 shadow-2xs">
                {language === 'en' ? `Step ${step} of 4` : `الخطوة رقم ${step} من 4`}
              </span>

              <div className="flex items-center gap-1.5">
                {language !== 'en' && (
                  <button
                    onClick={handleSpeakArabicCurrent}
                    className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-200 transition-colors flex items-center gap-1 text-xs font-black shadow-2xs"
                    title="استمع بالعربية"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>عربي</span>
                  </button>
                )}

                {language !== 'ar' && (
                  <button
                    onClick={handleSpeakEnglishCurrent}
                    className="p-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-950 border border-blue-200 transition-colors flex items-center gap-1 text-xs font-black shadow-2xs"
                    title="Listen in slow American English"
                  >
                    <span>🇺🇸</span>
                    <span>English</span>
                  </button>
                )}
              </div>
            </div>

            <h3 className="font-black text-base text-slate-900">
              {language === 'en' ? stepsData[step - 1].titleEn : stepsData[step - 1].title}
            </h3>
            {language === 'bilingual' && stepsData[step - 1].titleEn && (
              <div className="text-xs text-blue-800 font-bold -mt-2">
                🇺🇸 {stepsData[step - 1].titleEn}
              </div>
            )}

            {language !== 'en' && (
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {stepsData[step - 1].desc}
              </p>
            )}

            {(language === 'en' || language === 'bilingual') && stepsData[step - 1].descEn && (
              <p className={`text-xs sm:text-sm text-slate-800 font-medium leading-relaxed ${language === 'bilingual' ? 'pt-2 border-t border-amber-100 text-blue-950' : ''}`}>
                {language === 'bilingual' && <strong className="text-blue-800">🇺🇸 English: </strong>}
                {stepsData[step - 1].descEn}
              </p>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  if (step < 4) {
                    handleStepClick((step + 1) as 1 | 2 | 3 | 4);
                  } else {
                    handleReset();
                  }
                }}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
              >
                <span>
                  {step < 4 
                    ? (language === 'en' ? 'Next Step →' : 'الِانْتِقَالُ لِلْخَطْوَةِ التَّالِيَةِ ←') 
                    : (language === 'en' ? 'Draw a New Circle 🔄' : 'رَسْمُ دَائِرَةٍ جَدِيدَةٍ أُخْرَى 🔄')}
                </span>
              </button>
            </div>
          </div>

          {/* Advice for Primary School Exams */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 p-5 rounded-3xl space-y-2.5 text-indigo-950 shadow-sm">
            <h4 className="text-xs font-black flex items-center gap-1.5 text-indigo-950">
              <Pencil className="w-4 h-4 text-indigo-600" />
              <span>
                {language === 'en'
                  ? 'Teacher Tips for Accurate Exam Drawing:'
                  : 'نَصَائِحُ الْمُعَلِّمِ لِلرَّسْمِ الدَّقِيقِ فِي الِامْتِحَانِ:'}
              </span>
            </h4>
            {language === 'en' ? (
              <ul className="text-xs space-y-2 text-slate-700 list-disc list-inside font-medium leading-relaxed">
                <li>Make sure the compass screw is tightened securely so the legs do not slip.</li>
                <li>Align the pencil lead tip to match the exact height of the needle tip.</li>
                <li>Do not press hard on the pencil; rotate gently by the top handle only.</li>
                <li>Compass opening measured on the ruler is ALWAYS the <strong className="text-indigo-900 font-black">radius</strong>, not the diameter!</li>
              </ul>
            ) : (
              <ul className="text-xs space-y-2 text-slate-700 list-disc list-inside font-medium leading-relaxed">
                <li>تَأَكَّدْ مِنْ أَنَّ بُرْغِيَّ الْفِرْجَارِ مَشْدُودٌ جَيِّداً حَتَّى لَا تَنْزَلِقَ السَّاقُ أَثْنَاءَ التَّدْوِيرِ.</li>
                <li>اِجْعَلْ رَأْسَ قَلَمِ الرَّصَاصِ مُسَاوِياً لِطُولِ شَوْكَةِ الْفِرْجَارِ تَمَاماً.</li>
                <li>لَا تَضْغَطْ بِقُوَّةٍ عَلَى الْقَلَمِ، بَلْ دَوِّرِ الْفِرْجَارَ بِرِفْقٍ مِنَ الْمَقْبَضِ الْعُلْوِيِّ فَقَطْ.</li>
                <li>فَتْحَةُ الْفِرْجَارِ بِالْمِسْطَرَةِ دَائِماً تُمَثِّلُ <strong className="text-indigo-900 font-black">نِصْفَ الْقُطْرِ</strong> وَلَيْسَ الْقُطْرَ!</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
