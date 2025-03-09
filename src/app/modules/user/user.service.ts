import { User } from './user.model'

const getUsersFromDB = async () => {
  const result = await User.find()
  return result
}

export const userServices = {
  getUsersFromDB,
}
