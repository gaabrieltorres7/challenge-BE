import { Authentication } from '@/http/middlewares/auth'
import { checkPermission } from '@/http/middlewares/check-permission'
import { Router } from 'express'
import { CreateOrderItemController } from './create-order-item-controller'
import { DeleteOrderItemController } from './delete-order-item-controller'
import { GetOrderItemController } from './get-order-item-controller'
import { GetOrdersItemController } from './get-orders-item-controller'
import { UpdateOrderItemController } from './update-order-item-controller'

export const router = Router()

router.use(Authentication)

router.post('/create', (req, res) => CreateOrderItemController(req, res))

router.use(checkPermission(['ADMIN']))

router.put('/update/:id', (req, res) => UpdateOrderItemController(req, res))
router.get('/', (req, res) => GetOrdersItemController(req, res))
router.get('/:id', (req, res) => GetOrderItemController(req, res))
router.delete('/delete/:id', (req, res) => DeleteOrderItemController(req, res))

export default router
