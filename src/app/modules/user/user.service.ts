import { TOrder, TUser } from './user.interface'
import { User } from './user.model'

const getUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getUserByIdFromDB = async (userId: number) => {
  const result = await User.findOne({ userId })
  return result
}

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user)
  return result
}

const updateUserByIdInDB = async (userId: number, user: TUser) => {
  const result = await User.updateOne({ userId }, user)
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isActive: false })
  return result
}

const addProductToUserOrdersInDB = async (userId: number, product: TOrder) => {
  const result = await User.updateOne({ userId }, { orders: [product] }) // TODO: this won't be like this
  return result
}

const getUserOrdersFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }) // TODO:
  return result
}

const getTotalPriceOfUserOrdersFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }) // TODO
  return result
}

export const userServices = {
  getUsersFromDB,
  createUserIntoDB,
  getUserByIdFromDB,
  updateUserByIdInDB,
  deleteUserFromDB,
  addProductToUserOrdersInDB,
  getUserOrdersFromDB,
  getTotalPriceOfUserOrdersFromDB,
}
