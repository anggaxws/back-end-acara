import { NextFunction } from "express";
import { getUserData, IUserToken } from "../utils/jwt";
import { Request, Response } from "express";

// Interface kustom yang memperluas Request Express.
export interface IReqUser extends Request {
   // Menambahkan properti 'user' (payload token yang terverifikasi) ke objek request.
   user?: IUserToken;
}


// Middleware otentikasi default yang akan dijalankan pada setiap request terproteksi.
export default (req: Request, res: Response, next: NextFunction) => {

   // Mencoba mengambil nilai dari header 'Authorization'.
   const authorization = req.headers?.authorization;

   // Langkah 1: Cek Header
   if (!authorization) {

      return res.status(403).json({

         message: "unauthorized",
         data: null,

      });
   };

   const [prefix, token] = authorization.split(" ");

   // Langkah 2: Cek Format Bearer
   if (!(prefix === "Bearer" && token)) {

      return res.status(403).json({

         message: "unauthorized",
         data: null,

      });
   };

   // Langkah 3: Verifikasi Token
   // Memverifikasi token JWT; akan mengembalikan payload atau gagal.
   const user = getUserData(token);

   if (!user) {

      return res.status(403).json({

         message: "unauthorized",
         data: null,

      });
   }

   // Langkah 4: Injeksi Data
   // Menyuntikkan payload pengguna yang sudah diverifikasi ke objek request untuk controller.
   // Menggunakan 'as IReqUser' untuk memberitahu TypeScript bahwa properti 'user' sekarang ada.
   (req as IReqUser).user = user;

   // Langkah 5: Lanjutkan
   next(); // Token valid, request diteruskan ke handler rute (controller) berikutnya.
};