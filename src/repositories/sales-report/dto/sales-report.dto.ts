import { Prisma } from '@prisma/client'

export type CreateSalesReportDTO = {
  time_period: Date
  sales_amount: Prisma.Decimal
  sold_products: number
  file_path: string
}

export type CreatedSalesReportDTO = {
  id: string
  time_period: Date
} & CreateSalesReportDTO

export type GetSalesReportDTO = {
  id: string
}

export type UpdateSalesReportDTO = {
  sales_amount?: Prisma.Decimal
  sold_products?: number
  file_path?: string
}
