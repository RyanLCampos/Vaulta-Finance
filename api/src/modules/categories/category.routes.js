import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import {
  createCategory,
  deleteCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
} from "./category.controller.js";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createCategory);
router.get("/", authMiddleware, findAllCategories);
router.get("/:id", authMiddleware, findCategoryById);
router.patch("/:id", authMiddleware, updateCategory);
router.delete("/:id", authMiddleware, deleteCategory);

export default router;