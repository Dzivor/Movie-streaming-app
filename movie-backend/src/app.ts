import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./modules/auth/auth.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

export default app;
