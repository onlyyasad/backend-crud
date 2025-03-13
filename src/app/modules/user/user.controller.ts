import { Request, Response } from 'express'
import { userServices } from './user.service'
import userValidationSchema from './user.validation'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
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
      message: 'User fetched successfully!',
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
    const parsedUser = userValidationSchema.parse(user)

    const userResponse = await userServices.createUserIntoDB(parsedUser)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userResponse,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error,
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

    await userServices.deleteUserFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: null,
    })
  }
}

const addProductToUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const product = req.body

    const result = await userServices.addProductToUserOrdersInDB(
      Number(userId),
      product,
    )

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
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
      message: 'Order fetched successfully!',
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
      message: 'Total price calculated successfully!',
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
