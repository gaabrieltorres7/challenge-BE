import { Authentication } from '@/http/middlewares/auth'
// import { checkPermission } from '@/http/middlewares/check-permission'
import { Router } from 'express'
import { CreateOrderController } from './create-order-controller'
import { DeleteOrderController } from './delete-order-controller'
import { GetOrderController } from './get-order-controller'
import { GetOrdersController } from './get-orders-controller'
import { UpdateOrderController } from './update-order-controller'

export const router = Router()

router.use(Authentication)

router.post('/create', (req, res) => CreateOrderController(req, res))

// router.use(checkPermission(['ADMIN']))

router.put('/update/:id', (req, res) => UpdateOrderController(req, res))
router.get('/', (req, res) => GetOrdersController(req, res))
router.get('/:id', (req, res) => GetOrderController(req, res))
router.delete('/delete/:id', (req, res) => DeleteOrderController(req, res))

export default router
