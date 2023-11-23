import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteSalesReport } from '@/use-cases/sales-report/factories/make-delete-sales-report'
import { Request, Response } from 'express'

export async function DeleteSalesReportController(req: Request, res: Response) {
  const { id } = req.params

  try {
    const deleteSalesReport = makeDeleteSalesReport()
    await deleteSalesReport.execute(id)

    return res.status(204).json()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ error })
  }
}
