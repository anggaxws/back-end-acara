import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET } from "./env";

// modifikasi data interface dari user untuk objek baru IUserToken
export interface IUserToken extends Omit< // Mengambil semua properti dari User KECUALI yang tidak disebut di bawah.
User, 
| "password" 
| "activationCode" 
| "isActive" 
| "email" 
| "fullName" 
| "profilePicture"
| "username"> {

   // Menambahkan properti 'id' ke payload (digunakan untuk identifikasi di database).
   id?: Types.ObjectId;

};


// Fungsi untuk membuat (menandatangani) token setelah login berhasil.
export const generateToken = (user: IUserToken): string => { // Inputnya adalah payload IUserToken.

   const token = jwt.sign(user, SECRET, { // Menandatangani payload dengan kunci rahasia.

      expiresIn: "1h", // Menentukan masa berlaku token (misalnya, 1 jam).
   });

   return token; // Mengembalikan string JWT yang sudah jadi.
   
};

// Fungsi untuk memverifikasi token dan mengambil data pengguna (payload).
export const getUserData = (token: string) => {

   // Memverifikasi token menggunakan kunci rahasia. Jika gagal/kedaluwarsa, ini akan melempar error.
   // Hasilnya di-assert sebagai IUserToken (payload yang bersih).
   const user = jwt.verify(token, SECRET) as IUserToken;

   return user;
};