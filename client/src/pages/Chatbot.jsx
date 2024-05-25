import React, { useState } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

export default function Chatbot() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-[#DDC9B4]">
			<Sidebar
				isOpen={isSidebarOpen}
				toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<Chat isSidebarOpen={isSidebarOpen} />
		</div>
	);
}
