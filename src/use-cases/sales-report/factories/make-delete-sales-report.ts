import { PrismaSalesReportRepository } from '@/repositories/sales-report/prisma/prisma-sales-report-repository'
import { PrismaClient } from '@prisma/client'
import { DeleteSalesReportUseCase } from '../delete-sales-report'

export function makeDeleteSalesReport() {
  const prisma = new PrismaClient()
  const salesReportRepository = new PrismaSalesReportRepository(prisma)

  const useCase = new DeleteSalesReportUseCase(salesReportRepository)

  return useCase
}
