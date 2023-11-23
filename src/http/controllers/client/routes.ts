import {
  CreateClientController,
  DeleteClientController,
  GetClientController,
  GetClientsController,
  UpdateClientController,
} from '@/http/controllers/client'
import { Authentication } from '@/http/middlewares/auth'
import { checkPermission } from '@/http/middlewares/check-permission'
import { Router } from 'express'

export const router = Router()

router.use(Authentication)

router.post('/create', (req, res) => CreateClientController(req, res))
router.put('/update/:id', (req, res) => UpdateClientController(req, res))

router.use(checkPermission(['ADMIN']))

router.get('/', (req, res) => GetClientsController(req, res))
router.get('/:id', (req, res) => GetClientController(req, res))
router.delete('/delete/:id', (req, res) => DeleteClientController(req, res))

export default router
