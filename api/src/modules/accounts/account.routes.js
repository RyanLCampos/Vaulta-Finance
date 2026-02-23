import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import {
  createAccount,
  deleteAccount,
  findAccountById,
  findAllAccounts,
  updateAccount,
} from "./account.controller.js";

import categoryRoutes from "../categories/category.routes.js";
import transactionRoutes from "../transactions/transaction.routes.js";

const router = Router();

router.post("/", authMiddleware, createAccount);
router.get("/", authMiddleware, findAllAccounts);
router.get("/:id", authMiddleware, findAccountById);
router.patch("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

router.use("/:accountId/categories", categoryRoutes);
router.use("/:accountId/transactions", transactionRoutes);

export default router;
