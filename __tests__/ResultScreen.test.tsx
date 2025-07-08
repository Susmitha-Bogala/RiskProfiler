import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import ResultScreen from '../src/screens/ResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import { resetAnswers } from '../src/redux/slices/riskSlice';
import { riskDescriptions } from '../src/constants/constants';

jest.mock('lottie-react-native', () => 'LottieView');

const mockStore = configureStore([]);

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('../src/utils/riskUtils', () => ({
  getRiskLevel: jest.fn(() => 'Medium'), // Ensure the mock returns a value
}));

describe('ResultScreen', () => {
  let store: MockStoreEnhanced<unknown, {}>; // Add type annotation
  let mockNavigate: jest.Mock; // Add type annotation

  beforeEach(() => {
    store = mockStore({ risk: { answers: [{ score: 5 }, { score: 10 }] } });
    mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });
  });

  it('renders correctly with the expected elements', () => {
    const { getByText, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ResultScreen />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Risk Assessment Complete')).toBeTruthy();
    expect(getByText(/Risk Type:\s*Medium/)).toBeTruthy(); // Use regex to match the full text
    expect(getByText(riskDescriptions['Medium'])).toBeTruthy();

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  it('dispatches resetAnswers and navigates to Question1 on retake', () => {
    const { getByText, toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <ResultScreen />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Retake Questionnaire'));

    const actions = store.getActions();
    expect(actions).toContainEqual(resetAnswers());
    expect(mockNavigate).toHaveBeenCalledWith('Question1');

    expect(toJSON()).toMatchSnapshot();
  });
});
