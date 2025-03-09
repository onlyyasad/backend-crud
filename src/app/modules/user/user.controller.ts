import { Request, Response } from 'express'
import { userServices } from './user.service'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully!',
      data: users,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

export const UserControllers = {
  getUsers,
}
