import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
    {
        title: { type: String, required: [true, "Title is required"] },
        content: { type: String, required: [true, "Description is required"] },
        author: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User',
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Blog = model<TBlog>('Blog', blogSchema)