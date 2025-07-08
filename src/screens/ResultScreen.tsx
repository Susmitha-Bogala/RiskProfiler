import React, { useEffect, useRef , memo} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetAnswers } from '../redux/slices/riskSlice';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import LottieView from 'lottie-react-native';
import { getRiskLevel } from '../utils/riskUtils';
import { riskDescriptions } from '../constants/constants';
import styles from '../styles/globalStyles';
import colors from '../styles/colors';
import { riskType, riskScore } from '../constants/constants';

const { riskLow, riskMedium, riskHigh } = colors;

enum RiskLevel {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

const riskAnimations = {
  [RiskLevel.Low]: require('../assets/low-risk.json'),
  [RiskLevel.Medium]: require('../assets/medium-risk.json'),
  [RiskLevel.High]: require('../assets/high-risk.json'),
};

const riskColors = {
  [RiskLevel.Low]: riskLow,
  [RiskLevel.Medium]: riskMedium,
  [RiskLevel.High]: riskHigh,
};

const ResultScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.risk.answers);

  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);

  const riskLevel = getRiskLevel(totalScore);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRetake = () => {
    dispatch(resetAnswers());
    navigation.navigate('Question1');
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.title}>Risk Assessment Complete</Text>

        <LottieView
          source={riskAnimations[riskLevel]}
          autoPlay
          loop={false}
          style={styles.lottie}
        />

        <Text style={styles.score}>{riskScore} {totalScore}</Text>

        <Text style={[styles.riskType, { color: riskColors[riskLevel] }]}>
          {riskType} {riskLevel}
        </Text>

        <Text style={styles.description}>{riskDescriptions[riskLevel]}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
        <Text style={styles.retakeText}>Retake Questionnaire</Text>
      </TouchableOpacity>
    </View>
  );
};
export default memo(ResultScreen);
