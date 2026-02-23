import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import {
  findAllTransactions,
  findTransactionById,
  createTransaction,
} from "./transaction.controller.js";

const router = Router({ mergeParams: true });

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, findAllTransactions);
router.get("/:id", authMiddleware, findTransactionById);

export default router;