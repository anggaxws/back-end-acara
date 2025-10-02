import express from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router(); // Menginisialisasi fitur Router bawaan Express untuk mengelompokkan rute.

// Definisi endpoint publik (tidak memerlukan token otentikasi)

// Endpoint POST untuk pendaftaran pengguna baru.
// Meneruskan request ke fungsi register() di authController.
router.post("/register", authController.register);

// Endpoint POST untuk login pengguna.
// Meneruskan request ke fungsi login() di authController.
router.post("/login", authController.login);

// Definisi endpoint terproteksi (memerlukan token otentikasi)

// Endpoint GET untuk mengambil data profil pengguna yang sedang login.
// 1. authMiddleware: Dijalankan DULU untuk memverifikasi token JWT di header.
// 2. authController.me: Hanya dijalankan JIKA middleware berhasil dan token valid.
router.get("/me", authMiddleware, authController.me);



export default router;