import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Api not found!',
    error: '',
  })
}

export default notFound