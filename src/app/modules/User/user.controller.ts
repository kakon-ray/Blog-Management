import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import config from "../../config";

const createUser = catchAsync(async (req, res) => {
  const student = req.body;
  student.role = "user";
  const result = await UserServices.createUserIntoDB(student);
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User Created Successfully",
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.userLoginIntoDB(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Login Successfully",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// Admin role working
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.blockUserIntoDB(userId);

  // utility response function
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User Block Successfully",
      data: {},
    });
  }
});

export const UserController = {
  createUser,
  loginUser,
  blockUser,
};
