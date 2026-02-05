import express from "express";
import authRouter from "./routes/auth.route";

const app = express();

// 1. Middleware WAJIB (Agar bisa baca Body JSON dari Postman)
// Posisinya HARUS di atas route
app.use(express.json());

// 2. Pasang Routes
app.use("/api/auth", authRouter);

// 3. Export app agar bisa dipanggil oleh index.ts
export default app;
