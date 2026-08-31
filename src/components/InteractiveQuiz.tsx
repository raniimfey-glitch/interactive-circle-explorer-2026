import React, { useState } from 'react';
import { QUIZ_QUESTIONS, CHALLENGE_PUZZLES } from '../data/circleCurriculum';
import { ChallengeVisualDiagram } from './ChallengeVisualDiagram';
import { QuizLevelMode, AppLanguage } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Volume2, 
  Star, 
  Sparkles, 
  Printer, 
  Medal, 
  ThumbsUp,
  Flame,
  BookOpen,
  Brain,
  Lightbulb,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakArabicText, speakEnglishText } from '../utils/speech';

interface InteractiveQuizProps {
  soundEnabled: boolean;
  language?: AppLanguage;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ 
  soundEnabled,
  language = 'bilingual'
}) => {
  const [quizLevel, setQuizLevel] = useState<QuizLevelMode>('challenge');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('');

  const totalQuestions = quizLevel === 'standard' ? QUIZ_QUESTIONS.length : CHALLENGE_PUZZLES.length;
  const currentStandardQ = quizLevel === 'standard' ? QUIZ_QUESTIONS[currentIndex] : null;
  const currentChallengeP = quizLevel === 'challenge' ? CHALLENGE_PUZZLES[currentIndex] : null;

  const currentItem = quizLevel === 'standard' ? currentStandardQ! : currentChallengeP!;

  const switchQuizLevel = (level: QuizLevelMode) => {
    setQuizLevel(level);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);

    if (soundEnabled) {
      if (language === 'en') {
        if (level === 'challenge') {
          speakEnglishText('Welcome to the geometric visual challenge and puzzles level!');
        } else {
          speakEnglishText('Welcome to the circle concepts quiz!');
        }
      } else {
        if (level === 'challenge') {
          speakArabicText('مَرْحَباً بِكَ فِي مُسْتَوَى التَّحَدِّي وَالْأَلْغَازِ الْهَنْدَسِيَّةِ الْبَصَرِيَّةِ!');
        } else {
          speakArabicText('مَرْحَباً بِكَ فِي اخْتِبَارِ الْمُكْتَسَبَاتِ الْأَسَاسِيَّةِ فِي هَنْدَسَةِ الدَّائِرَةِ.');
        }
      }
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentItem.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.7 }
      });
      if (soundEnabled) {
        if (language === 'en') {
          speakEnglishText('Great job! Correct answer. ' + (currentItem.explanationEn || currentItem.explanation));
        } else {
          speakArabicText('أَحْسَنْتَ! إِجَابَةٌ صَحِيحَةٌ وَمُتْقَنَةٌ. ' + currentItem.explanation);
        }
      }
    } else {
      if (soundEnabled) {
        if (language === 'en') {
          speakEnglishText('Try again in the next question. ' + (currentItem.explanationEn || currentItem.explanation));
        } else {
          speakArabicText('حَاوِلْ مَرَّةً أُخْرَى فِي السُّؤَالِ الْقَادِمِ. ' + currentItem.explanation);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
      if (soundEnabled) {
        const nextItem = quizLevel === 'standard' ? QUIZ_QUESTIONS[nextIdx] : CHALLENGE_PUZZLES[nextIdx];
        if (language === 'en') {
          speakEnglishText(nextItem.questionEn || nextItem.question);
        } else {
          speakArabicText(nextItem.question);
        }
      }
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      if (soundEnabled) {
        const finalScore = score + (selectedOption === currentItem.correctIndex ? 1 : 0);
        if (language === 'en') {
          speakEnglishText(`Congratulations geometry champion! You completed the challenge with ${finalScore} out of ${totalQuestions}.`);
        } else {
          speakArabicText(`تَهَانِينَا يَا بَطَلَ الْهَنْدَسَةِ! لَقَدْ أَنْهَيْتَ التَّحَدِّيَ بِنَجَاحٍ وَحَصَلْتَ عَلَى ${finalScore} مِنْ أَصْلِ ${totalQuestions}.`);
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleSpeakArabic = () => {
    if (quizLevel === 'challenge' && currentChallengeP) {
      speakArabicText(`${currentChallengeP.title}. ${currentChallengeP.story}. ${currentChallengeP.question}`);
    } else if (currentStandardQ) {
      speakArabicText(currentStandardQ.question);
    }
  };

  const handleSpeakEnglish = () => {
    if (quizLevel === 'challenge' && currentChallengeP) {
      speakEnglishText(`${currentChallengeP.titleEn || currentChallengeP.title}. ${currentChallengeP.storyEn || currentChallengeP.story}. ${currentChallengeP.questionEn || currentChallengeP.question}`);
    } else if (currentStandardQ) {
      speakEnglishText(currentStandardQ.questionEn || currentStandardQ.question);
    }
  };

  return (
    <div className="space-y-6" id="interactive-quiz-container">
      {/* Header Banner with Level Selector */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md shadow-teal-500/15 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-teal-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            {quizLevel === 'challenge' ? (
              <Flame className="w-7 h-7 text-amber-300 animate-pulse" />
            ) : (
              <Award className="w-7 h-7 text-amber-300" />
            )}
          </div>
          <div>
            <h2 className="font-black text-lg md:text-xl text-white flex items-center gap-2">
              <span>
                {quizLevel === 'challenge'
                  ? (language === 'en' ? 'Challenge Level: Genius Puzzles' : 'مُسْتَوَى التَّحَدِّي: أَلْغَازُ الْعَبَاقِرَةِ')
                  : (language === 'en' ? 'Geometry Champion: Core Quiz' : 'تَحَدِّي بَطَلِ الْهَنْدَسَةِ (الْمُكْتَسَبَاتُ)')}
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs">
                {quizLevel === 'challenge'
                  ? (language === 'en' ? 'Interactive Visual Puzzles' : 'أَلْغَازٌ بَصَرِيَّةٌ تَفَاعُلِيَّةٌ')
                  : (language === 'en' ? 'Core Concepts' : 'أَسْئِلَةٌ أَسَاسِيَّةٌ')}
              </span>
            </h2>
            <p className="text-xs md:text-sm text-teal-100 font-medium mt-0.5">
              {quizLevel === 'challenge' 
                ? (language === 'en'
                    ? 'Deduce the relationship between diameter and radius through engaging visual geometric puzzles'
                    : 'اِسْتَنْتِجِ الْعَلَاقَةَ بَيْنَ الْقُطْرِ وَنِصْفِ الْقُطْرِ عَبْرَ أَلْغَازٍ بَصَرِيَّةٍ هَنْدَسِيَّةٍ مُمْتِعَةٍ وَمُشَوِّقَةٍ')
                : (language === 'en'
                    ? 'Vocalized training questions designed according to the Algerian 4th & 5th grade curriculum'
                    : 'أَسْئِلَةٌ تَدْرِيبِيَّةٌ مَشْكُولَةٌ مُصَمَّمَةٌ وَفْقَ تَمَارِينِ الْمِنْهَاجِ الْجَزَائِرِيِّ لِلسَّنَتَيْنِ الرَّابِعَةِ وَالْخَامِسَةِ')}
            </p>
          </div>
        </div>

        {/* Level Switcher Buttons & Live Score */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Switch Tabs */}
          <div className="bg-slate-950/40 p-1 rounded-2xl flex items-center border border-white/20 backdrop-blur-xs">
            <button
              onClick={() => switchQuizLevel('standard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                quizLevel === 'standard'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'Core Quiz' : 'الْمُسْتَوَى الْأَسَاسِيُّ'}</span>
            </button>

            <button
              onClick={() => switchQuizLevel('challenge')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                quizLevel === 'challenge'
                  ? 'bg-amber-400 text-slate-950 shadow-sm ring-2 ring-amber-300'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-950" />
              <span>{language === 'en' ? 'Visual Challenges ⚡' : 'مُسْتَوَى التَّحَدِّي ⚡'}</span>
            </button>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-2xl border border-amber-300 font-black text-xs md:text-sm shadow-sm ring-2 ring-amber-300/40">
            <Star className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>{score} / {totalQuestions}</span>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question / Puzzle Card */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-5">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-amber-100 pb-3.5 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 shadow-2xs">
                  {quizLevel === 'challenge' ? `اللُّغْزُ ${currentIndex + 1} مِنْ ${totalQuestions}` : `السُّؤَالُ ${currentIndex + 1} مِنْ ${totalQuestions}`}
                </span>
                {quizLevel === 'challenge' && currentChallengeP && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800">
                    {currentChallengeP.category}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="p-2 rounded-2xl bg-amber-100/60 hover:bg-amber-200/70 text-amber-950 border border-amber-200 text-xs font-black flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>{language === 'en' ? 'Hint' : 'تَلْمِيحٌ مُسَاعِدٌ'}</span>
                </button>

                {language !== 'en' && (
                  <button
                    type="button"
                    onClick={handleSpeakArabic}
                    className="p-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-black flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="قراءة السؤال بالصوت بالعربية المشكولة"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>عربي</span>
                  </button>
                )}

                {language !== 'ar' && (
                  <button
                    type="button"
                    onClick={handleSpeakEnglish}
                    className="p-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-black flex items-center gap-1.5 transition-colors shadow-2xs"
                    title="Read question in slow American English"
                  >
                    <span>🇺🇸</span>
                    <span>English</span>
                  </button>
                )}
              </div>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="p-4 bg-gradient-to-r from-amber-100/80 to-orange-100/60 rounded-2xl border border-amber-300 text-amber-950 text-xs font-bold space-y-1 shadow-2xs animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>💡 {language === 'en' ? 'Smart Hint:' : 'تَلْمِيحٌ ذَكِيٌّ:'} {language !== 'en' ? currentItem.hint : (currentItem.hintEn || currentItem.hint)}</span>
                </div>
                {language === 'bilingual' && currentItem.hintEn && (
                  <div className="text-[11px] text-blue-900 font-medium mr-6">
                    🇺🇸 {currentItem.hintEn}
                  </div>
                )}
              </div>
            )}

            {/* Challenge Puzzle Story (if challenge mode) */}
            {quizLevel === 'challenge' && currentChallengeP && (
              <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-950 font-black text-xs sm:text-sm">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'en' ? (currentChallengeP.titleEn || currentChallengeP.title) : currentChallengeP.title}</span>
                  {language === 'bilingual' && currentChallengeP.titleEn && (
                    <span className="text-xs font-bold text-indigo-600">({currentChallengeP.titleEn})</span>
                  )}
                </div>
                {language !== 'en' && (
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {currentChallengeP.story}
                  </p>
                )}
                {(language === 'en' || language === 'bilingual') && currentChallengeP.storyEn && (
                  <p className={`text-xs sm:text-sm text-slate-800 leading-relaxed font-medium ${language === 'bilingual' ? 'pt-1 border-t border-indigo-100 text-indigo-900' : ''}`}>
                    {language === 'bilingual' && <strong className="text-indigo-700">🇺🇸 </strong>}
                    {currentChallengeP.storyEn}
                  </p>
                )}
              </div>
            )}

            {/* Visual Interactive Diagram in Challenge Mode */}
            {quizLevel === 'challenge' && currentChallengeP && (
              <ChallengeVisualDiagram puzzle={currentChallengeP} isAnswered={isAnswered} />
            )}

            {/* Question Text */}
            <div className="space-y-2 pt-1">
              {language !== 'en' && (
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                  {currentItem.question}
                </h3>
              )}
              {(language === 'en' || language === 'bilingual') && currentItem.questionEn && (
                <h3 className={`text-sm sm:text-base font-bold text-blue-950 leading-relaxed ${language === 'bilingual' ? 'text-indigo-800' : ''}`}>
                  {language === 'bilingual' && <span className="font-black text-blue-700">🇺🇸 English: </span>}
                  {currentItem.questionEn}
                </h3>
              )}
            </div>

            {/* Options Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentItem.options.map((option, idx) => {
                let btnStyle = 'bg-amber-50/40 border-amber-200/80 text-slate-800 hover:bg-amber-100/60 hover:border-amber-300';

                if (isAnswered) {
                  if (idx === currentItem.correctIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300/40 font-black';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-4 ring-rose-300/40 font-black';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                const optionEn = currentItem.optionsEn ? currentItem.optionsEn[idx] : undefined;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-2xl border text-right font-black text-xs sm:text-sm transition-all flex items-center justify-between gap-3 shadow-2xs ${btnStyle}`}
                  >
                    <div className="flex flex-col text-right">
                      {language !== 'en' && <span>{option}</span>}
                      {(language === 'en' || language === 'bilingual') && optionEn && (
                        <span className={`font-bold ${language === 'bilingual' ? 'text-[11px] text-blue-800' : 'text-xs sm:text-sm'}`}>
                          {language === 'bilingual' ? `🇺🇸 ${optionEn}` : optionEn}
                        </span>
                      )}
                    </div>
                    {isAnswered && idx === currentItem.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentItem.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation after Answer */}
            {isAnswered && (
              <div
                className={`p-5 rounded-3xl border ${
                  selectedOption === currentItem.correctIndex
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                } space-y-3.5 transition-all shadow-sm`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentItem.correctIndex ? (
                    <>
                      <ThumbsUp className="w-5 h-5 text-emerald-600" />
                      <strong className="text-sm font-black text-emerald-900">
                        {language === 'en' ? 'Excellent! Correct Answer!' : 'إِجَابَةٌ مُمْتَازَةٌ وَصَحِيحَةٌ!'}
                      </strong>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                      <strong className="text-sm font-black text-amber-900">
                        {language === 'en' ? 'Geometric Explanation:' : 'الشَّرْحُ وَالتَّوْضِيحُ الْهَنْدَسِيُّ:'}
                      </strong>
                    </>
                  )}
                </div>
                {language !== 'en' && (
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-800">
                    {currentItem.explanation}
                  </p>
                )}
                {(language === 'en' || language === 'bilingual') && currentItem.explanationEn && (
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed text-slate-800 ${language === 'bilingual' ? 'pt-2 border-t border-amber-200/80 text-blue-950' : ''}`}>
                    {language === 'bilingual' && <strong className="text-blue-800">🇺🇸 English: </strong>}
                    {currentItem.explanationEn}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-emerald-600/20"
                >
                  {currentIndex + 1 < totalQuestions 
                    ? (quizLevel === 'challenge' ? 'اللُّغْزُ التَّالِي ←' : 'السُّؤَالُ التَّالِي ←') 
                    : 'مُشَاهَدَةُ النَّتِيجَةِ وَشَهَادَةِ التَّمَيُّزِ 🏆'}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Progress Tracker & Geometric Knowledge Pill */}
          <div className="lg:col-span-4 space-y-4">
            {/* Progress Badges Card */}
            <div className="bg-white/90 backdrop-blur-xs p-5 rounded-3xl border border-amber-200/80 shadow-md shadow-amber-500/5 space-y-4">
              <h4 className="text-xs font-black text-slate-900 flex items-center gap-2">
                <Medal className="w-4 h-4 text-amber-500" />
                <span>لَوْحَةُ مُتَابَعَةِ التَّقَدُّمِ:</span>
              </h4>

              {/* Progress bar */}
              <div className="w-full bg-amber-100/80 h-3.5 rounded-full overflow-hidden border border-amber-200">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 h-full transition-all duration-300 rounded-full shadow-inner"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all shadow-2xs ${
                      i === currentIndex
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black scale-105 shadow-sm'
                        : i < currentIndex
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-amber-50/60 text-slate-400 border border-amber-100'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-600 font-bold text-center">
                {quizLevel === 'challenge' 
                  ? 'حُلَّ كُلَّ الْأَلْغَازِ لِنَيْلِ لَقَبِ "عَبْقَرِيِّ الْهَنْدَسَةِ"!' 
                  : 'أَجِبْ عَلَى جَمِيعِ الْأَسْئِلَةِ لِلْحُصُولِ عَلَى شَهَادَةِ التَّمَيُّزِ!'}
              </div>
            </div>

            {/* Helpful Geometric Rule Reminder Card */}
            <div className="bg-gradient-to-br from-amber-100/70 to-orange-100/50 p-5 rounded-3xl border border-amber-300/80 text-amber-950 space-y-2.5 shadow-xs">
              <div className="flex items-center gap-2 font-black text-xs text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>قَاعِدَةٌ ذَهَبِيَّةٌ لِلتَّذَكُّرِ:</span>
              </div>
              <ul className="text-xs space-y-1.5 font-bold text-slate-800 leading-relaxed list-disc list-inside">
                <li><strong className="text-emerald-800">طُولُ الْقُطْرِ</strong> = 2 × نِصْفُ الْقُطْرِ (ضِعْفُهُ).</li>
                <li><strong className="text-blue-800">طُولُ نِصْفِ الْقُطْرِ</strong> = الْقُطْرُ ÷ 2 (نِصْفُهُ).</li>
                <li><strong className="text-purple-800">فَتْحَةُ الْمِدْوَرِ</strong> = طُولُ نِصْفِ الْقُطْرِ دَائِماً.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Finished - Certificate of Excellence */
        <div className="bg-white/95 backdrop-blur-xs p-6 sm:p-10 rounded-3xl border-2 border-amber-400 shadow-xl space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border-4 border-amber-400 flex items-center justify-center mx-auto text-amber-600 shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              {score >= Math.ceil(totalQuestions * 0.7) 
                ? (quizLevel === 'challenge' ? '🌟 مُبَارَكٌ يَا عَبْقَرِيَّ الْهَنْدَسَةِ وَالْأَلْغَازِ!' : '🌟 مُبَارَكٌ يَا بَطَلَ الْهَنْدَسَةِ وَالرِّيَاضِيَّاتِ!')
                : '👏 أَحْسَنْتَ عَمَلاً وَمُحَاوَلَةً رَائِعَةً!'}
            </h3>
            <p className="text-sm font-bold text-slate-700">
              لَقَدْ حَصَلْتَ عَلَى <strong className="text-emerald-700 text-lg">{score}</strong> مِنْ أَصْلِ{' '}
              <strong>{totalQuestions}</strong> إِجَابَاتٍ صَحِيحَةٍ.
            </p>
          </div>

          {/* Student name input for certificate */}
          <div className="max-w-md mx-auto space-y-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <label className="text-xs font-black text-slate-800 block">
              اُكْتُبِ اسْمَكَ الْكَرِيمَ لِتَظْهَرَ شَهَادَتُكَ:
            </label>
            <input
              type="text"
              placeholder="مِثَالٌ: التِّلْمِيذُ أَمِينُ بِلْقَاسِم"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-300 text-center font-black text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
          </div>

          {/* Certificate Preview Card */}
          <div className="p-6 bg-gradient-to-b from-amber-50 to-white rounded-3xl border-4 border-double border-amber-400 text-slate-800 space-y-4 shadow-sm">
            <div className="text-xs font-black text-slate-500">
              الْجُمْهُورِيَّةُ الْجَزَائِرِيَّةُ الدِّيمُقْرَاطِيَّةُ الشَّعْبِيَّةُ • وِزَارَةُ التَّرْبِيَةِ الْوَطَنِيَّةِ
            </div>
            <div className="text-lg font-black text-amber-950 border-b border-amber-200 pb-2">
              {quizLevel === 'challenge' 
                ? '📜 شَهَادَةُ عَبْقَرِيِّ الْهَنْدَسَةِ فِي مُسْتَوَى التَّحَدِّي' 
                : '📜 شَهَادَةُ تَمَيُّزٍ فِي هَنْدَسَةِ الدَّائِرَةِ'}
            </div>
            <div className="text-sm font-medium leading-relaxed">
              تُمْنَحُ هَذِهِ الشَّهَادَةُ التَّشْجِيعِيَّةُ لِلتِّلْمِيذِ(ةِ) الْمُتَأَلِّقِ(ةِ):
              <div className="text-xl font-black text-emerald-800 py-1.5">
                {studentName.trim() || 'بَطَلُ(ةُ) الْمُسْتَقْبَلِ فِي الرِّيَاضِيَّاتِ'}
              </div>
              {quizLevel === 'challenge' 
                ? 'لِتَفَوُّقِهِ(ا) فِي حَلِّ الْأَلْغَازِ الْهَنْدَسِيَّةِ الْبَصَرِيَّةِ وَاسْتِنْتَاجِ الْعَلَاقَةِ بَيْنَ الْقُطْرِ وَنِصْفِ الْقُطْرِ بِنَجَاحٍ بَاهِرٍ.'
                : 'لِإِتْقَانِهِ(ا) مَفَاهِيمَ الدَّائِرَةِ، الْمَرْكَزِ، نِصْفِ الْقُطْرِ، الْقُطْرِ، وَالْوَتَرِ لِلسَّنَتَيْنِ الرَّابِعَةِ وَالْخَامِسَةِ ابْتِدَائِيٍّ.'}
            </div>
            <div className="flex items-center justify-between pt-3 text-[11px] font-bold text-slate-500 border-t border-amber-200">
              <span>الدَّرَجَةُ: {score}/{totalQuestions}</span>
              <span>مُسْتَكْشِفُ الدَّائِرَةِ التَّفَاعُلِيُّ - الْجِيلُ الثَّانِي</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handlePrintCertificate}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طِبَاعَةُ الشَّهَادَةِ</span>
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl border border-amber-300 hover:bg-amber-100/60 text-slate-800 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إِعَادَةُ التَّحَدِّي</span>
            </button>

            <button
              type="button"
              onClick={() => switchQuizLevel(quizLevel === 'challenge' ? 'standard' : 'challenge')}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm ring-2 ring-amber-300/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{quizLevel === 'challenge' ? 'تَجْرِبَةُ الْمُسْتَوَى الْأَسَاسِيِّ' : 'تَجْرِبَةُ مُسْتَوَى التَّحَدِّي ⚡'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
