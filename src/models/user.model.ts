import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";


// Interface ini mendefinisikan struktur objek User
export interface User {

   fullName: string;

   username: string;

   email: string;

   password: string;

   role: string;

   profilePicture: string;

   isActive: boolean;

   activationCode: string;

}

const Schema = mongoose.Schema; // Alias untuk mempermudah penulisan Mongoose Schema.

// Mendefinisikan Schema Mongoose, yang memetakan interface User ke koleksi MongoDB.
const UserSchema = new Schema<User>({

   fullName: {

      type: Schema.Types.String,
      required: true,

   },

   username: {

      type: Schema.Types.String,
      required: true,

   },

   email: {

      type: Schema.Types.String,
      required: true,

   },

   password: {

      type: Schema.Types.String,
      required: true,

   },

   role: {

      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",

   },

   profilePicture: {

      type: Schema.Types.String,
      default: "user.jpg",

   },

   isActive: {

      type: Schema.Types.Boolean,
      default: false,
   },

   activationCode: {

      type: Schema.Types.String,

   },
}, {

   timestamps: true, // Opsi untuk menambahkan field 'createdAt' dan 'updatedAt' secara otomatis.

});

// Middleware Mongoose: Dijalankan SEBELUM (pre) dokumen disimpan (save) untuk melakukan enkripsi 
UserSchema.pre("save", function (next) {

   const user = this;
   user.password = encrypt(user.password);
   next(); // Wajib dipanggil untuk melanjutkan proses penyimpanan.

});


// Delete the password when being requested
UserSchema.methods.toJSON = function () {

   const user = this.toObject(); // Mengkonversi dokumen Mongoose menjadi objek JavaScript biasa.

   delete user.password; // Menghapus properti password dari objek yang akan dikirim ke klien.

   return user; // Mengembalikan objek tanpa password.
}

// Membuat Model Mongoose (objek yang digunakan controller untuk berinteraksi dengan koleksi 'User').
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;