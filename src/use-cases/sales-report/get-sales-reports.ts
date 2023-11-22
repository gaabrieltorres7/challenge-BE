import { CreatedSalesReportDTO } from '@/repositories/sales-report/dto/sales-report.dto'
import { ISalesReportRepository } from '@/repositories/sales-report/sales-report-interface'

export class GetSalesReportsUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(): Promise<CreatedSalesReportDTO[] | null> {
    const salesReports = await this.salesReportRepository.findAll()

    return salesReports
  }
}
