import { Router } from "express";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.get('/', );
router.post('/', authMiddleware, createTransaction);