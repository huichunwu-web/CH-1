import React, { useRef } from 'react';
import { 
  Printer, 
  Download, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap, 
  FileCheck, 
  Clock, 
  ChefHat,
  QrCode,
  Sparkles
} from 'lucide-react';
import { StudentInfo, QuizSubmission, SituationCase } from '../types';

interface PdfReportViewProps {
  student: StudentInfo;
  latestQuiz: QuizSubmission | null;
  cases: SituationCase[];
  situationResponses: Record<string, { optionId: string; notes: string }>;
  masteredCount: number;
  totalCardsCount: number;
  onGoToQuiz: () => void;
}

export const PdfReportView: React.FC<PdfReportViewProps> = ({
  student,
  latestQuiz,
  cases,
  situationResponses,
  masteredCount,
  totalCardsCount,
  onGoToQuiz,
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certNumber = `HUALI-${student.studentId || 'STUDENT'}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  const score = latestQuiz ? latestQuiz.score : 0;
  const isPassed = latestQuiz ? latestQuiz.passed : false;
  const scenariosCompleted = Object.keys(situationResponses).length;

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            學習成果檢定證書與報告
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            學習證書與 PDF 輸出中心
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            系統已自動彙整您的「學號、姓名、字卡進度、模擬測驗成績與情境分析」。點擊「列印 / 儲存為 PDF」即可直接利用瀏覽器列印功能儲存成正式 PDF 學習證明！
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            列印 / 存為 PDF 文件
          </button>
        </div>
      </div>

      {/* Warning if quiz not taken */}
      {!latestQuiz && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4 no-print">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-xs sm:text-sm text-amber-900 font-medium">
              提醒：您目前尚未完成「模擬測驗」，證書上的測驗成績欄位將顯示為「未應試」。建議先進行測驗後再列印。
            </div>
          </div>
          <button
            onClick={onGoToQuiz}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
          >
            立即前往測驗
          </button>
        </div>
      )}

      {/* PRINTABLE OFFICIAL CERTIFICATE & DETAILED REPORT */}
      <div 
        ref={reportRef}
        className="printable-area bg-white rounded-3xl border-4 border-emerald-800/80 shadow-2xl p-6 sm:p-12 max-w-4xl mx-auto relative overflow-hidden"
      >
        {/* Certificate Decorative Outer Border */}
        <div className="border-2 border-dashed border-emerald-600/40 rounded-2xl p-6 sm:p-8 relative bg-radial from-emerald-50/20 via-white to-white">
          
          {/* Top Header & Official Seals */}
          <div className="flex items-start justify-between border-b-2 border-emerald-800/20 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex items-center justify-center shadow-md">
                <ChefHat className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 tracking-widest uppercase">
                  NATIONAL FOOD SAFETY & SANITATION CURRICULUM
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  餐飲衛生與廚房安全學習成果認證書
                </h1>
                <p className="text-xs text-slate-500 font-serif">
                  Chapter 1 廚房安全衛生守則 • 數位專業修課評量報告
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-mono font-bold">
                No. {certNumber}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">發證日期：{todayStr}</div>
            </div>
          </div>

          {/* Student Identity Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">學生姓名</span>
                <span className="text-base sm:text-lg font-black text-slate-900">{student.name}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">學生學號</span>
                <span className="text-base sm:text-lg font-black font-mono text-emerald-800">{student.studentId}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">就讀系所</span>
                <span className="text-sm font-bold text-slate-800">{student.department || '餐飲廚藝管理系'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">認證評量狀態</span>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md mt-1 ${
                  latestQuiz && isPassed
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {latestQuiz ? (isPassed ? '✓ 考試合格 PASS' : '需補考或重測') : '未應試'}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Performance Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 font-bold block mb-1">模擬測驗成績</span>
              <div className="text-3xl font-black text-emerald-950 font-mono">
                {latestQuiz ? latestQuiz.score : '--'}
                <span className="text-sm font-normal ml-1">分</span>
              </div>
              <span className="text-[11px] text-emerald-700 mt-1 block">
                {latestQuiz ? `答對 ${latestQuiz.correctCount} / ${latestQuiz.totalQuestions} 題` : '尚未應試'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center">
              <span className="text-xs text-teal-800 font-bold block mb-1">核心字卡掌握度</span>
              <div className="text-3xl font-black text-teal-950 font-mono">
                {Math.round((masteredCount / totalCardsCount) * 100)}%
              </div>
              <span className="text-[11px] text-teal-700 mt-1 block">
                已掌握 {masteredCount} / {totalCardsCount} 張重點字卡
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
              <span className="text-xs text-sky-800 font-bold block mb-1">實務情境分析</span>
              <div className="text-3xl font-black text-sky-950 font-mono">
                {scenariosCompleted} <span className="text-sm font-normal">/ {cases.length}</span>
              </div>
              <span className="text-[11px] text-sky-700 mt-1 block">
                完成 {scenariosCompleted === cases.length ? '全部實戰案例演練' : '部分情境決策'}
              </span>
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          <div className="mb-6 space-y-3">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              學科核心能力指標評定
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex justify-between font-bold mb-1">
                  <span>1. 衛生概念與 S.A.N.I.T. 精神</span>
                  <span className="text-emerald-700">精熟 (Mastered)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  涵蓋 Sanitation vs Hygiene、WHO Farm to Plate、911食安演進。
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex justify-between font-bold mb-1">
                  <span>2. 食品防護 (Food Protection) 與 SQF</span>
                  <span className="text-emerald-700">精熟 (Mastered)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  掌握 FP = FS + FD + FQ 架構，明辨蓄意污染與偶然污染。
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex justify-between font-bold mb-1">
                  <span>3. 兩大法規與罰則辨別</span>
                  <span className="text-emerald-700">精熟 (Mastered)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-sky-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  GHP中央法(食安法第8條限期改善罰6萬-2億) vs 公共飲食地方直接罰(3-300萬)。
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <div className="flex justify-between font-bold mb-1">
                  <span>4. 最新 GHP 修正實務規範</span>
                  <span className="text-emerald-700">精熟 (Mastered)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  常溫&lt;2hr、熱藏&gt;60℃、不摸錢、三專管理、體檢刪除肺結核、年訓3hr。
                </span>
              </div>
            </div>
          </div>

          {/* Student Situational Reflection Summary */}
          <div className="mb-6">
            <h3 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              情境分析決策與心得摘要
            </h3>
            <div className="space-y-2">
              {cases.slice(0, 3).map((c) => {
                const resp = situationResponses[c.id];
                const opt = c.options.find((o) => o.id === resp?.optionId);
                return (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{c.title}</span>
                      <span className={`text-[11px] ${opt?.isCorrect ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {opt ? (opt.isCorrect ? '✓ 最佳處置' : '決策待強化') : '未作答'}
                      </span>
                    </div>
                    {resp?.notes && (
                      <p className="text-slate-600 mt-1 italic font-medium bg-white p-2 rounded-lg border border-slate-200/60">
                        「{resp.notes}」
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signatures & Certification Seal */}
          <div className="border-t-2 border-emerald-900/20 pt-6 mt-6 flex flex-col sm:flex-row items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs flex items-center justify-center">
                <QrCode className="w-14 h-14 text-slate-800" />
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                <div className="font-mono font-bold text-slate-700">數位驗證序號</div>
                <div className="font-mono text-[10px]">{certNumber}</div>
                <div className="text-[10px] text-slate-400 mt-1">華立圖書 廚房安全衛生守則</div>
              </div>
            </div>

            <div className="flex items-center gap-8 text-right">
              <div>
                <span className="text-xs text-slate-400 block mb-3 font-semibold">指導教師簽章 / 評閱</span>
                <div className="border-b-2 border-slate-800 w-40 pb-1 text-center font-serif text-slate-800 font-bold text-sm tracking-widest">
                  廚藝衛管教研組
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">評核日期：{todayStr}</span>
              </div>

              {/* Official Stamp badge */}
              <div className="w-20 h-20 rounded-full border-4 border-rose-600 text-rose-600 flex flex-col items-center justify-center font-black text-[10px] uppercase tracking-tighter rotate-[-8deg] shadow-xs select-none">
                <span>華立圖書</span>
                <span className="text-xs border-y border-rose-600 my-0.5 px-1 font-sans">測驗合格</span>
                <span>教學審定</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
