import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: (anecdotes) =>
      set(() => ({
        anecdotes,
      })),
    setFilter: (value) => set(() => ({ filter: value })),
    create: (anecdote) =>
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) })),
    remove: async (id) => {
      await anecdoteService.remove(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },
    vote: async (id) => {
      const anecdote = useAnecdoteStore
        .getState()
        .anecdotes.find((anecdote) => anecdote.id === id);
      const updated = await anecdoteService.update(id, anecdote);
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updated : anecdote,
        ),
      }));
    },
  },
}));

const useNotificationStore = create((set) => ({
  notification: "",
  actions: {
    setNotification: (notification) => set(() => ({ notification })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter === "") {
    return anecdotes;
  }

  return anecdotes
    .filter((anecdote) => {
      if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return anecdote;
      }

      return;
    })
    .toSorted((a, b) => b.votes - a.votes);
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.notification);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
