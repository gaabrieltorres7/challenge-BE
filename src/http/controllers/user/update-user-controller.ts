import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUser } from '@/use-cases/user/factories/make-update-user'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateUserController(req: Request, res: Response) {
  const updateBodySchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    type: z.enum(['ADMIN', 'CLIENT']).optional(),
  })

  const { id } = req.params

  try {
    const data = updateBodySchema.parse(req.body)
    const updateUserUseCase = makeUpdateUser()
    const user = await updateUserUseCase.execute(id, data)

    return res.status(200).json(user)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).json({ error })
  }
}
