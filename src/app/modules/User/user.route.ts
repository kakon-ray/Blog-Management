import express, { NextFunction, Request, Response } from 'express'
import { AnyZodObject, Schema } from 'zod'
import validateRequest from '../../middlware/validateRequest'
import auth from '../../middlware/auth'
import { USER_ROLE } from './user.contant'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'


const router = express.Router()

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser,
)

router.post(
    '/login',
    validateRequest(UserValidation.loginValidationSchema),
    UserController.loginUser,
  )

// This route work only admin 

router.patch(
  '/users/:userId/block',
  UserController.blockUser,
)

export const UserRoutes = router