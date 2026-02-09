import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import Logger from "../lib/logger"; // Panggil Logger kita

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Default: Internal Server Error (500)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // LOG Error ke Terminal/File (PENTING!)
  Logger.error(
    `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  // Kirim Respon ke User
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // Tampilkan stack trace cuma kalau lagi mode development (biar aman)
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
