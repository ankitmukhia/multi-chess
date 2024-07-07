import { useEffect, useState } from "react";
import { ChessBoard } from "../components/index";
import { Button } from "../ui/button"
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const ws = useSocket();
  const [chess, setChess] = useState<Chess>(new Chess())
  const [board, setBoard] = useState(chess.board())

  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board())
          console.log("Game initilized!");
          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move has made!");
          break;

        case GAME_OVER:
          console.log("Game Over")
          break;
      }
    }
  }, [ws]);

  if (!ws) return <div>Connecting...</div>

  return <div className="flex justify-center">
    <div className="pt-8 maz-w-screen-lg w-full">
      <div className="grid grid-cols-6 gap-4 w-full">
        <div className="col-span-4 w-full flex justify-center">
          <ChessBoard setBoard={setBoard} socket={ws} board={board} chess={chess} />
        </div>

        <div className="col-span-2 w-full">
          <Button onClick={() => {
            ws.send(JSON.stringify({
              type: INIT_GAME
            }));
          }}>
            Play
          </Button>
        </div>
      </div>
    </div>
  </div>
}

export default Game;
