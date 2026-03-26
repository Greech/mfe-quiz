
const questionsPl = [
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

const questionsEn = [
  {
    question: 'How many independent frontend teams work on the same app or its modules?',
    options: [
      { label: '1 team', score: { teams: 0 } },
      { label: '2-3 teams', score: { teams: 1 } },
      { label: 'More than 3 teams', score: { teams: 2 } },
    ],
  },
  {
    question: 'Do frontend teams work with different technologies (e.g. Angular, React, Vue)?',
    options: [
      { label: 'No, we use a single stack', score: { techDiversity: 0 } },
      { label: 'Yes, intentionally', score: { techDiversity: 2 } },
      { label: 'Not yet, but we plan migrations or integrations', score: { techDiversity: 1 } },
    ],
  },
  {
    question: 'How autonomous are individual modules or business domains?',
    options: [
      { label: 'Code is tightly coupled - everything depends on everything', score: { autonomy: 0 } },
      { label: 'Modules share some common code', score: { autonomy: 1 } },
      { label: 'Modules are fully independent', score: { autonomy: 2 } },
    ],
  },
  {
    question: 'How often do different teams need to coordinate before deployment?',
    options: [
      { label: 'We always need a shared release', score: { deployment: 0 } },
      { label: 'Sometimes we need synchronization', score: { deployment: 1 } },
      { label: 'Each team deploys independently', score: { deployment: 2 } },
    ],
  },
  {
    question: 'How much time pressure do you have for delivering the first version?',
    options: [
      { label: 'We need an MVP in a few weeks', score: { delivery: 2 } },
      { label: 'We can plan long-term', score: { delivery: 1 } },
      { label: 'Scalability and longevity matter more than speed', score: { delivery: 0 } },
    ],
  },
  {
    question: 'Does your app need strong SEO indexing or SSR support?',
    options: [
      { label: 'Yes, SEO is critical', score: { seo: 2 } },
      { label: 'No, it is an internal app for logged-in users', score: { seo: 0 } },
      { label: 'Not sure, but we want to keep the option open', score: { seo: 1 } },
    ],
  },
  {
    question: 'How would you rate your experience with MFE architecture (Module Federation, Single-SPA, etc.)?',
    options: [
      { label: 'Sounds like a DevOps nightmare', score: { experience: 0 } },
      { label: 'I know the theory, but have not implemented it', score: { experience: 1 } },
      { label: 'I have experience and know what I am doing', score: { experience: 2 } },
    ],
  },
  {
    question: 'Have you ever had a case where one feature delayed deployment of the whole app?',
    options: [
      { label: 'No, our code is well separated', score: { bottleneck: 0 } },
      { label: 'Occasionally', score: { bottleneck: 1 } },
      { label: 'Yes, often', score: { bottleneck: 2 } },
    ],
  },
  {
    question: 'How often do you change UX/UI in just one module without touching the rest?',
    options: [
      { label: 'That is impossible with our current structure', score: { uxflex: 0 } },
      { label: 'Rather rarely', score: { uxflex: 1 } },
      { label: 'Regularly - that is our norm', score: { uxflex: 2 } },
    ],
  },
  {
    question: 'Does your team have the operational maturity to manage MFE versioning, integration, and tests?',
    options: [
      { label: 'No - that would be chaos', score: { maturity: 0 } },
      { label: 'Not yet, but we want to build it', score: { maturity: 1 } },
      { label: 'Yes - we have processes and tools', score: { maturity: 2 } },
    ],
  },
];

export const questions = questionsPl;
export const questionsByLanguage = {
  pl: questionsPl,
  en: questionsEn,
};
