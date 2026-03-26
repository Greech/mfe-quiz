
export const calculateScore = (answers) => {
  return answers.reduce((acc, answer) => {
    for (const key in answer.score) {
      acc[key] = (acc[key] || 0) + answer.score[key];
    }
    return acc;
  }, {});
};

const defaultResultsByLanguage = {
  pl: {
    title: '🤔 Nie wiem',
    description: 'Twoje odpowiedzi nie pasują do żadnego wzorca...',
  },
  en: {
    title: '🤔 Not sure',
    description: 'Your answers do not match any clear recommendation pattern...',
  },
};

export const determineResult = (score, results, language = 'pl') => {
  return results.find((r) => r.condition(score)) || {
    ...(defaultResultsByLanguage[language] || defaultResultsByLanguage.pl),
  };
};
