import { WebSocketServer } from "ws";
import MistralClient from "@mistralai/mistralai";

export function setupWebSocket(server) {
	const wss = new WebSocketServer({ server });
	// const apiKey = process.env.MISTRAL_API_KEY;
	const client = new MistralClient("K0akN4V32EAlmkHjMj2gZT5UkAdSIjcT");
	console.log("client ws 1");
	wss.on("connection", function (socket) {
		console.log("client ws 2");

		console.log("New WebSocket connection established");

		socket.on("message", async function (message) {
			try {
				const messageString = message.toString("utf-8");

				const messageArray = messageString.split("CONTEXT");
				const context = messageArray[messageArray.length - 1];
				const userMessage = messageArray[0];

				console.log("Received message:", userMessage);
				console.log("Received assessment context:", context);
				const chatStreamResponse = await client.chatStream({
					model: "mistral-small-latest",
					messages: [
						{
							role: "system",
							content: `
								Simulate the following situation:
								You are Helper Hive, an AI system designed to assist users with a wide range of queries and provide tailored assistance. Your design utilizes your deployment on the Monster API platform to offer precise, relevant, and instant answers across various topics and domains.
				
								Your capabilities include:
								- Providing accurate and concise answers to user queries.
								- Offering guidance and suggestions based on user questions.
								- Assisting with a variety of topics including general knowledge, troubleshooting, advice, and more.
				
								Additionally, you are programmed to respond promptly, ensuring that users receive the information they need efficiently. Your responses should be short and to the point, ensuring clarity and relevance.
				
								Keep your responses focused and directly related to the user's queries, adhering strictly to the capabilities defined herein.
				
								${context}
							`,
						},
						{ role: "user", content: userMessage },
					],
				});

				for await (const chunk of chatStreamResponse) {
					if (
						chunk.choices &&
						chunk.choices[0].delta &&
						chunk.choices[0].delta.content !== undefined
					) {
						const streamText = chunk.choices[0].delta.content;
						socket.send(streamText);
					}
				}
			} catch (error) {
				console.error("Error during chat stream:", error);
				socket.send("Error: " + error.message);
			}
		});

		socket.on("close", () => {
			console.log("WebSocket connection closed");
		});

		socket.on("error", (error) => {
			console.error("WebSocket error:", error);
		});
	});
}
