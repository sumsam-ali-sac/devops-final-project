import Chatbot from "./pages/Chatbot";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Chatbot />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
