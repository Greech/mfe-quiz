import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

const questions = [
  {
    question: 'Ilu niezależnych zespołów frontendowych pracuje nad tą samą aplikacją lub jej modułami?',
    options: [
      { label: '1 zespół', score: 0 },
      { label: '2–3 zespoły', score: 1 },
      { label: 'Więcej niż 3 zespoły', score: 3 },
    ],
  },
  {
    question: 'Czy zespoły frontendowe pracują w różnych technologiach (np. Angular, React, Vue)?',
    options: [
      { label: 'Tak, celowo', score: 2 },
      { label: 'Nie, mamy jeden stack', score: 0 },
      { label: 'Jeszcze nie, ale planujemy migracje lub integracje', score: 1 },
    ],
  },
  {
    question: 'Jak duża jest autonomia poszczególnych modułów lub domen biznesowych?',
    options: [
      { label: 'Moduły są w pełni niezależne', score: 3 },
      { label: 'Moduły mają część współdzielonego kodu', score: 1 },
      { label: 'Kod jest totalnie spleciony – wszystko zależy od wszystkiego', score: 0 },
    ],
  },
  {
    question: 'Jak często różne zespoły muszą się koordynować przed deployem?',
    options: [
      { label: 'Każdy deployuje sam', score: 3 },
      { label: 'Czasem trzeba się zsynchronizować', score: 1 },
      { label: 'Zawsze musimy robić wspólny release', score: 0 },
    ],
  },
  {
    question: 'Jaką macie presję czasową na dostarczenie pierwszej wersji?',
    options: [
      { label: 'Potrzebujemy MVP w kilka tygodni', score: 0 },
      { label: 'Możemy planować długofalowo', score: 2 },
      { label: 'Ważne jest skalowanie i długowieczność, nie szybkość', score: 3 },
    ],
  },
  {
    question: 'Czy Twoja aplikacja musi być dobrze indeksowana przez wyszukiwarki (SEO) lub obsługiwać SSR?',
    options: [
      { label: 'Tak, SEO to klucz', score: 1 },
      { label: 'Nie, to aplikacja tylko dla zalogowanych', score: 0 },
      { label: 'Nie wiem, ale chcemy mieć opcję', score: 1 },
    ],
  },
  {
    question: 'Jak oceniasz swoje doświadczenie z architekturą MFE (Module Federation, Single-SPA, itp.)?',
    options: [
      { label: 'Mam doświadczenie i wiem, co robię', score: 3 },
      { label: 'Teoretycznie wiem, ale nie wdrażałem(a)m', score: 1 },
      { label: 'Brzmi jak koszmar DevOpsów', score: 0 },
    ],
  },
  {
    question: 'Czy kiedykolwiek mieliście problem z tym, że jeden feature opóźnia deploy całej aplikacji?',
    options: [
      { label: 'Tak, często', score: 2 },
      { label: 'Sporadycznie', score: 1 },
      { label: 'Nie, mamy dobrze podzielony kod', score: 0 },
    ],
  },
  {
    question: 'Jak często zmieniacie UX/UI tylko w jednym module bez ruszania reszty?',
    options: [
      { label: 'Regularnie – to u nas norma', score: 3 },
      { label: 'Raczej rzadko', score: 1 },
      { label: 'To niemożliwe przy naszej strukturze', score: 0 },
    ],
  },
  {
    question: 'Czy twój zespół ma dojrzałość operacyjną do zarządzania wersjowaniem, integracją i testami MFE?',
    options: [
      { label: 'Tak – mamy procesy i narzędzia', score: 3 },
      { label: 'Nie, ale chcemy to zbudować', score: 1 },
      { label: 'Nie – to byłby chaos', score: 0 },
    ],
  },
];

const thresholds = [
  {
    min: 25,
    title: '✅ TAK – ale tylko jeśli wiesz, co robisz.',
    description:
      'Twoje odpowiedzi wskazują na dużą liczbę zespołów, niezależność modułów i potrzebę niezależnych deployów. Jeśli masz dojrzałość operacyjną, warto pójść w Micro Frontendy (ale z jasno zdefiniowaną odpowiedzialnością, testami end-to-end i orkiestratorem).',
  },
  {
    min: 15,
    title: '⚠️ Być może – ale tylko w dużej skali.',
    description:
      'Jest potencjał do MFE, ale tylko jeśli planujesz duże zespoły, długi cykl życia aplikacji i silną potrzebę skalowania niezależnych domen. W innym wypadku to overengineering.',
  },
  {
    min: 5,
    title: '🔧 Zacznij od Nx/Monorepo – MFE zostaw na później.',
    description:
      'Masz czas, jeden stack, niezły poziom organizacji – to idealne środowisko na monorepo + modularyzację. MFE może być kolejnym krokiem, ale nie startuj z nim od razu.',
  },
  {
    min: 0,
    title: '❌ NIE – to byłaby architektoniczna nadprodukcja.',
    description:
      'Masz jeden zespół, wspólny stack i niski poziom niezależności. Micro Frontendy nie rozwiążą twoich problemów – raczej je zwiększą. Skup się na dobrej architekturze modułowej i automatyzacji.',
  },
];

function getFinalRecommendation(score) {
  return thresholds.find((t) => score >= t.min) || {
    title: 'Nie wiem, ale pewnie i tak to zrobisz…',
    description: 'Nie jestem w stanie zdecydować co będzie dla Ciebie lepsze, więc nawet nie ryzykuję!'
  };
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option.label];
    setAnswers(updatedAnswers);
    setScore(score + option.score);
    if (step + 1 >= questions.length) {
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

  const finalResult = getFinalRecommendation(score);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Czy potrzebuję Micro Frontendy?</h1>
      <p className="mb-6 text-muted-foreground">
        czyli czy naprawdę musisz dzielić swój kod na kawałki... już teraz?
      </p>

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
                <p className="font-medium mb-4">{questions[step].question}</p>
                <div className="flex flex-col gap-2">
                  {questions[step].options.map((option, index) => (
                    <Button key={index} onClick={() => handleAnswer(option)} variant="outline">
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
                <p className="text-xl font-bold mb-4">{finalResult.title}</p>
                <p className="text-xxl mb-4">{finalResult.description}</p>

                <details className="mt-4">
                  <summary className="cursor-pointer font-medium">Twoje odpowiedzi</summary>
                  <div className="mt-4 space-y-4">
                    {questions.map((q, i) => (
                      <div key={i}>
                        <p className="font-medium">{i + 1}. {q.question}</p>
                        <p className="text-muted-foreground mt-1">Odpowiedź: {answers[i]}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <details className="mt-6">
                  <summary className="cursor-pointer font-medium">Progi rekomendacji (thresholds)</summary>
                  <div className="mt-4 space-y-4">
                    {thresholds.map((t, idx) => (
                      <div key={idx}>
                        <p className="font-semibold">{t.min}+ pkt – {t.title}</p>
                        <p className="text-muted-foreground mt-1">{t.description}</p>
                      </div>
                    ))}
                  </div>
                </details>

                <Button className="mt-6" onClick={resetQuiz}>
                  Zrób quiz jeszcze raz
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}