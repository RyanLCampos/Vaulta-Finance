import { Router } from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserById,
  updateUser,
} from "./user.controller.js";

/* AUTHENTICATION MIDDLEWARE */
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/", createUser);
router.get("/", authMiddleware, findAllUsers);
router.get("/:id", authMiddleware, findUserById);
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
