import { it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteServices from "./services/anecdotes";
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

it("initializes anecdotes returned from backend", async () => {
  const mockAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 1,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 0,
    },
    {
      content:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      id: "69581",
      votes: 0,
    },
  ];
  anecdoteServices.getAll.mockResolvedValue(mockAnecdotes);

  const { result } = renderHook(() => useAnecdoteActions());

  await act(async () => {
    await result.current.initialize();
  });

  const { result: anecdotes } = renderHook(() => useAnecdotes());
  expect(anecdotes.current).toEqual(mockAnecdotes);
});

it("receives anecdotes and sorts them by votes", async () => {
  const mockAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 5,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 9,
    },
    {
      content:
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      id: "69581",
      votes: 1,
    },
  ];
  const sortedAnecdotes = mockAnecdotes.toSorted((a, b) => b.votes - a.votes);

  anecdoteServices.getAll.mockResolvedValue(mockAnecdotes);

  const { result } = renderHook(() => useAnecdoteActions());

  await act(async () => {
    await result.current.initialize();
  });

  const { result: anecdotes } = renderHook(() => useAnecdotes());
  expect(anecdotes.current).toEqual(sortedAnecdotes);
});

it("filters anecdotes properly", async () => {
  const mockAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 5,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 9,
    },
    {
      content: "If you are here, then you are not there",
      id: "69581",
      votes: 1,
    },
  ];
  const filteredAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 5,
    },
    {
      content: "If you are here, then you are not there",
      id: "69581",
      votes: 1,
    },
  ];

  anecdoteServices.getAll.mockResolvedValue(mockAnecdotes);

  const { result } = renderHook(() => useAnecdoteActions());
  const filter = "if";

  await act(async () => {
    await result.current.initialize();
    await result.current.setFilter(filter);
  });

  const { result: anecdotes } = renderHook(() => useAnecdotes());
  expect(anecdotes.current).toEqual(filteredAnecdotes);
});

it("increases number of votes when voting", async () => {
  const mockAnecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 5,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 9,
    },
    {
      content: "If you are here, then you are not there",
      id: "69581",
      votes: 1,
    },
  ];
  const anecdoteAfterVotes = {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 6,
  };

  anecdoteServices.getAll.mockResolvedValue(mockAnecdotes);
  anecdoteServices.update.mockResolvedValue(anecdoteAfterVotes);

  const { result } = renderHook(() => useAnecdoteActions());

  await act(async () => {
    await result.current.initialize();
    await result.current.vote(anecdoteAfterVotes.id);
    anecdoteServices.update.mockResolvedValue({
      ...anecdoteAfterVotes,
      votes: 7,
    });
    await result.current.vote(anecdoteAfterVotes.id);
  });

  const { result: anecdotes } = renderHook(() => useAnecdotes());
  expect(anecdotes.current[1]).toEqual({
    ...anecdoteAfterVotes,
    votes: 7,
  });
});
