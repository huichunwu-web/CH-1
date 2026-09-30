import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentHeader } from './components/StudentHeader';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { SituationAnalysisView } from './components/SituationAnalysisView';
import { PdfReportView } from './components/PdfReportView';
import { TeacherPortalView } from './components/TeacherPortalView';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { 
  FLASHCARDS_DATA, 
  QUIZ_QUESTIONS, 
  SITUATION_CASES, 
  DEMO_STUDENT_RECORDS, 
  INITIAL_TEACHER_PASSWORD 
} from './data/curriculumData';
import { StudentInfo, QuizSubmission, StudentRecord } from './types';

export default function App() {
  // Navigation tab
  const [currentTab, setCurrentTab] = useState<
    'flashcards' | 'quiz' | 'situation' | 'pdf' | 'teacher'
  >('flashcards');

  // Student Identity State
  const [student, setStudent] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem('kitchen_safety_student');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return {
      studentId: '11250101',
      name: '王曉明',
      department: '餐飲廚藝管理系',
    };
  });

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  // Flashcards Mastery
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kitchen_safety_mastered_cards');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return ['fc-1', 'fc-2', 'fc-11'];
  });

  // Latest Quiz Submission
  const [latestQuiz, setLatestQuiz] = useState<QuizSubmission | null>(() => {
    try {
      const saved = localStorage.getItem('kitchen_safety_latest_quiz');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return null;
  });

  // Situation Analysis user responses: caseId -> { optionId, notes }
  const [situationResponses, setSituationResponses] = useState<
    Record<string, { optionId: string; notes: string }>
  >(() => {
    try {
      const saved = localStorage.getItem('kitchen_safety_situation_responses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return {
      'case-1': {
        optionId: 'c1-opt-b',
        notes: '遵照 GHP 規定，常溫超過 2 小時且無熱藏設備，極度危險必須停止供應。',
      },
    };
  });

  // Teacher Authentication State
  const [teacherPassword, setTeacherPassword] = useState<string>(() => {
    const saved = localStorage.getItem('kitchen_safety_teacher_password');
    return saved || INITIAL_TEACHER_PASSWORD;
  });

  const [hasChangedInitialPassword, setHasChangedInitialPassword] = useState<boolean>(() => {
    const saved = localStorage.getItem('kitchen_safety_has_changed_password');
    return saved === 'true';
  });

  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState(false);

  // All student submission records for teacher portal
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kitchen_safety_student_records');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEMO_STUDENT_RECORDS;
  });

  // Save student to localStorage
  const handleUpdateStudent = (info: StudentInfo) => {
    setStudent(info);
    localStorage.setItem('kitchen_safety_student', JSON.stringify(info));
  };

  // Toggle flashcard mastery
  const handleToggleMastery = (cardId: string) => {
    setMasteredCardIds((prev) => {
      const next = prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId];
      localStorage.setItem('kitchen_safety_mastered_cards', JSON.stringify(next));
      return next;
    });
  };

  // Handle saving quiz result
  const handleSaveQuizResult = (
    score: number,
    correctCount: number,
    answers: Record<number, number>,
    timeSpentSeconds: number
  ) => {
    const submission: QuizSubmission = {
      id: `sub-${Date.now()}`,
      studentId: student.studentId,
      studentName: student.name,
      score,
      totalQuestions: QUIZ_QUESTIONS.length,
      correctCount,
      answers,
      timestamp: new Date().toLocaleString('zh-TW', { hour12: false }),
      passed: score >= 70,
      timeSpentSeconds,
    };

    setLatestQuiz(submission);
    localStorage.setItem('kitchen_safety_latest_quiz', JSON.stringify(submission));

    // Also update studentRecords so the teacher portal immediately shows this student's result
    const quizDetails = QUIZ_QUESTIONS.map((q) => ({
      questionId: q.id,
      chosenAnswer: answers[q.id] !== undefined ? answers[q.id] : -1,
      isCorrect: answers[q.id] === q.correctAnswer,
    }));

    // Find any notes from scenario
    const sampleNotes = Object.values(situationResponses)
      .map((r) => r.notes)
      .filter(Boolean)
      .join('； ') || '全盤掌握 GHP 良好衛生規範各項重點。';

    const newRecord: StudentRecord = {
      id: `rec-${Date.now()}`,
      studentId: student.studentId,
      studentName: student.name,
      submittedAt: submission.timestamp,
      quizScore: score,
      quizPassed: score >= 70,
      correctAnswersCount: correctCount,
      totalQuizQuestions: QUIZ_QUESTIONS.length,
      completedScenariosCount: Object.keys(situationResponses).length,
      scenarioNotes: sampleNotes,
      quizDetails,
    };

    setStudentRecords((prev) => {
      // replace if same student ID exists or prepend
      const filtered = prev.filter((r) => r.studentId !== student.studentId);
      const updated = [newRecord, ...filtered];
      localStorage.setItem('kitchen_safety_student_records', JSON.stringify(updated));
      return updated;
    });
  };

  // Handle saving situation analysis response
  const handleSaveSituationResponse = (caseId: string, optionId: string, notes: string) => {
    setSituationResponses((prev) => {
      const next = {
        ...prev,
        [caseId]: { optionId, notes },
      };
      localStorage.setItem('kitchen_safety_situation_responses', JSON.stringify(next));
      return next;
    });

    // Update existing record's notes if current student has a record
    setStudentRecords((prev) => {
      const updated = prev.map((r) => {
        if (r.studentId === student.studentId) {
          return {
            ...r,
            completedScenariosCount: Object.keys(situationResponses).length + 1,
            scenarioNotes: notes || r.scenarioNotes,
          };
        }
        return r;
      });
      localStorage.setItem('kitchen_safety_student_records', JSON.stringify(updated));
      return updated;
    });
  };

  // Teacher Password Management
  const handleChangeTeacherPassword = (newPass: string) => {
    setTeacherPassword(newPass);
    setHasChangedInitialPassword(true);
    localStorage.setItem('kitchen_safety_teacher_password', newPass);
    localStorage.setItem('kitchen_safety_has_changed_password', 'true');
  };

  const handleResetToDefaultPassword = () => {
    setTeacherPassword(INITIAL_TEACHER_PASSWORD);
    setHasChangedInitialPassword(false);
    localStorage.removeItem('kitchen_safety_teacher_password');
    localStorage.removeItem('kitchen_safety_has_changed_password');
  };

  // Reset student records to default demo data
  const handleResetRecordsToDemo = () => {
    setStudentRecords(DEMO_STUDENT_RECORDS);
    localStorage.setItem('kitchen_safety_student_records', JSON.stringify(DEMO_STUDENT_RECORDS));
  };

  const handleClearRecords = () => {
    if (window.confirm('確定要清空全班所有的學生作答紀錄嗎？')) {
      setStudentRecords([]);
      localStorage.setItem('kitchen_safety_student_records', JSON.stringify([]));
    }
  };

  // Teacher logout
  const handleTeacherLogout = () => {
    setIsTeacherAuthenticated(false);
    if (currentTab === 'teacher') {
      setCurrentTab('flashcards');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'teacher' && !isTeacherAuthenticated) {
            setIsTeacherLoginOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        student={student}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenTeacherLogin={() => setIsTeacherLoginOpen(true)}
        isTeacherAuthenticated={isTeacherAuthenticated}
        onTeacherLogout={handleTeacherLogout}
      />

      {/* Student Banner Overview (Hidden in print and in teacher portal) */}
      {currentTab !== 'teacher' && (
        <StudentHeader
          student={student}
          onUpdateStudent={handleUpdateStudent}
          isOpen={isStudentModalOpen}
          onClose={() => setIsStudentModalOpen(false)}
          masteredCount={masteredCardIds.length}
          totalCards={FLASHCARDS_DATA.length}
          latestScore={latestQuiz ? latestQuiz.score : null}
          scenariosDone={Object.keys(situationResponses).length}
          totalScenarios={SITUATION_CASES.length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'flashcards' && (
          <FlashcardsView
            cards={FLASHCARDS_DATA}
            masteredCardIds={masteredCardIds}
            onToggleMastery={handleToggleMastery}
            onSelectPracticeQuiz={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            questions={QUIZ_QUESTIONS}
            student={student}
            onSaveQuizResult={handleSaveQuizResult}
            onGoToPdf={() => setCurrentTab('pdf')}
            onGoToSituation={() => setCurrentTab('situation')}
          />
        )}

        {currentTab === 'situation' && (
          <SituationAnalysisView
            cases={SITUATION_CASES}
            student={student}
            userResponses={situationResponses}
            onSaveResponse={handleSaveSituationResponse}
            onGoToPdf={() => setCurrentTab('pdf')}
          />
        )}

        {currentTab === 'pdf' && (
          <PdfReportView
            student={student}
            latestQuiz={latestQuiz}
            cases={SITUATION_CASES}
            situationResponses={situationResponses}
            masteredCount={masteredCardIds.length}
            totalCardsCount={FLASHCARDS_DATA.length}
            onGoToQuiz={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'teacher' && isTeacherAuthenticated && (
          <TeacherPortalView
            records={studentRecords}
            questions={QUIZ_QUESTIONS}
            cases={SITUATION_CASES}
            currentTeacherPassword={teacherPassword}
            hasChangedInitialPassword={hasChangedInitialPassword}
            defaultPasswordDisplay={INITIAL_TEACHER_PASSWORD}
            onChangePassword={handleChangeTeacherPassword}
            onResetToDefaultPassword={handleResetToDefaultPassword}
            onResetRecordsToDemo={handleResetRecordsToDemo}
            onClearRecords={handleClearRecords}
            onLogout={handleTeacherLogout}
          />
        )}
      </main>

      {/* Teacher Login Modal */}
      <TeacherLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={() => setIsTeacherLoginOpen(false)}
        onSuccessLogin={() => {
          setIsTeacherAuthenticated(true);
          setCurrentTab('teacher');
        }}
        currentTeacherPassword={teacherPassword}
        hasChangedInitialPassword={hasChangedInitialPassword}
        defaultPasswordDisplay={INITIAL_TEACHER_PASSWORD}
      />

      {/* Global Footer (no-print) */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="font-bold text-slate-800">Chapter 1 廚房安全衛生守則</span>
            <p className="text-slate-400 mt-0.5">
              餐飲廚藝衛生數位學習認證系統 • 依據衛福部最新食品良好衛生規範(GHP)準則設計
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setCurrentTab('flashcards')}
              className="hover:text-emerald-600 transition-colors"
            >
              學習字卡
            </button>
            <button
              onClick={() => setCurrentTab('quiz')}
              className="hover:text-emerald-600 transition-colors"
            >
              模擬測驗
            </button>
            <button
              onClick={() => setCurrentTab('situation')}
              className="hover:text-emerald-600 transition-colors"
            >
              情境分析
            </button>
            <button
              onClick={() => setCurrentTab('pdf')}
              className="hover:text-emerald-600 transition-colors"
            >
              PDF 輸出
            </button>
            <button
              onClick={() => {
                if (isTeacherAuthenticated) {
                  setCurrentTab('teacher');
                } else {
                  setIsTeacherLoginOpen(true);
                }
              }}
              className="text-amber-800 hover:text-amber-950 font-bold"
            >
              教師後台 (預設: {INITIAL_TEACHER_PASSWORD})
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
