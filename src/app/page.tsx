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

import { useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isAssistantOpen } = useProgress();

  return (
    <main className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
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
