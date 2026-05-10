import { useEffect } from "react";
import {
  useAnecdoteActions,
  useAnecdotes,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, initialize, remove } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const voteForAnecdote = (content, id) => {
    vote(id);

    setNotification(`You voted '${content}'`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => voteForAnecdote(anecdote.content, anecdote.id)}
              >
                vote
              </button>
              {anecdote.votes === 0 ? (
                <button
                  onClick={() => {
                    remove(anecdote.id);
                  }}
                >
                  remove
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
