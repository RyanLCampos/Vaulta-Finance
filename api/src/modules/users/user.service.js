import prisma from "../../shared/database/prisma.js";
import bcrypt from "bcryptjs";

export async function create({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    await tx.account.create({
      data: {
        name: "Conta principal",
        type: "DEFAULT",
        balance: 0,
        userId: user.id,
      },
    });

    return user;
  });
}

export async function findById(userId) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}

export async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deleteUser(id) {
  return prisma.user.update({
    where: { id },
    data: {
      active: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      active: true,
    },
  });
}
