import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-error'
import { makeCreateProduct } from '@/use-cases/product/factories/make-create-product'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function CreateProductController(req: Request, res: Response) {
  const createProductBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(5),
    price: z.custom((value: any) => {
      try {
        const prismaDecimal = new Prisma.Decimal(value)
        return prismaDecimal
      } catch (error) {
        throw new Error('Invalid Decimal format')
      }
    }),
    stock_quantity: z.number().min(0),
  })
  try {
    const { name, description, price, stock_quantity } =
      createProductBodySchema.parse(req.body)
    const createProduct = makeCreateProduct()
    await createProduct.execute({ name, description, price, stock_quantity })
  } catch (error) {
    if (error instanceof ProductAlreadyExistsError) {
      return res.status(409).json({ message: error.message })
    } else if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.format() })
    }
    return res.status(500).send()
  }

  return res.status(201).json({
    message: 'Product has been created successfully',
  })
}
