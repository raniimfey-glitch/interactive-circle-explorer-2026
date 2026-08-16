import React, { useState } from 'react';
import { ChallengePuzzle } from '../types';
import { Eye, Ruler, RefreshCw, ZoomIn } from 'lucide-react';

interface ChallengeVisualDiagramProps {
  puzzle: ChallengePuzzle;
  isAnswered: boolean;
}

export const ChallengeVisualDiagram: React.FC<ChallengeVisualDiagramProps> = ({ puzzle, isAnswered }) => {
  const [showInteractiveDetail, setShowInteractiveDetail] = useState<boolean>(false);

  const { visualType, interactiveData, interactiveLabel } = puzzle;

  return (
    <div className="bg-gradient-to-b from-amber-50/50 via-white to-amber-50/40 rounded-3xl border-2 border-amber-200 p-4 space-y-3 shadow-inner">
      {/* Interactive Toggle Control Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setShowInteractiveDetail(!showInteractiveDetail)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-2xs ${
            showInteractiveDetail
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-sm'
              : 'bg-white hover:bg-amber-100/70 text-slate-800 border border-amber-300'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-amber-700" />
          <span>{showInteractiveDetail ? 'إِخْفَاءُ الْكَشْفِ الْبَصَرِيِّ' : interactiveLabel}</span>
        </button>

        <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200">
          🔍 رَسْمٌ هَنْدَسِيٌّ تَفَاعُلِيٌّ
        </span>
      </div>

      {/* SVG Canvas Container */}
      <div className="w-full h-64 sm:h-72 bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-700 shadow-inner">
        {/* Subtle grid pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* 1. Touching Circles Puzzle */}
        {visualType === 'touching_circles' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Circle 1 */}
            <circle cx="140" cy="110" r="60" fill="#059669" fillOpacity="0.2" stroke="#10b981" strokeWidth="3" />
            <circle cx="140" cy="110" r="4" fill="#ef4444" />
            <text x="140" y="100" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">الْمَرْكَزُ 1</text>
            
            {/* Radius 1 */}
            <line x1="140" y1="110" x2="200" y2="110" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="170" y="126" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">4 سم</text>

            {/* Circle 2 */}
            <circle cx="245" cy="110" r="45" fill="#2563eb" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="245" cy="110" r="4" fill="#ef4444" />
            <text x="245" y="100" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">الْمَرْكَزُ 2</text>

            {/* Radius 2 */}
            <line x1="200" y1="110" x2="245" y2="110" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="222" y="126" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">3 سم</text>

            {/* Point of Tangency */}
            <circle cx="200" cy="110" r="4" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
            <text x="200" y="80" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">نُقْطَةُ التَّمَاسِّ</text>

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <line x1="140" y1="145" x2="245" y2="145" stroke="#ec4899" strokeWidth="3" markerEnd="url(#arrow)" />
                <line x1="140" y1="115" x2="140" y2="155" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="245" y1="115" x2="245" y2="155" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 2" />
                <rect x="155" y="155" width="80" height="24" rx="6" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
                <text x="195" y="171" fill="#fdf2f8" fontSize="11" fontWeight="black" textAnchor="middle">4 + 3 = 7 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 2. Circle in Square Puzzle */}
        {visualType === 'circle_in_square' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Square */}
            <rect x="120" y="30" width="160" height="160" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" rx="4" />
            <text x="200" y="22" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">ضِلْعُ الْمُرَبَّعِ = 10 سم</text>
            <text x="100" y="115" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">10 سم</text>

            {/* Enclosed Circle */}
            <circle cx="200" cy="110" r="80" fill="#0d9488" fillOpacity="0.25" stroke="#2dd4bf" strokeWidth="3.5" />
            <circle cx="200" cy="110" r="4.5" fill="#f43f5e" />
            <text x="200" y="100" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">الْمَرْكَزُ</text>

            {/* Horizontal Diameter */}
            <line x1="120" y1="110" x2="280" y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

            {/* Radius Highlight */}
            <line x1="200" y1="110" x2="280" y2="110" stroke="#f59e0b" strokeWidth="3.5" />

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="140" y="130" width="120" height="40" rx="8" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1.5" />
                <text x="200" y="148" fill="#ccfbf1" fontSize="11" fontWeight="black" textAnchor="middle">الْقُطْرُ = 10 سم</text>
                <text x="200" y="163" fill="#fde047" fontSize="11" fontWeight="black" textAnchor="middle">نِصْفُ الْقُطْرِ = 10 ÷ 2 = 5 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 3. Wheel Comparison Puzzle */}
        {visualType === 'wheel_comparison' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Wheel 1 */}
            <g transform="translate(110, 110)">
              <circle cx="0" cy="0" r="65" fill="#334155" stroke="#64748b" strokeWidth="6" />
              <circle cx="0" cy="0" r="60" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
              {/* Spokes */}
              <line x1="-60" y1="0" x2="60" y2="0" stroke="#0ea5e9" strokeWidth="2.5" />
              <line x1="0" y1="-60" x2="0" y2="60" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="#f43f5e" />
              <text x="0" y="-75" fill="#bae6fd" fontSize="12" fontWeight="black" textAnchor="middle">الْعَجَلَةُ (1)</text>
              <text x="0" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">الْقُطْرُ = 16 سم</text>
            </g>

            {/* Wheel 2 */}
            <g transform="translate(290, 110)">
              <circle cx="0" cy="0" r="65" fill="#334155" stroke="#64748b" strokeWidth="6" />
              <circle cx="0" cy="0" r="60" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
              {/* Radius spoke */}
              <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="3" />
              <line x1="0" y1="0" x2="0" y2="-60" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="#f43f5e" />
              <text x="0" y="-75" fill="#a7f3d0" fontSize="12" fontWeight="black" textAnchor="middle">الْعَجَلَةُ (2)</text>
              <text x="0" y="20" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">نِصْفُ الْقُطْرِ = 8 سم</text>
            </g>

            {/* Center equal sign or comparison */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="165" y="85" width="70" height="50" rx="10" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                <text x="200" y="105" fill="#fef08a" fontSize="14" fontWeight="black" textAnchor="middle">8 × 2 = 16</text>
                <text x="200" y="125" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">مُتَطَابِقَتَانِ ⚖️</text>
              </g>
            )}
          </svg>
        )}

        {/* 4. Concentric Circles Puzzle */}
        {visualType === 'concentric_circles' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Outer Circle (Diameter 12 => Radius 75) */}
            <circle cx="200" cy="110" r="80" fill="#1e3a8a" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="3.5" />
            
            {/* Inner Circle (Radius 4 => Radius 50) */}
            <circle cx="200" cy="110" r="50" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
            
            {/* Center point */}
            <circle cx="200" cy="110" r="4.5" fill="#f43f5e" />
            <text x="200" y="100" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">مَرْكَزٌ مُشْتَرَكٌ</text>

            {/* Labels and lines */}
            <line x1="200" y1="110" x2="250" y2="110" stroke="#10b981" strokeWidth="2.5" />
            <text x="225" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">4 سم</text>

            <line x1="250" y1="110" x2="280" y2="110" stroke="#f59e0b" strokeWidth="3.5" />
            <text x="265" y="100" fill="#fde047" fontSize="11" fontWeight="black" textAnchor="middle">؟</text>

            <text x="200" y="25" fill="#93c5fd" fontSize="12" fontWeight="black" textAnchor="middle">
              قُطْرُ الدَّائِرَةِ الْكُبْرَى = 12 سم (نِصْفُ قُطْرِهَا = 6 سم)
            </text>

            {/* Interactive Detail Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="130" y="145" width="140" height="34" rx="8" fill="#172554" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="200" y="166" fill="#bfdbfe" fontSize="11" fontWeight="black" textAnchor="middle">
                  عَرْضُ الْحَلَقَةِ = 6 - 4 = 2 سم
                </text>
              </g>
            )}
          </svg>
        )}

        {/* 5. Chord as Diameter Puzzle */}
        {visualType === 'chord_as_diameter' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            <circle cx="200" cy="110" r="75" fill="#312e81" fillOpacity="0.25" stroke="#6366f1" strokeWidth="3.5" />
            <circle cx="200" cy="110" r="5" fill="#f43f5e" />
            <text x="200" y="95" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">الْمَرْكَزُ</text>

            {/* Chord spanning full diameter */}
            <line x1="125" y1="110" x2="275" y2="110" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="125" cy="110" r="4" fill="#fbbf24" />
            <circle cx="275" cy="110" r="4" fill="#fbbf24" />

            <text x="200" y="130" fill="#fef08a" fontSize="12" fontWeight="black" textAnchor="middle">
              وَتَرٌ طُولُهُ = 12 سم
            </text>
            <text x="200" y="25" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
              نِصْفُ الْقُطْرِ = 6 سم ➔ الْقُطْرُ الْكَامِلُ = 12 سم
            </text>

            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="110" y="145" width="180" height="34" rx="8" fill="#431407" stroke="#f97316" strokeWidth="1.5" />
                <text x="200" y="166" fill="#fed7aa" fontSize="11" fontWeight="black" textAnchor="middle">
                  ✨ هُوَ قُطْرٌ لِأَنَّهُ يَمُرُّ بِالْمَرْكَزِ (12 سم)
                </text>
              </g>
            )}
          </svg>
        )}

        {/* 6. Compass Opening Puzzle */}
        {visualType === 'compass_opening' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Ruler at bottom */}
            <g transform="translate(50, 140)">
              <rect x="0" y="0" width="300" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="4" />
              {/* Ruler ticks */}
              {Array.from({ length: 15 }).map((_, i) => (
                <g key={i} transform={`translate(${i * 20}, 0)`}>
                  <line x1="0" y1="0" x2="0" y2={i % 5 === 0 ? 18 : 10} stroke="#78350f" strokeWidth={i % 5 === 0 ? 2 : 1} />
                  {i % 2 === 0 && (
                    <text x="0" y="32" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle">{i}</text>
                  )}
                </g>
              ))}
            </g>

            {/* Compass positioned on ruler from 0 to 7 (gap = 140px) */}
            <g transform="translate(50, 40)">
              {/* Compass head */}
              <circle cx="70" cy="15" r="10" fill="#64748b" stroke="#334155" strokeWidth="2" />
              <circle cx="70" cy="15" r="3" fill="#cbd5e1" />
              {/* Needle leg (points to 0) */}
              <line x1="70" y1="15" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
              <polygon points="0,100 -2,90 2,90" fill="#94a3b8" />
              {/* Pencil leg (points to 7 => x=140) */}
              <line x1="70" y1="15" x2="140" y2="100" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <polygon points="140,100 137,88 143,88" fill="#d97706" />

              {/* Span indicator line */}
              <line x1="0" y1="75" x2="140" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
              <text x="70" y="70" fill="#fca5a5" fontSize="11" fontWeight="black" textAnchor="middle">فَتْحَةُ الْمِدْوَرِ</text>
            </g>

            <text x="200" y="25" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">
              الْمَطْلُوبُ: دَائِرَةٌ قُطْرُهَا 14 سم ➔ فَتْحَةُ الْمِدْوَرِ = نِصْفُ الْقُطْرِ!
            </text>

            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="230" y="60" width="150" height="40" rx="8" fill="#14532d" stroke="#4ade80" strokeWidth="1.5" />
                <text x="305" y="80" fill="#bbf7d0" fontSize="11" fontWeight="black" textAnchor="middle">نِصْفُ 14 = 7 سم</text>
                <text x="305" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">نَفْتَحُ الْمِدْوَرَ عَلَى 7 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 7. Clock Diameter Puzzle */}
        {visualType === 'clock_diameter' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Clock Frame */}
            <circle cx="200" cy="110" r="75" fill="#0f172a" stroke="#3b82f6" strokeWidth="5" />
            
            {/* Clock Numbers 12 and 6 */}
            <text x="200" y="55" fill="#f8fafc" fontSize="13" fontWeight="black" textAnchor="middle">12</text>
            <text x="200" y="175" fill="#f8fafc" fontSize="13" fontWeight="black" textAnchor="middle">6</text>
            <text x="265" y="115" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
            <text x="135" y="115" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">9</text>

            {/* Center Pivot */}
            <circle cx="200" cy="110" r="5" fill="#f43f5e" />

            {/* Minute Hand (pointing up to 12 => length 7cm ~ 50px) */}
            <line x1="200" y1="110" x2="200" y2="60" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
            <text x="225" y="85" fill="#6ee7b7" fontSize="10" fontWeight="bold">7 سم</text>

            {/* Hour Hand (pointing down to 6 => length 5cm ~ 35px) */}
            <line x1="200" y1="110" x2="200" y2="145" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
            <text x="225" y="135" fill="#fcd34d" fontSize="10" fontWeight="bold">5 سم</text>

            <text x="200" y="25" fill="#93c5fd" fontSize="12" fontWeight="black" textAnchor="middle">
              عِنْدَ السَّاعَةِ 6:00 يُشَكِّلُ الْعَقْرَبَانِ قُطْراً مُسْتَقِيماً يَمُرُّ بِالْمَرْكَزِ
            </text>

            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="20" y="85" width="105" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                <text x="72" y="105" fill="#c7d2fe" fontSize="11" fontWeight="black" textAnchor="middle">7 + 5</text>
                <text x="72" y="123" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">= 12 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 8. Tree Cross Section Puzzle */}
        {visualType === 'tree_cross_section' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Tree trunk bark and growth rings */}
            <circle cx="200" cy="110" r="80" fill="#78350f" stroke="#451a03" strokeWidth="8" />
            <circle cx="200" cy="110" r="74" fill="#92400e" />
            <circle cx="200" cy="110" r="60" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="200" cy="110" r="45" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="200" cy="110" r="30" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="200" cy="110" r="15" fill="none" stroke="#78350f" strokeWidth="1" />

            {/* Center Nail */}
            <circle cx="200" cy="110" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <text x="200" y="98" fill="#fecdd3" fontSize="11" fontWeight="bold" textAnchor="middle">الْمَرْكَزُ (الْمِسْمَارُ)</text>

            {/* Diameter Line */}
            <line x1="120" y1="110" x2="280" y2="110" stroke="#fde047" strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="200" y="130" fill="#fef08a" fontSize="11" fontWeight="black" textAnchor="middle">
              الْقُطْرُ الْكُلِّيُّ = 30 سم
            </text>

            {/* Radius Segment */}
            <line x1="200" y1="110" x2="280" y2="110" stroke="#22c55e" strokeWidth="4" />

            <text x="200" y="25" fill="#86efac" fontSize="12" fontWeight="black" textAnchor="middle">
              جِذْعُ الشَّجَرَةِ: الْمَسَافَةُ مِنَ الْمَرْكَزِ لِلَّحَاءِ = نِصْفُ الْقُطْرِ!
            </text>

            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="290" y="85" width="100" height="46" rx="8" fill="#14532d" stroke="#86efac" strokeWidth="1.5" />
                <text x="340" y="105" fill="#bbf7d0" fontSize="11" fontWeight="black" textAnchor="middle">30 ÷ 2</text>
                <text x="340" y="122" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">= 15 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 9. Two Circles in Rectangle Puzzle */}
        {visualType === 'two_circles_in_rectangle' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Rectangle Box */}
            <rect x="70" y="45" width="260" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* Box dimensions text */}
            <text x="50" y="115" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">8 سم</text>
            <text x="200" y="32" fill="#7dd3fc" fontSize="12" fontWeight="black" textAnchor="middle">
              طُولُ الصُّنْدُوقِ = قُطْرُ (1) + قُطْرُ (2)
            </text>

            {/* Circle 1 (Left) */}
            <circle cx="135" cy="110" r="60" fill="#0d9488" fillOpacity="0.3" stroke="#2dd4bf" strokeWidth="3" />
            <circle cx="135" cy="110" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="135" y="98" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">مَرْكَزُ (1)</text>
            <line x1="75" y1="110" x2="195" y2="110" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" />
            <text x="135" y="128" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">الْقُطْرُ = 8 سم</text>

            {/* Circle 2 (Right) */}
            <circle cx="265" cy="110" r="60" fill="#2563eb" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="3" />
            <circle cx="265" cy="110" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="265" y="98" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">مَرْكَزُ (2)</text>
            <line x1="205" y1="110" x2="325" y2="110" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3 3" />
            <text x="265" y="128" fill="#dbeafe" fontSize="11" fontWeight="bold" textAnchor="middle">الْقُطْرُ = 8 سم</text>

            {/* Point of contact between two circles */}
            <circle cx="200" cy="110" r="4" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <line x1="70" y1="190" x2="330" y2="190" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                <line x1="70" y1="175" x2="70" y2="195" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="330" y1="175" x2="330" y2="195" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="140" y="180" width="120" height="26" rx="6" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="200" y="197" fill="#fef3c7" fontSize="11" fontWeight="black" textAnchor="middle">
                  8 + 8 = 16 سم
                </text>
              </g>
            )}
          </svg>
        )}

        {/* 10. Semi Circle Apex/Radius Puzzle */}
        {visualType === 'semi_circle_diameter' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Semi Circle Filled and Bordered */}
            <path
              d="M 90 155 A 110 110 0 0 1 310 155 Z"
              fill="#4338ca"
              fillOpacity="0.25"
              stroke="#818cf8"
              strokeWidth="3.5"
            />

            {/* Base Diameter Line */}
            <line x1="90" y1="155" x2="310" y2="155" stroke="#a5b4fc" strokeWidth="3" />
            <circle cx="90" cy="155" r="4.5" fill="#c7d2fe" />
            <circle cx="310" cy="155" r="4.5" fill="#c7d2fe" />

            {/* Center Point */}
            <circle cx="200" cy="155" r="5.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <text x="200" y="174" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
              الْمَرْكَزُ (مُنْتَصَفُ الْقُطْرِ)
            </text>

            {/* Vertical Radius (Apex) */}
            <line x1="200" y1="155" x2="200" y2="45" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="4 3" />
            <circle cx="200" cy="45" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <text x="200" y="35" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">
              قِمَّةُ الْقَوْسِ
            </text>

            {/* Base Diameter text */}
            <text x="200" y="195" fill="#e0e7ff" fontSize="11" fontWeight="black" textAnchor="middle">
              قَاعِدَةُ نِصْفِ الدَّائِرَةِ (الْقُطْرُ) = 18 سم
            </text>

            {/* Radius label */}
            <text x="245" y="100" fill="#fde047" fontSize="11" fontWeight="bold">
              ارْتِفَاعُ الْقَوْسِ = ؟
            </text>

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="270" y="55" width="115" height="46" rx="8" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="327" y="75" fill="#fed7aa" fontSize="11" fontWeight="black" textAnchor="middle">18 ÷ 2</text>
                <text x="327" y="93" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">= 9 سم (نصف القطر)</text>
              </g>
            )}
          </svg>
        )}

        {/* 11. Fan Blades in Circle Puzzle */}
        {visualType === 'fan_blades_circle' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Outer Frame (Fan Guard) */}
            <circle cx="200" cy="110" r="75" fill="#0f172a" stroke="#0284c7" strokeWidth="4" />
            <circle cx="200" cy="110" r="70" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />

            {/* 4 Fan Blades */}
            <g>
              {/* Blade Top */}
              <path d="M 197 110 C 185 85, 185 55, 200 40 C 205 55, 205 85, 203 110 Z" fill="#38bdf8" fillOpacity="0.8" />
              {/* Blade Bottom */}
              <path d="M 197 110 C 185 135, 185 165, 200 180 C 205 165, 205 135, 203 110 Z" fill="#38bdf8" fillOpacity="0.8" />
              {/* Blade Right */}
              <path d="M 200 107 C 225 95, 255 95, 270 110 C 255 115, 225 115, 200 113 Z" fill="#0284c7" fillOpacity="0.8" />
              {/* Blade Left */}
              <path d="M 200 107 C 175 95, 145 95, 130 110 C 145 115, 175 115, 200 113 Z" fill="#0284c7" fillOpacity="0.8" />
            </g>

            {/* Center Motor Hub */}
            <circle cx="200" cy="110" r="12" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="200" cy="110" r="4.5" fill="#ef4444" />
            <text x="200" y="94" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">الْمِحْوَرُ</text>

            {/* Top Blade Highlight Radius */}
            <line x1="200" y1="110" x2="200" y2="35" stroke="#f59e0b" strokeWidth="3" />
            <text x="235" y="70" fill="#fde047" fontSize="10" fontWeight="bold">شَفْرَةٌ = نِصْفُ قُطْرٍ</text>

            <text x="200" y="24" fill="#bae6fd" fontSize="12" fontWeight="black" textAnchor="middle">
              قُطْرُ إِطَارِ الْمَرْوَحَةِ = 24 سم
            </text>

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="25" y="85" width="105" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="77" y="105" fill="#bae6fd" fontSize="11" fontWeight="black" textAnchor="middle">24 ÷ 2</text>
                <text x="77" y="123" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">= 12 سم</text>
              </g>
            )}
          </svg>
        )}

        {/* 12. Pizza Slice Sector Puzzle */}
        {visualType === 'pizza_slice_sector' && (
          <svg viewBox="0 0 400 220" className="w-full h-full p-2">
            {/* Pizza Base Disc */}
            <g transform="translate(200, 110)">
              {/* Main pizza body with a sector cut out */}
              <circle cx="0" cy="0" r="75" fill="#d97706" stroke="#78350f" strokeWidth="5" />
              <circle cx="0" cy="0" r="68" fill="#f59e0b" />
              
              {/* Toppings on main pizza */}
              <circle cx="-30" cy="-25" r="7" fill="#dc2626" />
              <circle cx="-20" cy="30" r="6" fill="#15803d" />
              <circle cx="10" cy="40" r="7" fill="#dc2626" />
              <circle cx="-45" cy="10" r="6" fill="#78350f" />
              <circle cx="35" cy="-25" r="7" fill="#15803d" />

              {/* Lifted Slice / Sector (Angle 300° to 360°) */}
              <g transform="translate(15, -15)">
                <path
                  d="M 0 0 L 65 -37 A 75 75 0 0 1 75 0 Z"
                  fill="#fbbf24"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
                {/* Topping on slice */}
                <circle cx="45" cy="-15" r="6" fill="#dc2626" />
                
                {/* Radius line on slice straight edge */}
                <line x1="0" y1="0" x2="65" y2="-37" stroke="#dc2626" strokeWidth="3" />
                <text x="30" y="-30" fill="#fef08a" fontSize="10" fontWeight="black">ضِلْعُ الْقِطْعَةِ (نِصْفُ قُطْرٍ)</text>
              </g>

              {/* Center point */}
              <circle cx="0" cy="0" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
              <text x="0" y="16" fill="#78350f" fontSize="10" fontWeight="black" textAnchor="middle">الْمَرْكَزُ</text>
            </g>

            <text x="200" y="24" fill="#fed7aa" fontSize="12" fontWeight="black" textAnchor="middle">
              قُرْصُ الْبِيتْزَا كَامِلاً: الْقُطْرُ = 20 سم
            </text>

            {/* Interactive / Answer Reveal */}
            {(showInteractiveDetail || isAnswered) && (
              <g>
                <rect x="25" y="85" width="105" height="50" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="77" y="105" fill="#fed7aa" fontSize="11" fontWeight="black" textAnchor="middle">20 ÷ 2</text>
                <text x="77" y="123" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">= 10 سم</text>
              </g>
            )}
          </svg>
        )}
      </div>

      <div className="text-[11px] text-slate-600 font-bold text-center">
        💡 اِسْتَعْمِلِ الرَّسْمَ الْهَنْدَسِيَّ أَعْلَاهُ لِاسْتِنْتَاجِ الْعَلَاقَةِ بَيْنَ الْقُطْرِ وَنِصْفِ الْقُطْرِ قَبْلَ اخْتِيَارِ الْإِجَابَةِ.
      </div>
    </div>
  );
};
