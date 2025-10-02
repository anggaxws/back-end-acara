import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

// Fungsi asinkron untuk mencoba membuat koneksi ke database MongoDB.
const connect = async () => {

   try {
      
      await mongoose.connect(DATABASE_URL, {

         dbName: "db-acara",

      });
      // Jika koneksi berhasil, mengembalikan Promise yang berhasil diselesaikan dengan pesan.
      return Promise.resolve("Database connected!")

   } catch (error) {
      // Jika terjadi kesalahan koneksi, mengembalikan Promise yang gagal (rejected) dengan objek error.
      return Promise.reject(error);
   }
};

export default connect;