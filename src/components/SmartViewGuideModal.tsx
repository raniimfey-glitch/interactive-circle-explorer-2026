import React from 'react';
import { Tv, Cast, Wifi, WifiOff, Monitor, Smartphone, Laptop, CheckCircle2, X, Sparkles, HelpCircle } from 'lucide-react';

interface SmartViewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOffline: boolean;
}

export const SmartViewGuideModal: React.FC<SmartViewGuideModalProps> = ({
  isOpen,
  onClose,
  isOffline
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-300 relative text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          title="إغلاق الدليل"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md">
            <Tv className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>دليل العرض على الداتاشو والشاشة الذكية</span>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-bold px-2.5 py-0.5 rounded-full">
                Smart View & Projector
              </span>
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              طرق سهلة لمشاركة التطبيق وعرضه في القسم مع التلاميذ أو في قاعة التدريس
            </p>
          </div>
        </div>

        {/* Offline Status Highlight Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <div className="font-black text-emerald-950 flex items-center gap-2">
              <span>جاهز للعمل دون اتصال بالإنترنت (Offline 100%)</span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.2 rounded-full font-bold">مُفَعَّل</span>
            </div>
            <p className="text-emerald-800 font-medium mt-0.5">
              تم تخزين جميع ملفات التطبيق ورسوماته تلقائياً. يمكنك تشغيله في أي قسم أو مدرسة دون الحاجة إلى شبكة الإنترنت أو واي فاي.
            </p>
          </div>
        </div>

        {/* Connection Methods */}
        <div className="space-y-4">
          {/* Method 1: Samsung Smart View & Android Cast */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row gap-3.5 items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>1. عبر ميزة Smart View (هواتف ولوحات أندرويد وSamsung)</span>
              </h3>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                اسحب شريط الإشعارات العلوي في هاتفك أو لوحتك الذكية ➔ اضغط على أيقونة <strong className="text-indigo-700">Smart View</strong> أو <strong className="text-indigo-700">بث الشاشة (Screen Cast)</strong> ➔ اختر التلفاز الذكي أو جهاز العرض المتاح.
              </p>
            </div>
          </div>

          {/* Method 2: Laptop & Data Show via HDMI / VGA */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row gap-3.5 items-start">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>2. عبر كابل HDMI أو جهاز العرض (Data Show)</span>
              </h3>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                قم بتوصيل كابل <strong className="text-teal-700">HDMI</strong> بين الحاسوب وجهاز الإسقاط ➔ اضغط على لوحة المفاتيح <strong className="text-teal-700">Win + P</strong> واختر <strong className="text-teal-700">تكرار الشاشة (Duplicate)</strong> ➔ اضغط على زر <strong className="text-teal-700">ملء الشاشة [ ⛶ ]</strong> في التطبيق.
              </p>
            </div>
          </div>

          {/* Method 3: Wireless Miracast / Windows Projection */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col sm:flex-row gap-3.5 items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
              <Cast className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>3. البث اللاسلكي من حاسوب ويندوز (Miracast / Cast)</span>
              </h3>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                اضغط <strong className="text-orange-700">Win + K</strong> في حاسوبك للبحث عن الشاشات اللاسلكية القريبة ➔ أو في متصفح كروم: اضغط على القائمة (ثلاث نقاط) ➔ اختر <strong className="text-orange-700">إرسال (Cast)</strong> لبث علامة التبويب إلى الشاشة.
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Presentation in Classroom */}
        <div className="mt-5 p-3.5 rounded-xl bg-slate-100 text-slate-700 text-xs flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>نصيحة للأستاذ:</strong> استخدم <strong>مؤشر الليزر</strong> و<strong>قلم السبورة</strong> من شريط العرض للتحكم والتأشير على المفاهيم الهندسية أمام التلاميذ بكل وضوح.
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>فهمت، جاهز للعرض</span>
          </button>
        </div>
      </div>
    </div>
  );
};
