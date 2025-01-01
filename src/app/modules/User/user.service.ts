import config from "../../config";
import { User } from "./user.model";
import AppError from "../../errors/AppError ";
import { TUser } from "./user.interface";
import httpStatus from "http-status";
import { createToken } from "./user.utils";

const createUserIntoDB = async (userData: TUser) => {
  // find academic semester info

  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Email is already exists");
    }

    const newUser = await User.create(userData);

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User creation failed");
    }
    return newUser;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, err as string);
  }
};

const userLoginIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(
      400,
      "User does not exists                                                                                                                                                                   "
    );
  }

  if (user?.isBlocked == true) {
    throw new AppError(400, "The user is blocked");
  }

  // checking is password is matched
  const isPasswordMatchd = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatchd) {
    throw new AppError(404, "Password does not match");
  }

  const jsonPayload: { userId: string; role: "user" | "admin" } = {
    userId: user?._id.toString(),
    role: user?.role as "user" | "admin",
  };

  const accessToken = createToken(
    jsonPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresh_in as string
  );

  const refreshToken = createToken(
    jsonPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiresh_in as string
  );

  const role = user?.role;

  return {
    accessToken,
    refreshToken,
    role,
  };
};

const blockUserIntoDB = async (userId: string) => {
  const alreadyBlockUser = await User.findOne({ _id: userId, isBlocked: true });

  if (alreadyBlockUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Already Block this user");
  }

  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      isBlocked: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "User block failed");
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  userLoginIntoDB,
  blockUserIntoDB,
};
