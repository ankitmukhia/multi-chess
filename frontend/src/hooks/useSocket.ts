import { useState, useEffect } from "react";

const WS_URL: string = "ws://localhost:8080"

export const useSocket = () => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	console.log("socket", socket)

	useEffect(() => {
		const ws = new WebSocket(WS_URL)
		ws.onopen = () => {
			console.log("connected")
			setSocket(ws);
		}

		ws.onclose = () => {
			console.log("disconnected")
			setSocket(null);
		}

		return () => {
			ws.close();
		}
	}, []);

	return socket;
}
