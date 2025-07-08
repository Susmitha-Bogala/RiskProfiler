// src/utils/riskUtils.ts

export type RiskLevel = 'Low' | 'Medium' | 'High';

/**
 * Get the risk level based on the total score
 * @param totalScore number between 5 to 21
 */
export const getRiskLevel = (totalScore: number): RiskLevel => {
  if (totalScore >= 5 && totalScore <= 9) {
    return 'Low';
  } else if (totalScore >= 10 && totalScore <= 14) {
    return 'Medium';
  } else {
    return 'High';
  }
};
