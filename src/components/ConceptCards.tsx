import React, { useState } from 'react';
import { CONCEPTS_DATA } from '../data/circleCurriculum';
import { Volume2, Sparkles, HelpCircle, Check, ArrowRight, Calculator, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { speakArabicText } from '../utils/speech';

interface ConceptCardsProps {
  soundEnabled: boolean;
}

export const ConceptCards: React.FC<ConceptCardsProps> = ({ soundEnabled }) => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('circle');
  const [calcMode, setCalcMode] = useState<'radius_to_diameter' | 'diameter_to_radius'>('radius_to_diameter');
  const [calcRadius, setCalcRadius] = useState<number>(3);
  const [calcDiameter, setCalcDiameter] = useState<number>(8);

  const activeConcept = CONCEPTS_DATA.find((c) => c.id === selectedConceptId) || CONCEPTS_DATA[0];

  const handleSpeak = (text: string) => {
    speakArabicText(text);
  };

  const handleSpeakCalc = () => {
    if (calcMode === 'radius_to_diameter') {
      speakArabicText(`نِصْفُ الْقُطْرِ يُسَاوِي ${calcRadius} سَنْتِمِتْراً، إِذَنْ طُولُ الْقُطْرِ هُوَ: ${calcRadius} زَائِد ${calcRadius} يُسَاوِي ${calcRadius * 2} سَنْتِمِتْراً.`);
    } else {
      speakArabicText(`طُولُ الْقُطْرِ يُسَاوِي ${calcDiameter} سَنْتِمِتْراً، إِذَنْ طُولُ نِصْفِ الْقُطْرِ هُوَ: ${calcDiameter} تَقْسِيم 2 يُسَاوِي ${calcDiameter / 2} سَنْتِمِتْراً.`);
    }
  };

  return (
    <div className="space-y-6" id="concept-cards-view">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md shadow-teal-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="font-black text-lg md:text-xl">دليل مفاهيم الدائرة المبسطة</h2>
            <p className="text-xs md:text-sm text-teal-100 font-medium">
              تعاريف واضحة وخالية من الرموز المعقدة لمساعدتك على التفوق في الرياضيات
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSpeak(`${activeConcept.title}. ${activeConcept.definition}`)}
          className="self-start md:self-auto px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-2 border border-white/30 transition-all shadow-xs"
        >
          <Volume2 className="w-4 h-4 text-amber-300" />
          <span>استمع للمفهوم الحالي</span>
        </button>
      </div>

      {/* Concept Selector Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 no-scrollbar">
        {CONCEPTS_DATA.map((concept) => (
          <button
            key={concept.id}
            onClick={() => {
              setSelectedConceptId(concept.id);
              if (soundEnabled) speakArabicText(concept.title);
            }}
            className={`px-4 py-3 rounded-2xl font-black text-xs sm:text-sm shrink-0 border transition-all flex items-center gap-2 ${
              selectedConceptId === concept.id
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20 ring-4 ring-amber-300/40'
                : 'bg-white/90 border-amber-200/80 text-slate-700 hover:bg-amber-100/50 hover:border-amber-300 shadow-xs'
            }`}
          >
            <span>{concept.title}</span>
          </button>
        ))}
      </div>

      {/* Main Concept Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Illustrated Visual Card */}
        <div className="lg:col-span-5 bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 flex flex-col items-center justify-center space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">الرسم التوضيحي المباشر:</span>
            <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-2xs ${activeConcept.badgeColor}`}>
              {activeConcept.subtitle}
            </span>
          </div>

          {/* Mini Interactive SVG for this concept */}
          <div className="w-full h-64 bg-amber-50/40 rounded-3xl border border-amber-200/80 flex items-center justify-center p-3 shadow-inner">
            <svg viewBox="0 0 300 260" className="w-full h-full max-w-[260px]">
              {/* Main Circle */}
              <circle
                cx="150"
                cy="130"
                r="85"
                fill={activeConcept.id === 'circle' ? '#d1fae5' : 'none'}
                stroke={activeConcept.id === 'circle' ? '#059669' : '#94a3b8'}
                strokeWidth={activeConcept.id === 'circle' ? '4.5' : '2.5'}
              />

              {/* Center point */}
              <circle
                cx="150"
                cy="130"
                r={activeConcept.id === 'center' ? '7' : '5'}
                fill={activeConcept.id === 'center' ? '#e11d48' : '#64748b'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              {activeConcept.id === 'center' && (
                <g>
                  <circle
                    cx="150"
                    cy="130"
                    r="16"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />
                  <text x="150" y="102" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="black">
                    المركز (نقطة الوسط)
                  </text>
                </g>
              )}

              {/* Radius Highlight */}
              {activeConcept.id === 'radius' && (
                <g>
                  <line x1="150" y1="130" x2="225" y2="90" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="225" cy="90" r="6" fill="#d97706" />
                  <text x="195" y="98" fill="#b45309" fontSize="12" fontWeight="black">
                    نصف القطر
                  </text>
                </g>
              )}

              {/* Diameter Highlight */}
              {activeConcept.id === 'diameter' && (
                <g>
                  <line x1="75" y1="170" x2="225" y2="90" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="75" cy="170" r="6" fill="#1d4ed8" />
                  <circle cx="225" cy="90" r="6" fill="#1d4ed8" />
                  <text x="150" y="78" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="black">
                    القطر (يمر بالمركز)
                  </text>
                </g>
              )}

              {/* Chord Highlight: precisely connecting two points on the circle circumference (75, 90) and (190, 55) */}
              {activeConcept.id === 'chord' && (
                <g>
                  <line x1="75" y1="90" x2="190" y2="55" stroke="#9333ea" strokeWidth="4.5" strokeLinecap="round" />
                  <circle cx="75" cy="90" r="6" fill="#7e22ce" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="190" cy="55" r="6" fill="#7e22ce" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="135" y="65" textAnchor="middle" fill="#7e22ce" fontSize="13" fontWeight="black">
                    الوتر (يصل بين نقطتين من المحيط)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="w-full text-center text-xs text-slate-500 font-bold">
            شكل مبسط وواضح لتثبيت المفهوم في ذهن التلميذ
          </div>
        </div>

        {/* Right: Detailed Definition & Takeaways */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <h3 className="text-xl font-black text-slate-900">{activeConcept.title}</h3>
                <span className="text-xs text-slate-600 font-bold">{activeConcept.subtitle}</span>
              </div>
              <button
                onClick={() => handleSpeak(activeConcept.definition)}
                className="p-2.5 rounded-2xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border border-amber-200 transition-colors flex items-center gap-1.5 text-xs font-black shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>قراءة التعريف</span>
              </button>
            </div>

            {/* Main definition paragraph */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <p className="text-sm md:text-base font-black text-slate-900 leading-relaxed">
                {activeConcept.definition}
              </p>
            </div>

            {/* Key takeaways */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-800">النقاط المهمة التي يجب حفظها:</h4>
              <div className="space-y-2">
                {activeConcept.keyPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-xs border border-emerald-300">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fun Real-life Fact */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/70 to-orange-100/50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex items-start gap-2.5 shadow-2xs">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-black block mb-1 text-amber-950">فائدة ذكية من الحياة اليومية:</strong>
                <span className="text-slate-800 font-medium">{activeConcept.funFact}</span>
              </div>
            </div>
          </div>

          {/* Interactive Calculation Sandbox for 4th/5th Grade */}
          <div className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
              <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حَاسِبَةُ الْعَلَاقَةِ بَيْنَ نِصْفِ الْقُطْرِ وَالْقُطْرِ:</span>
              </h4>
              
              <button
                id="speak-calc-btn"
                onClick={handleSpeakCalc}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-950 text-xs font-black flex items-center gap-1.5 border border-amber-200/70 transition-all shadow-2xs"
                title="اِسْتَمِعْ لِلْعَمَلِيَّةِ الْحِسَابِيَّةِ بِصَوْتٍ وَاضِحٍ"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>اِسْتَمِعْ لِلْعَمَلِيَّةِ</span>
              </button>
            </div>

            {/* Mode selection tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                id="calc-mode-radius-btn"
                onClick={() => {
                  setCalcMode('radius_to_diameter');
                  if (soundEnabled) speakArabicText('حِسَابُ الْقُطْرِ انْطِلَاقاً مِنْ نِصْفِ الْقُطْرِ');
                }}
                className={`py-2 px-3 rounded-2xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                  calcMode === 'radius_to_diameter'
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-amber-50/50 border-amber-200/70 text-slate-700 hover:bg-amber-100/50'
                }`}
              >
                <span>حِسَابُ الْقُطْرِ (مَعْرِفَةُ نِصْفِ الْقُطْرِ)</span>
              </button>

              <button
                id="calc-mode-diameter-btn"
                onClick={() => {
                  setCalcMode('diameter_to_radius');
                  if (soundEnabled) speakArabicText('حِسَابُ نِصْفِ الْقُطْرِ انْطِلَاقاً مِنَ الْقُطْرِ');
                }}
                className={`py-2 px-3 rounded-2xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                  calcMode === 'diameter_to_radius'
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-amber-50/50 border-amber-200/70 text-slate-700 hover:bg-amber-100/50'
                }`}
              >
                <span>حِسَابُ نِصْفِ الْقُطْرِ (مَعْرِفَةُ الْقُطْرِ)</span>
              </button>
            </div>

            {/* Interactive Calculator Workspace */}
            {calcMode === 'radius_to_diameter' ? (
              <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-200/70">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 block">
                    اِخْتَرْ طُولَ نِصْفِ الْقُطْرِ:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setCalcRadius(num);
                          if (soundEnabled) {
                            speakArabicText(`نِصْفُ الْقُطْرِ يُسَاوِي ${num} سَنْتِمِتْراً، إِذَنْ طُولُ الْقُطْرِ هُوَ: ${num} زَائِد ${num} يُسَاوِي ${num * 2} سَنْتِمِتْراً.`);
                          }
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-black transition-all border ${
                          calcRadius === num
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-300'
                            : 'bg-white border-emerald-200/80 text-emerald-950 hover:bg-emerald-100/50'
                        }`}
                      >
                        {num} سَنْتِمِتْراً
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-emerald-300 text-center space-y-1.5 shadow-xs">
                  <div className="text-xs font-black text-slate-600">طُولُ الْقُطْرِ الْمَحْسُوبِ:</div>
                  <div className="text-2xl font-black text-emerald-700">
                    {calcRadius * 2} سَنْتِمِتْراً
                  </div>
                  <div className="text-xs text-slate-700 font-bold bg-emerald-50 py-1 px-3 rounded-lg inline-block border border-emerald-200">
                    الْعَمَلِيَّةُ: {calcRadius} + {calcRadius} = {calcRadius * 2} سَنْتِمِتْراً ({calcRadius} × 2 = {calcRadius * 2} سَنْتِمِتْراً)
                  </div>
                  <div className="text-[11px] text-emerald-900 font-medium">
                    الْقَاعِدَةُ: طُولُ الْقُطْرِ = نِصْفُ الْقُطْرِ + نِصْفُ الْقُطْرِ
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-blue-50/40 p-4 rounded-2xl border border-blue-200/70">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 block">
                    اِخْتَرْ طُولَ الْقُطْرِ:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[2, 4, 6, 8, 10, 12].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setCalcDiameter(num);
                          if (soundEnabled) {
                            speakArabicText(`طُولُ الْقُطْرِ يُسَاوِي ${num} سَنْتِمِتْراً، إِذَنْ طُولُ نِصْفِ الْقُطْرِ هُوَ: ${num} تَقْسِيم 2 يُسَاوِي ${num / 2} سَنْتِمِتْراً.`);
                          }
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-black transition-all border ${
                          calcDiameter === num
                            ? 'bg-blue-600 text-white border-blue-700 shadow-xs ring-2 ring-blue-300'
                            : 'bg-white border-blue-200/80 text-blue-950 hover:bg-blue-100/50'
                        }`}
                      >
                        {num} سَنْتِمِتْراً
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-blue-300 text-center space-y-1.5 shadow-xs">
                  <div className="text-xs font-black text-slate-600">طُولُ نِصْفِ الْقُطْرِ الْمَحْسُوبِ:</div>
                  <div className="text-2xl font-black text-blue-700">
                    {calcDiameter / 2} سَنْتِمِتْراً
                  </div>
                  <div className="text-xs text-slate-700 font-bold bg-blue-50 py-1 px-3 rounded-lg inline-block border border-blue-200">
                    الْعَمَلِيَّةُ: {calcDiameter} ÷ 2 = {calcDiameter / 2} سَنْتِمِتْراً
                  </div>
                  <div className="text-[11px] text-blue-900 font-medium">
                    الْقَاعِدَةُ: طُولُ نِصْفِ الْقُطْرِ = الْقُطْرُ ÷ 2
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
