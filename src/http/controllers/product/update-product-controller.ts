import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateProduct } from '@/use-cases/product/factories/make-update-product'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateProductController(req: Request, res: Response) {
  const updateBodySchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(5).optional(),
    price: z
      .custom((value: any) => {
        try {
          const prismaDecimal = new Prisma.Decimal(value)
          return prismaDecimal
        } catch (error) {
          throw new Error('Invalid Decimal format')
        }
      })
      .optional(),
    stock_quantity: z.number().min(0).optional(),
  })

  const { id } = req.params

  try {
    const { name, description, price, stock_quantity } = updateBodySchema.parse(
      req.body,
    )

    const updateProductUseCase = makeUpdateProduct()
    const product = await updateProductUseCase.execute(id, {
      name,
      description,
      price,
      stock_quantity,
    })

    return res.status(200).json(product)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    console.log(error)
    return res.status(500).json({ error })
  }
}
