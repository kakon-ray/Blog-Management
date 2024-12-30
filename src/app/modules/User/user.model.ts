import { TUser, UserModel } from "./user.interface";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    role: { type: String, enum: ["user", "admin"] },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// ================== pre save middleware hashing password =============

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt));
  next();
});

// =================== is user exists by custome id ====================
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ _id: id });
};

// ==================== is password matched =======================

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
