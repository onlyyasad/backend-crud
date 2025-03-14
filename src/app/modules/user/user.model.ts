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
import validator from 'validator'

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

const userSchema = new mongoose.Schema<TUser, IUserModel>(
  {
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
      validate: {
        validator: (value: string) => {
          return validator.isEmail(value)
        },
        message: '{VALUE} is not a valid email.',
      },
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
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        // removing mongodb default _v property from response
        delete ret.__v
        return ret
      },
    },
    toObject: {
      transform: function (doc, ret) {
        // removing mongodb default _v property from response
        delete ret.__v
        return ret
      },
    },
  },
)

/**
 * Checking if provided user already exists by its userId in db for the uniqueness
 */

userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne({ userId })
  return user
}

/**
 * Checking if provided email already exists in db for the uniqueness
 */

userSchema.statics.isUserNameExists = async function (username: string) {
  const user = await User.findOne({ username })
  return user
}

/**
 * Checking if orders property exists in a user data
 */

userSchema.statics.isOrdersExists = async function (userId: number) {
  const user = await User.findOne({ userId })
  return !!user?.orders
}

/**
 * Removing deleted user data
 */

userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: false } })
  next()
})

/**
 * Removing deleted user data
 */

userSchema.pre('findOne', function (next) {
  this.find({ isActive: { $ne: false } })
  next()
})

/**
 * Removing deleted user data so that deleted user data can't be update
 */

userSchema.pre('updateOne', function (next) {
  this.find({ isActive: { $ne: false } })
  next()
})

/**
 * Removing deleted user data before calculation
 */

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isActive: { $ne: false } } })
  next()
})

/**
 * Hashing password before saving to db
 */

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
