
export const results = [
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
