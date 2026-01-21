import prisma from "../../shared/database/prisma.js";

export async function create(
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

  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
      userId,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      userId,
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
        amount,
        type,
        date,
        userId,
        accountId,
        categoryId,
      },
    });

    const balanceChange = type === "INCOME" ? amount : amount.mul(-1);

    await tx.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: balanceChange,
        },
      },
    });

    return transaction;
  });
}
