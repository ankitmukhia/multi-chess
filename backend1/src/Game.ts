import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE, INIT_GAME } from "./messages"

export class Game {
	public player1: WebSocket;
	public player2: WebSocket;
	public board: Chess;
	public move: string[];
	public startTime: Date;
	private moveCount: number;

	constructor(player1: WebSocket, player2: WebSocket) {
		console.log("Game has started!")
		this.player1 = player1;
		this.player2 = player2;
		this.board = new Chess();
		this.move = [];
		this.moveCount = 0;
		this.startTime = new Date();
		this.player1.send(JSON.stringify({
			type: INIT_GAME,
			payload: {
				color: "white"
			}
		}));
		this.player2.send(JSON.stringify({
			type: INIT_GAME,
			payload: {
				color: "black"
			}
		}));
	};

	makeMove(socket: WebSocket, move: {
		from: string;
		to: string
	}) {
		console.log("Has made a move!");
		/* send the updated board to both player */
		/* These conditions are used to ensure that the correct playaer is making their move */
		if (this.board.moves().length % 2 === 0 && socket !== this.player1) {
			/* if it is even, and player2 is trying to make a move */
			return;
		};
		if (this.board.moves().length % 2 === 1 && socket !== this.player2) {
			/* if it is odd, and player1 is trying to make a move */
			return;
		};

		// update the board
		try {
			this.board.move(move)
		} catch (e) {
			console.log("Move error : ", e)
			return;
		}

		if (this.board.isGameOver()) {
			// if game is over, it will let know both the side
			this.player1.emit(JSON.stringify({
				type: GAME_OVER,
				payload: {
					winner: this.board.turn() === "w" ? "black" : "white"
				}
			}))
			this.player2.emit(JSON.stringify({
				type: GAME_OVER,
				payload: {
					winner: this.board.turn() === "w" ? "black" : "white"
				}
			}))
			return;
		}

		if (this.moveCount % 2 === 0) {
			/* if game is not over,  let the other part know, based on who is other party who currently send the message, hey  other person has made the move, it you turn */
			this.player2.send(JSON.stringify({
				type: MOVE,
				payload: move
			}));
		} else {

			this.player1.send(JSON.stringify({
				type: MOVE,
				payload: move
			}));
		};
		this.moveCount++;
	};
};
