import prisma from "../../shared/database/prisma.js";

export async function createCategory({ name, type, userId }) {
  if (!name || !type) {
    throw new Error("Name and type are required");
  }

  return prisma.category.create({
    data: {
      name,
      type,
      userId,
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

export async function findAll(userId) {
  return prisma.category.findMany({
    where: {
      userId,
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

export async function findById(id, userId) {
  return prisma.category.findFirst({
    where: {
      id,
      userId,
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

export async function updateCategory(id, userId, data) {
  return prisma.category.update({
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
      updatedAt: true,
    },
  });
}

export async function deleteCategory(id, userId) {
  return prisma.category.update({
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
