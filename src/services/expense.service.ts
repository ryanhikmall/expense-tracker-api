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
