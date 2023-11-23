import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrderItem } from '@/use-cases/order-item/factories/make-get-order-item'
import { Request, Response } from 'express'

export async function GetOrderItemController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getOrderItemUseCase = makeGetOrderItem()
    const orderItem = await getOrderItemUseCase.execute({ id })
    return res.status(200).json(orderItem)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
