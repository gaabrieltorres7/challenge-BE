import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateSalesReport } from '@/use-cases/sales-report/factories/make-update-sales-report'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function UpdateSalesReportController(req: Request, res: Response) {
  const updateBodySchema = z.object({
    sales_amount: z
      .custom((value: any) => {
        try {
          const prismaDecimal = new Prisma.Decimal(value)
          return prismaDecimal
        } catch (error) {
          throw new Error('Invalid Decimal format')
        }
      })
      .optional(),
    sold_products: z.number().optional(),
    file_path: z.string().url().optional(),
  })

  const { id } = req.params

  try {
    const { file_path, sales_amount, sold_products } = updateBodySchema.parse(
      req.body,
    )

    const updateSalesReportUseCase = makeUpdateSalesReport()
    const salesReport = await updateSalesReportUseCase.execute(id, {
      file_path,
      sales_amount,
      sold_products,
    })

    return res.status(200).json(salesReport)
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
