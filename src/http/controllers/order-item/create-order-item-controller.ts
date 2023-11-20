import { ActionNotAllowedError } from '@/use-cases/errors/action-not-allowed-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateOrderItem } from '@/use-cases/order-item/factories/make-create-order-item'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function CreateOrderItemController(req: Request, res: Response) {
  const createOrderItemBodySchema = z.object({
    order_id: z.string(),
    product_id: z.string(),
    quantity: z.number(),
  })

  try {
    const { order_id, product_id, quantity } = createOrderItemBodySchema.parse(
      req.body,
    )

    const createOrderItem = makeCreateOrderItem()
    await createOrderItem.execute({
      order_id,
      product_id,
      quantity,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    } else if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    } else if (error instanceof ActionNotAllowedError) {
      return res.status(403).json({ message: error.message })
    }
    console.log(error)
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'Order item has been created successfully',
  })
}
