import mongoose from 'mongoose'
import {
  IUserModel,
  TAddress,
  TFullName,
  TOrder,
  TUser,
} from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const fullNameSchema = new mongoose.Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})

const addressSchema = new mongoose.Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
  },
})

const ordersSchema = new mongoose.Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
  },
})

const userSchema = new mongoose.Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    required: [true, 'User id is required.'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username is Required'],
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required.'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required.'],
  },
  orders: {
    type: [ordersSchema],
    default: undefined,
  },
})

userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne({ userId })
  return user
}

userSchema.statics.isUserNameExists = async function (username: string) {
  const user = await User.findOne({ username })
  return user
}

userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: false } })
  next()
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

/**
 * Always remove password field with any response
 */

userSchema.methods.toJSON = function () {
  const userObject = this.toObject()

  delete userObject.password

  return userObject
}

export const User = mongoose.model<TUser, IUserModel>('User', userSchema)
