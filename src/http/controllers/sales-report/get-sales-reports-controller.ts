import { makeGetSalesReports } from '@/use-cases/sales-report/factories/make-get-sales-reports'
import { Request, Response } from 'express'

export async function GetSalesReportsController(req: Request, res: Response) {
  try {
    const getSalesReportsUseCase = makeGetSalesReports()
    const products = await getSalesReportsUseCase.execute()

    return res.status(200).json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}
