import { makeGetProducts } from '@/use-cases/product/factories/make-get-products'
import { Request, Response } from 'express'

export async function GetProductsController(req: Request, res: Response) {
  const { q } = req.query
  const query = String(q)

  try {
    const getProductsUseCase = makeGetProducts()
    const products = await getProductsUseCase.execute(query)

    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
