import UserModel from "../models/user.model";
import { encrypt } from "./encryption";

const DEFAULT_FULL_NAME = process.env.DEFAULT_USER_FULL_NAME || "Demo User";
const DEFAULT_USERNAME = process.env.DEFAULT_USER_USERNAME || "anggaxws";
const DEFAULT_EMAIL = process.env.DEFAULT_USER_EMAIL || "anggaxws@example.com";
const DEFAULT_PASSWORD = process.env.DEFAULT_USER_PASSWORD || "1234";

export const ensureDefaultUser = async () => {
   const existing = await UserModel.findOne({
      $or: [
         { username: DEFAULT_USERNAME },
         { email: DEFAULT_EMAIL },
      ],
   });

   if (existing) {
      const hashedDefault = encrypt(DEFAULT_PASSWORD);

      if (existing.password !== hashedDefault || existing.username !== DEFAULT_USERNAME || existing.email !== DEFAULT_EMAIL) {
         existing.fullName = DEFAULT_FULL_NAME;
         existing.username = DEFAULT_USERNAME;
         existing.email = DEFAULT_EMAIL;
         existing.password = DEFAULT_PASSWORD;
         await existing.save();
      }

      return;
   }

   await UserModel.create({
      fullName: DEFAULT_FULL_NAME,
      username: DEFAULT_USERNAME,
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
   });
};
