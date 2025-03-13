import { TOrder, TUser } from './user.interface'
import { User } from './user.model'

const getUsersFromDB = async () => {
  const result = await User.find(
    {},
    { userName: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result
}

const getUserByIdFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId })
    return result
  } else {
    throw new Error("User doesn't exists!")
  }
}

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('User already exists!')
  }

  if (await User.isUserNameExists(user.username)) {
    throw new Error('Username already exists!')
  }

  const result = await User.create(user)
  return result
}

const updateUserByIdInDB = async (userId: number, payload: TUser) => {
  if (await User.isUserExists(userId)) {
    const updatedUser = await User.findOneAndUpdate({ userId }, payload)
    return updatedUser
  } else {
    throw new Error("User doesn't exists!")
  }
}

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId }, { isActive: false })
    return result
  } else {
    throw new Error("User doesn't exists!")
  }
}

const addProductToUserOrdersInDB = async (userId: number, product: TOrder) => {
  const result = await User.updateOne({ userId }, { orders: [product] }) // TODO: this won't be like this
  return result
}

const getUserOrdersFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }) // TODO
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
