import { Board } from './utils';

export const defaultBoard: Board = {
  columns: [
    {
      title: "To Do",
      cards: [
        {
          title: "Create cards",
          description: "Populate the board with what I have to do",
          id: "c683306b-71cb-4727-adb7-1b11d983f169"
        }
      ],
      id: "a6c867c1-06c5-4c99-8e23-fb2e815c6e25"
    },
    {
      title: "In Progress",
      cards: [],
      id: "9e4f86af-ebac-48f2-903f-c4c5a52b41d4"
    },
    {
      title: "Done",
      cards: [],
      id: "c7c16c9d-cfcf-43b2-b3b4-d387812125dd"
    }
  ]
}