import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const translations = {
  pl: {
    title: 'Czy potrzebuję Micro Frontendy?',
    subtitle: 'czyli czy naprawdę musisz dzielić swój kod na kawałki... już teraz?',
    yourAnswers: 'Twoje odpowiedzi',
    thresholds: 'Progi rekomendacji (thresholds)',
    pointsLabel: 'pkt',
    retry: 'Zrób quiz jeszcze raz',
    questions: [
      {
        question: 'Ilu niezależnych zespołów frontendowych pracuje nad tą samą aplikacją lub jej modułami?',
        options: [
          { key: 'one_team', label: '1 zespół', value: 0 },
          { key: 'two_three_teams', label: '2–3 zespoły', value: 2 },
          { key: 'more_than_three', label: 'Więcej niż 3 zespoły', value: 3 },
        ],
      },
      {
        question: 'Czy zespoły frontendowe pracują w różnych technologiach (np. Angular, React, Vue)?',
        options: [
          { key: 'multi_stack', label: 'Tak, celowo', value: 2 },
          { key: 'single_stack', label: 'Nie, mamy jeden stack', value: 0 },
          { key: 'future_migration', label: 'Jeszcze nie, ale planujemy migracje lub integracje', value: 1 },
        ],
      },
      {
        question: 'Jak duża jest autonomia poszczególnych modułów lub domen biznesowych?',
        options: [
          { key: 'full_independence', label: 'Moduły są w pełni niezależne', value: 3 },
          { key: 'partial_shared', label: 'Moduły mają część współdzielonego kodu', value: 1 },
          { key: 'tight_coupling', label: 'Kod jest totalnie spleciony – wszystko zależy od wszystkiego', value: 0 },
        ],
      },
      {
        question: 'Jak często różne zespoły muszą się koordynować przed deployem?',
        options: [
          { key: 'independent_deploy', label: 'Każdy deployuje sam', value: 3 },
          { key: 'sometimes_sync', label: 'Czasem trzeba się zsynchronizować', value: 1 },
          { key: 'always_sync', label: 'Zawsze musimy robić wspólny release', value: 0 },
        ],
      },
      {
        question: 'Jaką macie presję czasową na dostarczenie pierwszej wersji?',
        options: [
          { key: 'fast_mvp', label: 'Potrzebujemy MVP w kilka tygodni', value: 0 },
          { key: 'long_term', label: 'Możemy planować długofalowo', value: 1 },
          { key: 'scalability_priority', label: 'Ważne jest skalowanie i długowieczność, nie szybkość', value: 2 },
        ],
      },
      {
        question: 'Czy Twoja aplikacja musi być dobrze indeksowana przez wyszukiwarki (SEO) lub obsługiwać SSR?',
        options: [
          { key: 'seo_needed', label: 'Tak, SEO to klucz', value: 0 },
          { key: 'internal_app', label: 'Nie, to aplikacja tylko dla zalogowanych', value: 2 },
          { key: 'optional_seo', label: 'Nie wiem, ale chcemy mieć opcję', value: 1 },
        ],
      },
      {
        question: 'Jak oceniasz swoje doświadczenie z architekturą MFE (Module Federation, Single-SPA, itp.)?',
        options: [
          { key: 'experienced', label: 'Mam doświadczenie i wiem, co robię', value: 3 },
          { key: 'basic_theory', label: 'Teoretycznie wiem, ale nie wdrażałem(a)m', value: 1 },
          { key: 'no_experience', label: 'Brzmi jak koszmar DevOpsów', value: 0 },
        ],
      },
      {
        question: 'Czy kiedykolwiek mieliście problem z tym, że jeden feature opóźnia deploy całej aplikacji?',
        options: [
          { key: 'often_blocked', label: 'Tak, często', value: 3 },
          { key: 'rarely_blocked', label: 'Sporadycznie', value: 1 },
          { key: 'no_blocking', label: 'Nie, mamy dobrze podzielony kod', value: 0 },
        ],
      },
      {
        question: 'Jak często zmieniacie UX/UI tylko w jednym module bez ruszania reszty?',
        options: [
          { key: 'frequent_ui_isolation', label: 'Regularnie – to u nas norma', value: 3 },
          { key: 'rare_ui_isolation', label: 'Raczej rzadko', value: 1 },
          { key: 'impossible_ui_isolation', label: 'To niemożliwe przy naszej strukturze', value: 0 },
        ],
      },
      {
        question: 'Czy twój zespół ma dojrzałość operacyjną do zarządzania wersjowaniem, integracją i testami MFE?',
        options: [
          { key: 'mature_ops', label: 'Tak – mamy procesy i narzędzia', value: 3 },
          { key: 'willing_to_mature', label: 'Nie, ale chcemy to zbudować', value: 1 },
          { key: 'chaos', label: 'Nie – to byłby chaos', value: 0 },
        ],
      },
    ]
  },
  en: {
    title: 'Do I Need Micro Frontends?',
    subtitle: 'or are you splitting your frontend too early?',
    yourAnswers: 'Your answers',
    thresholds: 'Recommendation thresholds',
    pointsLabel: 'pts',
    retry: 'Take the quiz again',
    questions: [
      {
        question: 'How many independent frontend teams work on the same app or its modules?',
        options: [
          { key: 'one_team', label: '1 team', value: 0 },
          { key: 'two_three_teams', label: '2–3 teams', value: 2 },
          { key: 'more_than_three', label: 'More than 3 teams', value: 3 },
        ],
      },
      {
        question: 'Do frontend teams work in different tech stacks (e.g. Angular, React, Vue)?',
        options: [
          { key: 'multi_stack', label: 'Yes, by design', value: 2 },
          { key: 'single_stack', label: 'No, we use a single stack', value: 0 },
          { key: 'future_migration', label: 'Not yet, but we plan migrations or integrations', value: 1 },
        ],
      },
      {
        question: 'How autonomous are your modules or business domains?',
        options: [
          { key: 'full_independence', label: 'Fully independent modules', value: 3 },
          { key: 'partial_shared', label: 'Some shared code between modules', value: 1 },
          { key: 'tight_coupling', label: 'Everything is tightly coupled', value: 0 },
        ],
      },
      {
        question: 'How often do teams need to coordinate before deploying?',
        options: [
          { key: 'independent_deploy', label: 'Each team deploys independently', value: 3 },
          { key: 'sometimes_sync', label: 'Sometimes we need to sync', value: 1 },
          { key: 'always_sync', label: 'Always a joint release', value: 0 },
        ],
      },
      {
        question: 'What’s the time pressure to deliver the first version?',
        options: [
          { key: 'fast_mvp', label: 'Need MVP in weeks', value: 0 },
          { key: 'long_term', label: 'We can plan long-term', value: 1 },
          { key: 'scalability_priority', label: 'Scalability and longevity matter most', value: 2 },
        ],
      },
      {
        question: 'Does your app need SEO or server-side rendering (SSR)?',
        options: [
          { key: 'seo_needed', label: 'Yes, SEO is key', value: 0 },
          { key: 'internal_app', label: 'No, it’s for logged-in users only', value: 2 },
          { key: 'optional_seo', label: 'Not sure, but we want the option', value: 1 },
        ],
      },
      {
        question: 'How would you rate your experience with MFE architecture (Module Federation, Single-SPA, etc.)?',
        options: [
          { key: 'experienced', label: 'I have experience and know what I am doing', value: 3 },
          { key: 'basic_theory', label: 'I know the theory, but have not implemented it', value: 1 },
          { key: 'no_experience', label: 'Sounds like a DevOps nightmare', value: 0 },
        ],
      },
      {
        question: 'Have you had issues where one feature delays the whole app deployment?',
        options: [
          { key: 'often_blocked', label: 'Yes, often', value: 3 },
          { key: 'rarely_blocked', label: 'Occasionally', value: 1 },
          { key: 'no_blocking', label: 'No, code is well split', value: 0 },
        ],
      },
      {
        question: 'How often do you change UX/UI in just one module without touching others?',
        options: [
          { key: 'frequent_ui_isolation', label: 'Regularly – it’s our norm', value: 3 },
          { key: 'rare_ui_isolation', label: 'Rarely', value: 1 },
          { key: 'impossible_ui_isolation', label: 'Impossible with current setup', value: 0 },
        ],
      },
      {
        question: 'Does your team have operational maturity to handle MFE versioning, integration and testing?',
        options: [
          { key: 'mature_ops', label: 'Yes - we have the right tools and processes', value: 3 },
          { key: 'willing_to_mature', label: 'Not yet, but we want to build it', value: 1 },
          { key: 'chaos', label: 'No – it’d be chaos', value: 0 },
        ],
      },
    ]
  },
};

const thresholds = [
  {
    min: 20,
    title: {
      pl: '✅ TAK – ale tylko jeśli wiesz, co robisz.',
      en: '✅ YES - but only if you know what you are doing.',
    },
    description: {
      pl: 'Twoje odpowiedzi wskazują na dużą liczbę zespołów, niezależność modułów i potrzebę niezależnych deployów. Jeśli masz dojrzałość operacyjną, warto pójść w Micro Frontendy (ale z jasno zdefiniowaną odpowiedzialnością, testami end-to-end i orkiestratorem).',
      en: 'Your answers indicate many teams, strong module autonomy, and a need for independent deployments. If you have operational maturity, Micro Frontends can make sense - but only with clear ownership, end-to-end tests, and an orchestrator.',
    },
  },
  {
    min: 12,
    title: {
      pl: '⚠️ Być może – ale tylko w dużej skali.',
      en: '⚠️ MAYBE - but only at scale.',
    },
    description: {
      pl: 'Jest potencjał do MFE, ale tylko jeśli planujesz duże zespoły, długi cykl życia aplikacji i silną potrzebę skalowania niezależnych domen. W innym wypadku to overengineering.',
      en: 'There is potential for MFE, but mostly if you expect larger teams, a long product lifecycle, and a strong need to scale independent domains. Otherwise, this is likely overengineering.',
    },
  },
  {
    min: 6,
    title: {
      pl: '🔧 Zacznij od Nx/Monorepo – MFE zostaw na później.',
      en: '🔧 START with Nx/Monorepo - leave MFE for later.',
    },
    description: {
      pl: 'Masz czas, jeden stack, niezły poziom organizacji – to idealne środowisko na monorepo + modularyzację. MFE może być kolejnym krokiem, ale nie startuj z nim od razu.',
      en: 'You have time, one stack, and a decent team setup - that is an ideal environment for a monorepo and modular architecture. MFE can be a later step, but it should not be your starting point.',
    },
  },
  {
    min: 0,
    title: {
      pl: '❌ NIE – to byłaby architektoniczna nadprodukcja.',
      en: '❌ NO - this would be architectural overkill.',
    },
    description: {
      pl: 'Masz jeden zespół, wspólny stack i niski poziom niezależności. Micro Frontendy nie rozwiążą twoich problemów – raczej je zwiększą. Skup się na dobrej architekturze modułowej i automatyzacji.',
      en: 'You have one team, one stack, and low autonomy. MFE will not solve your current problems - it will likely create new ones. Focus on a clean modular architecture and automation first.',
    },
  },
];

function getFinalRecommendation(score, lang) {
  return (
    thresholds.find((t) => score >= t.min) || {
      title: {
        pl: 'Nie wiem, ale pewnie i tak to zrobisz…',
        en: 'Not sure, but you will probably build it anyway...',
      },
      description: {
        pl: 'Nie jestem w stanie zdecydować...',
        en: 'I cannot confidently decide based on these answers.',
      },
    }
  );
}

export default function Home() {
  const [language, setLanguage] = useState('pl');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const t = translations[language];
  const currentQuestions = t.questions;

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers, answer.key];
    setAnswers(updatedAnswers);
    setScore(score + answer.value);
    if (step + 1 >= currentQuestions.length) {
      setShowResult(true);
    } else {
      setStep(step + 1);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setScore(0);
    setShowResult(false);
  };

  const finalResult = getFinalRecommendation(score, language);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('pl')}
            className={`px-2 py-1 rounded ${language === 'pl' ? 'bg-blue-100 text-white' : 'bg-white border'}`}
          >
            🇵🇱
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded ${language === 'en' ? 'bg-blue-100 text-white' : 'bg-white border'}`}
          >
            🇬🇧
          </button>
        </div>
      </div>
      <p className="mb-6 text-muted-foreground">{t.subtitle}</p>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="font-medium mb-4">{currentQuestions[step].question}</p>
                <div className="flex flex-col gap-2">
                {currentQuestions[step].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                  >
                    {option.label}
                  </Button>
                ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-xl font-bold mb-4">{finalResult.title[language]}</p>
                <p className="text-xxl mb-4">{finalResult.description[language]}</p>

                <details className="mt-4">
                  <summary className="cursor-pointer font-medium">{t.yourAnswers}</summary>
                  <div className="mt-4 space-y-4">
                    {currentQuestions.map((q, i) => (
                      <div key={i}>
                        <p className="font-medium">{i + 1}. {q.question}</p>
                        <p className="text-muted-foreground mt-1">
                          {
                            currentQuestions[i].options.find((opt) => opt.key === answers[i])?.label
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </details>

                <details className="mt-6">
                  <summary className="cursor-pointer font-medium">{t.thresholds}</summary>
                  <div className="mt-4 space-y-4">
                    {thresholds.map((th, idx) => (
                      <div key={idx}>
                        <p className="font-semibold">{th.min}+ {t.pointsLabel} – {th.title[language]}</p>
                        <p className="text-muted-foreground mt-1">{th.description[language]}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <Button className="mt-6" onClick={resetQuiz}>
                  {t.retry}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
