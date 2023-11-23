import { PrismaClient } from '@prisma/client'
import {
  CreateSalesReportDTO,
  CreatedSalesReportDTO,
  UpdateSalesReportDTO,
} from '../dto/sales-report.dto'
import { ISalesReportRepository } from '../sales-report-interface'

export class PrismaSalesReportRepository implements ISalesReportRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateSalesReportDTO): Promise<CreatedSalesReportDTO> {
    const salesReport = await this.prisma.salesReport.create({ data })

    return salesReport
  }

  async findById(id: string): Promise<CreatedSalesReportDTO | null> {
    const salesReport = await this.prisma.salesReport.findUnique({
      where: { id },
    })

    return salesReport
  }

  async findAll(): Promise<CreatedSalesReportDTO[] | null> {
    const salesReports = await this.prisma.salesReport.findMany({})

    return salesReports
  }

  async update(
    id: string,
    data: UpdateSalesReportDTO,
  ): Promise<CreatedSalesReportDTO | null> {
    const salesReport = await this.prisma.salesReport.update({
      where: { id },
      data,
    })

    return salesReport
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.salesReport.delete({ where: { id } })
    return true
  }
}
