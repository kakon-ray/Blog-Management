
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BlogServices } from './blog.service'

const createBlog = catchAsync(async (req, res, next) => {
    const { userId } = req.user
    const blog = req.body;
    blog.author = userId

    
    const result = await BlogServices.createBlogIntoDB(req.body)

    // utility response function
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Blog Created Successfully',
        data: result,
    })
})

const updateBlog = catchAsync(async (req, res, next) => {
    const { userId } = req.user
    const blog = req.body;
    blog.author = userId

    const result = await BlogServices.updateBlogIntoDB(req.body)

    // utility response function
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Blog Created Successfully',
        data: result,
    })
})



export const BlogController = {
    createBlog,
    updateBlog
}