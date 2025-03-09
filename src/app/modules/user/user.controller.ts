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

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userResponse = await userServices.getUserByIdFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully!',
      data: userResponse,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const userResponse = await userServices.createUserIntoDB(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userResponse,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const { userId } = req.params

    const userResponse = await userServices.updateUserByIdInDB(
      Number(userId),
      payload,
    )

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: userResponse,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const userResponse = await userServices.deleteUserFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: userResponse,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const addProductToUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const product = req.body

    const response = await userServices.addProductToUserOrdersInDB(
      Number(userId),
      product,
    )

    res.status(200).json({
      success: true,
      message: 'Order added successfully!',
      data: response,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const orders = await userServices.getUserOrdersFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'Orders are retrieved successfully!',
      data: orders,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
    })
  }
}

const getTotalPriceOfUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const response = await userServices.getTotalPriceOfUserOrdersFromDB(
      Number(userId),
    )

    res.status(200).json({
      success: true,
      message: 'Orders total is retrieved successfully!',
      data: response,
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
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addProductToUserOrders,
  getUserOrders,
  getTotalPriceOfUserOrders,
}
