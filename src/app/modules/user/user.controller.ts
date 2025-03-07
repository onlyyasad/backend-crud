import { Request, Response } from 'express'

const getUsers = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Users are retrieved successfully!',
  })
}

export const UserControllers = {
  getUsers,
}
