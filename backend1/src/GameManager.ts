import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

/* Game Manager handle all your games */
export class GameManager {
	/* We put all our inital veriables here */
	/* This private game is as same as const game; in functional */
	private games: Game[];
	private pendingUser: WebSocket | null;
	private users: WebSocket[];

	constructor() {
		/* This this.game is  as same as initilizing in functional, = [] empty array */
		this.games = [];
		this.users = [];
		this.pendingUser = null;
	};

	addUser(socket: WebSocket) {
		console.log("connection thread reach");
		this.users.push(socket);
		this.addHandler(socket)
	};

	removeUser(socket: WebSocket) {
		this.users = this.users.filter(user => user !== socket);
		/* Stop the game here because the user left, we most have re-connect logic */
	};

	private addHandler(socket: WebSocket) {
		console.log("User add handler reache!")
		socket.on("message", (data) => {
			/* TODO , i need to check what is coming in this data. console log this and analize */
			const message = JSON.parse(data.toString());
			console.log("Add hadler Data : ", message)

			if (message.type === INIT_GAME) {
				if (this.pendingUser) {
					console.log("Pening user and you have been connect to play game!")
					/* start a game */
					const game = new Game(this.pendingUser, socket);
					/* and as per our system design, we need to mantain global array of games  */
					this.games.push(game);
					this.pendingUser = null;
				} else {
					/* no one is there, so making wait user to connected to someone */
					this.pendingUser = socket;
				}
			}

			if (message.type === MOVE) {
				/* we find the revelent game, who this move belong to */
				const game = this.games.find(game => game.player1 === socket || game.player2 === socket)
				if (game) {
					game.makeMove(socket, message.payload.move);
				};
			};
		});
	};
};
