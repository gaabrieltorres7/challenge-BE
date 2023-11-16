import {
  ConfirmUserLoginController,
  CreateUserController,
  LoginUserController,
} from '@/http/controllers/user'
import { Authentication } from '@/http/middlewares/auth'
import { Router } from 'express'

export const router = Router()

router.post('/create', (req, res) => CreateUserController(req, res))
router.post('/login', (req, res) => LoginUserController(req, res))
router.get('/confirm', (req, res) => ConfirmUserLoginController(req, res))

router.use(Authentication)

router.get('/test', (req, res) => {
  return res.status(200).json({ message: 'Authenticated' })
})

export default router
