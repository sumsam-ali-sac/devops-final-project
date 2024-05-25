import authRouter from "../routes/auth.route.js";
export function setupRoutes(app) {
	app.use("/api/node/auth", authRouter);
}
