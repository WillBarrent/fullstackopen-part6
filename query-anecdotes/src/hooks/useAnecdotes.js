import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, create, update } from "../services/anecdotes";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) => {
          if (anecdote.id === newAnecdote.id) {
            return newAnecdote;
          }

          return anecdote;
        }),
      );
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    error: result.error,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
