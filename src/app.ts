// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { limiter } from "./middlewares/rateLimit.middleware";
import authRouter from "./routes/auth.route";
import expenseRouter from "./routes/expense.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import morganMiddleware from "./middlewares/morgan.middleware";
import path from "path";

const app = express();

// --- SECURITY & MIDDLEWARE ---
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(morganMiddleware);

// --- STATIC FILES ---
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// --- ROUTES ---
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

// --- ERROR HANDLING ---
app.use(errorMiddleware);

export default app; // <--- KITA EXPORT APP-NYA SAJA