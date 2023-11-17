import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeLoginUser } from '@/use-cases/user/factories/make-login-user'
import EmailService from '@/utils/transporter-email'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export async function LoginUserController(req: Request, res: Response) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = loginBodySchema.parse(req.body)
    const loginUserUseCase = makeLoginUser()
    const emailService = new EmailService()

    const userLogin = await loginUserUseCase.execute({ email, password })

    const token = jwt.sign(
      { id: userLogin.id, email: userLogin.email, type: userLogin.type },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1d' },
    )

    if (!userLogin.is_confirmed) {
      await emailService.sendConfirmationEmail(userLogin.email, token)

      return res.status(401).json({
        message:
          'Email not confirmed. Please check your email for confirmation instructions.',
      })
    }

    const { password_hash: _, ...userWithoutPassword } = userLogin

    return res.status(200).json({
      message: 'User logged in successfully',
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    console.log(error)
    return res.status(500).send()
  }
}
