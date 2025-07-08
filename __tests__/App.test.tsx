import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => children,
  };
});

jest.mock('../src/navigation/RootNavigator', () => {
  return function DummyRootNavigator() {
    return <div>Root Navigator</div>;
  };
});

describe('App', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </Provider>
    );
    expect(toJSON()).not.toBeNull();
  });
});
