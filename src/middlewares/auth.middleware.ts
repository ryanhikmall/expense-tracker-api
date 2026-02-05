import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Kita buat tipe data khusus biar TS tidak marah saat kita tempel data user ke req
export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // 1. Ambil token dari Header (Biasanya format: "Bearer <token_panjang>")
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Ambil bagian tokennya saja

  // 2. Kalau tidak ada token, usir!
  if (!token) {
    return res.status(401).json({ message: "Akses Ditolak: Mana Tokennya?" });
  }

  // 3. Cek keaslian token
  // PENTING: "RAHASIA_NEGARA" harus sama persis dengan yang ada di Login tadi
  jwt.verify(token, "RAHASIA_NEGARA", (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token Tidak Valid atau Kadaluwarsa" });
    }

    // 4. Kalau aman, tempel data user ke request biar Controller tahu siapa yang masuk
    req.user = user;

    // 5. Lanjut ke ruangan berikutnya (Controller)
    next();
  });
};
