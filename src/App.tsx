import { DirectoryChildNode } from '@replit/extensions';
import { useReplit } from '@replit/extensions-react';
import { useState, useEffect } from 'react';
import './App.css'
import Board from '@asseinfo/react-kanban';
import { toBoard, isValidBoard, addUUID } from './utils';
import { defaultBoard } from './default-board'

const BOARD_FILE_NAME = 'board.json';

function App() {
  // Handshake status, error (if any), and Replit API wrapper
  const { status, error, replit } = useReplit();
  const [board, setBoard] = useState<Board | undefined>(undefined)

  const saveBoard = async (newBoard) => {
    if (replit) {
      const maybeBoard = toBoard(newBoard);
      // Save the board to the file system
      if (maybeBoard) {
        const stringifiedBoard = JSON.stringify(maybeBoard, null, 2)
        console.log(stringifiedBoard);
        await replit.fs.writeFile(BOARD_FILE_NAME, stringifiedBoard);
        // TODO remove the extra file that is due to the replit.fs bug
        await replit.fs.writeFile(BOARD_FILE_NAME, stringifiedBoard)

      }
    }
  }

  useEffect(() => {
    const readBoard = async () => {
      if (replit && !board) {
        // Read the file system at root level
        const { children } = await replit.fs.readDir('.');
        const boardFile = children.find(child => child.filename === BOARD_FILE_NAME);
        if (boardFile) {
          const json = await replit.fs.readFile(`./${boardFile.filename}`);

          if (("error" in json && json.error) || !("content" in json)) {
            return await replit.messages.showError(`Invalid board. Fix or delete the board.json file.`);
          }
          const parsedBoard = JSON.parse(json.content);

          const maybeBoard = toBoard(parsedBoard);
          if (maybeBoard) {
            setBoard(maybeBoard);
          }
          else {
            return await replit.messages.showError(`Invalid board. Fix or delete the board.json file.`)
          }
          return;
        }
        else {
          setBoard(defaultBoard);
        }
      }
    }
    readBoard();
  }, [replit, board])


  if (status === "error") {
    return <div className="error">{error?.message}</div>;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {board ? <Board
        allowRemoveLane
        allowRemoveCard
        allowRenameColumn
        allowRemoveColumn
        onColumnDragEnd={saveBoard}
        onCardDragEnd={saveBoard}
        onColumnRemove={saveBoard}
        onColumnRename={saveBoard}
        onLaneRemove={saveBoard}
        onCardRemove={saveBoard}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={addUUID}
        allowAddColumn
        onColumnNew={saveBoard}
        onNewColumnConfirm={addUUID}
        onCardNew={saveBoard}
      /> : null}
    </main>
  );
}


export default App;