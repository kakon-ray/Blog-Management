import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import config from '../config'
import mongoose, { Mongoose } from 'mongoose'
import { handleCastError } from '../errors/handleCastError'
import { handleDuplicateError } from '../errors/handleDuplicateError'
import { TErrorSources } from '../interface/error'
import { handleZodError } from '../errors/handleZodError'
import { handleValidationError } from '../errors/handleValidationError'
import AppError from '../errors/AppError '

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = 500
  let message = 'An unexpected error occurred!'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSource
  } else if (err?.name == 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSource
  } else if (err?.name == 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSource
  } else if (err?.code == 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSource
  } else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  // console.error(err)
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  })
}

export default globalErrorHandler