// tests/auth.test.ts
import request from "supertest";
import app from "../src/app";
import prisma from "../src/lib/prisma";

// SEBELUM TEST: Hapus user test kalau ada (Biar database bersih)
beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: "testbot@example.com" },
  });
});

// SETELAH TEST: Tutup koneksi database
afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/auth/register", () => {
  
  // Skenario 1: Register Normal
  it("should register a new user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "testbot@example.com",
      name: "Robot Test",
      password: "password123",
    });

    // Harapan (Expectation)
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.email).toBe("testbot@example.com");
  });

  // Skenario 2: Register Duplikat (Gagal)
  it("should fail if email already exists", async () => {
    // Kita coba daftar lagi pakai email yang sama
    const response = await request(app).post("/api/auth/register").send({
      email: "testbot@example.com",
      name: "Robot Test 2",
      password: "password123",
    });

    // Harapan: Ditolak
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/sudah terdaftar/i); // Cek pesan error
  });

  // Skenario 3: Validasi Input (Gagal)
  it("should fail if password is too short", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "testbot2@example.com",
      name: "Robot Test 2",
      password: "123", // Pendek banget
    });

    expect(response.status).toBe(400);
  });
});