import { z } from 'zod'

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
})

const addressValidationSchema = z.object({
  street: z.string().min(1, 'Street is required.'),
  city: z.string().min(1, 'City is required.'),
  country: z.string().min(1, 'Country is required.'),
})

const ordersValidationSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  price: z.number().min(0, 'Price is required and must be non-negative.'),
  quantity: z.number().min(1, 'Quantity is required and must be at least 1.'),
})

const userValidationSchema = z.object({
  userId: z
    .number()
    .int()
    .min(1, 'User ID is required and must be a positive integer.'),
  username: z.string().min(1, 'Username is required.'),
  password: z.string().min(6, 'Password is required.'),
  fullName: fullNameValidationSchema,
  age: z
    .number()
    .int()
    .min(0, 'Age is required and must be a non-negative integer.'),
  email: z.string().email('Invalid email format.'),
  isActive: z.boolean().default(true),
  hobbies: z
    .array(z.string().min(1, 'Hobby cannot be empty.'))
    .min(1, 'Hobbies are required.'),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
})

export default userValidationSchema
