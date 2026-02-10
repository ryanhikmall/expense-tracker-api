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
  import prisma from "../lib/prisma";

  export const createExpense = async (req: Request, res: Response) => {
    try {
      const { title, amount, category } = req.body;
      const userId = (req as any).user.id; // Didapat dari middleware auth

      // 1. Cek apakah ada file yang di-upload
      let attachmentUrl = null;
      if (req.file) {
        // Kita simpan URL-nya saja, bukan filenya
        // Contoh: /uploads/struk-123456.jpg
        attachmentUrl = `/uploads/${req.file.filename}`;
      }

      // 2. Simpan ke Database
      const expense = await prisma.expense.create({
        data: {
          title,
          amount: Number(amount), // Pastikan jadi angka
          category,
          userId,
          attachment: attachmentUrl, // <--- Masukkan URL gambar di sini
        },
      });

      res.status(201).json({
        message: "Expense created successfully",
        data: expense,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

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
