import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  password: String,
  fullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: {
    productName: String,
    price: String,
    quantity: Number,
  },
})

export const User = mongoose.model('User', userSchema)
