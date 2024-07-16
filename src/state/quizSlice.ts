import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  correct?: boolean;
}

export interface StateProps {
  quiz_category: string;
  quiz_difficulty: string;
  quiz_question_amount: number;
  score: number;
  quiz_history?: Question[];
}

export const initialState: StateProps = {
  quiz_category: "9",
  quiz_difficulty: "easy",
  quiz_question_amount: 10,
  score: 0,
  quiz_history: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.quiz_category = action.payload;
    },
    changeDifficulty: (state, action: PayloadAction<string>) => {
      state.quiz_difficulty = action.payload;
    },
    changeAmount: (state, action: PayloadAction<number>) => {
      state.quiz_question_amount = action.payload;
    },
    changeScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    restartState: (state) => {
      state.quiz_category = initialState.quiz_category;
      state.quiz_difficulty = initialState.quiz_difficulty;
      state.quiz_question_amount = initialState.quiz_question_amount;
      state.score = initialState.score;
      state.quiz_history = initialState.quiz_history;
    },
    updateQuizHistory: (state, action: PayloadAction<Question[]>) => {
      state.quiz_history = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeDifficulty,
  changeAmount,
  changeScore,
  restartState,
  updateQuizHistory,
} = quizSlice.actions;

export default quizSlice.reducer;
