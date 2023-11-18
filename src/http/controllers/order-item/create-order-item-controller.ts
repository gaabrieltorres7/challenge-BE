import { makeCreateOrderItem } from '@/use-cases/order-item/factories/make-create-order-item'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function CreateOrderItemController(req: Request, res: Response) {
  const createOrderItemBodySchema = z.object({
    order_id: z.string(),
    product_id: z.string(),
    quantity: z.number(),
    unit_price: z.custom((value: any) => {
      try {
        const prismaDecimal = new Prisma.Decimal(value)
        return prismaDecimal
      } catch (error) {
        throw new Error('Invalid Decimal format')
      }
    }),
  })

  try {
    const { order_id, product_id, quantity, unit_price } =
      createOrderItemBodySchema.parse(req.body)

    const createOrderItem = makeCreateOrderItem()
    await createOrderItem.execute({
      order_id,
      product_id,
      quantity,
      unit_price,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'Order item has been created successfully',
  })
}
