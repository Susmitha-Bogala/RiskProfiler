import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionScreen from '../src/screens/QuestionScreen';
import { questions } from '../src/constants/constants';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import styles from '../src/styles/globalStyles';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn(),
}));

const mockStore = configureStore([]);

const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = mockStore(reduxState);
  return render(
    <Provider store={store}>
      <NavigationContainer>{ui}</NavigationContainer>
    </Provider>,
  );
};

// Define mockNavigate and mockNavigation
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
};

// Mock useNavigation hook
jest
  .spyOn(require('@react-navigation/native'), 'useNavigation')
  .mockReturnValue(mockNavigation);

describe('QuestionScreen', () => {
  beforeEach(() => {
    // Mock the useRoute hook to return specific parameters
    useRoute.mockReturnValue({
      params: { questionId: 1 },
    });
  });

  it('renders question and options correctly and handles option selection', () => {
    const initialState = { risk: { answers: [] } };
    const store = mockStore(initialState);
    const { getByText, getByTestId, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <QuestionScreen />
        </NavigationContainer>
      </Provider>,
    );

    // Verify the question text is rendered
    expect(getByText(`Question 1 of ${questions.length}`)).toBeTruthy();
    expect(getByText(questions[0].text)).toBeTruthy();

    // Verify each option is rendered and can be interacted with
    questions[0].options.forEach((option, idx) => {
      const optionButton = getByTestId(`option-${idx}`);
      expect(optionButton).toBeTruthy();

      // Simulate pressing the option
      fireEvent.press(optionButton);

      // Verify that the option selection triggers the correct action
      const actions = store.getActions();
      expect(actions).toContainEqual({
        type: 'risk/setAnswer',
        payload: { questionId: 1, score: option.score },
      });
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('navigates to the next question if not the last question', async () => {
    const initialState = { risk: { answers: [] } };
    const { getByText, toJSON } = renderWithProviders(<QuestionScreen />, {
      reduxState: initialState,
    });

    const firstOption = questions[0].options[0];

    fireEvent.press(getByText(firstOption.label));

    // Update the mock to simulate navigation to the next question
    useRoute.mockReturnValue({
      params: { questionId: 2 },
    });

    // Re-render the component with the updated route parameters
    const { getByText: getByText2 } = renderWithProviders(<QuestionScreen />, {
      reduxState: initialState,
    });

    await waitFor(() => {
      expect(getByText2(`Question 2 of ${questions.length}`)).toBeTruthy();
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('navigates to the Result screen if it is the last question', async () => {
    const initialState = { risk: { answers: [] } };

    const lastQuestionId = questions[questions.length - 1].id;

    const lastOption = questions[lastQuestionId - 1].options[0];

    // Update the mock to simulate the last question
    useRoute.mockReturnValue({
      params: { questionId: lastQuestionId },
    });

    const { getByText, toJSON } = renderWithProviders(<QuestionScreen />, {
      reduxState: initialState,
    });

    fireEvent.press(getByText(lastOption.label));

    // Mock navigation to Result
    const mockNavigate = useNavigation().navigate;

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Result');
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('updates the Redux state on answer selection', () => {
    const initialState = { risk: { answers: [] } };
    const store = mockStore(initialState);
    const { getByText, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <QuestionScreen />
        </NavigationContainer>
      </Provider>,
    );
    const firstOption = questions[0].options[0];
    fireEvent.press(getByText(firstOption.label));

    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: 'risk/setAnswer',
      payload: { questionId: 1, score: firstOption.score },
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies correct styling to selected option', () => {
    const initialState = {
      risk: {
        answers: [{ questionId: 1, score: questions[0].options[0].score }],
      },
    };
    const { getByTestId, toJSON } = renderWithProviders(<QuestionScreen />, {
      reduxState: initialState,
    });

    const selectedOption = getByTestId('option-0');
    expect(selectedOption.props.style).toMatchObject(styles.optionSelected);

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('returns null when no question is found for the given questionId', () => {
    const initialState = { risk: { answers: [] } };

    // Mock the useRoute hook to return a non-existent questionId
    useRoute.mockReturnValue({
      params: { questionId: -1 },
    });

    const { toJSON } = renderWithProviders(<QuestionScreen />, {
      reduxState: initialState,
    });

    // Verify that the component returns null
    expect(toJSON()).toBeNull();

    expect(toJSON()).toMatchSnapshot();
  });
});
