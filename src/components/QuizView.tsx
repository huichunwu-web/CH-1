import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Award, 
  RotateCcw, 
  FileCheck2, 
  AlertTriangle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, StudentInfo } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  student: StudentInfo;
  onSaveQuizResult: (
    score: number,
    correctCount: number,
    answers: Record<number, number>,
    timeSpentSeconds: number
  ) => void;
  onGoToPdf: () => void;
  onGoToSituation: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  student,
  onSaveQuizResult,
  onGoToPdf,
  onGoToSituation,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / questions.length) * 100);
    return { score, correct, total: questions.length };
  };

  const handleSubmitQuiz = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < questions.length) {
      const confirmSubmit = window.confirm(
        `您尚有 ${questions.length - answeredCount} 題尚未作答，確定要現在交卷結算嗎？`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setIsTimerRunning(false);

    const { score, correct } = calculateScore();
    onSaveQuizResult(score, correct, selectedAnswers, timeSpent);

    if (score >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti errors
      }
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimeSpent(0);
    setIsTimerRunning(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx];
  const { score, correct, total } = calculateScore();
  const passed = score >= 70;

  return (
    <div className="space-y-6">
      {/* Quiz Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            單元模擬評量
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Chapter 1 廚房安全衛生守則模擬測驗
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            作答對象：<span className="font-bold text-slate-700">{student.name}</span>（學號：<span className="font-mono text-emerald-700">{student.studentId}</span>）• 共 15 題，滿分 100 分，70 分及格。
          </p>
        </div>

        {/* Status / Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-sm font-bold">{formatTime(timeSpent)}</span>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              立即交卷結算
            </button>
          ) : (
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              重新測驗
            </button>
          )}
        </div>
      </div>

      {/* Progress & Navigator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
          <span>題目導航 ({Object.keys(selectedAnswers).length} / {questions.length} 已作答)</span>
          <span className="text-emerald-700">
            {Math.round((Object.keys(selectedAnswers).length / questions.length) * 100)}% 完成
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctAnswer;
            const isWrong = isSubmitted && isAnswered && !isCorrect;

            let btnStyle = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
            if (isSubmitted) {
              if (isCorrect) btnStyle = 'bg-emerald-600 text-white font-bold';
              else if (isWrong) btnStyle = 'bg-rose-500 text-white font-bold';
              else btnStyle = 'bg-amber-100 text-amber-800';
            } else if (isCurrent) {
              btnStyle = 'ring-2 ring-emerald-600 bg-emerald-50 text-emerald-800 font-bold';
            } else if (isAnswered) {
              btnStyle = 'bg-emerald-100 text-emerald-800 font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`py-2 rounded-xl text-xs transition-all flex items-center justify-center cursor-pointer ${btnStyle}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULT REPORT BANNER (IF SUBMITTED) */}
      {isSubmitted && (
        <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-lg transition-all ${
          passed 
            ? 'bg-gradient-to-r from-emerald-900 to-teal-900 text-white border-emerald-500' 
            : 'bg-gradient-to-r from-rose-900 to-slate-900 text-white border-rose-500'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-inner ${
                passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
              }`}>
                {score}
                <span className="text-xs font-normal">分</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {passed ? '評量及格 PASS' : '未達及格標準'}
                  </span>
                  <span className="text-xs text-white/70">
                    答對 {correct} / {total} 題 • 耗時 {formatTime(timeSpent)}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {passed ? '恭喜您！順利通過廚房衛生安全評量' : '別灰心！複習錯題後可立即重測'}
                </h3>
                <p className="text-xs text-slate-200/80 mt-1 max-w-xl">
                  {passed
                    ? '您已熟練掌握 Chapter 1 各項重要觀念與 GHP 修正法規，建議前往「成果證書/PDF」列印您的學習成果，或挑戰「情境分析」！'
                    : '建議點擊下方各題詳解，對照教材頁碼重新鞏固基礎觀念。'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onGoToPdf}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                匯出 PDF 成果證書
              </button>
              <button
                onClick={onGoToSituation}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                前往情境分析
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* Question Header */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              第 {currentIdx + 1} 題 / 共 {questions.length} 題
            </span>
            <span className="text-xs text-slate-400 font-medium">
              [{currentQ.category}]
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
            {currentQ.slideRef}
          </span>
        </div>

        {/* Question text */}
        <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug mb-6">
          {currentQ.question}
        </h3>

        {/* Options list */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            const isCorrectAnswer = currentQ.correctAnswer === optIdx;

            let optionClass = 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-700';

            if (isSubmitted) {
              if (isCorrectAnswer) {
                optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20';
              } else if (isSelected && !isCorrectAnswer) {
                optionClass = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
              } else {
                optionClass = 'border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionClass = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/30 font-semibold';
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, optIdx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${optionClass}`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isSubmitted
                    ? isCorrectAnswer
                      ? 'bg-emerald-600 text-white'
                      : isSelected
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                    : isSelected
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </div>

                <div className="flex-1 text-sm font-medium leading-relaxed">
                  {opt}
                </div>

                {isSubmitted && (
                  <div className="shrink-0 mt-0.5">
                    {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    {isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation (Shown when submitted) */}
        {isSubmitted && (
          <div className="mt-6 p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm animate-in fade-in">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
              <BookOpen className="w-4 h-4 text-amber-700" />
              考點深度解析與教材對照：
            </div>
            <p className="text-amber-950 leading-relaxed font-medium">
              {currentQ.explanation}
            </p>
            <div className="mt-2 text-right">
              <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                出處：{currentQ.slideRef}
              </span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            上一題
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentIdx + 1} of {questions.length}
          </span>

          <button
            onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIdx === questions.length - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-30 disabled:hover:bg-emerald-600 text-xs font-bold cursor-pointer"
          >
            下一題
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
