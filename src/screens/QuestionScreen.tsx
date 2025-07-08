import React, { useEffect, useRef, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../redux/slices/riskSlice';
import { questions } from '../constants/constants';
import { RootState } from '../redux/store';
import styles from '../styles/globalStyles';

type ParamList = {
  [key: string]: { questionId: number };
};

const QuestionScreen = () => {
  const route = useRoute<RouteProp<ParamList, string>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { questionId } = route.params;

  const question = questions.find((q) => q.id === questionId);
  const selectedAnswers = useSelector((state: RootState) => state.risk.answers);
  const existing = selectedAnswers.find((a) => a.questionId === questionId);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAnswer = (score: number) => {
    dispatch(setAnswer({ questionId, score }));

    setTimeout(() => {
      if (questionId < questions.length) {
        navigation.navigate(`Question${questionId + 1}`);
      } else {
        navigation.navigate('Result');
      }
    }, 300);
  };

  if (!question) return null;

  return (
    <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
      <Text style={styles.progressText}>
        Question {questionId} of {questions.length}
      </Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.text}</Text>

        {question.options.map((option, idx) => {
          const isSelected = existing?.score === option.score;

          return (
            <TouchableOpacity
              key={idx}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleAnswer(option.score)}
              testID={`option-${idx}`}
            >
              <View style={[styles.radioCircle, isSelected && styles.radioSelected]} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default memo(QuestionScreen);
