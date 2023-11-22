import { makeCreateSalesReport } from '@/use-cases/sales-report/factories/make-create-sales-report'
import { Request, Response } from 'express'

export async function CreateSalesReportController(req: Request, res: Response) {
  const { startDate, endDate } = req.query

  try {
    const createSalesReport = makeCreateSalesReport()

    const report = await createSalesReport.execute(
      String(startDate),
      String(endDate),
    )
    return res.status(200).json(report)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
