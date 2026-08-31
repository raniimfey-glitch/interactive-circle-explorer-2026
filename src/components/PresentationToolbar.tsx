import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize,
  Minimize,
  Tv,
  PenTool,
  Eraser,
  Trash2,
  Sun,
  ZoomIn,
  Flame,
  HelpCircle,
  X,
  Wifi,
  WifiOff,
  Palette,
  Download
} from 'lucide-react';
import { SmartViewGuideModal } from './SmartViewGuideModal';

interface PresentationToolbarProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isProjectorContrast: boolean;
  onToggleProjectorContrast: () => void;
  classroomZoom: number;
  onChangeClassroomZoom: (zoom: number) => void;
  isOffline: boolean;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  isFullscreen,
  onToggleFullscreen,
  isProjectorContrast,
  onToggleProjectorContrast,
  classroomZoom,
  onChangeClassroomZoom,
  isOffline
}) => {
  // Laser Pointer State
  const [isLaserActive, setIsLaserActive] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  // Drawing Canvas State
  const [isPenActive, setIsPenActive] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<string>('#ef4444');
  const [penWidth, setPenWidth] = useState<number>(4);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Guide Modal State
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Collapsed / Expanded toolbar state
  const [isToolbarExpanded, setIsToolbarExpanded] = useState<boolean>(false);

  // PWA Deferred Prompt
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      alert('التطبيق جاهز ومحفوظ بالفعل للعمل دون اتصال بالإنترنت (Offline)!');
      return;
    }
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setInstallPrompt(null);
  };

  // Laser Pointer Mouse Tracker
  useEffect(() => {
    if (!isLaserActive) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        setLaserPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if ('clientX' in e) {
        setLaserPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [isLaserActive]);

  // Resize drawing canvas to full screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPenActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    lastPointRef.current = { x: clientX - rect.left, y: clientY - rect.top };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !isPenActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPointRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(currentX, currentY);

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = penWidth * 5;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 4;
      ctx.shadowColor = penColor;
    }

    ctx.stroke();
    lastPointRef.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const cycleZoom = () => {
    if (classroomZoom === 1) onChangeClassroomZoom(1.15);
    else if (classroomZoom === 1.15) onChangeClassroomZoom(1.3);
    else onChangeClassroomZoom(1);
  };

  return (
    <>
      {/* Floating Laser Dot */}
      {isLaserActive && (
        <div
          className="laser-dot pulsing"
          style={{ left: `${laserPos.x}px`, top: `${laserPos.y}px` }}
        />
      )}

      {/* Screen Drawing Canvas Overlay */}
      <canvas
        ref={canvasRef}
        id="presentation-drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className={`fixed inset-0 z-40 ${
          isPenActive ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
        }`}
      />

      {/* Active Pen Drawing Controls Floating Bar (When Pen is Enabled) */}
      {isPenActive && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-amber-400">قلم السبورة:</span>
            <button
              onClick={() => { setIsEraser(false); setPenColor('#ef4444'); }}
              className={`w-6 h-6 rounded-full bg-red-500 border-2 transition-transform ${
                !isEraser && penColor === '#ef4444' ? 'scale-125 border-white ring-2 ring-red-400' : 'border-transparent'
              }`}
              title="لون أحمر"
            />
            <button
              onClick={() => { setIsEraser(false); setPenColor('#facc15'); }}
              className={`w-6 h-6 rounded-full bg-yellow-400 border-2 transition-transform ${
                !isEraser && penColor === '#facc15' ? 'scale-125 border-white ring-2 ring-yellow-300' : 'border-transparent'
              }`}
              title="لون أصفر"
            />
            <button
              onClick={() => { setIsEraser(false); setPenColor('#06b6d4'); }}
              className={`w-6 h-6 rounded-full bg-cyan-400 border-2 transition-transform ${
                !isEraser && penColor === '#06b6d4' ? 'scale-125 border-white ring-2 ring-cyan-300' : 'border-transparent'
              }`}
              title="لون أزرق سماوي"
            />
            <button
              onClick={() => { setIsEraser(false); setPenColor('#ffffff'); }}
              className={`w-6 h-6 rounded-full bg-white border-2 transition-transform ${
                !isEraser && penColor === '#ffffff' ? 'scale-125 border-slate-900 ring-2 ring-white' : 'border-transparent'
              }`}
              title="لون أبيض"
            />
          </div>

          <div className="h-5 w-px bg-slate-700" />

          {/* Eraser */}
          <button
            onClick={() => setIsEraser(true)}
            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
              isEraser
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="ممحاة"
          >
            <Eraser className="w-4 h-4" />
            <span>ممحاة</span>
          </button>

          {/* Clear */}
          <button
            onClick={clearCanvas}
            className="p-1.5 rounded-lg bg-red-950/70 text-red-300 hover:bg-red-900 border border-red-800 text-xs font-bold flex items-center gap-1"
            title="مسح كل الشخبطة"
          >
            <Trash2 className="w-4 h-4" />
            <span>مسح الكل</span>
          </button>

          {/* Close Pen */}
          <button
            onClick={() => setIsPenActive(false)}
            className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            title="إغلاق القلم"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Presentation & Smart View Quick Dock */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
        {/* Expanded Panel */}
        {isToolbarExpanded && (
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border-2 border-indigo-200 flex flex-col gap-2 min-w-[240px] text-slate-800 animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
              <span className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                <Tv className="w-4 h-4 text-indigo-600" />
                <span>أدوات الداتاشو وSmart View</span>
              </span>
              <button
                onClick={() => setIsToolbarExpanded(false)}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Offline Status Pill inside Toolbar */}
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between font-bold">
              <div className="flex items-center gap-1.5">
                {isOffline ? <WifiOff className="w-3.5 h-3.5 text-emerald-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{isOffline ? 'بدون إنترنت (شغال 100%)' : 'يعمل دون إنترنت (Offline)'}</span>
              </div>
              {installPrompt && (
                <button
                  onClick={handleInstallClick}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 shadow-xs"
                >
                  <Download className="w-3 h-3" />
                  <span>تثبيت</span>
                </button>
              )}
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Fullscreen Button */}
              <button
                onClick={onToggleFullscreen}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 justify-center transition-all ${
                  isFullscreen
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                }`}
                title="تفعيل وضع ملء الشاشة الكامل"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                <span>{isFullscreen ? 'خروج من الشاشة' : 'ملء الشاشة'}</span>
              </button>

              {/* Laser Pointer */}
              <button
                onClick={() => {
                  setIsLaserActive(!isLaserActive);
                  if (isPenActive) setIsPenActive(false);
                }}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 justify-center transition-all ${
                  isLaserActive
                    ? 'bg-red-600 text-white border-red-700 shadow-xs ring-2 ring-red-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-red-50'
                }`}
                title="مؤشر ليزر متوهج للشرح"
              >
                <Flame className="w-4 h-4 text-red-500" />
                <span>{isLaserActive ? 'إيقاف الليزر' : 'مؤشر الليزر'}</span>
              </button>

              {/* Live Classroom Pen */}
              <button
                onClick={() => {
                  setIsPenActive(!isPenActive);
                  if (isLaserActive) setIsLaserActive(false);
                }}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 justify-center transition-all ${
                  isPenActive
                    ? 'bg-teal-600 text-white border-teal-700 shadow-xs ring-2 ring-teal-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                }`}
                title="قلم للرسم والتأشير المباشر فوق المحتوى"
              >
                <PenTool className="w-4 h-4 text-teal-600" />
                <span>{isPenActive ? 'إغلاق القلم' : 'قلم السبورة'}</span>
              </button>

              {/* High Contrast for Projectors */}
              <button
                onClick={onToggleProjectorContrast}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 justify-center transition-all ${
                  isProjectorContrast
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-2 ring-amber-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
                title="تعزيز تباين الألوان لجهاز العرض (Data Show)"
              >
                <Sun className="w-4 h-4 text-amber-600" />
                <span>{isProjectorContrast ? 'تباين عادي' : 'تباين داتاشو'}</span>
              </button>
            </div>

            {/* Zoom & Guide row */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                onClick={cycleZoom}
                className="flex-1 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1"
                title="تكبير حجم العرض للرؤية بوضوح من آخر مقعد في القسم"
              >
                <ZoomIn className="w-4 h-4 text-indigo-600" />
                <span>تكبير: {Math.round(classroomZoom * 100)}%</span>
              </button>

              <button
                onClick={() => setIsGuideOpen(true)}
                className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-black flex items-center gap-1"
                title="كيفية الاتصال بالداتاشو وSmart View"
              >
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>دليل العرض</span>
              </button>
            </div>
          </div>
        )}

        {/* Master Floating Pill Button */}
        <div className="flex items-center gap-2">
          <button
            id="presentation-dock-trigger"
            onClick={() => setIsToolbarExpanded(!isToolbarExpanded)}
            className={`px-3.5 py-2.5 rounded-2xl border-2 text-xs font-black shadow-lg flex items-center gap-2 transition-all backdrop-blur-md ${
              isToolbarExpanded || isFullscreen || isLaserActive || isPenActive
                ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-200 shadow-indigo-500/25'
                : 'bg-white/95 text-slate-800 border-indigo-300 hover:bg-indigo-50 shadow-slate-400/20'
            }`}
            title="أدوات العرض على جهاز الإسقاط والشاشات الذكية (Data Show / Smart View)"
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <span>عرض الداتاشو & Smart View</span>
            {isOffline && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="يعمل بدون إنترنت"></span>
            )}
          </button>

          {/* Quick Offline Pill */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/90 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-md cursor-pointer hover:bg-emerald-50 transition-colors"
            onClick={() => setIsGuideOpen(true)}
            title="التطبيق يعمل بالكامل بدون اتصال بالإنترنت (Offline)"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
            <span>Offline 100% (يعمل بدون إنترنت)</span>
          </div>
        </div>
      </div>

      {/* Connection and Usage Modal */}
      <SmartViewGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        isOffline={isOffline}
      />
    </>
  );
};
