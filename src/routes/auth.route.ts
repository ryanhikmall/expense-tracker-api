import { Router, Response } from "express";
// Import HARUS sama persis dengan nama di controller ('register' & 'login')
import { register, login } from "../controllers/auth.controller";
import { authenticateToken, AuthRequest } from "../middlewares/auth.middleware"; // Import Satpam

const authRouter = Router();

// Pastikan variabel 'register' warnanya nyala (tidak pudar)
authRouter.post("/register", register);

// Pastikan variabel 'login' warnanya nyala
authRouter.post("/login", login);

authRouter.get(
  "/profile",
  authenticateToken,
  (req: AuthRequest, res: Response) => {
    // Kalau kode sampai sini, berarti Satpam sudah meloloskan user
    res.json({
      message: "Hore! Kamu berhasil masuk area rahasia.",
      user_data: req.user, // Ini data dari dalam token tadi
    });
  },
);

export default authRouter;
