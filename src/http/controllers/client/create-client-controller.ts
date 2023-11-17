import { makeCreateClient } from '@/use-cases/client/factories/make-create-client'
import { UserAlreadyAssociatedError } from '@/use-cases/errors/user-already-associated-error'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function CreateClientController(req: Request, res: Response) {
  const createClientBodySchema = z.object({
    full_name: z.string().min(3),
    contact: z.string().email(),
    address: z.string().min(4),
  })

  const user_id = req.user.id

  try {
    const { full_name, contact, address } = createClientBodySchema.parse(
      req.body,
    )
    const createUser = makeCreateClient()
    await createUser.execute({ user_id, full_name, contact, address })
  } catch (error) {
    if (error instanceof UserAlreadyAssociatedError) {
      return res.status(409).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'Client has been created successfully',
  })
}
