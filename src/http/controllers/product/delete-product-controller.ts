import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteProduct } from '@/use-cases/product/factories/make-delete-product'
import { Request, Response } from 'express'

export async function DeleteProductController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteProductUseCase = makeDeleteProduct()
    await deleteProductUseCase.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
