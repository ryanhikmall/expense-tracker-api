import "dotenv/config";
import express from "express"; // <--- Kita buat app langsung dari sini
import helmet from "helmet"; // <--- 1. Import Helmet
import cors from "cors";
import expenseRouter from "./routes/expense.route";
import morganMiddleware from "./middlewares/morgan.middleware";
import Logger from "./lib/logger"; // <--- Import Logger Winston
import { errorMiddleware } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import { limiter } from "./middlewares/rateLimit.middleware";

const app = express(); // <--- Bikin app baru di sini (Lebih aman urutannya)
const PORT = 3000;

app.use(helmet());
app.use(cors());
app.use(limiter);

// 1. Pasang Body Parser
app.use(express.json());

// 2. Pasang CCTV (Morgan) - WAJIB SEBELUM ROUTE
app.use(morganMiddleware);

// 3. Routes
app.use("/api/auth", authRouter); // <--- PASANG KEMBALI ROUTE INI
app.use("/api/expenses", expenseRouter);

// 4. Pasang Route
app.use("/api/expenses", expenseRouter);

app.use(errorMiddleware);

// 5. Jalankan Server
app.listen(PORT, () => {
  // GANTI console.log DENGAN Logger.info
  // Supaya muncul jam dan warna hijaunya!
  Logger.info(`🚀 Server jalan di http://localhost:${PORT}`);
});
