import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";

// Import Validator
import { validate } from "../middlewares/validate.middleware";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "../schemas/expense.schema";

const expenseRouter = Router();

// Pasang validate(createExpenseSchema) SEBELUM controller
expenseRouter.post(
  "/",
  authenticateToken,
  validate(createExpenseSchema),
  createExpense,
);

expenseRouter.get("/", authenticateToken, getExpenses);

// Pasang validate(updateExpenseSchema)
expenseRouter.patch(
  "/:id",
  authenticateToken,
  validate(updateExpenseSchema),
  updateExpense,
);

expenseRouter.delete("/:id", authenticateToken, deleteExpense);

export default expenseRouter;
