import { Request, Response } from "express";
import * as authService from "../services/auth.service";


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.registerUser(email, password, name);

    res.status(201).json({
      message: "User berhasil didaftarkan! 🎉",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
