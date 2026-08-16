import React, { useState, useRef, useEffect } from 'react';
import { 
  CircleDot, 
  Ruler, 
  HelpCircle, 
  RotateCw, 
  Volume2, 
  Eye, 
  EyeOff, 
  Sparkles,
  MoveHorizontal,
  Info,
  CheckCircle2
} from 'lucide-react';
import { speakArabicText } from '../utils/speech';

interface InteractiveCircleExplorerProps {
  soundEnabled: boolean;
}

export const InteractiveCircleExplorer: React.FC<InteractiveCircleExplorerProps> = ({
  soundEnabled,
}) => {
  // Geometric State
  const [radiusCm, setRadiusCm] = useState<number>(4); // in virtual cm (2 to 6 cm)
  const [radiusAngle, setRadiusAngle] = useState<number>(30); // in degrees
  const [chordAngle1, setChordAngle1] = useState<number>(120); // in degrees
  const [chordAngle2, setChordAngle2] = useState<number>(230); // in degrees
  
  // Visibility toggles
  const [showCenter, setShowCenter] = useState<boolean>(true);
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [showMultipleRadii, setShowMultipleRadii] = useState<boolean>(false);
  const [showDiameter, setShowDiameter] = useState<boolean>(false);
  const [showChord, setShowChord] = useState<boolean>(false);
  const [showDisc, setShowDisc] = useState<boolean>(false);
  const [showRuler, setShowRuler] = useState<boolean>(true);

  // Active highlighted item for detailed pedagogical tip
  const [focusedElement, setFocusedElement] = useState<'center' | 'radius' | 'diameter' | 'chord' | 'disc' | 'circle'>('radius');

  // Dragging state
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingTarget, setDraggingTarget] = useState<'radius' | 'chord1' | 'chord2' | null>(null);

  // Conversion: 1 virtual cm = 32 pixels for clear rendering
  const scale = 32;
  const radiusPx = radiusCm * scale;
  const centerCoord = { x: 260, y: 240 };

  // Calculate coordinates
  const radAngleRad = (radiusAngle * Math.PI) / 180;
  const radiusPoint = {
    x: centerCoord.x + radiusPx * Math.cos(radAngleRad),
    y: centerCoord.y - radiusPx * Math.sin(radAngleRad),
  };

  // Diameter points (opposite endpoints passing through center)
  const diamPoint1 = {
    x: centerCoord.x + radiusPx * Math.cos(radAngleRad),
    y: centerCoord.y - radiusPx * Math.sin(radAngleRad),
  };
  const diamPoint2 = {
    x: centerCoord.x - radiusPx * Math.cos(radAngleRad),
    y: centerCoord.y + radiusPx * Math.sin(radAngleRad),
  };

  // Chord points
  const chord1Rad = (chordAngle1 * Math.PI) / 180;
  const chord2Rad = (chordAngle2 * Math.PI) / 180;
  const chordPoint1 = {
    x: centerCoord.x + radiusPx * Math.cos(chord1Rad),
    y: centerCoord.y - radiusPx * Math.sin(chord1Rad),
  };
  const chordPoint2 = {
    x: centerCoord.x + radiusPx * Math.cos(chord2Rad),
    y: centerCoord.y - radiusPx * Math.sin(chord2Rad),
  };

  // Chord length in cm
  const chordLengthPx = Math.hypot(chordPoint1.x - chordPoint2.x, chordPoint1.y - chordPoint2.y);
  const chordLengthCm = (chordLengthPx / scale).toFixed(1);
  const diameterCm = (radiusCm * 2);

  // Check if chord is nearly a diameter (difference around 180 deg)
  const angleDiff = Math.abs((chordAngle1 - chordAngle2 + 360) % 360);
  const isChordNearDiameter = Math.abs(angleDiff - 180) < 15;

  // Handle pointer dragging on SVG
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingTarget || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Relative to center
    const dx = clientX - centerCoord.x;
    const dy = centerCoord.y - clientY; // invert Y for standard trig
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (deg < 0) deg += 360;

    if (draggingTarget === 'radius') {
      setRadiusAngle(Math.round(deg));
    } else if (draggingTarget === 'chord1') {
      setChordAngle1(Math.round(deg));
    } else if (draggingTarget === 'chord2') {
      setChordAngle2(Math.round(deg));
    }
  };

  const stopDragging = () => {
    setDraggingTarget(null);
  };

  // Preset scenarios for easy primary classroom exploration
  const applyPreset = (preset: 'circle' | 'center' | 'radius' | 'chord' | 'diameter' | 'disc' | 'compare' | 'all') => {
    if (preset === 'circle') {
      setShowCenter(true);
      setShowRadius(false);
      setShowMultipleRadii(false);
      setShowDiameter(false);
      setShowChord(false);
      setShowDisc(false);
      setFocusedElement('circle');
      if (soundEnabled) speakArabicText('الدائرة: خط منحني مغلق ومستوٍ، كل نقاطه تبعد بنفس المسافة عن نقطة ثابتة في وسطه تسمى المركز.');
    } else if (preset === 'center') {
      setShowCenter(true);
      setShowRadius(false);
      setShowMultipleRadii(false);
      setShowDiameter(false);
      setShowChord(false);
      setShowDisc(false);
      setFocusedElement('center');
      if (soundEnabled) speakArabicText('المركز: نقطة وحيدة في وسط الدائرة تماماً، ونضع عليها إبرة المِدْوَر عند الرسم.');
    } else if (preset === 'radius') {
      setShowCenter(true);
      setShowRadius(true);
      setShowMultipleRadii(false);
      setShowDiameter(false);
      setShowChord(false);
      setShowDisc(false);
      setFocusedElement('radius');
      if (soundEnabled) speakArabicText('نصف القطر: قطعة مستقيمة تصل بين المركز وأي نقطة على الدائرة.');
    } else if (preset === 'chord') {
      setShowCenter(true);
      setShowRadius(false);
      setShowMultipleRadii(false);
      setShowDiameter(false);
      setShowChord(true);
      setShowDisc(false);
      setFocusedElement('chord');
      if (soundEnabled) speakArabicText('الوتر: قطعة مستقيمة تصل بين أي نقطتين على الدائرة.');
    } else if (preset === 'diameter') {
      setShowCenter(true);
      setShowRadius(false);
      setShowMultipleRadii(false);
      setShowDiameter(true);
      setShowChord(false);
      setShowDisc(false);
      setFocusedElement('diameter');
      if (soundEnabled) speakArabicText(`الْقُطْرُ: وَتَرٌ يَمُرُّ بِالْمَرْكَزِ وَيُسَاوِي ضِعْفَ نِصْفِ الْقُطْرِ. إِذَا كَانَ نِصْفُ الْقُطْرِ ${radiusCm} سَنْتِمِتْراً، فَالْقُطْرُ يُسَاوِي ${diameterCm} سَنْتِمِتْراً.`);
    } else if (preset === 'disc') {
      setShowCenter(true);
      setShowRadius(true);
      setShowMultipleRadii(false);
      setShowDiameter(false);
      setShowChord(false);
      setShowDisc(true);
      setFocusedElement('disc');
      if (soundEnabled) speakArabicText('الْقُرْصُ هُوَ الْمِسَاحَةُ الْمُمْتَلِئَةُ دَاخِلَ الدَّائِرَةِ مِثْلَ قِطْعَةِ النُّقُودِ، بَيْنَمَا الدَّائِرَةُ هِيَ الْخَطُّ الْخَارِجِيُّ فَقَطْ مِثْلَ السِّوَارِ.');
    } else if (preset === 'compare') {
      setShowCenter(true);
      setShowRadius(true);
      setShowMultipleRadii(false);
      setShowDiameter(true);
      setShowChord(false);
      setShowDisc(false);
      setFocusedElement('diameter');
      if (soundEnabled) speakArabicText(`مُقَارَنَةٌ: الْقُطْرُ يُسَاوِي نِصْفَيْ قُطْرٍ. الْقُطْرُ طُولُهُ ${diameterCm} سَنْتِمِتْراً وَنِصْفُ الْقُطْرِ طُولُهُ ${radiusCm} سَنْتِمِتْراً.`);
    } else if (preset === 'all') {
      setShowCenter(true);
      setShowRadius(true);
      setShowMultipleRadii(false);
      setShowDiameter(true);
      setShowChord(true);
      setShowDisc(false);
      setFocusedElement('circle');
    }
  };

  // Educational narrative box content
  const getExplanation = () => {
    switch (focusedElement) {
      case 'circle':
        return {
          title: 'ما هي الدائرة؟',
          badge: 'المفهوم الأساسي',
          color: 'bg-emerald-50/90 border-emerald-300 text-emerald-950',
          text: 'الدائرة هي خط منحني مغلق ومستوٍ. كل نقطة تقع على هذا الخط تبعد بنفس المسافة تماماً عن نقطة في الوسط تسمى المركز. الدائرة فارغة من الداخل مثل الخاتم أو إطار العجلة.',
          tip: 'نرسم الدائرة بدقة تامة في كراس الرياضيات باستعمال أداة المِدْوَر (الفرجار) والمسطرة المدرجة.'
        };
      case 'center':
        return {
          title: 'ما هو المركز؟',
          badge: 'نقطة الوسط',
          color: 'bg-rose-50/90 border-rose-300 text-rose-950',
          text: 'المركز هو النقطة الوحيدة الثابتة في قلب الدائرة ووسطها تماماً. تبعد جميع نقاط الدائرة عن المركز بنفس المسافة دائماً. نغرس فيه إبرة المِدْوَر عند بدء الرسم.',
          tip: 'نسميه بالكلمة البسيطة "المركز" دون الحاجة لأي رموز معقدة.'
        };
      case 'radius':
        return {
          title: `ما هو نصف القطر؟ (${radiusCm} سنتيمتر)`,
          badge: 'المسافة من المركز للدائرة',
          color: 'bg-orange-50/90 border-orange-300 text-orange-950',
          text: `نصف القطر هو كل قطعة مستقيمة تصل بين المركز وأي نقطة تقع على الدائرة. طوله هنا في الرسم هو ${radiusCm} سنتيمتر. يمكنك تدويره وسحبه ولاحظ أن طوله يبقى ثابتاً في كل الاتجاهات!`,
          tip: 'كل أنصاف أقطار الدائرة الواحدة متقايسة ولها نفس الطول تماماً!'
        };
      case 'chord':
        return {
          title: `ما هو الوتر؟ (${chordLengthCm} سنتيمتر)`,
          badge: 'القطعة بين نقطتين',
          color: 'bg-purple-50/90 border-purple-300 text-purple-950',
          text: `الوتر هو قطعة مستقيمة تصل بين أي نقطتين تقعان على الدائرة. اسحب النقطتين البنفسجيتين على محيط الدائرة بيدك لترى كيف يتغير طول الوتر بحرية!`,
          tip: isChordNearDiameter ? '✨ انظر! عندما يمر الوتر بالمركز مباشرة، يصبح اسمه "قطراً" وهو أطول وتر في الدائرة!' : 'الوتر لا يشترط مروره بالمركز.'
        };
      case 'diameter':
        return {
          title: `ما هو القطر؟ (${diameterCm} سنتيمتر)`,
          badge: 'يمر بالمركز ويقسم الدائرة',
          color: 'bg-blue-50/90 border-blue-300 text-blue-950',
          text: `القطر هو قطعة مستقيمة تصل بين نقطتين من الدائرة وتمر حتماً بالمركز. طول القطر يساوي ضِعف نصف القطر (${radiusCm} + ${radiusCm} = ${diameterCm} سم). القطر يقسم الدائرة إلى نصفين متطابقين تماماً.`,
          tip: 'القطر هو أطول وتر في الدائرة لأنه يمر بالمركز.'
        };
      case 'disc':
        return {
          title: 'ما هو القرص؟ (الفرق بين القرص والدائرة)',
          badge: 'المساحة الممتلئة',
          color: 'bg-teal-50/90 border-teal-300 text-teal-950',
          text: 'الدائرة هي الخط الخارجي فقط (فارغة من الداخل مثل السوار)، أما القرص فهو الدائرة مع كل المنطقة الملونة والممتلئة بداخلها (مثل قطعة الدينار الجزائري أو الصحن).',
          tip: 'في الرياضيات نقول: محيط الدائرة، بينما نقول مساحة القرص.'
        };
      default:
        return {
          title: 'مستكشف عناصر الدائرة',
          badge: 'لوحة التحكم',
          color: 'bg-amber-50 border-amber-300 text-amber-950',
          text: 'اضغط على أي عنصر في لوحة المفاهيم للتعرف عليه وملاحظته مباشرة على الرسم الهندسي!',
          tip: 'يمكنك تغيير طول نصف القطر وتدوير القطع بحرية تامة.'
        };
    }
  };

  const explanation = getExplanation();

  const handleSpeakActive = () => {
    speakArabicText(`${explanation.title}. ${explanation.text} ${explanation.tip}`);
  };

  return (
    <div className="space-y-6" id="interactive-circle-explorer">
      {/* Top quick helper banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md shadow-teal-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h2 className="font-black text-base md:text-lg">مستكشف الدائرة ومفاهيمها الأساسية (دون رموز)</h2>
            <p className="text-xs text-teal-100 font-medium mt-0.5">
              مخصص للسنتين الرابعة والخامسة ابتدائي وفق مناهج الجيل الثاني في الجزائر
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowCenter(true);
              setShowRadius(true);
              setShowDiameter(true);
              setShowChord(true);
              setShowDisc(false);
              setFocusedElement('circle');
              if (soundEnabled) speakArabicText('عرض جميع عناصر الدائرة: المركز، نصف القطر، الوتر، والقطر.');
            }}
            className="px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all font-black text-xs shadow-sm border border-amber-300 ring-2 ring-amber-300/50"
          >
            إظهار كل العناصر معاً
          </button>
        </div>
      </div>

      {/* The 4 Core Required Concepts Quick Bar (الدائرة، المركز، نصف القطر، الوتر) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. الدائرة */}
        <button
          onClick={() => applyPreset('circle')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'circle'
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-4 ring-emerald-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-emerald-50 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-4 h-4 rounded-full border-2 border-current"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'circle' ? 'bg-white/20' : 'bg-emerald-100 text-emerald-800'}`}>1</span>
          </div>
          <div>
            <div className="font-black text-xs">ما هي الدائرة؟</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'circle' ? 'text-emerald-100' : 'text-slate-500'}`}>الخط المنحني المغلق</div>
          </div>
        </button>

        {/* 2. المركز */}
        <button
          onClick={() => applyPreset('center')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'center'
              ? 'bg-rose-600 text-white border-rose-700 shadow-md ring-4 ring-rose-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-rose-50 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-400"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'center' ? 'bg-white/20' : 'bg-rose-100 text-rose-800'}`}>2</span>
          </div>
          <div>
            <div className="font-black text-xs">المركز</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'center' ? 'text-rose-100' : 'text-slate-500'}`}>نقطة الوسط الثابتة</div>
          </div>
        </button>

        {/* 3. نصف القطر */}
        <button
          onClick={() => applyPreset('radius')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'radius'
              ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-4 ring-orange-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-orange-50 hover:border-orange-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-5 h-1 bg-orange-300 rounded-full"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'radius' ? 'bg-white/20' : 'bg-orange-100 text-orange-800'}`}>3</span>
          </div>
          <div>
            <div className="font-black text-xs">نصف القطر</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'radius' ? 'text-orange-100' : 'text-slate-500'}`}>من المركز إلى الدائرة</div>
          </div>
        </button>

        {/* 4. الوتر */}
        <button
          onClick={() => applyPreset('chord')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'chord'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md ring-4 ring-purple-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-purple-50 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-5 h-1 bg-purple-300 rounded-full"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'chord' ? 'bg-white/20' : 'bg-purple-100 text-purple-800'}`}>4</span>
          </div>
          <div>
            <div className="font-black text-xs">الوتر</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'chord' ? 'text-purple-100' : 'text-slate-500'}`}>يصل بين نقطتين</div>
          </div>
        </button>

        {/* 5. القطر */}
        <button
          onClick={() => applyPreset('diameter')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'diameter'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-4 ring-blue-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-blue-50 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-6 h-1 bg-blue-300 rounded-full"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'diameter' ? 'bg-white/20' : 'bg-blue-100 text-blue-800'}`}>5</span>
          </div>
          <div>
            <div className="font-black text-xs">القطر</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'diameter' ? 'text-blue-100' : 'text-slate-500'}`}>يمر بالمركز (2 × نصف القطر)</div>
          </div>
        </button>

        {/* 6. القرص */}
        <button
          onClick={() => applyPreset('disc')}
          className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 shadow-2xs ${
            focusedElement === 'disc'
              ? 'bg-teal-600 text-white border-teal-700 shadow-md ring-4 ring-teal-300/40 font-black'
              : 'bg-white/90 border-amber-200/80 text-slate-800 hover:bg-teal-50 hover:border-teal-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="w-4 h-4 rounded-full bg-teal-300"></span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${focusedElement === 'disc' ? 'bg-white/20' : 'bg-teal-100 text-teal-800'}`}>6</span>
          </div>
          <div>
            <div className="font-black text-xs">القرص</div>
            <div className={`text-[10px] font-medium ${focusedElement === 'disc' ? 'text-teal-100' : 'text-slate-500'}`}>المساحة الممتلئة</div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Interactive SVG Canvas */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 flex flex-col items-center justify-between min-h-[480px]">
          {/* Header of Canvas with Quick Status */}
          <div className="w-full flex items-center justify-between pb-3.5 border-b border-amber-100 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-300"></span>
              <span className="font-black text-slate-800">الرسم الهندسي المباشر (مقياس 1 سم على الشاشة)</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="bg-amber-100/70 border border-amber-300/80 text-amber-950 px-3 py-1 rounded-xl font-black">
                نصف القطر: <strong className="text-amber-800 font-black">{radiusCm} سم</strong>
              </span>
              <span className="bg-blue-100/70 border border-blue-300/80 text-blue-950 px-3 py-1 rounded-xl font-black">
                القطر: <strong className="text-blue-800 font-black">{diameterCm} سم</strong>
              </span>
            </div>
          </div>

          {/* SVG Viewport */}
          <div className="w-full flex items-center justify-center py-2 overflow-x-auto relative select-none touch-none">
            <svg
              id="circle-svg-canvas"
              ref={svgRef}
              viewBox="0 0 520 480"
              className="w-full max-w-[500px] h-[380px] bg-amber-50/40 rounded-2xl border border-amber-200/60 cursor-crosshair shadow-inner"
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerLeave={stopDragging}
            >
              <defs>
                {/* Grid Pattern for graph paper effect */}
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#fde68a" strokeWidth="0.8" strokeOpacity="0.7" />
                </pattern>
                {/* Arrow markers */}
                <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#d97706" />
                </marker>
                <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#2563eb" />
                </marker>
                <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#9333ea" />
                </marker>
              </defs>

              {/* Grid Background */}
              <rect width="520" height="480" fill="url(#grid)" />

              {/* Disc (Filled Area) if enabled */}
              {showDisc && (
                <g>
                  <circle
                    cx={centerCoord.x}
                    cy={centerCoord.y}
                    r={radiusPx}
                    fill="#10b981"
                    fillOpacity="0.25"
                    className="transition-all duration-300"
                  />
                  <text
                    x={centerCoord.x}
                    y={centerCoord.y + 40}
                    textAnchor="middle"
                    fill="#047857"
                    fontSize="13"
                    fontWeight="black"
                    className="select-none"
                  >
                    مساحة القرص (ممتلئة)
                  </text>
                </g>
              )}

              {/* The Main Circle Circumference */}
              <circle
                cx={centerCoord.x}
                cy={centerCoord.y}
                r={radiusPx}
                fill="none"
                stroke="#0f766e"
                strokeWidth="4"
                strokeDasharray={showDisc ? 'none' : 'none'}
                className="transition-all duration-200"
                onClick={() => setFocusedElement('circle')}
              />

              {/* Circle label */}
              <text
                x={centerCoord.x + radiusPx + 10}
                y={centerCoord.y - 10}
                fill="#0f766e"
                fontSize="13"
                fontWeight="black"
                className="select-none"
              >
                الدائرة (المحيط)
              </text>

              {/* Multiple Radii demonstration (Shows that all radii are equal in every direction) */}
              {showMultipleRadii && (
                <g>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                    const rRad = (deg * Math.PI) / 180;
                    const px = centerCoord.x + radiusPx * Math.cos(rRad);
                    const py = centerCoord.y - radiusPx * Math.sin(rRad);
                    return (
                      <line
                        key={idx}
                        x1={centerCoord.x}
                        y1={centerCoord.y}
                        x2={px}
                        y2={py}
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                    );
                  })}
                  <text
                    x={centerCoord.x}
                    y={centerCoord.y - radiusPx - 14}
                    textAnchor="middle"
                    fill="#b45309"
                    fontSize="12"
                    fontWeight="black"
                  >
                    كل أنصاف الأقطار متقايسة = {radiusCm} سم
                  </text>
                </g>
              )}

              {/* Diameter Line (Passing through center) */}
              {showDiameter && (
                <g onClick={() => setFocusedElement('diameter')} className="cursor-pointer">
                  {/* Highlight shadow */}
                  <line
                    x1={diamPoint1.x}
                    y1={diamPoint1.y}
                    x2={diamPoint2.x}
                    y2={diamPoint2.y}
                    stroke="#2563eb"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  {/* Endpoints on circle */}
                  <circle cx={diamPoint1.x} cy={diamPoint1.y} r="5.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={diamPoint2.x} cy={diamPoint2.y} r="5.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />

                  {/* Label on the diameter */}
                  <rect
                    x={(diamPoint1.x + diamPoint2.x) / 2 - 48}
                    y={(diamPoint1.y + diamPoint2.y) / 2 - 28}
                    width="96"
                    height="22"
                    rx="8"
                    fill="#eff6ff"
                    stroke="#93c5fd"
                    strokeWidth="1.5"
                  />
                  <text
                    x={(diamPoint1.x + diamPoint2.x) / 2}
                    y={(diamPoint1.y + diamPoint2.y) / 2 - 13}
                    textAnchor="middle"
                    fill="#1d4ed8"
                    fontSize="11"
                    fontWeight="black"
                    className="select-none"
                  >
                    القطر = {diameterCm} سم
                  </text>
                </g>
              )}

              {/* Chord Line (Not required to pass through center) */}
              {showChord && (
                <g onClick={() => setFocusedElement('chord')} className="cursor-pointer">
                  <line
                    x1={chordPoint1.x}
                    y1={chordPoint1.y}
                    x2={chordPoint2.x}
                    y2={chordPoint2.y}
                    stroke="#9333ea"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={isChordNearDiameter ? 'none' : 'none'}
                  />
                  {/* Endpoints of chord (Draggable handles) */}
                  <g
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDraggingTarget('chord1');
                      setFocusedElement('chord');
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <circle cx={chordPoint1.x} cy={chordPoint1.y} r="10" fill="#9333ea" stroke="#ffffff" strokeWidth="2.5" />
                    <circle cx={chordPoint1.x} cy={chordPoint1.y} r="15" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" />
                  </g>

                  <g
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDraggingTarget('chord2');
                      setFocusedElement('chord');
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <circle cx={chordPoint2.x} cy={chordPoint2.y} r="10" fill="#9333ea" stroke="#ffffff" strokeWidth="2.5" />
                    <circle cx={chordPoint2.x} cy={chordPoint2.y} r="15" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" />
                  </g>

                  {/* Chord label */}
                  <rect
                    x={(chordPoint1.x + chordPoint2.x) / 2 - 48}
                    y={(chordPoint1.y + chordPoint2.y) / 2 + 10}
                    width="96"
                    height="22"
                    rx="8"
                    fill="#faf5ff"
                    stroke="#d8b4fe"
                    strokeWidth="1.5"
                  />
                  <text
                    x={(chordPoint1.x + chordPoint2.x) / 2}
                    y={(chordPoint1.y + chordPoint2.y) / 2 + 25}
                    textAnchor="middle"
                    fill="#7e22ce"
                    fontSize="11"
                    fontWeight="black"
                    className="select-none"
                  >
                    الوتر = {chordLengthCm} سم
                  </text>
                </g>
              )}

              {/* Radius Line (Center to rim) */}
              {showRadius && (
                <g onClick={() => setFocusedElement('radius')} className="cursor-pointer">
                  <line
                    x1={centerCoord.x}
                    y1={centerCoord.y}
                    x2={radiusPoint.x}
                    y2={radiusPoint.y}
                    stroke="#ea580c"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Draggable handle on circle rim to rotate the radius */}
                  <g
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDraggingTarget('radius');
                      setFocusedElement('radius');
                    }}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <circle
                      cx={radiusPoint.x}
                      cy={radiusPoint.y}
                      r="10"
                      fill="#ea580c"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={radiusPoint.x}
                      cy={radiusPoint.y}
                      r="15"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  </g>

                  {/* Radius label badge */}
                  <rect
                    x={(centerCoord.x + radiusPoint.x) / 2 - 50}
                    y={(centerCoord.y + radiusPoint.y) / 2 - 26}
                    width="100"
                    height="22"
                    rx="8"
                    fill="#fffbeb"
                    stroke="#fde68a"
                    strokeWidth="1.5"
                  />
                  <text
                    x={(centerCoord.x + radiusPoint.x) / 2}
                    y={(centerCoord.y + radiusPoint.y) / 2 - 11}
                    textAnchor="middle"
                    fill="#c2410c"
                    fontSize="11"
                    fontWeight="black"
                    className="select-none"
                  >
                    نصف القطر = {radiusCm} سم
                  </text>
                </g>
              )}

              {/* Center Point */}
              {showCenter && (
                <g onClick={() => setFocusedElement('center')} className="cursor-pointer">
                  {/* Outer glowing halo */}
                  <circle cx={centerCoord.x} cy={centerCoord.y} r="15" fill="#f43f5e" fillOpacity="0.25" />
                  {/* Center Dot */}
                  <circle cx={centerCoord.x} cy={centerCoord.y} r="7" fill="#e11d48" stroke="#ffffff" strokeWidth="2.5" />
                  {/* Center crosshair */}
                  <line x1={centerCoord.x - 10} y1={centerCoord.y} x2={centerCoord.x + 10} y2={centerCoord.y} stroke="#e11d48" strokeWidth="1.5" />
                  <line x1={centerCoord.x} y1={centerCoord.y - 10} x2={centerCoord.x} y2={centerCoord.y + 10} stroke="#e11d48" strokeWidth="1.5" />
                  
                  {/* Center label */}
                  <rect
                    x={centerCoord.x - 32}
                    y={centerCoord.y - 34}
                    width="64"
                    height="20"
                    rx="6"
                    fill="#fff1f2"
                    stroke="#fecdd3"
                    strokeWidth="1.5"
                  />
                  <text
                    x={centerCoord.x}
                    y={centerCoord.y - 20}
                    textAnchor="middle"
                    fill="#be123c"
                    fontSize="11"
                    fontWeight="black"
                    className="select-none"
                  >
                    المركز
                  </text>
                </g>
              )}

              {/* Integrated Visual Ruler at bottom */}
              {showRuler && (
                <g transform="translate(40, 430)">
                  {/* Ruler bar */}
                  <rect x="0" y="0" width="440" height="24" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                  {/* Ruler markings (each 32px = 1 cm) */}
                  {Array.from({ length: 14 }).map((_, cmIdx) => {
                    const xPos = cmIdx * scale;
                    if (xPos > 430) return null;
                    return (
                      <g key={cmIdx}>
                        <line x1={xPos} y1="0" x2={xPos} y2="12" stroke="#854d0e" strokeWidth="1.5" />
                        <text x={xPos + 2} y="20" fill="#854d0e" fontSize="9" fontWeight="bold">
                          {cmIdx} سم
                        </text>
                        {/* Half cm tick */}
                        {cmIdx < 13 && (
                          <line x1={xPos + 16} y1="0" x2={xPos + 16} y2="7" stroke="#a16207" strokeWidth="1" />
                        )}
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>

          {/* Interactive tips under canvas */}
          <div className="w-full bg-amber-50/70 p-3 rounded-2xl border border-amber-200/70 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <MoveHorizontal className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong className="text-emerald-900">طريقة التفاعل:</strong> المس النقاط الملونة واسحبها حول الدائرة لترى الحركة الحية!
              </span>
            </div>
            <button
              onClick={() => setShowMultipleRadii(!showMultipleRadii)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                showMultipleRadii ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-300' : 'bg-white border border-amber-300/80 text-amber-900 hover:bg-amber-100/70'
              }`}
            >
              {showMultipleRadii ? 'إخفاء بقية الأقطار' : 'إثبات: كل الأقطار متقايسة'}
            </button>
          </div>
        </div>

        {/* Right: Controls & Pedagogical Explanations */}
        <div className="lg:col-span-5 space-y-4">
          {/* Element Switches (Color coded) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-emerald-600" />
                <span>عناصر الدائرة (تحكم بالإظهار والإخفاء)</span>
              </h3>
              <span className="text-xs text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md font-bold">اضغط للمشاهدة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Center toggle */}
              <button
                id="toggle-center-btn"
                onClick={() => {
                  setShowCenter(!showCenter);
                  setFocusedElement('center');
                }}
                className={`p-3 rounded-2xl border text-right flex items-center justify-between transition-all ${
                  showCenter
                    ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-200 shadow-xs'
                    : 'bg-amber-50/40 border-amber-200/50 text-slate-600 hover:bg-amber-100/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 shadow-xs shadow-rose-300"></span>
                  <div>
                    <div className="font-black text-xs">المركز</div>
                    <div className="text-[10px] text-slate-500">نقطة الوسط الثابتة</div>
                  </div>
                </div>
                {showCenter ? <Eye className="w-4 h-4 text-rose-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Radius toggle */}
              <button
                id="toggle-radius-btn"
                onClick={() => {
                  setShowRadius(!showRadius);
                  setFocusedElement('radius');
                }}
                className={`p-3 rounded-2xl border text-right flex items-center justify-between transition-all ${
                  showRadius
                    ? 'bg-orange-50 border-orange-300 text-orange-950 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-amber-50/40 border-amber-200/50 text-slate-600 hover:bg-amber-100/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-orange-500 shrink-0 shadow-xs shadow-orange-300"></span>
                  <div>
                    <div className="font-black text-xs">نصف القطر</div>
                    <div className="text-[10px] text-slate-500">من المركز إلى الدائرة</div>
                  </div>
                </div>
                {showRadius ? <Eye className="w-4 h-4 text-orange-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Diameter toggle */}
              <button
                id="toggle-diameter-btn"
                onClick={() => {
                  setShowDiameter(!showDiameter);
                  setFocusedElement('diameter');
                }}
                className={`p-3 rounded-2xl border text-right flex items-center justify-between transition-all ${
                  showDiameter
                    ? 'bg-blue-50 border-blue-300 text-blue-950 ring-2 ring-blue-200 shadow-xs'
                    : 'bg-amber-50/40 border-amber-200/50 text-slate-600 hover:bg-amber-100/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 shrink-0 shadow-xs shadow-blue-300"></span>
                  <div>
                    <div className="font-black text-xs">القطر</div>
                    <div className="text-[10px] text-slate-500">يمر بالمركز = 2 × نصف القطر</div>
                  </div>
                </div>
                {showDiameter ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Chord toggle */}
              <button
                id="toggle-chord-btn"
                onClick={() => {
                  setShowChord(!showChord);
                  setFocusedElement('chord');
                }}
                className={`p-3 rounded-2xl border text-right flex items-center justify-between transition-all ${
                  showChord
                    ? 'bg-purple-50 border-purple-300 text-purple-950 ring-2 ring-purple-200 shadow-xs'
                    : 'bg-amber-50/40 border-amber-200/50 text-slate-600 hover:bg-amber-100/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-purple-500 shrink-0 shadow-xs shadow-purple-300"></span>
                  <div>
                    <div className="font-black text-xs">الوتر</div>
                    <div className="text-[10px] text-slate-500">يصل بين نقطتين</div>
                  </div>
                </div>
                {showChord ? <Eye className="w-4 h-4 text-purple-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>
            </div>

            {/* Extra toggles: Disc & Ruler */}
            <div className="pt-2 flex items-center gap-2 border-t border-amber-100">
              <button
                id="toggle-disc-btn"
                onClick={() => {
                  setShowDisc(!showDisc);
                  setFocusedElement('disc');
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-1.5 ${
                  showDisc
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs ring-2 ring-emerald-200'
                    : 'bg-amber-50/50 border-amber-200/60 text-slate-700 hover:bg-amber-100/50'
                }`}
              >
                <span>{showDisc ? 'إلغاء تلوين القرص' : 'تلوين مساحة القرص'}</span>
              </button>

              <button
                id="toggle-ruler-btn"
                onClick={() => setShowRuler(!showRuler)}
                className={`py-2.5 px-3.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 ${
                  showRuler
                    ? 'bg-amber-300 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-200'
                    : 'bg-amber-50/50 border-amber-200/60 text-slate-700 hover:bg-amber-100/50'
                }`}
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>المسطرة</span>
              </button>
            </div>

            {/* Slider to change Radius Length */}
            <div className="pt-3 border-t border-amber-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">تَغْيِيرُ فَتْحَةِ الْمِدْوَرِ (طُولُ نِصْفِ الْقُطْرِ):</span>
                <span className="text-emerald-800 bg-emerald-100/80 px-3 py-0.5 rounded-full border border-emerald-300 font-black">
                  {radiusCm} سَنْتِمِتْراً
                </span>
              </div>
              <input
                id="radius-slider"
                type="range"
                min="2"
                max="6"
                step="1"
                value={radiusCm}
                onChange={(e) => setRadiusCm(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2.5 bg-amber-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-black text-amber-900/60">
                <span>2 سَنْتِمِتْراً (صَغِيرَةٌ)</span>
                <span>3 سَنْتِمِتْراً</span>
                <span>4 سَنْتِمِتْراً (مُتَوَسِّطَةٌ)</span>
                <span>5 سَنْتِمِتْراً</span>
                <span>6 سَنْتِمِتْراً (كَبِيرَةٌ)</span>
              </div>
            </div>
          </div>

          {/* Dynamic Pedagogical Explanation Box */}
          <div className={`p-5 rounded-3xl border ${explanation.color} shadow-md shadow-amber-500/5 space-y-3 transition-all`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-white/90 border border-current shadow-2xs">
                  {explanation.badge}
                </span>
                <h4 className="text-base font-black mt-1.5">{explanation.title}</h4>
              </div>
              <button
                id="speak-active-explanation-btn"
                onClick={handleSpeakActive}
                className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-xs border border-white/60 transition-colors flex items-center gap-1.5 text-xs font-black"
                title="اِسْتَمِعْ لِلشَّرْحِ بِالصَّوْتِ"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>اِسْتَمِعْ</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              {explanation.text}
            </p>

            <div className="p-3 bg-white/90 rounded-2xl border border-white/80 text-xs font-bold flex items-start gap-2 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{explanation.tip}</span>
            </div>
          </div>

          {/* Golden Math Rule for Algerian 4th/5th Grade */}
          <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-400/60 p-5 rounded-3xl text-slate-900 space-y-2.5 shadow-sm">
            <h5 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-800" />
              <span>قَاعِدَةٌ ذَهَبِيَّةٌ يَحْفَظُهَا تِلْمِيذُ الِابْتِدَائِيِّ:</span>
            </h5>
            <div className="bg-white/95 p-3.5 rounded-2xl border border-amber-300 text-center space-y-1 shadow-xs">
              <div className="text-sm md:text-base font-black text-amber-950">
                طُولُ الْقُطْرِ = نِصْفُ الْقُطْرِ + نِصْفُ الْقُطْرِ
              </div>
              <div className="text-xs text-slate-700 font-medium">
                (إِذَا كَانَ نِصْفُ الْقُطْرِ <strong className="text-amber-800 font-black">{radiusCm} سَنْتِمِتْراً</strong>، فَإِنَّ الْقُطْرَ يُسَاوِي <strong className="text-blue-800 font-black">{diameterCm} سَنْتِمِتْراً</strong>)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
