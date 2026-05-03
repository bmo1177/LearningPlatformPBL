'use client';

import Sidebar from '@/components/Sidebar';
import ProjectHeader from '@/components/ProjectHeader';
import ProjectSummary from '@/components/ProjectSummary';
import MainStage from '@/components/MainStage';
import LearnedSection from '@/components/LearnedSection';
import SuccessScreen from '@/components/SuccessScreen';
import DocPanel from '@/components/DocPanel';
import { QuizPanel } from '@/components/QuizPanel';
import { GuidanceToggle } from '@/components/GuidanceToggle';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const { isAssistantOpen } = useProgress();
  const stepRefs = useRef<Map<number, HTMLElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = Number(entry.target.getAttribute('data-step-id'));
          if (stepId) {
            setCurrentStep(stepId);
          }
        }
      });
    }, observerOptions);

    courseData.steps.forEach((step) => {
      const element = document.getElementById(`step-${step.id}`);
      if (element) {
        element.setAttribute('data-step-id', String(step.id));
        observer.observe(element);
        stepRefs.current.set(step.id, element);
      }
    });

    observers.push(observer);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <main className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} currentStep={currentStep} />
      <div className={`flex-1 ${isSidebarOpen ? 'md:ml-72' : 'ml-0'} transition-all duration-300 min-h-screen pb-20 overflow-y-auto ${isAssistantOpen ? 'xl:pr-[400px]' : ''}`}>
        <ProjectHeader />
        <div id="summary">
          <ProjectSummary />
        </div>
        <div id="objectives" />
        <QuizPanel />
        <div className="max-w-4xl mx-auto px-8">
          <GuidanceToggle />
        </div>
        {courseData.steps.map((step) => (
          <MainStage key={step.id} step={step} />
        ))}
        <div id="learned">
          <LearnedSection />
        </div>
        <div id="export">
          <SuccessScreen />
        </div>
      </div>
      <DocPanel />
    </main>
  );
}
