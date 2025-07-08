import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Answer = {
  questionId: number;
  score: number;
};

type RiskState = {
  answers: Answer[];
};

const initialState: RiskState = {
  answers: [],
};

const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );
      if (index > -1) state.answers[index] = action.payload;
      else state.answers.push(action.payload);
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { setAnswer, resetAnswers } = riskSlice.actions;
export default riskSlice.reducer;
