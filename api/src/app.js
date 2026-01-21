import express from "express";
import cors from "cors";

/* ROUTES */
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import accountRoutes from "./modules/accounts/account.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import transactionsRoutes from "./modules/transactions/transaction.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionsRoutes);

export default app;
