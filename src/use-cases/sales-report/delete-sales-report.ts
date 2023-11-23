import { ISalesReportRepository } from '@/repositories/sales-report/sales-report-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {}

  async execute(id: string): Promise<boolean> {
    const salesReport = await this.salesReportRepository.findById(id)

    if (!salesReport) throw new ResourceNotFoundError()

    await this.salesReportRepository.delete(id)

    return true
  }
}
