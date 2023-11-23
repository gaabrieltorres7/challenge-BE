import { PrismaSalesReportRepository } from '@/repositories/sales-report/prisma/prisma-sales-report-repository'
import { PrismaClient } from '@prisma/client'
import { UpdateSalesReportUseCase } from '../update-sales-report'

export function makeUpdateSalesReport() {
  const prisma = new PrismaClient()
  const salesReportRepository = new PrismaSalesReportRepository(prisma)

  const useCase = new UpdateSalesReportUseCase(salesReportRepository)

  return useCase
}
