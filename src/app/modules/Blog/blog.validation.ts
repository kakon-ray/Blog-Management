import { z } from 'zod'

// UserName Schema

// User Validation Schema
const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
        isPublished:z.boolean().optional()
    })

})
const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        isPublished:z.boolean().optional()
    })

})


export const BlogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}