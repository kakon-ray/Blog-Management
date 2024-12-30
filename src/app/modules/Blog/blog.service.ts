import { ObjectId } from 'mongoose';
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError '
import httpStatus from 'http-status'
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';



const createBlogIntoDB = async (payload: TBlog) => {
    // find academic semester info
    try {
        const result = await Blog.create(payload)

        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User creation failed')
        }
        return result

    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }
}

const updateBlogIntoDB = async (id: string, payload: TBlog) => {
    // find academic semester info
    try {
        const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
            new: true,
            runValidators: true,
        },)

        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Blog creation failed')
        }
        return result

    } catch (err) {
        throw new AppError(httpStatus.BAD_REQUEST, err as string)
    }
}

const getSingleBlogIntoDB = async (id: string) => {
    const result = await Blog.findOne({ _id: id }).populate('author');

    if (result) {
        return result
    } else {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog Item Not Found')
    }
}

const deleteBlogIntoDB = async (id: string) => {
    const isBlogExists = await Blog.findOne({ _id: id });
    if (!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blog Item Not Found')
    }
    const result = await Blog.findOneAndDelete({ _id: id });

    if (result) {
        return result
    } else {
        console.log('Blog not found')
    }
}

const getAllBlogIntoDB = async (query: Record<string, unknown>) => {
   const blogsQuery = new QueryBuilder(
        Blog.find()
          .populate('author'),
        query,
      )

      const result = await blogsQuery.modelQuery
      return result
}

export const BlogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getSingleBlogIntoDB,
    deleteBlogIntoDB,
    getAllBlogIntoDB
}