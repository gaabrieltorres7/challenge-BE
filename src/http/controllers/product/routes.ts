import {
  CreateProductController,
  DeleteProductController,
  GetProductController,
  GetProductsController,
  UpdateProductController,
} from '@/http/controllers/product'
import { Authentication } from '@/http/middlewares/auth'
import { checkPermission } from '@/http/middlewares/check-permission'
import { Router } from 'express'

export const router = Router()

router.use(Authentication)

router.get('/', (req, res) => GetProductsController(req, res))

router.use(checkPermission(['ADMIN']))

router.post('/create', (req, res) => CreateProductController(req, res))
router.get('/:id', (req, res) => GetProductController(req, res))
router.put('/update/:id', (req, res) => UpdateProductController(req, res))
router.delete('/delete/:id', (req, res) => DeleteProductController(req, res))

export default router
