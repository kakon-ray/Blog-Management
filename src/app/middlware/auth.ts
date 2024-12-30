import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TuserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import AppError from "../errors/AppError ";

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking is if the token not provide
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    // checking if the user not found
    if (!user) {
      throw new AppError(
        400,
        "User does not exists                                                                                                                                                                   "
      );
    }

    // checking if the user is blocked
    if (user?.isBlocked == true) {
      throw new AppError(400, "The user is blocked");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not outhorized from this role"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
