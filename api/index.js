import express from "express";
import { createServer } from "http";
import { config as dotenvConfig } from "dotenv";
import { setupMiddlewares } from "./config/middleware.js";
import { setupWebSocket } from "./lib/websocket.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig();
const app = express();
setupMiddlewares(app);

app.use(express.static(path.join(__dirname, "client_build")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client_build", "index.html"));
});

const server = createServer(app);
setupWebSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
