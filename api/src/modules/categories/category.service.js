import prisma from "../../shared/database/prisma.js";

export async function createCategory({ name, type, accountId, userId }) {
  if (!name || !type || !accountId) {
    throw new Error("Name, type and accountId are required");
  }

  // 🔐 valida acesso à account
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.category.create({
    data: {
      name,
      type,
      accountId,
    },
    select: {
      id: true,
      name: true,
      type: true,
      active: true,
      createdAt: true,
    },
  });
}

export async function findAll(accountId, userId) {
  if (!accountId) {
    throw new Error("Account not provided");
  }

  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.category.findMany({
    where: {
      accountId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function findById(id, accountId, userId) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.category.findFirst({
    where: {
      id,
      accountId,
      active: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
    },
  });
}

export async function updateCategory(id, accountId, userId, data) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.category.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      type: true,
      updatedAt: true,
    },
  });
}

export async function deleteCategory(id, accountId, userId) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
      active: true,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return prisma.category.update({
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
