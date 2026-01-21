import * as CategoryService from "./category.service.js";

export async function createCategory(req, res) {
  const { name, type } = req.body;

  try {
    const category = await CategoryService.createCategory({
      name,
      type,
      userId: req.userId,
    });

    return res.status(201).json(category);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export async function findAllCategories(req, res) {
  try {
    const categories = await CategoryService.findAll(req.userId);

    return res.json(categories);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function findCategoryById(req, res) {
  const { id } = req.params;

  try {
    const category = await CategoryService.findById(Number(id));

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(category);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const { name, type } = req.body;

  try {
    const updatedCategory = await CategoryService.updateCategory(
      Number(id),
      req.userId,
      { name, type },
    );

    return res.json(updatedCategory);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const deletedCategory = await CategoryService.deleteCategory(
      Number(id),
      req.userId,
    );

    return res.status(204).json(deletedCategory);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(500).json({ message: "Internal error" });
  }
}
