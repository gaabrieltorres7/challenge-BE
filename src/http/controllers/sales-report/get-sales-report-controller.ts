import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetSalesReport } from '@/use-cases/sales-report/factories/make-get-sales-report'
import { Request, Response } from 'express'

export async function GetSalesReportController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const getSalesReportUseCase = makeGetSalesReport()
    const salesReport = await getSalesReportUseCase.execute({ id })
    return res.status(200).json(salesReport)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
