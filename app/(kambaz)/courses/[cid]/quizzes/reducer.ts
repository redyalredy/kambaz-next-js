import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Answer {
  question: string;
  answer: any;
  isCorrect: boolean;
}

interface Attempt {
  _id: string;
  user: string;
  attemptNumber: number;
  score: number;
  submittedAt: string;
  answers: Answer[];
}

interface Question {
  _id: string;
  title: string;
  type: string;
  points: number;
  questionText: string;
  choices: string[];
  correctChoice: number;
  trueFalseAnswer: boolean;
  blankAnswers: string[];
  editing?: boolean;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  quizType: string;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  points: number;
  questions: Question[];
  attempts: Attempt[];
  editing?: boolean;
}

interface QuizzesState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  questions: Question[];
  lastAttempt: Attempt | null;
}

const initialState: QuizzesState = {
  quizzes: [],
  currentQuiz: null,
  questions: [],
  lastAttempt: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = (action.payload || []).filter(Boolean);
    },

    addQuiz: (state, { payload: quiz }: PayloadAction<Partial<Quiz>>) => {
      const newQuiz: Quiz = {
        _id: uuidv4(),
        title: quiz.title || "New Quiz",
        description: quiz.description || "",
        quizType: quiz.quizType || "Graded Quiz",
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers ?? true,
        timeLimit: quiz.timeLimit ?? 20,
        multipleAttempts: quiz.multipleAttempts ?? false,
        howManyAttempts: quiz.howManyAttempts ?? 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
        webcamRequired: quiz.webcamRequired ?? false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
        dueDate: quiz.dueDate || "",
        availableDate: quiz.availableDate || "",
        untilDate: quiz.untilDate || "",
        published: quiz.published ?? false,
        points: quiz.points ?? 0,
        questions: quiz.questions || [],
        attempts: quiz.attempts || [],
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },

    deleteQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);

      if (state.currentQuiz?._id === quizId) {
        state.currentQuiz = null;
        state.questions = [];
        state.lastAttempt = null;
      }
    },

    updateQuiz: (state, { payload: quiz }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quiz._id ? quiz : q
      );

      if (state.currentQuiz?._id === quiz._id) {
        state.currentQuiz = quiz;
      }
    },

    editQuiz: (state, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quizId ? { ...q, editing: true } : { ...q, editing: false }
      );
    },

    setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
      state.currentQuiz = action.payload;
    },

    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = (action.payload || []).filter(Boolean);
    },

    addQuestion: (state, { payload: question }: PayloadAction<Partial<Question>>) => {
      const newQuestion: Question = {
        _id: uuidv4(),
        title: question.title || "New Question",
        type: question.type || "MULTIPLE_CHOICE",
        points: question.points ?? 1,
        questionText: question.questionText || "",
        choices: question.choices || [],
        correctChoice: question.correctChoice ?? 0,
        trueFalseAnswer: question.trueFalseAnswer ?? true,
        blankAnswers: question.blankAnswers || [],
        editing: false,
      };
      state.questions = [...state.questions, newQuestion];
    },

    deleteQuestion: (state, { payload: questionId }: PayloadAction<string>) => {
      state.questions = state.questions.filter(
        (q) => q && q._id !== questionId
      );
    },

    updateQuestion: (state, { payload: question }: PayloadAction<Question>) => {
      state.questions = state.questions.map((q) =>
        q && q._id === question._id
          ? { ...q, ...question, editing: false }
          : q
      );
    },

    editQuestion: (state, { payload: questionId }: PayloadAction<string>) => {
      state.questions = state.questions.map((q) =>
        q && q._id === questionId
          ? { ...q, editing: true }
          : { ...q, editing: false }
      );
    },

    setLastAttempt: (state, action: PayloadAction<Attempt | null>) => {
      state.lastAttempt = action.payload;
    },

    clearQuizState: (state) => {
      state.currentQuiz = null;
      state.questions = [];
      state.lastAttempt = null;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
  editQuiz,
  setCurrentQuiz,
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  editQuestion,
  setLastAttempt,
  clearQuizState,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;