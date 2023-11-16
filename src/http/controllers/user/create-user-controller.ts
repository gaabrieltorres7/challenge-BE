import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUser } from '@/use-cases/user/factories/make-create-user'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function CreateUserController(req: Request, res: Response) {
  const registerBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  })
  try {
    const { name, email, password } = registerBodySchema.parse(req.body)
    const createUser = makeCreateUser()
    await createUser.execute({ name, email, password_hash: password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'User has been created successfully',
  })
}
