import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import {
  findAllTransactions,
  findTransactionById,
  createTransaction,
} from "./transaction.controller.js";

const router = Router();

router.get("/", authMiddleware, findAllTransactions);
router.get("/:id", authMiddleware, findTransactionById);
router.post("/", authMiddleware, createTransaction);

export default router;
