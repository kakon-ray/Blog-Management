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
  
  router.get(
    '/:id',
    auth(USER_ROLE.user),
    BlogController.getSingleBlog,
  )
  

  router.delete(
    '/:id',
    auth(USER_ROLE.user),
    BlogController.deletetBlog,
  )
  
  router.get(
    '/',
    BlogController.getAllBlog,
  )


export const BlogRoutes = router