import { Request, Response, NextFunction } from "express";

// Fungsi pembungkus (Wrapper)
export const tryCatch = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Jalankan fungsi controller, kalau error, oper ke next() (Middleware Error)
    fn(req, res, next).catch(next);
  };
};
