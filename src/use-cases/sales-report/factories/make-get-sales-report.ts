import { PrismaSalesReportRepository } from '@/repositories/sales-report/prisma/prisma-sales-report-repository'
import { PrismaClient } from '@prisma/client'
import { GetSalesReportUseCase } from '../get-sales-report'

export function makeGetSalesReport() {
  const prisma = new PrismaClient()
  const salesReportRepository = new PrismaSalesReportRepository(prisma)

  const useCase = new GetSalesReportUseCase(salesReportRepository)

  return useCase
}
