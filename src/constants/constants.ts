export const questions = [
    {
      id: 1,
      text: 'How would you describe your investment knowledge?',
      options: [
        { label: 'Novice', score: 1 },
        { label: 'Intermediate', score: 2 },
        { label: 'Advanced', score: 3 },
      ],
    },
    {
      id: 2,
      text: 'Investment duration?',
      options: [
        { label: 'Short-term (less than 1 year)', score: 1 },
        { label: 'Medium-term (1-5 years)', score: 2 },
        { label: 'Long-term (more than 5 years)', score: 3 },
      ],
    },
    {
      id: 3,
      text: 'How comfortable are you taking risks?',
      options: [
        { label: 'Very risk averse', score: 1 },
        { label: 'Somewhat risk averse', score: 2 },
        { label: 'Neutral', score: 3 },
        { label: 'Somewhat risk-tolerant', score: 4 },
        { label: 'Very risk-tolerant', score: 5 },
      ],
    },
    {
      id: 4,
      text: 'What percentage of your income are you willing to invest?',
      options: [
        { label: 'Less than 10%', score: 1 },
        { label: '10-25%', score: 2 },
        { label: '25-50%', score: 3 },
        { label: 'More than 50%', score: 5 },
      ],
    },
    {
      id: 5,
      text: 'How would you react to a sudden drop in investments?',
      options: [
        { label: 'Panic and sell immediately', score: 1 },
        { label: 'Monitor closely and consider selling', score: 2 },
        { label: 'Hold and wait for recovery', score: 3 },
        { label: 'See it as buying opportunity', score: 5 },
      ],
    },
  ];

export const riskDescriptions = {
  Low: 'You prefer safer investments and value capital protection.',
  Medium: 'You are moderately open to risk for better returns.',
  High: 'You are comfortable taking higher risks for higher potential gains.',
};

export const riskType = 'Risk Type:';

export const riskScore = 'Total Score:';
  