import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlware/validateRequest'
import { BlogValidation } from './blog.validation'
import { BlogController } from './blog.controller'
import auth from '../../middlware/auth'
import { USER_ROLE } from '../User/user.contant'



const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
)


router.patch(
    '/:id',
    auth(USER_ROLE.user),
    validateRequest(BlogValidation.updateBlogValidationSchema),
    BlogController.updateBlog,
  )
  

export const BlogRoutes = router