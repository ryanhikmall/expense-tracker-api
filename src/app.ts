import express from "express";
import authRouter from "./routes/auth.route";
import expenseRouter from "./routes/expense.route";

const app = express();

// 1. Middleware WAJIB (Agar bisa baca Body JSON dari Postman)
// Posisinya HARUS di atas route
app.use(express.json());

// 2. Pasang Routes
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

// 3. Export app agar bisa dipanggil oleh index.ts
export default app;
