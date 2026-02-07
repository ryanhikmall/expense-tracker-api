import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import {
  createExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller";

const expenseRouter = Router();

// POST /api/expenses
// Satpam jaga di depan, baru boleh masuk ke createExpense
expenseRouter.post("/", authenticateToken, createExpense);
expenseRouter.get("/", authenticateToken, getExpenses);

expenseRouter.patch("/:id", authenticateToken, updateExpense);

export default expenseRouter;
