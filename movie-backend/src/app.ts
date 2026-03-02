import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes";
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

// 404 handler - must come after all routes
app.use(notFoundHandler);

// Error handler - must be last
app.use(errorHandler);

export default app;
