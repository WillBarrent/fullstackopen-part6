import { useAnecdoteActions, useNotificationActions } from "../store";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const { create } = useAnecdoteActions();
  const { setNotification } = useNotificationActions();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const newAnecdote = await anecdoteService.create(content);
    create(newAnecdote);
    e.target.reset();

    setNotification(`You added new anecdote - '${content}'`);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
