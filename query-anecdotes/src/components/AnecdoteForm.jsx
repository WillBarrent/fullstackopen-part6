import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { setNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdote(content);
    setNotification("new anecdote has been created");
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
