import "./types/express";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import moviesRouter from "./routes/movies.routes";
import adminRouter from "./routes/admin.routes";
import watchSessionsRouter from "./routes/watch-sessions.routes";
import streamRouter from "./routes/stream.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { generalLimiter } from "./middlewares/rateLimit.middleware";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use(generalLimiter);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.use("/auth", authRouter);
app.use("/movies", moviesRouter);
app.use("/admin", adminRouter);
app.use("/watch-sessions", watchSessionsRouter);
app.use("/stream", streamRouter);

// 404 handler - must come after all routes
app.use(notFoundHandler);

// Error handler - must be last
app.use(errorHandler);

export default app;
