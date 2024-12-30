import { ObjectId } from 'mongoose';
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError '
import httpStatus from 'http-status'
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';



const createBlogIntoDB = async (payload: TBlog) => {
    // find academic semester info
    try {
        const blog = await Blog.create(payload)

        if (!blog) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User creation failed')
        }
        return blog

    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }
}

const updateBlogIntoDB = async (payload: TBlog) => {
    // find academic semester info
    try {
        const blog = await Blog.create(payload)

        if (!blog) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User creation failed')
        }
        return blog

    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }
}

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB
}