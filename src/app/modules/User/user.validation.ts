import { z } from 'zod'

// UserName Schema

// User Validation Schema
const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z
            .string()
            .email('Please enter a valid email')
            .min(1, 'Email is required'),

        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(10, 'Password must be at least 10 characters')
            .max(20, 'Password must not exceed 20 characters')
            .optional(),
    })

})

const loginValidationSchema = z.object({
    body: z.object({
        email: z
            .string()
            .email('Please enter a valid email')
            .min(1, 'Email is required'),

        password: z
            .string({
                required_error: 'Password is required',
                invalid_type_error: 'Password must be a string',
            })
            .min(10, 'Password must be at least 10 characters')
            .max(20, 'Password must not exceed 20 characters')
            .optional(),
    })

})

export const UserValidation = {
    createUserValidationSchema,
    loginValidationSchema
}