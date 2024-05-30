import React, { useState, useRef, useEffect } from "react";
import ChatButtonsPanel from "./ChatButtonsPanel";
import ChatDisplay from "./ChatDisplay";
import ExpandingTextarea from "./ExpandingTextArea";
import { useNavigate } from "react-router-dom";

const Chat = ({ isSidebarOpen }) => {
	const [chatActive, setChatActive] = useState(false);
	const [messages, setMessages] = useState([]);
	const endOfMessagesRef = useRef(null);
	const socketRef = useRef(null);
	const navigate = useNavigate();
	let user = "user";
	useEffect(() => {
		if (!user) {
			navigate("/sign-in");
		}
	}, [user, navigate]);

	let websocket_url = import.meta.env.VITE_WS_URL;
	useEffect(() => {
		const socket = new WebSocket(websocket_url);
		socketRef.current = socket;

		socket.onmessage = (event) => {
			handleBotResponse(event.data);
		};

		return () => {
			socket.close();
		};
	}, []);

	const handleBotResponse = (messageText) => {
		setChatActive(true);
		setMessages((prev) => {
			const lastMessage = prev[prev.length - 1];
			if (lastMessage && lastMessage.sender === "bot") {
				return prev.slice(0, -1).concat({
					...lastMessage,
					text: `${lastMessage.text}${messageText}`,
				});
			}
			return [...prev, { text: messageText, sender: "bot" }];
		});
		scrollToBottom();
	};

	const handleUserMessage = (messageText) => {
		if (!chatActive) setChatActive(true);
		setMessages((prev) => [...prev, { text: messageText, sender: "user" }]);
		scrollToBottom();

		if (socketRef.current) {
			socketRef.current.send(messageText);
		}
	};

	const scrollToBottom = () => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div
			className={`bg-dim-orange text-[#222] min-h-screen w-full flex flex-col items-center justify-between p-4 ${
				isSidebarOpen ? "opacity-50 pointer-events-none" : ""
			}`}>
			{!chatActive ? (
				<>
					<ChatButtonsPanel
						// user={user}
						user="user"
						onButtonClick={handleUserMessage}
					/>
					<ExpandingTextarea onSend={handleUserMessage} />
				</>
			) : (
				<>
					<ChatDisplay
						messages={messages}
						// user={user}
						user="user"
						endRef={endOfMessagesRef}
					/>
					<ExpandingTextarea onSend={handleUserMessage} />
				</>
			)}
		</div>
	);
};

export default Chat;
