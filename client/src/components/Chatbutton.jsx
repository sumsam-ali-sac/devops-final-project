const ChatButton = ({ text, icon, onClick }) => {
	return (
		<button
			onClick={() => onClick(text)}
			className="bg-[[#EFE7DA]] p-5 ml-3 mr-3 font-worksans text-xl rounded-xl hover:bg-[#DDC9B4] flex items-center justify-center space-y-2 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
			{icon}
			<span className="text-lg tracking-wide">{text}</span>
		</button>
	);
};
export default ChatButton;
