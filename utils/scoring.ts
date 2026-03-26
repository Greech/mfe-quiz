
export const calculateScore = (answers) => {
  return answers.reduce((acc, answer) => {
    for (const key in answer.score) {
      acc[key] = (acc[key] || 0) + answer.score[key];
    }
    return acc;
  }, {});
};

export const determineResult = (score, results) => {
  return results.find((r) => r.condition(score)) || {
    title: '🤔 Nie wiem',
    description: 'Twoje odpowiedzi nie pasują do żadnego wzorca...',
  };
};
