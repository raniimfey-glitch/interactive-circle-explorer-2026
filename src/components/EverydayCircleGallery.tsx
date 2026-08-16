import React, { useState } from 'react';
import { EVERYDAY_ITEMS } from '../data/circleCurriculum';
import { Bike, Clock, Coins, Disc, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { speakArabicText } from '../utils/speech';

interface EverydayCircleGalleryProps {
  soundEnabled: boolean;
}

export const EverydayCircleGallery: React.FC<EverydayCircleGalleryProps> = ({ soundEnabled }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('bike-wheel');
  const [highlightRole, setHighlightRole] = useState<'all' | 'center' | 'radius' | 'circle'>('all');

  const activeItem = EVERYDAY_ITEMS.find((i) => i.id === selectedItemId) || EVERYDAY_ITEMS[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Bike':
        return <Bike className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'Coins':
        return <Coins className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSpeak = (text: string) => {
    speakArabicText(text);
  };

  return (
    <div className="space-y-6" id="everyday-circle-gallery">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md shadow-teal-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h2 className="font-black text-lg md:text-xl">الدائرة في حياتنا اليومية والبيئة المحيطة</h2>
            <p className="text-xs md:text-sm text-teal-100 font-medium">
              اكتشف كيف أن الرياضيات والهندسة موجودة في كل الأشياء الجميلة من حولك
            </p>
          </div>
        </div>
      </div>

      {/* Item Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {EVERYDAY_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedItemId(item.id);
              setHighlightRole('all');
              if (soundEnabled) speakArabicText(item.title);
            }}
            className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between gap-3 ${
              selectedItemId === item.id
                ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 shadow-md shadow-amber-500/20 ring-4 ring-amber-300/40 text-slate-950 font-black'
                : 'bg-white/90 border-amber-200/80 text-slate-700 hover:bg-amber-100/50 hover:border-amber-300 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white bg-gradient-to-tr ${item.color} shadow-xs border border-white/20`}
              >
                {getIcon(item.iconName)}
              </div>
              {selectedItemId === item.id && (
                <span className="w-3 h-3 rounded-full bg-slate-950 ring-2 ring-amber-300"></span>
              )}
            </div>
            <div>
              <div className={`text-xs ${selectedItemId === item.id ? 'font-black text-slate-950' : 'font-black text-slate-800'}`}>
                {item.title}
              </div>
              <div className={`text-[10px] font-bold ${selectedItemId === item.id ? 'text-amber-950' : 'text-slate-500'}`}>
                {item.category}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Item Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Custom SVG Illustration with Interactive Hotspots */}
        <div className="lg:col-span-6 bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">العرض التوضيحي التفاعلي:</span>
            <div className="flex items-center gap-1.5 text-xs font-black">
              <button
                onClick={() => setHighlightRole('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  highlightRole === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-amber-100/60 text-slate-700 hover:bg-amber-200/60'
                }`}
              >
                عرض الكل
              </button>
              <button
                onClick={() => setHighlightRole('center')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  highlightRole === 'center' ? 'bg-rose-600 text-white shadow-xs' : 'bg-amber-100/60 text-slate-700 hover:bg-amber-200/60'
                }`}
              >
                المركز
              </button>
              <button
                onClick={() => setHighlightRole('radius')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  highlightRole === 'radius' ? 'bg-amber-600 text-white shadow-xs' : 'bg-amber-100/60 text-slate-700 hover:bg-amber-200/60'
                }`}
              >
                نصف القطر
              </button>
            </div>
          </div>

          {/* Graphical Representation */}
          <div className="w-full h-72 bg-amber-50/40 rounded-3xl border border-amber-200/80 flex items-center justify-center p-3 shadow-inner">
            <svg viewBox="0 0 320 280" className="w-full h-full max-w-[280px]">
              {selectedItemId === 'bike-wheel' && (
                <g>
                  {/* Outer Tyre */}
                  <circle cx="160" cy="140" r="105" fill="none" stroke="#1e293b" strokeWidth="14" />
                  <circle
                    cx="160"
                    cy="140"
                    r="98"
                    fill="none"
                    stroke={highlightRole === 'circle' || highlightRole === 'all' ? '#10b981' : '#cbd5e1'}
                    strokeWidth="3"
                  />

                  {/* Spokes (Radii) */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x2 = 160 + 98 * Math.cos(rad);
                    const y2 = 140 + 98 * Math.sin(rad);
                    return (
                      <line
                        key={i}
                        x1="160"
                        y1="140"
                        x2={x2}
                        y2={y2}
                        stroke={highlightRole === 'radius' || highlightRole === 'all' ? '#d97706' : '#94a3b8'}
                        strokeWidth={highlightRole === 'radius' ? '3' : '1.5'}
                      />
                    );
                  })}

                  {/* Center Hub */}
                  <circle cx="160" cy="140" r="18" fill="#475569" stroke="#0f172a" strokeWidth="2" />
                  <circle
                    cx="160"
                    cy="140"
                    r="7"
                    fill={highlightRole === 'center' || highlightRole === 'all' ? '#e11d48' : '#cbd5e1'}
                  />

                  {/* Text on item */}
                  <text x="160" y="270" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="black">
                    عجلة الدراجة: أسلاكها هي أنصاف أقطار
                  </text>
                </g>
              )}

              {selectedItemId === 'wall-clock' && (
                <g>
                  {/* Clock frame */}
                  <circle cx="160" cy="140" r="100" fill="#ffffff" stroke="#2563eb" strokeWidth="8" />
                  {/* Ticks */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                    const rad = (deg * Math.PI) / 180;
                    const x1 = 160 + 85 * Math.cos(rad);
                    const y1 = 140 + 85 * Math.sin(rad);
                    const x2 = 160 + 95 * Math.cos(rad);
                    const y2 = 140 + 95 * Math.sin(rad);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="2" />;
                  })}

                  {/* Minute Hand (Radius) */}
                  <line
                    x1="160"
                    y1="140"
                    x2="220"
                    y2="80"
                    stroke={highlightRole === 'radius' || highlightRole === 'all' ? '#d97706' : '#1e293b'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Hour Hand */}
                  <line x1="160" y1="140" x2="160" y2="85" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />

                  {/* Center pin */}
                  <circle
                    cx="160"
                    cy="140"
                    r="8"
                    fill={highlightRole === 'center' || highlightRole === 'all' ? '#e11d48' : '#0f172a'}
                  />

                  <text x="160" y="270" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="black">
                    ساعة الحائط: عقاربها هي أنصاف أقطار
                  </text>
                </g>
              )}

              {selectedItemId === 'coin' && (
                <g>
                  {/* Algerian Dinar Coin (Solid Disc) */}
                  <circle cx="160" cy="140" r="95" fill="#fef08a" stroke="#ca8a04" strokeWidth="8" />
                  <circle cx="160" cy="140" r="75" fill="#fef9c3" stroke="#eab308" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="160" y="130" textAnchor="middle" fill="#854d0e" fontSize="22" fontWeight="black">
                    100
                  </text>
                  <text x="160" y="160" textAnchor="middle" fill="#854d0e" fontSize="14" fontWeight="black">
                    دينار جزائري
                  </text>
                  <circle
                    cx="160"
                    cy="140"
                    r="5"
                    fill={highlightRole === 'center' ? '#e11d48' : '#a16207'}
                  />
                  <text x="160" y="270" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="black">
                    القرص: مساحة ممتلئة وصلبة
                  </text>
                </g>
              )}

              {selectedItemId === 'steering-wheel' && (
                <g>
                  {/* Steering Rim */}
                  <circle cx="160" cy="140" r="100" fill="none" stroke="#1e293b" strokeWidth="16" />
                  {/* Spokes */}
                  <line x1="160" y1="140" x2="70" y2="140" stroke="#475569" strokeWidth="8" />
                  <line x1="160" y1="140" x2="250" y2="140" stroke="#475569" strokeWidth="8" />
                  <line x1="160" y1="140" x2="160" y2="230" stroke="#475569" strokeWidth="8" />
                  {/* Center Horn */}
                  <circle cx="160" cy="140" r="28" fill="#334155" />
                  <circle
                    cx="160"
                    cy="140"
                    r="8"
                    fill={highlightRole === 'center' || highlightRole === 'all' ? '#e11d48' : '#94a3b8'}
                  />
                  <text x="160" y="270" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="black">
                    مِقود السيارة: أذرعه أنصاف أقطار
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right: Explanations breakdown */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900">{activeItem.title}</h3>
                <span className="text-xs text-slate-600 font-bold">{activeItem.category}</span>
              </div>
              <button
                onClick={() =>
                  handleSpeak(
                    `${activeItem.title}. ${activeItem.description} ${activeItem.circleRole} ${activeItem.centerRole} ${activeItem.radiusRole}`
                  )
                }
                className="p-2.5 rounded-2xl bg-amber-100/70 hover:bg-amber-200/80 text-amber-950 border border-amber-200 transition-colors flex items-center gap-1.5 text-xs font-black shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>استمع للشرح</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {activeItem.description}
            </p>

            {/* Elements matching table */}
            <div className="space-y-2.5 pt-2">
              {/* Circle Role */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3 shadow-2xs">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                <div>
                  <strong className="text-xs font-black text-emerald-950 block">الدائرة (أو القرص):</strong>
                  <span className="text-xs text-slate-700 font-medium">{activeItem.circleRole}</span>
                </div>
              </div>

              {/* Center Role */}
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-start gap-3 shadow-2xs">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 mt-1"></span>
                <div>
                  <strong className="text-xs font-black text-rose-950 block">المركز:</strong>
                  <span className="text-xs text-slate-700 font-medium">{activeItem.centerRole}</span>
                </div>
              </div>

              {/* Radius Role */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 shadow-2xs">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                <div>
                  <strong className="text-xs font-black text-amber-950 block">نصف القطر:</strong>
                  <span className="text-xs text-slate-700 font-medium">{activeItem.radiusRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
