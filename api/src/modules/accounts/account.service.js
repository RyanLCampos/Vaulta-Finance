import prisma from "../../shared/database/prisma.js";

export async function create({ name, type, balance = 0, userId }) {
  if (!name || !type) {
    throw new Error("Name and type are required");
  }

  const accountsCount = await prisma.account.count({
    where: {
      userId,
      active: true,
    },
  });

  if (accountsCount >= 3) {
    throw new Error("Account limit reached");
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
  if (!id) {
    throw new Error("Account id is required");
  }

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
  const account = await prisma.account.findFirst({
    where: {
      id,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.account.update({
    where: { id },
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
  const account = await prisma.account.findFirst({
    where: {
      id,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.account.update({
    where: { id },
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
