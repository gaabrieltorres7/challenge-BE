import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateOrder } from '@/use-cases/order/factories/make-update-order'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateOrderController(req: Request, res: Response) {
  const updateBodySchema = z.object({
    total: z
      .custom((value: any) => {
        try {
          const prismaDecimal = new Prisma.Decimal(value)
          return prismaDecimal
        } catch (error) {
          throw new Error('Invalid Decimal format')
        }
      })
      .optional(),
  })

  const { id } = req.params

  try {
    const data = updateBodySchema.parse(req.body)

    const updateOrderUseCase = makeUpdateOrder()
    const order = await updateOrderUseCase.execute(id, data)

    return res.status(200).json(order)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).json({ error })
  }
}
