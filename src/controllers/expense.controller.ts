import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware"; // Import tipe data custom tadi
import {
  createExpenseService,
  getExpensesService,
  updateExpenseService,
  deleteExpenseService,
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
    const userId = req.user?.id;

    // Ambil page & limit dari Query URL (Default: page 1, limit 10)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { expenses, totalData } = await getExpensesService(
      userId,
      page,
      limit,
    );

    // Hitung total halaman
    const totalPages = Math.ceil(totalData / limit);

    res.status(200).json({
      message: "Data berhasil diambil",
      data: expenses,
      // Metadata Pagination (Penting buat Frontend)
      meta: {
        page: page,
        limit: limit,
        totalData: totalData,
        totalPages: totalPages,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const expenseId = Number(req.params.id); // Ambil ID dari URL (string -> number)
    const { title, amount, category } = req.body; // Ambil data baru

    const updatedExpense = await updateExpenseService(expenseId, userId, {
      title,
      amount,
      category,
    });

    res.status(200).json({
      message: "Pengeluaran berhasil diupdate!",
      data: updatedExpense,
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const expenseId = Number(req.params.id);

    // Panggil Service (Urutan: ID Barang dulu, baru ID User)
    await deleteExpenseService(expenseId, userId);

    res.status(200).json({
      message: "Pengeluaran berhasil dihapus!",
    });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
