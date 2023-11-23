import {
  CreateSalesReportDTO,
  CreatedSalesReportDTO,
  UpdateSalesReportDTO,
} from '../dto/sales-report.dto'
import { ISalesReportRepository } from '../sales-report-interface'

export class InMemorySalesReportRepository implements ISalesReportRepository {
  public items: CreatedSalesReportDTO[] = []

  async create(data: CreateSalesReportDTO): Promise<CreatedSalesReportDTO> {
    const item = {
      id: '1',
      time_period: data.time_period,
      sales_amount: data.sales_amount,
      sold_products: data.sold_products,
      file_path: data.file_path,
    }

    this.items.push(item)

    return item
  }

  async findById(id: string): Promise<CreatedSalesReportDTO | null> {
    const item = this.items.find((item) => item.id === id)

    return item || null
  }

  async findAll(): Promise<CreatedSalesReportDTO[] | null> {
    const items = this.items

    return items || null
  }

  async update(
    id: string,
    data: UpdateSalesReportDTO,
  ): Promise<CreatedSalesReportDTO | null> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
