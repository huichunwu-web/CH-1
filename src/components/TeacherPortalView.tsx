import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  Users, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BarChart3, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogOut, 
  FileSpreadsheet, 
  HelpCircle,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { StudentRecord, QuizQuestion, SituationCase } from '../types';

interface TeacherPortalViewProps {
  records: StudentRecord[];
  questions: QuizQuestion[];
  cases: SituationCase[];
  currentTeacherPassword: string;
  hasChangedInitialPassword: boolean;
  defaultPasswordDisplay: string;
  onChangePassword: (newPass: string) => void;
  onResetToDefaultPassword: () => void;
  onResetRecordsToDemo: () => void;
  onClearRecords: () => void;
  onLogout: () => void;
}

export const TeacherPortalView: React.FC<TeacherPortalViewProps> = ({
  records,
  questions,
  cases,
  currentTeacherPassword,
  hasChangedInitialPassword,
  defaultPasswordDisplay,
  onChangePassword,
  onResetToDefaultPassword,
  onResetRecordsToDemo,
  onClearRecords,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'records' | 'analytics' | 'password'>('records');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pass' | 'fail'>('all');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  // Password modification state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[a-zA-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score; // 0 to 5
  };

  const strengthScore = getPasswordStrength(newPasswordInput);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccessMessage('');

    if (currentPasswordInput !== currentTeacherPassword) {
      setPasswordError('目前舊密碼輸入錯誤，請重新確認！');
      return;
    }

    if (newPasswordInput.length < 6) {
      setPasswordError('新密碼長度至少需要 6 個字元以上！');
      return;
    }

    if (!/[a-zA-Z]/.test(newPasswordInput) || !/[0-9]/.test(newPasswordInput)) {
      setPasswordError('新密碼必須包含英文字母與數字組合以確保安全性！');
      return;
    }

    if (newPasswordInput === defaultPasswordDisplay) {
      setPasswordError('新密碼不能與系統預設密碼相同，請設定新的專屬密碼！');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordError('兩次輸入的新密碼不一致，請再次確認！');
      return;
    }

    // Success
    onChangePassword(newPasswordInput);
    setPasswordSuccessMessage('密碼已成功更新！此新密碼已儲存，下次進入教師系統時請以此新密碼登入。');
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
  };

  // Filter student records
  const filteredRecords = records.filter((r) => {
    const matchQuery =
      searchQuery === '' ||
      r.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchPass =
      filterStatus === 'all' ||
      (filterStatus === 'pass' && r.quizPassed) ||
      (filterStatus === 'fail' && !r.quizPassed);

    return matchQuery && matchPass;
  });

  // Analytics calculation
  const totalSubmissions = records.length;
  const passCount = records.filter((r) => r.quizPassed).length;
  const passRate = totalSubmissions > 0 ? Math.round((passCount / totalSubmissions) * 100) : 0;
  const avgScore =
    totalSubmissions > 0
      ? Math.round(records.reduce((acc, cur) => acc + cur.quizScore, 0) / totalSubmissions)
      : 0;

  // Question error rate analysis
  const questionErrorStats = questions.map((q) => {
    let wrongCount = 0;
    records.forEach((rec) => {
      const detail = rec.quizDetails.find((d) => d.questionId === q.id);
      if (detail && !detail.isCorrect) {
        wrongCount++;
      }
    });
    const errorRate = totalSubmissions > 0 ? Math.round((wrongCount / totalSubmissions) * 100) : 0;
    return {
      question: q,
      wrongCount,
      errorRate,
    };
  }).sort((a, b) => b.errorRate - a.errorRate);

  // Export CSV
  const handleExportCSV = () => {
    if (records.length === 0) {
      alert('目前尚無學生作答紀錄可供匯出');
      return;
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM for Excel
    csvContent += '學號,姓名,測驗分數,是否及格,答對題數,總題數,情境分析完成數,繳卷時間,學生分析心得\n';

    records.forEach((r) => {
      const cleanNotes = (r.scenarioNotes || '').replace(/"/g, '""').replace(/\n/g, ' ');
      csvContent += `"${r.studentId}","${r.studentName}",${r.quizScore},"${r.quizPassed ? '及格' : '不及格'}",${r.correctAnswersCount},${r.totalQuizQuestions},${r.completedScenariosCount},"${r.submittedAt}","${cleanNotes}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `廚房安全衛生守則_學生作答成績清冊_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* FIRST-TIME LOGIN FORCED PASSWORD CHANGE ENFORCEMENT MODAL */}
      {!hasChangedInitialPassword && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl animate-in slide-in-from-top-4 border-2 border-white/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider bg-black/20 text-white font-mono px-3 py-1 rounded-full font-bold">
                  資安保護強制程序
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  首次登入提醒：請立即修改預設密碼
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                  您目前使用的是系統預設密碼「<span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded-sm">{defaultPasswordDisplay}</span>」。為防止未經授權查閱學生作答隱私與竄改成績，請先設定您的新密碼。此新密碼將於下次登入時生效！
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('password')}
              className="px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Key className="w-4 h-4 text-amber-600" />
              立即前往設定新密碼
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            教師權限管理專區
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            學生作答監控與考情分析系統
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            授課章節：Chapter 1 廚房安全衛生守則 • 管理密碼狀態：
            <span className={`font-bold ml-1 ${hasChangedInitialPassword ? 'text-emerald-700' : 'text-amber-600'}`}>
              {hasChangedInitialPassword ? '已自訂高強度密碼 (安全)' : '使用預設密碼中 (建議立即修改)'}
            </span>
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'password'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Key className="w-4 h-4" />
            修改教師密碼
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            匯出全班成績 (CSV)
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            登出
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'records'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          全班作答清單 ({records.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          考情數據與易錯題分析
        </button>

        <button
          onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'password'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          密碼安全設定 {!hasChangedInitialPassword && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>}
        </button>
      </div>

      {/* TAB 1: STUDENT RECORDS */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">應試總人次</span>
              <span className="text-2xl font-black text-slate-800">{totalSubmissions}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">班級平均分數</span>
              <span className="text-2xl font-black text-emerald-700">{avgScore} 分</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">測驗及格率</span>
              <span className="text-2xl font-black text-teal-700">{passRate}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center">
              <span className="text-xs text-slate-400 font-bold block mb-1">滿分優異人數</span>
              <span className="text-2xl font-black text-amber-700">
                {records.filter((r) => r.quizScore === 100).length} 人
              </span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋學生學號或姓名..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                全部 ({records.length})
              </button>
              <button
                onClick={() => setFilterStatus('pass')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'pass' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                及格 ({records.filter((r) => r.quizPassed).length})
              </button>
              <button
                onClick={() => setFilterStatus('fail')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === 'fail' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                待加強 ({records.filter((r) => !r.quizPassed).length})
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">學號</th>
                    <th className="py-3.5 px-4">姓名</th>
                    <th className="py-3.5 px-4">測驗成績</th>
                    <th className="py-3.5 px-4">答對率</th>
                    <th className="py-3.5 px-4">情境分析</th>
                    <th className="py-3.5 px-4">提交時間</th>
                    <th className="py-3.5 px-4 text-center">作答詳情</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        查無符合條件的學生作答紀錄
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((rec) => {
                      const isExpanded = expandedRecordId === rec.id;
                      return (
                        <React.Fragment key={rec.id}>
                          <tr className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">
                              {rec.studentId}
                            </td>
                            <td className="py-3 px-4 font-bold text-slate-800">
                              {rec.studentName}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 font-black px-2.5 py-1 rounded-lg text-xs ${
                                rec.quizPassed
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-100 text-rose-800 border border-rose-200'
                              }`}>
                                {rec.quizScore} 分
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-600">
                              {rec.correctAnswersCount} / {rec.totalQuizQuestions} 題
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                {rec.completedScenariosCount} 案例完成
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                              {rec.submittedAt}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                              >
                                {isExpanded ? (
                                  <>收起 <ChevronUp className="w-3.5 h-3.5" /></>
                                ) : (
                                  <>檢視 <ChevronDown className="w-3.5 h-3.5" /></>
                                )}
                              </button>
                            </td>
                          </tr>

                          {/* EXPANDED DETAILS CARD */}
                          {isExpanded && (
                            <tr className="bg-slate-50/90">
                              <td colSpan={7} className="p-5">
                                <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4 shadow-2xs">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                    <div className="flex items-center gap-2">
                                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                                      <span className="font-bold text-slate-800 text-sm">
                                        【{rec.studentName} - {rec.studentId}】 15 題各題作答詳細診斷
                                      </span>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                      答對 {rec.correctAnswersCount} 題，答錯 {rec.totalQuizQuestions - rec.correctAnswersCount} 題
                                    </span>
                                  </div>

                                  {/* 15 Question pills */}
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                    {rec.quizDetails.map((detail, idx) => {
                                      const question = questions.find((q) => q.id === detail.questionId);
                                      return (
                                        <div
                                          key={detail.questionId}
                                          className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between ${
                                            detail.isCorrect
                                              ? 'border-emerald-200 bg-emerald-50/50 text-emerald-950'
                                              : 'border-rose-200 bg-rose-50/50 text-rose-950'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between font-bold">
                                            <span>第 {idx + 1} 題</span>
                                            {detail.isCorrect ? (
                                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                              <XCircle className="w-4 h-4 text-rose-600" />
                                            )}
                                          </div>
                                          <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                                            {question?.category}
                                          </div>
                                          <div className="text-[11px] font-mono mt-1 pt-1 border-t border-slate-200/60">
                                            選：{String.fromCharCode(65 + detail.chosenAnswer)}{' '}
                                            {!detail.isCorrect && question && (
                                              <span className="text-rose-600 font-bold">
                                                (正解: {String.fromCharCode(65 + question.correctAnswer)})
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Student Scenario Notes if any */}
                                  {rec.scenarioNotes && (
                                    <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                                      <span className="font-bold text-amber-900 block mb-1">
                                        學員情境分析心得與 SOP 改善對策摘錄：
                                      </span>
                                      <p className="leading-relaxed font-medium">
                                        {rec.scenarioNotes}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom tools */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-500">
                顯示 {filteredRecords.length} 筆學生紀錄（共 {records.length} 筆）
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onResetRecordsToDemo}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 font-medium cursor-pointer"
                >
                  重新加載示範學生紀錄
                </button>
                <button
                  onClick={onClearRecords}
                  className="px-3 py-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 rounded-lg text-rose-700 font-medium cursor-pointer"
                >
                  清空目前紀錄
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANALYTICS & QUESTION DIFFICULTY */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-lg font-black text-slate-800 mb-1">
              試題易錯率排行榜 (全班考點盲區診斷)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              依據全班作答大數據即時計算各題錯誤率，教師可優先針對排名前三之重點進行堂上補救講解。
            </p>

            <div className="space-y-3">
              {questionErrorStats.map((stat, idx) => (
                <div
                  key={stat.question.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-amber-300 bg-white transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        idx < 3 ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="font-bold text-sm text-slate-800">
                        第 {stat.question.id} 題：{stat.question.question}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-500">
                        {stat.wrongCount} 人答錯
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        stat.errorRate >= 40
                          ? 'bg-rose-100 text-rose-700 border border-rose-300'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        錯誤率 {stat.errorRate}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        stat.errorRate >= 40 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.max(5, stat.errorRate)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="font-medium">考點分類：{stat.question.category}</span>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      正確答案：{String.fromCharCode(65 + stat.question.correctAnswer)}. {stat.question.options[stat.question.correctAnswer]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD MANAGEMENT FUNCTION */}
      {activeTab === 'password' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6">
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                教師後台密碼管理中心
              </h3>
              <p className="text-xs text-slate-500">
                修改後將立即寫入系統儲存庫，作為下次登入本管理系統之唯一密碼
              </p>
            </div>
          </div>

          {/* Current Status Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">初始預設密碼：</span>
              <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {defaultPasswordDisplay}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">首次登入密碼變更狀態：</span>
              <span className={`font-bold ${hasChangedInitialPassword ? 'text-emerald-600' : 'text-amber-600'}`}>
                {hasChangedInitialPassword ? '✓ 已成功修改專屬密碼' : '尚未修改（請依規範立即變更）'}
              </span>
            </div>
          </div>

          {/* Success Banner */}
          {passwordSuccessMessage && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-sm">{passwordSuccessMessage}</p>
                <p className="text-emerald-700 font-normal mt-1">
                  請妥善記住您的新密碼。如需退出後台，可點擊右上角「登出」測試以新密碼登入。
                </p>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {passwordError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {/* Password Change Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* Old password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                目前舊密碼 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder={!hasChangedInitialPassword ? `請輸入預設密碼 (${defaultPasswordDisplay})` : '請輸入目前使用的密碼'}
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                設定新密碼 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="請輸入 6 碼以上包含英文與數字的新密碼"
                  className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter */}
              {newPasswordInput && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">密碼強度評定：</span>
                    <span className={
                      strengthScore <= 2 ? 'text-rose-600' : strengthScore <= 3 ? 'text-amber-600' : 'text-emerald-600'
                    }>
                      {strengthScore <= 2 ? '強度較弱' : strengthScore <= 3 ? '強度中等' : '強度極佳 (推薦)'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 flex gap-1">
                    <div className={`h-1.5 rounded-full flex-1 ${strengthScore >= 1 ? (strengthScore <= 2 ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-200'}`}></div>
                    <div className={`h-1.5 rounded-full flex-1 ${strengthScore >= 2 ? (strengthScore <= 2 ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-200'}`}></div>
                    <div className={`h-1.5 rounded-full flex-1 ${strengthScore >= 3 ? 'bg-amber-500' : 'bg-slate-200'}`}></div>
                    <div className={`h-1.5 rounded-full flex-1 ${strengthScore >= 4 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  </div>
                  <ul className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                    <li className={newPasswordInput.length >= 6 ? 'text-emerald-600 font-semibold' : ''}>
                      • 長度需至少 6 個字元以上
                    </li>
                    <li className={/[a-zA-Z]/.test(newPasswordInput) && /[0-9]/.test(newPasswordInput) ? 'text-emerald-600 font-semibold' : ''}>
                      • 包含英文字母與數字組合
                    </li>
                    <li className={newPasswordInput !== defaultPasswordDisplay ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                      • 不得與預設密碼 ({defaultPasswordDisplay}) 相同
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm new password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                再次確認新密碼 <span className="text-rose-500">*</span>
              </label>
              <input
                type={showNewPass ? 'text' : 'password'}
                required
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                placeholder="請再次輸入新密碼以供核對"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-mono"
              />
              {confirmPasswordInput && confirmPasswordInput !== newPasswordInput && (
                <p className="mt-1 text-[11px] text-rose-500 font-bold">
                  兩次輸入的密碼不一致！
                </p>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                確認儲存並啟用新密碼（下次登入即使用此密碼）
              </button>
            </div>
          </form>

          {/* Emergency fallback */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>忘記自訂密碼或需重設？</span>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`確定要將教師管理密碼重置回預設密碼「${defaultPasswordDisplay}」嗎？`)) {
                  onResetToDefaultPassword();
                  setPasswordSuccessMessage(`密碼已重置回預設密碼：${defaultPasswordDisplay}`);
                }
              }}
              className="text-amber-800 hover:text-amber-950 underline font-medium cursor-pointer"
            >
              重置回初始預設密碼
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
