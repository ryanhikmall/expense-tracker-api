import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

// 1. Nama fungsi ini harus 'register'
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerUser(email, password, name);

    res.status(201).json({
      message: "Registrasi Berhasil",
      data: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error: any) {

    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// 2. Nama fungsi ini harus 'login'
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.status(200).json({
      message: "Login berhasil",
      token: result.token,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
