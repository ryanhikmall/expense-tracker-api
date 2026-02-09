import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // Maksimal 100 request per IP dalam durasi windowMs
  message: {
    status: "fail",
    message: "Terlalu banyak request dari IP ini, coba lagi dalam 15 menit.",
  },
  standardHeaders: true, // Mengirim info limit di header (RateLimit-*)
  legacyHeaders: false, // Mematikan header lama (X-RateLimit-*)
});
