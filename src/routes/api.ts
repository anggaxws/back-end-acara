import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router(); // Menginisialisasi fitur Router bawaan Express untuk mengelompokkan rute.

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.me);

router.post("/auth/activation", authController.activation);


export default router;
