import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Validasi Aman (Safe Parse)
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // 2. Jika Sukses, Lanjut!
      if (result.success) {
        return next();
      }

      // 3. Jika Gagal, Format Pesan Errornya
      // Kita pakai .issues (ini properti asli Zod yang paling aman)
      const issues = result.error.issues;

      const formattedErrors = issues.map((issue) => {
        return {
          // Ambil nama field (misal: body.title -> title)
          field: issue.path[1] || issue.path[0] || "unknown",
          message: issue.message,
        };
      });

      // 4. Kirim Respon Rapi ke User
      return res.status(400).json({
        message: "Data tidak valid",
        errors: formattedErrors,
      });
    } catch (err) {
      // Jaga-jaga kalau ada error server lain
      console.error("🔥 Server Error:", err);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan internal server" });
    }
  };
