import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteOrderItem } from '@/use-cases/order-item/factories/make-delete-order-item'
import { Request, Response } from 'express'

export async function DeleteOrderItemController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteOrderItemUseCase = makeDeleteOrderItem()
    await deleteOrderItemUseCase.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
