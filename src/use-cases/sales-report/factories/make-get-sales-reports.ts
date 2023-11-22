import { PrismaSalesReportRepository } from '@/repositories/sales-report/prisma/prisma-sales-report-repository'
import { PrismaClient } from '@prisma/client'
import { GetSalesReportsUseCase } from '../get-sales-reports'

export function makeGetSalesReports() {
  const prisma = new PrismaClient()
  const salesReportRepository = new PrismaSalesReportRepository(prisma)

  const useCase = new GetSalesReportsUseCase(salesReportRepository)

  return useCase
}
