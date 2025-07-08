import riskReducer, { setAnswer, resetAnswers } from '../src/redux/slices/riskSlice';

// Test suite for riskSlice
describe('riskSlice', () => {
  it('should update an existing answer', () => {
    const initialState = { answers: [{ questionId: 1, score: 5 }] };
    const action = setAnswer({ questionId: 1, score: 10 });
    const state = riskReducer(initialState, action);
    expect(state.answers).toEqual([{ questionId: 1, score: 10 }]);
  });

  it('should add a new answer if questionId does not exist', () => {
    const initialState = { answers: [{ questionId: 1, score: 5 }] };
    const action = setAnswer({ questionId: 2, score: 8 });
    const state = riskReducer(initialState, action);
    expect(state.answers).toEqual([
      { questionId: 1, score: 5 },
      { questionId: 2, score: 8 },
    ]);
  });

  it('should update an existing answer with the same questionId', () => {
    const initialState = { answers: [{ questionId: 1, score: 5 }] };
    const action = setAnswer({ questionId: 1, score: 10 });
    const state = riskReducer(initialState, action);
    expect(state.answers).toEqual([{ questionId: 1, score: 10 }]);
  });

  it('should reset answers to an empty array', () => {
    const initialState = { answers: [{ questionId: 1, score: 5 }, { questionId: 2, score: 8 }] };
    const action = resetAnswers();
    const state = riskReducer(initialState, action);
    expect(state.answers).toEqual([]);
  });
});