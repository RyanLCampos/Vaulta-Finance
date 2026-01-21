import prisma from "../../shared/database/prisma.js";

export async function create({ name, type, balance = 0, userId }) {
  if (!name || !type) {
    throw new Error("Name and type are required");
  }

  return prisma.account.create({
    data: {
      name,
      type,
      balance,
      userId,
    },
    select: {
      id: true,
      name: true,
      type: true,
      balance: true,
      active: true,
      createdAt: true,
    },
  });
}

export async function findAllByUser(userId) {
  return prisma.account.findMany({
    where: {
      userId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      balance: true,
      createdAt: true,
    },
  });
}

export async function findById(id, userId) {
  return prisma.account.findFirst({
    where: {
      id,
      userId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      balance: true,
      createdAt: true,
    },
  });
}

export async function updateAccount(id, userId, data) {
  return prisma.account.update({
    where: {
      id,
      userId,
      active: true,
    },
    data,
    select: {
      id: true,
      name: true,
      type: true,
      balance: true,
      updatedAt: true,
    },
  });
}

export async function deleteAccount(id, userId) {
  return prisma.account.update({
    where: {
      id,
      userId,
      active: true,
    },
    data: {
      active: false,
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
  });
}
