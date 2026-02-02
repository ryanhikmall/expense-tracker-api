import prisma from "../lib/prisma";

export const registerUser = async (email, password, name) => {
  return prisma.user.create({
    data: { email, password, name },
  });
};
