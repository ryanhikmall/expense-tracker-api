import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Kode Register yang lama biarkan saja di atas sini...
export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  // ... (kode register kamu yg sebelumnya)
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
};

// --- TAMBAHKAN INI DI BAWAHNYA ---
export const loginUser = async (email: string, passwordInput: string) => {
  // 1. Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  // 2. Cek apakah password cocok
  const isMatch = await bcrypt.compare(passwordInput, user.password);
  if (!isMatch) {
    throw new Error("Password salah");
  }

  // 3. Buat Token (Kartu Akses)
  // "RAHASIA_NEGARA" adalah kunci rahasia server (nanti bisa dipindah ke .env)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    "RAHASIA_NEGARA",
    { expiresIn: "1h" }, // Token kadaluwarsa dalam 1 jam
  );

  return { user, token };
};
