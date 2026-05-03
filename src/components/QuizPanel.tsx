'use client';
import React, { useState } from 'react';
import courseData from '@/data/course-ir.json';
import { CheckCircle2, XCircle, BrainCircuit, RefreshCw } from 'lucide-react';

export function QuizPanel({ isPostQuiz = false }: { isPostQuiz?: boolean }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // @ts-ignore
  const quiz = courseData.quiz || [];

  if (quiz.length === 0) return null;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === quiz[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-8 mb-16 font-sans">
      <div className="bg-white rounded-[2rem] p-10 border border-slate-200/60 shadow-xl shadow-slate-200/20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-poppins">
              {isPostQuiz ? "Post-Project Knowledge Check" : "Pre-Project Knowledge Check"}
            </h2>
            <p className="text-sm text-slate-500">
              {isPostQuiz ? "Let's see how much you've learned!" : "Test your baseline knowledge before we begin."}
            </p>
          </div>
        </div>

        {isComplete ? (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-500/30">
              {score}/{quiz.length}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-poppins">
              {score === quiz.length ? "Perfect Score!" : score > quiz.length / 2 ? "Great Job!" : "Good Effort!"}
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              {isPostQuiz 
                ? "You've completed the Information Retrieval project and solidified your knowledge."
                : "Now you know what to expect. Let's dive into the project and build that engine!"}
            </p>
            <button 
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full font-poppins">
                Question {currentQuestion + 1} of {quiz.length}
              </span>
              <span className="text-sm font-medium text-slate-400">Score: {score}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-8 leading-relaxed">
              {quiz[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-8">
              {quiz[currentQuestion].options.map((opt: string, i: number) => {
                const isCorrect = i === quiz[currentQuestion].correctAnswer;
                const isSelected = i === selectedAnswer;
                
                let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 bg-white";
                if (isAnswered) {
                  if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500";
                  else if (isSelected) btnStyle = "border-red-300 bg-red-50 text-red-900";
                  else btnStyle = "border-slate-200 bg-slate-50 opacity-50";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${btnStyle}`}
                  >
                    <span className="font-medium">{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 mb-6">
                  <p className="text-sm text-indigo-900 leading-relaxed">
                    <strong className="font-semibold block mb-1">Explanation:</strong>
                    {quiz[currentQuestion].explanation}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    className="px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-medium shadow-md shadow-slate-900/20 transition-all hover:-translate-y-0.5"
                  >
                    {currentQuestion < quiz.length - 1 ? 'Next Question' : 'See Results'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
