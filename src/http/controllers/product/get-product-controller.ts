import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetProduct } from '@/use-cases/product/factories/make-get-product'
import { Request, Response } from 'express'

export async function GetProductController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getProductUseCase = makeGetProduct()
    const product = await getProductUseCase.execute({ id })
    return res.status(200).json(product)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
