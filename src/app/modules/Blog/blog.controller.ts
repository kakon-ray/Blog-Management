import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import { string } from "zod";

const createBlog = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const blog = req.body;
  blog.author = userId;

  const result = await BlogServices.createBlogIntoDB(req.body);

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Blog Created Successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const blog = req.body;
  blog.author = userId;
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDB(id, req.body);

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogIntoDB(id);

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Get Blog Item Successfully",
    data: result,
  });
});

const deletetBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlogIntoDB(id);

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blog deleted successfully",
    data: {},
  });
});

const getAllBlog = catchAsync(async (req, res, next) => {
  const result = await BlogServices.getAllBlogIntoDB(req.query);

  // utility response function
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  getSingleBlog,
  deletetBlog,
  getAllBlog,
};
