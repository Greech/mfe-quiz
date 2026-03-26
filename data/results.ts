
const resultsPl = [
  {
    title: '✅ TAK – ale tylko jeśli wiesz, co robisz.',
    description:
      'Twoje odpowiedzi wskazują na dużą liczbę zespołów, niezależność modułów i potrzebę niezależnych deployów...',
    condition: (score) => score.teams >= 2 && score.autonomy >= 2 && score.deployment >= 2,
  },
  {
    title: '❌ NIE – to byłaby architektoniczna nadprodukcja.',
    description: 'Masz jeden zespół, wspólny stack i niski poziom niezależności...',
    condition: (score) => score.teams === 0 && score.autonomy === 0,
  },
  {
    title: '⚠️ Być może – ale tylko w dużej skali.',
    description: 'Jest potencjał do MFE, ale tylko jeśli planujesz duże zespoły...',
    condition: (score) => score.teams >= 2 && score.autonomy === 1,
  },
  {
    title: '🧠 Potrzebujesz porządnej architektury, nie MFE.',
    description: 'Twoje problemy są bardziej organizacyjne lub architektoniczne niż techniczne...',
    condition: (score) => score.uxflex <= 1 && score.deployment === 0,
  },
  {
    title: '🚧 Zbuduj MVP, naucz się, potem decyduj.',
    description: 'Masz presję czasową i chcesz wystartować szybko. MFE teraz to strata czasu...',
    condition: (score) => score.delivery >= 2 && score.maturity === 0,
  },
  {
    title: '🔧 Zacznij od Nx/Monorepo – MFE zostaw na później.',
    description: 'Masz czas, jeden stack, niezły poziom organizacji – to idealne środowisko na monorepo...',
    condition: (score) => score.delivery <= 1 && score.maturity === 0,
  },
];

const resultsEn = [
  {
    title: '✅ YES – but only if you know what you are doing.',
    description:
      'Your answers indicate many teams, independent modules, and a need for independent deployments...',
    condition: (score) => score.teams >= 2 && score.autonomy >= 2 && score.deployment >= 2,
  },
  {
    title: '❌ NO – this would be architectural overkill.',
    description: 'You have one team, one stack, and low autonomy...',
    condition: (score) => score.teams === 0 && score.autonomy === 0,
  },
  {
    title: '⚠️ Maybe – but only at scale.',
    description: 'There is potential for MFE, but only if you are planning larger teams...',
    condition: (score) => score.teams >= 2 && score.autonomy === 1,
  },
  {
    title: '🧠 You need solid architecture, not MFE.',
    description: 'Your problems are more organizational or architectural than technical...',
    condition: (score) => score.uxflex <= 1 && score.deployment === 0,
  },
  {
    title: '🚧 Build an MVP, learn, then decide.',
    description: 'You are under time pressure and want to ship fast. MFE now is likely a time sink...',
    condition: (score) => score.delivery >= 2 && score.maturity === 0,
  },
  {
    title: '🔧 Start with Nx/Monorepo – leave MFE for later.',
    description: 'You have time, one stack, and decent organization - ideal for a modular monorepo first...',
    condition: (score) => score.delivery <= 1 && score.maturity === 0,
  },
];

export const results = resultsPl;
export const resultsByLanguage = {
  pl: resultsPl,
  en: resultsEn,
};
