
export const questions = [
  {
    question: 'Ilu niezależnych zespołów frontendowych pracuje nad tą samą aplikacją lub jej modułami?',
    options: [
      { label: '1 zespół', score: { teams: 0 } },
      { label: '2–3 zespoły', score: { teams: 1 } },
      { label: 'Więcej niż 3 zespoły', score: { teams: 2 } },
    ],
  },
  {
    question: 'Czy zespoły frontendowe pracują w różnych technologiach (np. Angular, React, Vue)?',
    options: [
      { label: 'Nie, mamy jeden stack', score: { techDiversity: 0 } },
      { label: 'Tak, celowo', score: { techDiversity: 2 } },
      { label: 'Jeszcze nie, ale planujemy migracje lub integracje', score: { techDiversity: 1 } },
    ],
  },
  {
    question: 'Jak duża jest autonomia poszczególnych modułów lub domen biznesowych?',
    options: [
      { label: 'Kod jest totalnie spleciony – wszystko zależy od wszystkiego', score: { autonomy: 0 } },
      { label: 'Moduły mają część współdzielonego kodu', score: { autonomy: 1 } },
      { label: 'Moduły są w pełni niezależne', score: { autonomy: 2 } },
    ],
  },
  {
    question: 'Jak często różne zespoły muszą się koordynować przed deployem?',
    options: [
      { label: 'Zawsze musimy robić wspólny release', score: { deployment: 0 } },
      { label: 'Czasem trzeba się zsynchronizować', score: { deployment: 1 } },
      { label: 'Każdy deployuje sam', score: { deployment: 2 } },
    ],
  },
  {
    question: 'Jaką macie presję czasową na dostarczenie pierwszej wersji?',
    options: [
      { label: 'Potrzebujemy MVP w kilka tygodni', score: { delivery: 2 } },
      { label: 'Możemy planować długofalowo', score: { delivery: 1 } },
      { label: 'Ważne jest skalowanie i długowieczność, nie szybkość', score: { delivery: 0 } },
    ],
  },
  {
    question: 'Czy Twoja aplikacja musi być dobrze indeksowana przez wyszukiwarki (SEO) lub obsługiwać SSR?',
    options: [
      { label: 'Tak, SEO to klucz', score: { seo: 2 } },
      { label: 'Nie, to aplikacja tylko dla zalogowanych', score: { seo: 0 } },
      { label: 'Nie wiem, ale chcemy mieć opcję', score: { seo: 1 } },
    ],
  },
  {
    question: 'Jak oceniasz swoje doświadczenie z architekturą MFE (Module Federation, Single-SPA, itp.)?',
    options: [
      { label: 'Brzmi jak koszmar DevOpsów', score: { experience: 0 } },
      { label: 'Teoretycznie wiem, ale nie wdrażałem(a)m', score: { experience: 1 } },
      { label: 'Mam doświadczenie i wiem, co robię', score: { experience: 2 } },
    ],
  },
  {
    question: 'Czy kiedykolwiek mieliście problem z tym, że jeden feature opóźnia deploy całej aplikacji?',
    options: [
      { label: 'Nie, mamy dobrze podzielony kod', score: { bottleneck: 0 } },
      { label: 'Sporadycznie', score: { bottleneck: 1 } },
      { label: 'Tak, często', score: { bottleneck: 2 } },
    ],
  },
  {
    question: 'Jak często zmieniacie UX/UI tylko w jednym module bez ruszania reszty?',
    options: [
      { label: 'To niemożliwe przy naszej strukturze', score: { uxflex: 0 } },
      { label: 'Raczej rzadko', score: { uxflex: 1 } },
      { label: 'Regularnie – to u nas norma', score: { uxflex: 2 } },
    ],
  },
  {
    question: 'Czy twój zespół ma dojrzałość operacyjną do zarządzania wersjowaniem, integracją i testami MFE?',
    options: [
      { label: 'Nie – to byłby chaos', score: { maturity: 0 } },
      { label: 'Nie, ale chcemy to zbudować', score: { maturity: 1 } },
      { label: 'Tak – mamy procesy i narzędzia', score: { maturity: 2 } },
    ],
  },
];
