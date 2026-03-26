
const resultConditions = [
  (score) => score.teams >= 2 && score.autonomy >= 2 && score.deployment >= 2,
  (score) => score.teams === 0 && score.autonomy === 0,
  (score) => score.teams >= 2 && score.autonomy === 1,
  (score) => score.uxflex <= 1 && score.deployment === 0,
  (score) => score.delivery >= 2 && score.maturity === 0,
  (score) => score.delivery <= 1 && score.maturity === 0,
];

export const resultsByLanguage = {
  pl: [
    {
      title: '✅ TAK – ale tylko jeśli wiesz, co robisz.',
      description:
        'Twoje odpowiedzi wskazują na dużą liczbę zespołów, niezależność modułów i potrzebę niezależnych deployów...',
      condition: resultConditions[0],
    },
    {
      title: '❌ NIE – to byłaby architektoniczna nadprodukcja.',
      description: 'Masz jeden zespół, wspólny stack i niski poziom niezależności...',
      condition: resultConditions[1],
    },
    {
      title: '⚠️ Być może – ale tylko w dużej skali.',
      description: 'Jest potencjał do MFE, ale tylko jeśli planujesz duże zespoły...',
      condition: resultConditions[2],
    },
    {
      title: '🧠 Potrzebujesz porządnej architektury, nie MFE.',
      description: 'Twoje problemy są bardziej organizacyjne lub architektoniczne niż techniczne...',
      condition: resultConditions[3],
    },
    {
      title: '🚧 Zbuduj MVP, naucz się, potem decyduj.',
      description: 'Masz presję czasową i chcesz wystartować szybko. MFE teraz to strata czasu...',
      condition: resultConditions[4],
    },
    {
      title: '🔧 Zacznij od Nx/Monorepo – MFE zostaw na później.',
      description: 'Masz czas, jeden stack, niezły poziom organizacji – to idealne środowisko na monorepo...',
      condition: resultConditions[5],
    },
  ],
  en: [
    {
      title: '✅ YES - but only if you know what you are doing.',
      description:
        'Your answers indicate many teams, strong module autonomy, and a need for independent deployments...',
      condition: resultConditions[0],
    },
    {
      title: '❌ NO - this would be architectural overkill.',
      description: 'You have one team, one stack and low autonomy...',
      condition: resultConditions[1],
    },
    {
      title: '⚠️ Maybe - but only at larger scale.',
      description: 'There is MFE potential, but only if you plan for larger teams...',
      condition: resultConditions[2],
    },
    {
      title: '🧠 You need solid architecture, not MFE.',
      description: 'Your issues are more organizational or architectural than technical...',
      condition: resultConditions[3],
    },
    {
      title: '🚧 Build MVP first, learn, then decide.',
      description: 'You are under time pressure and want to move fast. MFE now is likely a time sink...',
      condition: resultConditions[4],
    },
    {
      title: '🔧 Start with Nx/Monorepo - leave MFE for later.',
      description: 'You have time, one stack, and decent organization - monorepo is a better fit first...',
      condition: resultConditions[5],
    },
  ],
};

export const results = resultsByLanguage.pl;

export const getResults = (language = 'pl') => {
  return resultsByLanguage[language] || resultsByLanguage.pl;
};
