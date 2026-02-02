import "dotenv/config"; // Tambahkan ini agar file .env kamu bisa dibaca
import app from "./app";

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
