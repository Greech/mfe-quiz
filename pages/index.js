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
    retry: 'Zrób quiz jeszcze raz',
    questions: [
      {
        question: 'Ilu niezależnych zespołów frontendowych pracuje nad tą samą aplikacją lub jej modułami?',
        options: ['1 zespół', '2–3 zespoły', 'Więcej niż 3 zespoły'],
      },
      {
        question: 'Czy zespoły frontendowe pracują w różnych technologiach (np. Angular, React, Vue)?',
        options: ['Tak, celowo', 'Nie, mamy jeden stack', 'Jeszcze nie, ale planujemy migracje lub integracje'],
      },
      {
        question: 'Jak duża jest autonomia poszczególnych modułów lub domen biznesowych?',
        options: ['Moduły są w pełni niezależne', 'Moduły mają część współdzielonego kodu', 'Kod jest totalnie spleciony – wszystko zależy od wszystkiego'],
      },
      {
        question: 'Jak często różne zespoły muszą się koordynować przed deployem?',
        options: ['Każdy deployuje sam', 'Czasem trzeba się zsynchronizować', 'Zawsze musimy robić wspólny release'],
      },
      {
        question: 'Jaką macie presję czasową na dostarczenie pierwszej wersji?',
        options: ['Potrzebujemy MVP w kilka tygodni', 'Możemy planować długofalowo', 'Ważne jest skalowanie i długowieczność, nie szybkość'],
      },
      {
        question: 'Czy Twoja aplikacja musi być dobrze indeksowana przez wyszukiwarki (SEO) lub obsługiwać SSR?',
        options: ['Tak, SEO to klucz', 'Nie, to aplikacja tylko dla zalogowanych', 'Nie wiem, ale chcemy mieć opcję'],
      },
      {
        question: 'Jak oceniasz swoje doświadczenie z architekturą MFE (Module Federation, Single-SPA, itp.)?',
        options: ['Mam doświadczenie i wiem, co robię', 'Teoretycznie wiem, ale nie wdrażałem(a)m', 'Brzmi jak koszmar DevOpsów'],
      },
      {
        question: 'Czy kiedykolwiek mieliście problem z tym, że jeden feature opóźnia deploy całej aplikacji?',
        options: ['Tak, często', 'Sporadycznie', 'Nie, mamy dobrze podzielony kod'],
      },
      {
        question: 'Jak często zmieniacie UX/UI tylko w jednym module bez ruszania reszty?',
        options: ['Regularnie – to u nas norma', 'Raczej rzadko', 'To niemożliwe przy naszej strukturze'],
      },
      {
        question: 'Czy twój zespół ma dojrzałość operacyjną do zarządzania wersjowaniem, integracją i testami MFE?',
        options: ['Tak – mamy procesy i narzędzia', 'Nie, ale chcemy to zbudować', 'Nie – to byłby chaos'],
      },
    ],
  },
  en: {
    title: 'Do I need Micro Frontends?',
    subtitle: 'or are you just overengineering from day one?',
    yourAnswers: 'Your answers',
    thresholds: 'Threshold recommendations',
    retry: 'Retry the quiz',
    questions: [
      {
        question: 'How many independent frontend teams work on the same app or its modules?',
        options: ['1 team', '2–3 teams', 'More than 3 teams'],
      },
      {
        question: 'Do frontend teams work in different tech stacks (e.g. Angular, React, Vue)?',
        options: ['Yes, by design', 'No, we use a single stack', 'Not yet, but we plan migration/integration'],
      },
      {
        question: 'How autonomous are your modules or business domains?',
        options: ['Fully independent modules', 'Some shared code between modules', 'Everything is tightly coupled'],
      },
      {
        question: 'How often do teams need to coordinate before deploying?',
        options: ['Each team deploys independently', 'Occasional coordination needed', 'Always a joint release'],
      },
      {
        question: 'What’s the time pressure to deliver the first version?',
        options: ['Need MVP in weeks', 'We can plan long-term', 'Scalability and longevity matter most'],
      },
      {
        question: 'Does your app need SEO or server-side rendering (SSR)?',
        options: ['Yes, SEO is key', 'No, it’s for logged-in users only', 'Not sure, but we want the option'],
      },
      {
        question: 'How would you rate your experience with MFE architecture (Module Federation, Single-SPA, etc.)?',
        options: ['Experienced and confident', 'Familiar but never used', 'Sounds like a DevOps nightmare'],
      },
      {
        question: 'Have you had issues where one feature delays the whole app deployment?',
        options: ['Yes, often', 'Sometimes', 'No, code is well split'],
      },
      {
        question: 'How often do you change UX/UI in just one module without touching others?',
        options: ['Regularly – it’s our norm', 'Rarely', 'Impossible with current setup'],
      },
      {
        question: 'Does your team have operational maturity to handle MFE versioning, integration and testing?',
        options: ['Yes – with proper tools and processes', 'No, but we aim to build it', 'No – it’d be chaos'],
      },
    ],
  },
};

const thresholds = [
  {
    min: 25,
    title: {
      pl: '✅ TAK – ale tylko jeśli wiesz, co robisz.',
      en: '✅ YES – but only if you know what you’re doing.',
    },
    description: {
      pl: 'Twoje odpowiedzi wskazują na dużą liczbę zespołów... (PL)',
      en: 'Your answers show many teams, autonomy... (EN)',
    },
  },
  {
    min: 15,
    title: {
      pl: '⚠️ Być może – ale tylko w dużej skali.',
      en: '⚠️ Maybe – but only at scale.',
    },
    description: {
      pl: 'Jest potencjał do MFE, ale tylko jeśli... (PL)',
      en: 'There’s potential for MFE, but only if... (EN)',
    },
  },
  {
    min: 5,
    title: {
      pl: '🔧 Zacznij od Nx/Monorepo – MFE zostaw na później.',
      en: '🔧 Start with Nx/Monorepo – leave MFE for later.',
    },
    description: {
      pl: 'Masz czas, jeden stack... (PL)',
      en: 'You have time, a single stack... (EN)',
    },
  },
  {
    min: 0,
    title: {
      pl: '❌ NIE – to byłaby architektoniczna nadprodukcja.',
      en: '❌ NO – it would be architectural overkill.',
    },
    description: {
      pl: 'Masz jeden zespół, wspólny stack... (PL)',
      en: 'You have one team, one stack... (EN)',
    },
  },
];

function getFinalRecommendation(score, lang) {
  return (
    thresholds.find((t) => score >= t.min) || {
      title: {
        pl: 'Nie wiem, ale pewnie i tak to zrobisz…',
        en: 'No idea, but you’ll probably do it anyway…',
      },
      description: {
        pl: 'Nie jestem w stanie zdecydować...',
        en: 'Can’t decide, so not even trying!',
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

  const handleAnswer = (option, scoreValue) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);
    setScore(score + scoreValue);
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
                      onClick={() => handleAnswer(option, index)}
                      variant="outline"
                    >
                      {option}
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
                        <p className="text-muted-foreground mt-1">{answers[i]}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <details className="mt-6">
                  <summary className="cursor-pointer font-medium">{t.thresholds}</summary>
                  <div className="mt-4 space-y-4">
                    {thresholds.map((th, idx) => (
                      <div key={idx}>
                        <p className="font-semibold">{th.min}+ pts – {th.title[language]}</p>
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
