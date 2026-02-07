import "dotenv/config";
import express from "express"; // <--- Kita buat app langsung dari sini
import expenseRouter from "./routes/expense.route";
import morganMiddleware from "./middlewares/morgan.middleware";
import Logger from "./lib/logger"; // <--- Import Logger Winston

const app = express(); // <--- Bikin app baru di sini (Lebih aman urutannya)
const PORT = 3000;

// 1. Pasang Body Parser
app.use(express.json());

// 2. Pasang CCTV (Morgan) - WAJIB SEBELUM ROUTE
app.use(morganMiddleware);

// 3. Pasang Route
app.use("/api/expenses", expenseRouter);

// 4. Jalankan Server
app.listen(PORT, () => {
  // GANTI console.log DENGAN Logger.info
  // Supaya muncul jam dan warna hijaunya!
  Logger.info(`🚀 Server jalan di http://localhost:${PORT}`);
});
