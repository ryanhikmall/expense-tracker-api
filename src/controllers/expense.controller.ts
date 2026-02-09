import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createExpenseService,
  getExpensesService,
  updateExpenseService,
  deleteExpenseService,
} from "../services/expense.service";
import { tryCatch } from "../utils/tryCatch"; // Wrapper Ajaib
import { AppError } from "../utils/AppError"; // Custom Error

// 1. CREATE
export const createExpense = tryCatch(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { title, amount, category } = req.body;

    // Validasi manual kalau userId hilang (Jaga-jaga)
    if (!userId) {
      throw new AppError("User ID tidak ditemukan", 401);
    }

    const expense = await createExpenseService(userId, title, amount, category);

    res.status(201).json({
      message: "Pengeluaran berhasil dicatat!",
      data: expense,
    });
  },
);

// 2. READ (GET)
export const getExpenses = tryCatch(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) throw new AppError("Unauthorized", 401);

  // Pagination Logic
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { expenses, totalData } = await getExpensesService(userId, page, limit);
  const totalPages = Math.ceil(totalData / limit);

  res.status(200).json({
    message: "Data berhasil diambil",
    data: expenses,
    meta: { page, limit, totalData, totalPages },
  });
});

// 3. UPDATE
export const updateExpense = tryCatch(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const expenseId = Number(req.params.id);
    const { title, amount, category } = req.body;

    if (!userId) throw new AppError("Unauthorized", 401);

    // Service akan throw Error biasa kalau gagal.
    // tryCatch akan menangkapnya dan menjadikannya Error 500 (Internal Server Error)
    // Atau kita bisa update Service nanti buat throw AppError(404)
    const updatedExpense = await updateExpenseService(expenseId, userId, {
      title,
      amount,
      category,
    });

    res.status(200).json({
      message: "Pengeluaran berhasil diupdate!",
      data: updatedExpense,
    });
  },
);

// 4. DELETE
export const deleteExpense = tryCatch(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const expenseId = Number(req.params.id);

    if (!userId) throw new AppError("Unauthorized", 401);

    await deleteExpenseService(expenseId, userId);

    res.status(200).json({
      message: "Pengeluaran berhasil dihapus!",
    });
  },
);
