import "dotenv/config"; // Baca .env (kalau pakai)
import app from "./app"; // <--- IMPORT DARI APP.TS (Jangan bikin express() baru disini!)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
