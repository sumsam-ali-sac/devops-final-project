import React, { memo } from "react";

const Message = memo(({ msg, user }) => {
	return (
		<div
			className={`flex items-center p-4 ${
				msg.sender === "user" ? "justify-end" : ""
			}`}>
			{msg.sender !== "user" && (
				<img
					src="/chatbotLogo.png"
					alt="Bot"
					className="w-13 h-10 rounded-full mr-3"
				/>
			)}
			<div
				className={`p-4 rounded-lg ${
					msg.sender === "user"
						? "bg-[#DDC9B4] text-[#222] text-right"
						: "bg-neon-orange text-dim-orange text-left"
				}`}>
				<div className="font-worksans md:tracking whitespace-pre-wrap md:text-lg">
					{msg.text}
				</div>
			</div>
			{msg.sender === "user" && (
				<img
					// src={user.avatar}
					src="https://"
					alt="User"
					className="w-10 h-10 rounded-full ml-3"
				/>
			)}
		</div>
	);
});

const ChatDisplay = memo(({ messages, user, endRef }) => {
	const messageElements = React.useMemo(
		() =>
			messages.map((msg, index) => (
				<Message key={index} msg={msg} user={user} />
			)),
		[messages]
	);

	return (
		<div className="w-full h-full mb-24 bg-dim-orange overflow-y-auto scrollbar-thin scrollbar-thumb-neon-orange scrollbar-track-dim-orange hover:scrollbar-thumb-hover-green">
			<div className="bg-dim-orange h-screen">
				{messageElements}
				<div ref={endRef} />
			</div>
		</div>
	);
});

export default ChatDisplay;
