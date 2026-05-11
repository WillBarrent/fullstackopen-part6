const baseUrl = "http://localhost:3001/anecdotes/";

export const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  const data = await response.json();

  return data;
};

export const create = async (newAnecdote) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnecdote),
  };

  const response = await fetch(baseUrl, config);

  if (!response.ok) {
    throw new Error("Failed to create new anecdote");
  }

  return await response.json();
};

export const update = async (updatedAnecdote) => {
  const config = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedAnecdote),
  };

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, config);

  if (!response.ok) {
    throw new Error("Failed to update new anecdote");
  }

  return await response.json();
};
