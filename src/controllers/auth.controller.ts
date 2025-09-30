import { Request, Response } from "express";
import * as Yup from "yup";
import UserModel from "../models/user.model";
import { encrypt } from "../utils/encryption";

// agar semua data struktur ada type datanya maka harus di declare type nya
type TRegister = {
   fullName: string;

   username: string;
   
   email: string;

   password: string;

   confirmPassword: string;
};

type TLogin = {

   identifier: string;

   password: string;
}


// Disini semua input dari user akan divalidasi persamaannya
const registerValidateSchema = Yup.object({

   fullName: Yup.string().required(),

   username: Yup.string().required(),
   
   email: Yup.string().email().required(),
   
   password: Yup.string().required(),

   confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), ""], "Password not match!"),

})


export default {
   async register(req: Request, res: Response) { 

      const { fullName, username, email, password, confirmPassword } = 

         req.body as unknown as TRegister;      // semua properti dari 'req.body' akan divalidasi oleh registerValidatetSchema

      try {
         
         await registerValidateSchema.validate({ // Mengembalikan nilai dengan type data promise == await => async in register

         fullName,

         username,

         email,

         password,

         confirmPassword,

      });

      const result = await UserModel.create({

         fullName,

         email,

         username,

         password,

      });

      res.status(200).json({

         message: "Success registration!",

         data: result,

      });

      } catch (error) {

         const err = error as unknown as Error;

         res.status(400).json({

            message: err.message,

            data: null,

         });
         
      };
   },

   async login(req: Request, res: Response) {

      const {

         identifier,

         password,

      } = req.body as unknown as TLogin;

      try {
         // ambil data user berdasarkan "identifier" => email dan username

         const userByIdentifier = await UserModel.findOne({ // menggunakan findone agar hasilnya satu objek saja

            $or: [ // filter menggunakan dua data
               {

                  email: identifier,

               },

               {

                  username: identifier,

               },
            ],
         });

         if (!userByIdentifier) {

            return res.status(403).json({

               message: "user not found",
               data: null,
               
            });
         }
         // validasi password / apakah sama dengan apa yang ada di database?

         const validatePassword: boolean = encrypt(password) === userByIdentifier.password;

         if (!validatePassword) {

            return res.status(403).json({

               message: "user not found",

               data: null,
            });
         }


         res.status(200).json({

            message: "Login success",

            data: userByIdentifier,
         });


      } catch (error) {
         
         const err = error as unknown as Error;

         res.status(400).json({

            message: err.message,

            data: null,

         });

      }
   }
};