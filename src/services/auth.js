import UserCollection from "../db/models/User.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export const register = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, "Email in use");
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UserCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
