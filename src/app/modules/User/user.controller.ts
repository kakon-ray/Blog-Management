import express, { RequestHandler } from 'express'
import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import config from '../../config'

const createUser = catchAsync(async (req, res, next) => {
  const student = req.body
  student.role = 'user'
  const result = await UserServices.createUserIntoDB(student)
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User Created Successfully',
    data: {
        _id:result._id,
        name:result.name,
        email:result.email,
    },
  })
})

const loginUser = catchAsync(async (req, res, next) => {

  const result = await UserServices.userLoginIntoDB(req.body)
  const {accessToken, refreshToken} = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });
 
  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User Login Successfully',
    data: result
  })
})



export const UserController = {
  createUser,
  loginUser
}