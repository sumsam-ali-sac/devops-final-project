import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ExpandingTextarea from "../../../src/components/ExpandingTextArea";
import Chat from "../../../src/components/Chat";
import { BrowserRouter } from "react-router-dom";

// Mock the WebSocket
global.WebSocket = vi.fn(() => ({
	send: vi.fn(),
	close: vi.fn(),
	onmessage: null,
}));

describe("ExpandingTextarea Component", () => {
	it("should render without crashing", () => {
		render(<ExpandingTextarea onSend={() => {}} />);
		expect(
			screen.getByPlaceholderText("Enter a prompt here")
		).toBeInTheDocument();
	});

	it("should expand the textarea on input", () => {
		render(<ExpandingTextarea onSend={() => {}} />);
		const textarea = screen.getByPlaceholderText("Enter a prompt here");

		expect(textarea).toBeInTheDocument();
		fireEvent.change(textarea, { target: { value: "A".repeat(1000) } });
		expect(textarea.rows).toBeGreaterThan(0);
	});

	it("should reset the textarea on send", () => {
		const handleSend = vi.fn();
		render(<ExpandingTextarea onSend={handleSend} />);
		const textarea = screen.getByPlaceholderText("Enter a prompt here");

		expect(textarea).toBeInTheDocument();
		fireEvent.change(textarea, { target: { value: "Hello" } });
		fireEvent.keyDown(textarea, {
			key: "Enter",
			code: "Enter",
			shiftKey: false,
		});
		expect(handleSend).toHaveBeenCalledWith("Hello");
		expect(textarea.value).toBe("");
	});

	it("should not send empty messages", () => {
		const handleSend = vi.fn();
		render(<ExpandingTextarea onSend={handleSend} />);
		const textarea = screen.getByPlaceholderText("Enter a prompt here");

		expect(textarea).toBeInTheDocument();
		fireEvent.keyDown(textarea, {
			key: "Enter",
			code: "Enter",
			shiftKey: false,
		});
		expect(handleSend).not.toHaveBeenCalled();
	});
});

describe("Chat Component", () => {
	it("should render without crashing", () => {
		render(
			<BrowserRouter>
				<Chat isSidebarOpen={false} />{" "}
			</BrowserRouter>
		);
		expect(
			screen.getByPlaceholderText("Enter a prompt here")
		).toBeInTheDocument();
	});

	it("should send message through WebSocket", () => {
		const socketSendMock = vi.fn();
		global.WebSocket.mockImplementationOnce(() => ({
			send: socketSendMock,
			close: vi.fn(),
			onmessage: null,
		}));

		render(
			<BrowserRouter>
				<Chat isSidebarOpen={false} />{" "}
			</BrowserRouter>
		);
		const textarea = screen.getByPlaceholderText("Enter a prompt here");
		fireEvent.change(textarea, { target: { value: "Hello" } });
		fireEvent.keyDown(textarea, {
			key: "Enter",
			code: "Enter",
			shiftKey: false,
		});

		expect(socketSendMock).toHaveBeenCalledWith("Hello");
	});
});
