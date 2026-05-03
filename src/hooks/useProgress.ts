import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GuidanceMode = 'guided' | 'some' | 'independent';

interface ProgressState {
  currentStep: number;
  artifacts: Record<number, string>;
  reflections: Record<number, string>;
  guidanceMode: GuidanceMode;
  saveArtifact: (stepId: number, data: string) => void;
  saveReflection: (stepId: number, text: string) => void;
  setGuidanceMode: (mode: GuidanceMode) => void;
  unlockNextStep: () => void;
  resetProgress: () => void;
  isAssistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      currentStep: 0,
      artifacts: {},
      reflections: {},
      guidanceMode: 'guided',
      isAssistantOpen: false,
      saveArtifact: (stepId, data) =>
        set((state) => ({
          artifacts: { ...state.artifacts, [stepId]: data },
        })),
      saveReflection: (stepId, text) =>
        set((state) => ({
          reflections: { ...state.reflections, [stepId]: text },
        })),
      setGuidanceMode: (mode) =>
        set(() => ({
          guidanceMode: mode,
        })),
      unlockNextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
        })),
      resetProgress: () =>
        set({ currentStep: 0, artifacts: {}, reflections: {}, guidanceMode: 'guided' }),
      setAssistantOpen: (open) =>
        set(() => ({
          isAssistantOpen: open,
        })),
    }),
    {
      name: 'ir-course-progress',
    }
  )
);
