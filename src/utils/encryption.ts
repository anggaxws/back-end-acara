import crypto from "crypto";
import { SECRET } from "./env";

// Fungsi utama untuk mengenkripsi (hashing) password yang diberikan.
export const encrypt = (password: string): string => {

   const encrypted = crypto

      // 1. password: Password pengguna yang akan di-hash.
      // 2. SECRET: Kunci rahasia (salt) yang unik per server untuk mencegah serangan rainbow table.
      // 3. 1000: Jumlah iterasi hashing (cost factor). Nilai yang lebih tinggi lebih aman tapi lebih lambat.
      // 4. 64: Panjang output hash (64 byte).
      // 5. "sha512": Algoritma hashing yang digunakan.

      .pbkdf2Sync(password, SECRET, 1000, 64, "sha512")
      // Mengubah output buffer biner menjadi string heksadesimal yang dapat disimpan.
      .toString("hex");

   return encrypted;

}