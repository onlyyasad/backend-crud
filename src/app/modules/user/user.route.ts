import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

router.get('/', UserControllers.getUsers)
router.post('/', UserControllers.createUser)
router.get('/:userId', UserControllers.getUserById)
router.put('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)
router.put('/:userId/orders', UserControllers.addProductToUserOrders)
router.get('/:userId/orders', UserControllers.getUserOrders)
router.get(
  '/:userId/orders/total-price',
  UserControllers.getTotalPriceOfUserOrders,
)

export const UserRoutes = router
