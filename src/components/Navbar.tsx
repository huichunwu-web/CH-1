import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Lock, 
  UserCheck, 
  ChefHat,
  Menu,
  X
} from 'lucide-react';
import { StudentInfo } from '../types';

interface NavbarProps {
  currentTab: 'flashcards' | 'quiz' | 'situation' | 'pdf' | 'teacher';
  setCurrentTab: (tab: 'flashcards' | 'quiz' | 'situation' | 'pdf' | 'teacher') => void;
  student: StudentInfo;
  onOpenStudentModal: () => void;
  onOpenTeacherLogin: () => void;
  isTeacherAuthenticated: boolean;
  onTeacherLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  student,
  onOpenStudentModal,
  onOpenTeacherLogin,
  isTeacherAuthenticated,
  onTeacherLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'flashcards', label: '學習字卡', icon: BookOpen },
    { id: 'quiz', label: '模擬測驗', icon: HelpCircle },
    { id: 'situation', label: '情境分析', icon: ShieldCheck },
    { id: 'pdf', label: '成果證書/PDF', icon: FileText },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Title */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('flashcards')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Chapter 1
                  </span>
                  <span className="text-xs text-slate-500 hidden sm:inline">華立餐飲數位教材</span>
                </div>
                <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight flex items-center gap-1">
                  廚房安全衛生守則
                  <span className="text-xs text-emerald-600 font-semibold hidden md:inline">學習與評量系統</span>
                </h1>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Student Info & Teacher Access */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Student Pill */}
            <button
              onClick={onOpenStudentModal}
              title="點擊切換或修改學生學號姓名"
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="text-xs leading-tight">
                <div className="text-slate-500 font-mono text-[10px]">
                  學號: {student.studentId || '未設定'}
                </div>
                <div className="font-bold text-slate-800 max-w-[90px] truncate">
                  {student.name || '訪客同學'}
                </div>
              </div>
            </button>

            {/* Teacher Button */}
            {isTeacherAuthenticated ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentTab('teacher')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentTab === 'teacher'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>教師後台</span>
                </button>
                <button
                  onClick={onTeacherLogout}
                  title="登出教師身分"
                  className="text-xs text-slate-400 hover:text-slate-600 px-1 py-1"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenTeacherLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">教師管理系統</span>
                <span className="sm:hidden">教師</span>
              </button>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
          {isTeacherAuthenticated && (
            <button
              onClick={() => {
                setCurrentTab('teacher');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-amber-100 text-amber-900"
            >
              <Lock className="w-4 h-4 text-amber-700" />
              進入教師管理後台
            </button>
          )}
        </div>
      )}
    </header>
  );
};
