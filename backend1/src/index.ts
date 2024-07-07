import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

// this is as same as we do in JAVA to use our class, as much i we want in any part of application. this is one of the instence of that.
const gameManager = new GameManager();

wss.on("connection", (ws) => {
	// when connection, call addUser
	gameManager.addUser(ws);
	// if disconnect call removeUser
	ws.on("disconnect", () => gameManager.removeUser(ws));
});
