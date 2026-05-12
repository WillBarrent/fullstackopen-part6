import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import useNotification from "./hooks/useNotification";

const App = () => {
  const { isPending, error, anecdotes, vote } = useAnecdotes();
  const { setNotification } = useNotification();

  const handleVote = (anecdote) => {
    vote(anecdote);
    setNotification(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      setNotification("")
    }, 5000);
  };

  if (isPending) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
