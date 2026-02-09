import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { validateExpense } from "../middlewares/validate.middleware"; // Pastikan path ini benar

const expenseRouter = Router();

/**
 * @openapi
 * {
 * "/api/expenses": {
 * "get": {
 * "tags": ["Expenses"],
 * "summary": "Ambil Semua Data Pengeluaran (Paginasi)",
 * "security": [{ "bearerAuth": [] }],
 * "parameters": [
 * {
 * "in": "query",
 * "name": "page",
 * "schema": { "type": "integer", "default": 1 },
 * "description": "Halaman ke berapa"
 * },
 * {
 * "in": "query",
 * "name": "limit",
 * "schema": { "type": "integer", "default": 10 },
 * "description": "Jumlah data per halaman"
 * }
 * ],
 * "responses": {
 * "200": {
 * "description": "Berhasil mengambil data",
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "message": { "type": "string" },
 * "data": { "type": "array", "items": { "type": "object" } },
 * "meta": {
 * "type": "object",
 * "properties": {
 * "page": { "type": "integer" },
 * "limit": { "type": "integer" },
 * "totalData": { "type": "integer" },
 * "totalPages": { "type": "integer" }
 * }
 * }
 * }
 * }
 * }
 * }
 * },
 * "401": { "description": "Unauthorized (Token Salah)" }
 * }
 * },
 * "post": {
 * "tags": ["Expenses"],
 * "summary": "Tambah Pengeluaran Baru",
 * "security": [{ "bearerAuth": [] }],
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "required": ["title", "amount", "category"],
 * "properties": {
 * "title": { "type": "string", "example": "Makan Siang" },
 * "amount": { "type": "integer", "example": 25000 },
 * "category": { "type": "string", "example": "Food" }
 * }
 * }
 * }
 * }
 * },
 * "responses": {
 * "201": { "description": "Berhasil dibuat" },
 * "400": { "description": "Input tidak valid" }
 * }
 * }
 * },
 * "/api/expenses/{id}": {
 * "patch": {
 * "tags": ["Expenses"],
 * "summary": "Update Pengeluaran",
 * "security": [{ "bearerAuth": [] }],
 * "parameters": [
 * {
 * "in": "path",
 * "name": "id",
 * "required": true,
 * "schema": { "type": "integer" }
 * }
 * ],
 * "requestBody": {
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "properties": {
 * "title": { "type": "string" },
 * "amount": { "type": "integer" },
 * "category": { "type": "string" }
 * }
 * }
 * }
 * }
 * },
 * "responses": {
 * "200": { "description": "Berhasil diupdate" },
 * "404": { "description": "ID tidak ditemukan" }
 * }
 * },
 * "delete": {
 * "tags": ["Expenses"],
 * "summary": "Hapus Pengeluaran",
 * "security": [{ "bearerAuth": [] }],
 * "parameters": [
 * {
 * "in": "path",
 * "name": "id",
 * "required": true,
 * "schema": { "type": "integer" }
 * }
 * ],
 * "responses": {
 * "200": { "description": "Berhasil dihapus" },
 * "404": { "description": "ID tidak ditemukan" }
 * }
 * }
 * }
 * }
 */

// Route Implementations
expenseRouter.post("/", authenticateToken, validateExpense, createExpense);
expenseRouter.get("/", authenticateToken, getExpenses);
expenseRouter.patch("/:id", authenticateToken, updateExpense);
expenseRouter.delete("/:id", authenticateToken, deleteExpense);

export default expenseRouter;
