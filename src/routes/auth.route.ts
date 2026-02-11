import { Router, Response } from "express";
import { register, login } from "../controllers/auth.controller";
import { authenticateToken, AuthRequest } from "../middlewares/auth.middleware";
import { validateRegister } from "../middlewares/validation.middleware";

const authRouter = Router();

/**
 * @openapi
 * {
 * "/api/auth/register": {
 * "post": {
 * "tags": ["Auth"],
 * "summary": "Mendaftarkan user baru",
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "required": ["email", "password", "name"],
 * "properties": {
 * "name": { "type": "string", "default": "Ferry" },
 * "email": { "type": "string", "default": "user@example.com" },
 * "password": { "type": "string", "default": "password123" }
 * }
 * }
 * }
 * }
 * },
 * "responses": {
 * "201": { "description": "User berhasil didaftarkan" },
 * "400": { "description": "Email sudah terpakai" }
 * }
 * }
 * }
 * }
 */
authRouter.post("/register", register);

/**
 * @openapi
 * {
 * "/api/auth/login": {
 * "post": {
 * "tags": ["Auth"],
 * "summary": "Login user",
 * "requestBody": {
 * "required": true,
 * "content": {
 * "application/json": {
 * "schema": {
 * "type": "object",
 * "required": ["email", "password"],
 * "properties": {
 * "email": { "type": "string", "default": "user@example.com" },
 * "password": { "type": "string", "default": "password123" }
 * }
 * }
 * }
 * }
 * },
 * "responses": {
 * "200": { "description": "Login sukses, dapat token" },
 * "401": { "description": "Password salah" }
 * }
 * }
 * }
 * }
 */
authRouter.post("/login", login);

/**
 * @openapi
 * {
 * "/api/auth/profile": {
 * "get": {
 * "tags": ["Auth"],
 * "summary": "Cek Profile User (Butuh Token)",
 * "security": [{ "bearerAuth": [] }],
 * "responses": {
 * "200": { "description": "Berhasil masuk area rahasia" },
 * "401": { "description": "Token tidak valid" }
 * }
 * }
 * }
 * }
 */
authRouter.get(
  "/profile",
  authenticateToken,
  (req: AuthRequest, res: Response) => {
    res.json({
      message: "Hore! Kamu berhasil masuk area rahasia.",
      user_data: req.user,
    });
  },
);

export default authRouter;
