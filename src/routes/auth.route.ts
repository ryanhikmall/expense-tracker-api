import { Router } from "express";
// Import HARUS sama persis dengan nama di controller ('register' & 'login')
import { register, login } from "../controllers/auth.controller";

const authRouter = Router();

// Pastikan variabel 'register' warnanya nyala (tidak pudar)
authRouter.post("/register", register);

// Pastikan variabel 'login' warnanya nyala
authRouter.post("/login", login);

export default authRouter;
