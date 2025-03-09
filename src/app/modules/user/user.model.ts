import mongoose from 'mongoose'

const fullNameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})

const addressSchema = new mongoose.Schema({
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

const ordersSchema = new mongoose.Schema({
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

const userSchema = new mongoose.Schema({
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
  orders: ordersSchema,
})

export const User = mongoose.model('User', userSchema)
