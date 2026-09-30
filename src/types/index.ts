export interface StudentInfo {
  studentId: string;
  name: string;
  department?: string;
  classYear?: string;
}

export type CardCategory = 'core' | 'defense' | 'regulations' | 'ghp_practice';

export interface Flashcard {
  id: string;
  category: CardCategory;
  categoryName: string;
  frontTitle: string;
  frontKeyword: string;
  backDetail: string[];
  keyTakeaway: string;
  slideRef: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  slideRef: string;
  category: string;
}

export interface QuizSubmission {
  id: string;
  studentId: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  answers: Record<number, number>; // questionId -> chosenOption
  timestamp: string;
  passed: boolean;
  timeSpentSeconds: number;
}

export interface SituationOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
  penaltyPoints: number;
}

export interface SituationCase {
  id: string;
  title: string;
  location: string;
  context: string;
  problemSummary: string;
  options: SituationOption[];
  legalBasis: string;
  correctActionDescription: string;
  keyRulePoints: string[];
  slideRef: string;
}

export interface SituationSubmission {
  caseId: string;
  chosenOptionId: string;
  reflectionNotes: string;
  timestamp: string;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  quizScore: number;
  quizPassed: boolean;
  correctAnswersCount: number;
  totalQuizQuestions: number;
  completedScenariosCount: number;
  scenarioNotes?: string;
  quizDetails: {
    questionId: number;
    chosenAnswer: number;
    isCorrect: boolean;
  }[];
}
