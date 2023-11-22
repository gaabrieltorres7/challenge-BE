import {
  CreatedSalesReportDTO,
  GetSalesReportDTO,
} from '@/repositories/sales-report/dto/sales-report.dto'
import { ISalesReportRepository } from '@/repositories/sales-report/sales-report-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute({
    id,
  }: GetSalesReportDTO): Promise<CreatedSalesReportDTO | null> {
    const salesReport = await this.salesReportRepository.findById(id)

    if (!salesReport) throw new ResourceNotFoundError()

    return salesReport
  }
}
