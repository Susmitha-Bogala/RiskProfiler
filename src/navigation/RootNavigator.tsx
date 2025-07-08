import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionScreen from '../screens/QuestionScreen';
import ResultScreen from '../screens/ResultScreen';
import { questions } from '../constants/constants';

const Stack = createNativeStackNavigator();

// Easily update this value to support more questions
const TOTAL_QUESTIONS = questions.length;

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Question1"
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
      }}
    >
      {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
        const id = i + 1;
        return (
          <Stack.Screen
            key={id}
            name={`Question${id}`}
            component={QuestionScreen}
            initialParams={{ questionId: id }}
            options={{ title: `Question ${id}` }}
          />
        );
      })}
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: false, animation: 'fade' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

