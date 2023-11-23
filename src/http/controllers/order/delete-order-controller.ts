import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteOrder } from '@/use-cases/order/factories/make-delete-order'
import { Request, Response } from 'express'

export async function DeleteOrderController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteOrderUseCase = makeDeleteOrder()
    await deleteOrderUseCase.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
