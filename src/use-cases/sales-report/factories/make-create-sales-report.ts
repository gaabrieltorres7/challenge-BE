import { PrismaSalesReportRepository } from '@/repositories/sales-report/prisma/prisma-sales-report-repository'
import { PrismaClient } from '@prisma/client'
import AWS from 'aws-sdk'
import { CreateSalesReportUseCase } from '../create-sales-report'

export function makeCreateSalesReport() {
  const prisma = new PrismaClient()
  const salesReportRepository = new PrismaSalesReportRepository(prisma)
  const aws = new AWS.S3({
    accessKeyId: 'AKIAT7W5EQM5H6BPIGKJ',
    secretAccessKey: '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',
    region: 'us-east-1',
  })

  const useCase = new CreateSalesReportUseCase(
    aws,
    prisma,
    salesReportRepository,
  )

  return useCase
}
