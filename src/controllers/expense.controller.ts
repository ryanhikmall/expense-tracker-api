import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware"; // Import tipe data custom tadi
import {
  createExpenseService,
  getExpensesService,
} from "../services/expense.service";

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    // 1. Ambil User ID dari Token (hasil kerja Satpam)
    const userId = req.user?.id;

    // 2. Ambil data belanjaan dari Body
    const { title, amount, category } = req.body;

    // 3. Panggil Service
    const expense = await createExpenseService(userId, title, amount, category);

    res.status(201).json({
      message: "Pengeluaran berhasil dicatat!",
      data: expense,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id; // Ambil ID dari Token

    const expenses = await getExpensesService(userId);

    res.status(200).json({
      message: "Data berhasil diambil",
      data: expenses,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
