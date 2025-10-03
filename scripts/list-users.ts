import mongoose from "mongoose";
import connect from "../src/utils/database";
import UserModel from "../src/models/user.model";

(async () => {
   try {
      await connect();

      const users = await UserModel.find({}).lean();
      console.log(users);
   } catch (error) {
      console.error(error);
   } finally {
      await mongoose.disconnect();
   }
})();
