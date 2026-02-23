import prisma from "../../shared/database/prisma.js";

import { Prisma } from "@prisma/client";

export async function createTransaction(
  description,
  amount,
  type,
  date,
  accountId,
  categoryId,
  userId,
) {
  if (!description || !amount || !type || !accountId || !categoryId) {
    throw new Error("Missing required fields");
  }

  const decimalAmount = new Prisma.Decimal(amount);
  const transactionDate = date ? new Date(date) : new Date();

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

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      accountId,
      active: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.type !== type) {
    throw new Error("Transaction type must match category type");
  }

  return prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.create({
      data: {
        description,
        amount: decimalAmount,
        type,
        date: transactionDate,
        accountId,
        categoryId,
      },
    });

    const balanceChange =
      type === "INCOME" ? decimalAmount : decimalAmount.mul(-1);

    await tx.account.update({
      where: { id: accountId },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    });

    return transaction;
  });
}

export async function findAllTransactions(accountId, userId, filters = {}) {
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

  return prisma.transaction.findMany({
    where: {
      accountId,
      ...(filters.categoryId && { categoryId: Number(filters.categoryId) }),
      ...(filters.type && { type: filters.type }),
      ...(filters.startDate &&
        filters.endDate && {
          date: {
            gte: new Date(filters.startDate),
            lte: new Date(filters.endDate),
          },
        }),
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      description: true,
      amount: true,
      date: true,
      type: true,
      createdAt: true,
      account: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function findTransactionById(id, accountId, userId) {
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

  return prisma.transaction.findFirst({
    where: {
      id,
      accountId,
    },
    select: {
      id: true,
      description: true,
      amount: true,
      date: true,
      type: true,
      createdAt: true,
      account: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
