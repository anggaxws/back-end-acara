import express from "express";
import authController from "../controllers/auth.controller";
const router = express.Router(); // Disini kita pakai fitur Router dari express

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;