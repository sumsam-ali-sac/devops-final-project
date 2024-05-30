import cors from "cors";
import helmet from "helmet";
import express from "express";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();
process.env.VITE_WS_URL;
export function setupMiddlewares(app) {
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					connectSrc: ["'self'", "ws://localhost:8080"], // Adjust according to your needs
				},
			},
		})
	);
	app.use(cors());
	app.use(express.json());
	app.use(express.static("public"));
}
