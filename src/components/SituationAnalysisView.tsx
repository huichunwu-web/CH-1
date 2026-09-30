import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  FileEdit, 
  Save, 
  HelpCircle,
  Lightbulb,
  Check
} from 'lucide-react';
import { SituationCase, StudentInfo } from '../types';

interface SituationAnalysisViewProps {
  cases: SituationCase[];
  student: StudentInfo;
  userResponses: Record<string, { optionId: string; notes: string }>;
  onSaveResponse: (caseId: string, optionId: string, notes: string) => void;
  onGoToPdf: () => void;
}

export const SituationAnalysisView: React.FC<SituationAnalysisViewProps> = ({
  cases,
  student,
  userResponses,
  onSaveResponse,
  onGoToPdf,
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(cases[0].id);
  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];
  const savedResponse = userResponses[currentCase.id];

  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    savedResponse?.optionId || ''
  );
  const [reflectionNotes, setReflectionNotes] = useState<string>(
    savedResponse?.notes || ''
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state on tab change
  const handleSelectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    const existing = userResponses[caseId];
    setSelectedOptionId(existing?.optionId || '');
    setReflectionNotes(existing?.notes || '');
    setSaveSuccess(false);
  };

  const handleSave = () => {
    if (!selectedOptionId) {
      alert('請先選擇一個危機處置決策方案！');
      return;
    }
    onSaveResponse(currentCase.id, selectedOptionId, reflectionNotes);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const selectedOpt = currentCase.options.find((o) => o.id === selectedOptionId);
  const completedCount = Object.keys(userResponses).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            實務危機應變演練
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            廚房食安事件情境分析
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            依據現場突發狀況運用 GHP 法規與專業衛生防禦概念進行決策。完成分析並撰寫您的對策心得，將完整記錄於教師後台與成果證書中。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl px-4 py-2.5 text-center">
            <div className="text-xs text-teal-700 font-medium">分析進度</div>
            <div className="text-lg font-black text-teal-900">
              {completedCount} <span className="text-xs text-slate-400">/ {cases.length} 篇</span>
            </div>
          </div>
          {completedCount >= cases.length && (
            <button
              onClick={onGoToPdf}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              匯出成果 PDF 報告
            </button>
          )}
        </div>
      </div>

      {/* Case Navigator Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cases.map((c, idx) => {
          const isDone = !!userResponses[c.id];
          const isActive = c.id === activeCaseId;
          return (
            <button
              key={c.id}
              onClick={() => handleSelectCase(c.id)}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                  : isDone
                  ? 'border-emerald-200 bg-white hover:border-emerald-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-400">案列 0{idx + 1}</span>
                {isDone ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> 已完成
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">待分析</span>
                )}
              </div>
              <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{c.title}</h3>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span className="truncate">{c.location}</span>
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Case Detailed Canvas */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Header */}
        <div className="border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {currentCase.title}
            </h3>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
              {currentCase.slideRef}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">模擬發生場所：{currentCase.location}</span>
          </div>
        </div>

        {/* Narrative & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              現場實況描寫
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {currentCase.context}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              主要危害與失誤重點
            </div>
            <p className="text-sm text-amber-950 leading-relaxed font-medium">
              {currentCase.problemSummary}
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200/60">
              <span className="text-xs font-bold text-amber-900">核心法規條文依據：</span>
              <p className="text-xs text-amber-900/90 mt-0.5 font-medium">
                {currentCase.legalBasis}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Decision Options */}
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-black text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
              1
            </span>
            決策方案選擇：如果您是值班主廚或衛管人員，您會採取何種行動？
          </label>

          <div className="space-y-3">
            {currentCase.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20'
                        : 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-sm font-medium leading-relaxed">
                    {opt.label}
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-xs">
                      {opt.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-emerald-800 font-bold">{opt.feedback}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <span className="text-rose-800 font-bold">{opt.feedback}</span>
                        </>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Expert Commentary (Revealed when an option is selected) */}
        {selectedOpt && (
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-teal-600" />
              專家標準處置流程與守則規範
            </div>
            <p className="text-xs sm:text-sm text-teal-950 leading-relaxed font-medium">
              {currentCase.correctActionDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentCase.keyRulePoints.map((pt, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-white text-teal-800 border border-teal-200 px-2.5 py-1 rounded-lg font-medium"
                >
                  ✓ {pt}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Student Reflection / Action Plan */}
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-black text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              學員分析心得與後續防範對策（將同步至教師後台評閱）
            </span>
            <span className="text-xs font-normal text-slate-400">選填 / 建議撰寫</span>
          </label>
          <textarea
            rows={3}
            value={reflectionNotes}
            onChange={(e) => setReflectionNotes(e.target.value)}
            placeholder="請根據所學 GHP 準則，寫下您針對本案若在未來自身廚房發生時的預防 SOP（例如：如何規劃時程、人員教育訓練時數、專區標示等）..."
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Submit & Save Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-400">
            作答學員：<span className="font-bold text-slate-700">{student.name}</span> ({student.studentId})
          </div>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold animate-in fade-in">
                <Check className="w-4 h-4" /> 已成功儲存分析！
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              儲存本案分析決策
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
