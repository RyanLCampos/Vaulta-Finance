import * as CategoryService from "./category.service.js";

export async function createCategory(req, res) {
  const { name, type } = req.body;
  const { accountId } = req.params;

  try {
    const category = await CategoryService.createCategory({
      name,
      type,
      accountId: Number(accountId),
      userId: req.userId,
    });

    return res.status(201).json(category);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export async function findAllCategories(req, res) {
  const { accountId } = req.params;

  try {
    const categories = await CategoryService.findAll(
      Number(accountId),
      req.userId,
    );

    return res.json(categories);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export async function findCategoryById(req, res) {
  const { accountId, id } = req.params;

  try {
    const category = await CategoryService.findById(
      Number(id),
      Number(accountId),
      req.userId,
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export async function updateCategory(req, res) {
  const { id, accountId } = req.params;
  const { name, type } = req.body;

  try {
    const updatedCategory = await CategoryService.updateCategory(
      Number(id),
      Number(accountId),
      req.userId,
      { name, type },
    );

    return res.json(updatedCategory);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(400).json({ message: err.message });
  }
}

export async function deleteCategory(req, res) {
  const { accountId, id } = req.params;

  try {
    await CategoryService.deleteCategory(
      Number(id),
      Number(accountId),
      req.userId,
    );

    return res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(400).json({ message: err.message });
  }
}
