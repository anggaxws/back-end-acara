// File ini akan menjadi entry poin aplikasi backend ini
 
import express from "express"; // Konfigurasi servernya
import bodyParser from "body-parser";
import router from "./routes/api";
import db from "./utils/database";

// Fungsi utama asinkron untuk inisialisasi server.
async function init() {
   try {

      // Menunggu (await) koneksi ke database hingga berhasil terhubung.
      const result = await db();

      console.log("Database status: ", result);

      const app = express(); // Membuat instance aplikasi Express.

      app.use(bodyParser.json()); // Middleware: Mengizinkan Express membaca dan mengubah body permintaan JSON ke req.body.

      const PORT = 3000;

      app.get("/", (req, res) => {

         res.status(200).json({

            message: "Server is running.",
            data: null,

         });
      });

      app.use('/api/auth', router); // Baris ini menghubungkan semua endpoint yang didefinisikan dalam file router

      app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
      });

   } catch (error) {
     console.log(error);
   }
}

// Memanggil fungsi inisialisasi untuk menjalankan seluruh aplikasi.
init();




