import {
  ConfirmUserLoginController,
  CreateUserController,
  DeleteUserController,
  GetUserController,
  GetUsersController,
  LoginUserController,
  UpdateUserController,
} from '@/http/controllers/user'
import { Authentication } from '@/http/middlewares/auth'
import { checkPermission } from '@/http/middlewares/check-permission'
import { Router } from 'express'

export const router = Router()

router.post('/login', (req, res) => LoginUserController(req, res))
router.get('/confirm', (req, res) => ConfirmUserLoginController(req, res))

router.use(Authentication)

router.post('/create', (req, res) => CreateUserController(req, res))
router.put('/update/:id', (req, res) => UpdateUserController(req, res))

router.use(checkPermission(['ADMIN']))

router.get('/', (req, res) => GetUsersController(req, res))
router.get('/:id', (req, res) => GetUserController(req, res))
router.delete('/delete/:id', (req, res) => DeleteUserController(req, res))

export default router
