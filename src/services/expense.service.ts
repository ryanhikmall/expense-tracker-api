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

export const updateExpenseService = async (
  id: number,
  userId: number,
  data: { title?: string; amount?: number; category?: string },
) => {
  // 1. DEBUG: Cek dulu apakah barangnya ADA (tanpa filter user)
  const cekBarang = await prisma.expense.findUnique({
    where: { id: id },
  });
  // Logika Manual biar ketahuan salahnya dimana
  if (!cekBarang) {
    throw new Error("Barang TIDAK DITEMUKAN sama sekali di database.");
  }

  if (cekBarang.userId !== userId) {
    throw new Error(
      `Barang ketemu, TAPI pemilik beda! (Punya: ${cekBarang.userId} vs Request: ${userId})`,
    );
  }

  // Kalau lolos pengecekan di atas, baru update
  return await prisma.expense.update({
    where: { id: id },
    data: data,
  });
};
