// src/schemas/expense.schema.ts
import { z } from "zod";

export const getExpenseSchema = z.object({
  query: z.object({
    // User kirim string "1", kita ubah jadi number 1 otomatis
    page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
    limit: z
      .string()
      .transform(Number)
      .pipe(z.number().min(1).max(100))
      .optional(),
  }),
});

export const createExpenseSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Judul minimal 3 karakter"), // Gak boleh kependekan
    amount: z.number().min(100, "Nominal minimal 100 perak"), // Gak boleh negatif/nol
    category: z.enum(["Food", "Transport", "Entertainment", "Bills", "Other"], {
      errorMap: () => ({
        message:
          "Kategori harus salah satu dari: Food, Transport, Entertainment, Bills, Other",
      }),
    }),
  }),
});

export const updateExpenseSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(), // Optional karena user mungkin cuma mau edit harga
    amount: z.number().min(100).optional(),
    category: z
      .enum(["Food", "Transport", "Entertainment", "Bills", "Other"])
      .optional(),
  }),
});
