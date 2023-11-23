import {
  CreatedSalesReportDTO,
  UpdateSalesReportDTO,
} from '@/repositories/sales-report/dto/sales-report.dto'
import { ISalesReportRepository } from '@/repositories/sales-report/sales-report-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(
    id: string,
    data: UpdateSalesReportDTO,
  ): Promise<CreatedSalesReportDTO | null> {
    const product = await this.salesReportRepository.findById(id)

    if (!product) throw new ResourceNotFoundError()

    const updatedSalesReport = await this.salesReportRepository.update(id, data)

    return updatedSalesReport
  }
}
