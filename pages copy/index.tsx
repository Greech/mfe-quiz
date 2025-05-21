
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from '../data/questions';
import { results } from '../data/results';
import { calculateScore, determineResult } from '../utils/scoring';
import { QuestionCard } from '../components/QuestionCard';
import { ResultCard } from '../components/ResultCard';

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);
    if (step + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setStep(step + 1);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const score = calculateScore(answers);
  const finalResult = determineResult(score, results);

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
            <QuestionCard question={questions[step]} onAnswer={handleAnswer} />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ResultCard result={finalResult} answers={answers} onRetry={resetQuiz} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
