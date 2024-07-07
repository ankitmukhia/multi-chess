import { Square, PieceSymbol, Color } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/game"

interface CBProps {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  setBoard: any
  chess: any
};

const ChessBoard = ({ board, socket, setBoard, chess }: CBProps) => {
  const [from, setFrom] = useState<Square | null>(null);
  /*   const [to, setTo] = useState<Square | null>(null); */

  return <div className="text-white-200">
    {board.map((row, i) => {
      return <div key={i} className="flex">
        {row.map((square, j) => {
          const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
          return <div key={j} onClick={() => {
            if (!from) {
              setFrom(squareRepresentation);
            } else {
              socket.send(JSON.stringify({
                type: MOVE,
                payload: {
                  move: {
                    from,
                    to: squareRepresentation
                  }
                }
              }));

              setFrom(null);
              chess.move({
                from,
                to: squareRepresentation
              })
              setBoard(chess.board());
              console.log({
                from,
                to: squareRepresentation
              })
            }
          }} className={`w-16 h-16 text-black ${(i + j) % 2 === 0 ? "bg-[#769656]" : "bg-[#eeeed2]"}`}>
            <div className="w-full justify-center flex h-full">
              <div className="h-full justify-center flex flex-col">
                {square ? (
                  <img
                    className="w-12 h-12"
                    src={`/${square.color}${square.color === 'b' ? square.type : square?.color === 'w' ? square.type : null}.png`}
                    alt={`${square.color}${square.type}`}
                  />
                ) : null}
              </div>
            </div>
          </div>
        })}
      </div>
    })}
  </div>
}

export default ChessBoard;
