import React from "react";
import { FaCommentAlt, FaQuestionCircle, FaBolt } from "react-icons/fa";
import ChatButton from "./Chatbutton";

const ChatButtonsPanel = ({ user, onButtonClick }) => {
	return (
		<div className="flex flex-col items-center justify-center flex-grow">
			<h1 className="text-4xl font-rubic font-black mb-10 text-neon-orange animate-pulse bg-gradient-to-r from-neon-orange from-10%  via-amber-500 via-30% to-neon-orange to-90%  inline-block text-transparent bg-clip-text">
				{/* Hello, {user ? user.username : "User"} */}
				"Hello , user"
			</h1>
			<p className="text-2xl font-worksans md:tracking-wide md:text-xl mb-5">
				Want some feedback?
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
				<ChatButton
					text="Answer my question about a specific topic"
					icon={<FaCommentAlt className="text-neon-orange h-6 w-6" />}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Provide tips for improving my skills"
					icon={
						<FaQuestionCircle className="text-neon-orange h-6 w-6" />
					}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Suggest resources to better understand a subject"
					icon={<FaBolt className="text-neon-orange h-6 w-6" />}
					onClick={onButtonClick}
				/>
				<ChatButton
					text="Guide me on how to apply this knowledge effectively"
					icon={<FaCommentAlt className="text-neon-orange h-6 w-6" />}
					onClick={onButtonClick}
				/>
			</div>
		</div>
	);
};

export default ChatButtonsPanel;
