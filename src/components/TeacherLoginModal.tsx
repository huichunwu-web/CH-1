import React, { useState } from 'react';
import { Lock, Eye, EyeOff, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
  currentTeacherPassword: string;
  hasChangedInitialPassword: boolean;
  defaultPasswordDisplay: string;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  currentTeacherPassword,
  hasChangedInitialPassword,
  defaultPasswordDisplay,
}) => {
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === currentTeacherPassword) {
      setErrorMsg('');
      setInputPassword('');
      onSuccessLogin();
      onClose();
    } else {
      setErrorMsg('密碼不正確，請重新輸入！');
    }
  };

  const handleUseDefault = () => {
    setInputPassword(defaultPasswordDisplay);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 no-print">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              教師管理後台登入
            </h3>
            <p className="text-xs text-slate-500">
              專供任課教師查閱全班作答進度、成績分析與試題檢討
            </p>
          </div>
        </div>

        {/* Default Password Notice Box */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 mb-5 text-xs text-amber-950 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <KeyRound className="w-4 h-4 text-amber-700" />
              初始進入系統預設密碼：
            </div>
            {!hasChangedInitialPassword && (
              <button
                type="button"
                onClick={handleUseDefault}
                className="text-[11px] font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
              >
                自動帶入預設密碼
              </button>
            )}
          </div>

          <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-amber-300 font-mono text-sm">
            <span className="font-bold text-slate-900">
              {hasChangedInitialPassword ? '•••••••• (已自訂變更)' : defaultPasswordDisplay}
            </span>
            {!hasChangedInitialPassword && (
              <span className="text-[11px] bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-md font-sans">
                首次請以此密碼登入
              </span>
            )}
          </div>

          <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
            {!hasChangedInitialPassword
              ? '★ 首次登入系統後，系統將強制引導您至「密碼修改」頁面，設定一組高強度專屬密碼，保障學生個資與成績安全！'
              : '★ 您已變更過密碼，請使用您先前設定的新密碼登入。如忘記密碼可由系統管理員重置。'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              請輸入教師管理密碼
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="請輸入密碼"
                className="w-full pl-4 pr-11 py-3 rounded-2xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errorMsg && (
              <p className="mt-1.5 text-xs text-rose-600 font-bold flex items-center gap-1 animate-in fade-in">
                <ShieldAlert className="w-3.5 h-3.5" />
                {errorMsg}
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              登入管理後台
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
