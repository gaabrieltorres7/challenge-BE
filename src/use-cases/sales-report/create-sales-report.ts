import { ISalesReportRepository } from '@/repositories/sales-report/sales-report-interface'
import { PrismaClient } from '@prisma/client'
import AWS from 'aws-sdk'
import XLSX from 'xlsx'

export class CreateSalesReportUseCase {
  constructor(
    private readonly s3: AWS.S3,
    private readonly prisma: PrismaClient,
    private readonly salesReportRepository: ISalesReportRepository,
  ) {
    this.prisma = new PrismaClient()
  }

  async execute(startDate: string, endDate: string) {
    try {
      const salesData = await this.prisma.$queryRaw`
        SELECT
          p.name AS product_name,
          SUM(oi.quantity) AS total_quantity,
          SUM(oi.subtotal) AS total_amount
        FROM
          "order_items" oi
        JOIN
          "products" p ON oi.product_id = p.id
        JOIN
          "orders" o ON oi.order_id = o.id
        WHERE
          o.order_date BETWEEN to_timestamp(${startDate}, 'YYYY-MM-DD') AND to_timestamp(${endDate}, 'YYYY-MM-DD')
        AND o.order_status <> 'RECEIVED'
        GROUP BY
          p.name;
        `

      const salesDataForCSV = salesData.map((entry) => ({
        product_name: entry.product_name,
        total_quantity: Number(entry.total_quantity),
        total_amount: Number(entry.total_amount),
      }))

      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(salesDataForCSV as any[])
      XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport')

      const csvData = XLSX.write(workbook, { bookType: 'csv', type: 'binary' })

      const csvFileName = 'sales-report.csv'

      const s3Params = {
        Bucket: 'bucket-loomi',
        Key: csvFileName,
        Body: Buffer.from(csvData, 'binary'),
        ContentType: 'text/csv',
      }

      await this.s3.upload(s3Params).promise()

      const salesAmount = salesDataForCSV.reduce(
        (sum: number, entry) => sum + entry.total_amount,
        0,
      )

      const salesQuantity = salesDataForCSV.reduce(
        (sum: number, entry) => sum + entry.total_quantity,
        0,
      )

      const salesReport = await this.salesReportRepository.create({
        time_period: new Date(),
        sales_amount: salesAmount,
        sold_products: salesQuantity,
        file_path: `s3://${s3Params.Bucket}/${s3Params.Key}`,
      })

      return salesReport
    } catch (error) {
      console.error('Error generating sales report:', error)
      throw new Error('Internal Server Error')
    }
  }
}
