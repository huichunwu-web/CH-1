import React, { useState } from 'react';
import { User, IdCard, GraduationCap, Edit3, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { StudentInfo } from '../types';

interface StudentHeaderProps {
  student: StudentInfo;
  onUpdateStudent: (info: StudentInfo) => void;
  isOpen: boolean;
  onClose: () => void;
  masteredCount: number;
  totalCards: number;
  latestScore: number | null;
  scenariosDone: number;
  totalScenarios: number;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  onUpdateStudent,
  isOpen,
  onClose,
  masteredCount,
  totalCards,
  latestScore,
  scenariosDone,
  totalScenarios,
}) => {
  const [studentId, setStudentId] = useState(student.studentId || '');
  const [name, setName] = useState(student.name || '');
  const [department, setDepartment] = useState(student.department || '餐飲廚藝管理系');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim()) return;
    onUpdateStudent({
      studentId: studentId.trim(),
      name: name.trim(),
      department: department.trim() || '餐飲廚藝系',
    });
    onClose();
  };

  return (
    <>
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-inner no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono">
                  學員認證身分
                </span>
                <button
                  onClick={onClose}
                  className="text-xs text-emerald-200 hover:text-white flex items-center gap-1 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  修改學生資訊
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {student.name} <span className="text-emerald-400 text-base font-normal font-mono">({student.studentId})</span>
              </h2>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {student.department || '餐飲管理系'} • Chapter 1 廚房安全衛生守則數位修課中
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-black/20 p-2 sm:p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-center px-2 py-1">
              <div className="text-[11px] text-emerald-200/70">字卡掌握</div>
              <div className="text-base sm:text-lg font-black text-emerald-300">
                {masteredCount} <span className="text-xs text-white/50">/ {totalCards}</span>
              </div>
            </div>

            <div className="text-center px-2 py-1 border-x border-white/10">
              <div className="text-[11px] text-amber-200/70">測驗成績</div>
              <div className="text-base sm:text-lg font-black text-amber-300">
                {latestScore !== null ? `${latestScore} 分` : '尚未應試'}
              </div>
            </div>

            <div className="text-center px-2 py-1">
              <div className="text-[11px] text-teal-200/70">情境實戰</div>
              <div className="text-base sm:text-lg font-black text-teal-300">
                {scenariosDone} <span className="text-xs text-white/50">/ {totalScenarios}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Info Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200 no-print">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 overflow-hidden relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <IdCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">學生學號與姓名登記</h3>
                <p className="text-xs text-slate-500">學習紀錄、測驗分數及成果證書將以此資料登記</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  學生學號 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <IdCard className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="例如：11250101"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  學生姓名 <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="請輸入真實姓名，如：王曉明"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  就讀科系 / 班級
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="如：餐飲廚藝管理系 一年甲班"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  儲存並開始學習
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
