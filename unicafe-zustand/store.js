import { create } from "zustand";

export const useFeedbackStore = create((set) => {
  return {
    statistics: {
      good: 0,
      neutral: 0,
      bad: 0,
    },
    actions: {
      voteGood: () =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            good: state.statistics.good + 1,
          },
        })),
      voteNeutral: () =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            neutral: state.statistics.neutral + 1,
          },
        })),
      voteBad: () =>
        set((state) => ({
          statistics: {
            ...state.statistics,
            bad: state.statistics.bad + 1,
          },
        })),
    },
  };
});

export const useStatistics = () =>
  useFeedbackStore((state) => state.statistics);
export const useFeedbackControls = () =>
  useFeedbackStore((state) => state.actions);
