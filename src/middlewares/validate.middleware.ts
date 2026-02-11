import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// 1. Definisikan Aturan Validasi (Schema) di sini
const createExpenseSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter"),
  amount: z.coerce.number().min(1000, "Minimal pengeluaran Rp 1.000"),
  category: z.string().min(3, "Kategori minimal 3 karakter"),
});

// 2. Middleware Pengecek (Langsung pakai schema di atas)
export const validateExpense = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Cek data req.body
  const result = createExpenseSchema.safeParse(req.body);

  if (!result.success) {
    // Kalau gagal, format errornya biar rapi
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      status: "fail",
      message: "Data tidak valid",
      errors: formattedErrors,
    });
  }

  // Kalau sukses, lanjut!
  next();
};

// 1. Schema Register (Aturan)
const registerSchema = z.object({
  email: z.string().email("Format email salah"),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"), // <--- INI KUNCINYA
});

// 2. Middleware Register
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));

    return res.status(400).json({
      status: "fail",
      message: "Data tidak valid",
      errors: formattedErrors,
    });
  }

  next();
};
