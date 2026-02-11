// src/index.ts
import "dotenv/config";
import app from "./app"; // <--- Import dari file sebelah
import Logger from "./lib/logger";
import { swaggerDocs } from "./utils/swagger"; // Swagger dipanggil di sini aja

const PORT = 3000;

app.listen(PORT, () => {
  Logger.info(`🚀 Server jalan di http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});