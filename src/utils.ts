import { v4 as uuidv4 } from 'uuid';

export const isValidCard = (card) => {
  return typeof card.id === 'string' &&
    typeof card.title === 'string' &&
    typeof card.description === 'string';
}

export const isValidColumn = (column) => {
  return typeof column.id === 'string' &&
    typeof column.title === 'string' &&
    Array.isArray(column.cards) &&
    column.cards.every(isValidCard);
}

export const isValidBoard = (board) => {
  return typeof board === 'object' &&
    Array.isArray(board.columns) &&
    board.columns.every(isValidColumn);
}

export const toBoard = (board): Board | undefined => {
  if (isValidBoard(board)) {
    return board;
  }
  return undefined
}

export type Card = {
  id: string;
  title: string;
  description: string;
};

export type Column = {
  id: string;
  title: string;
  cards: Card[];
};

export type Board = {
  columns: Column[];
};

export const addUUID = (card: Card): Card => {
  return {
    ...card,
    id: uuidv4(),
  };
};