import prisma from "../lib/prisma";

export const createExpenseService = async (
  userId: number,
  title: string,
  amount: number,
  category: string,
) => {
  return await prisma.expense.create({
    data: {
      userId, // Penting! Ini cap kepemilikan
      title,
      amount,
      category,
    },
  });
};

export const getExpensesService = async (userId: number) => {
  return await prisma.expense.findMany({
    where: {
      userId: userId, // FILTER KUNCI: Cuma ambil punya user ini
    },
    orderBy: {
      date: "desc", // Urutkan dari yang paling baru
    },
  });
};