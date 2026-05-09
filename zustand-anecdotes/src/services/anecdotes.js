const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};

const create = async (content) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, votes: 0 }),
  };

  const response = await fetch(baseUrl, config);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const update = async (id, updatedAnecdote) => {
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...updatedAnecdote,
      votes: updatedAnecdote.votes + 1,
    }),
  };

  const response = await fetch(`${baseUrl}/${id}`, config);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const remove = async (id) => {
  const config = {
    method: "DELETE",
  };

  const response = await fetch(`${baseUrl}/${id}`, config);

  if (!response.ok) {
    throw new Error("Failed to delete anecdote");
  }

  return;
};

export default { getAll, create, update, remove };
