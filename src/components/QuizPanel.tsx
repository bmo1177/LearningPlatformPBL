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
    <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-16 font-sans">
      <div className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-10 border border-border shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/15">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground font-poppins">
              {isPostQuiz ? "Post-Project Knowledge Check" : "Pre-Project Knowledge Check"}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isPostQuiz ? "Let's see how much you've learned!" : "Test your baseline knowledge before we begin."}
            </p>
          </div>
        </div>

        {isComplete ? (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg shadow-primary/20 font-poppins">
              {score}/{quiz.length}
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2 font-poppins">
              {score === quiz.length ? "Perfect Score!" : score > quiz.length / 2 ? "Great Job!" : "Good Effort!"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
              {isPostQuiz 
                ? "You've completed the Information Retrieval project and solidified your knowledge."
                : "Now you know what to expect. Let's dive into the project and build that engine!"}
            </p>
            <button 
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl font-medium text-sm transition-colors duration-200 border border-border min-h-[44px]"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] bg-primary/10 px-3 py-1 rounded-full font-poppins border border-primary/15">
                Question {currentQuestion + 1} of {quiz.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground tabular-nums">Score: {score}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-8 leading-relaxed">
              {quiz[currentQuestion].question}
            </h3>

            <div className="space-y-3 mb-8">
              {quiz[currentQuestion].options.map((opt: string, i: number) => {
                const isCorrect = i === quiz[currentQuestion].correctAnswer;
                const isSelected = i === selectedAnswer;
                
                let btnStyle = "border-border hover:border-primary/40 hover:bg-primary/5 bg-card text-foreground";
                if (isAnswered) {
                  if (isCorrect) btnStyle = "border-primary bg-primary/10 text-primary ring-1 ring-primary/30";
                  else if (isSelected) btnStyle = "border-destructive bg-destructive/10 text-destructive";
                  else btnStyle = "border-border bg-secondary/50 opacity-50 text-foreground";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group text-sm font-medium ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 mb-6 text-foreground">
                  <p className="text-sm leading-relaxed">
                    <strong className="font-semibold block mb-1 font-poppins">Explanation:</strong>
                    {quiz[currentQuestion].explanation}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg min-h-[44px]"
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
