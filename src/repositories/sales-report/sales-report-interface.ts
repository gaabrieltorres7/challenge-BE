import {
  CreateSalesReportDTO,
  CreatedSalesReportDTO,
  UpdateSalesReportDTO,
} from './dto/sales-report.dto'

export interface ISalesReportRepository {
  create(data: CreateSalesReportDTO): Promise<CreatedSalesReportDTO>
  findById(id: string): Promise<CreatedSalesReportDTO | null>
  findAll(): Promise<CreatedSalesReportDTO[] | null>
  update(
    id: string,
    data: UpdateSalesReportDTO,
  ): Promise<CreatedSalesReportDTO | null>
  delete(id: string): Promise<boolean>
}
