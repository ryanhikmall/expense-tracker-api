import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Gunakan route auth
app.use("/api/auth", authRoutes);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server Expense Tracker Ready! 🚀" });
});

export default app;
