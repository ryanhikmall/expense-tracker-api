import { PrismaClient } from "@prisma/client";

// Kosongkan saja. Prisma v5 akan baca URL yang kita tulis di schema.prisma
const prisma = new PrismaClient();

export default prisma;
