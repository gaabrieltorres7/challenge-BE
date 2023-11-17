import { PrismaClientRepository } from '@/repositories/client/prisma/prisma-client-repository'
import { makeUpdateClient } from '@/use-cases/client/factories/make-update-client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateClientController(req: Request, res: Response) {
  const updateBodySchema = z.object({
    full_name: z.string().min(3).optional(),
    contact: z.string().email().optional(),
    address: z.string().min(4).optional(),
  })

  const { id } = req.params
  const user_id = req.user.id

  try {
    const data = updateBodySchema.parse(req.body)

    const prisma = new PrismaClient()
    const clientRepo = new PrismaClientRepository(prisma)
    const clientExists = await clientRepo.findByUserId(user_id)

    if (req.user.type === 'CLIENT' && clientExists?.user_id !== user_id) {
      return res
        .status(401)
        .json({ message: 'You can only edit your own data' })
    }

    const updateClientUseCase = makeUpdateClient()
    const client = await updateClientUseCase.execute(id, data)

    return res.status(200).json(client)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).json({ error })
  }
}
