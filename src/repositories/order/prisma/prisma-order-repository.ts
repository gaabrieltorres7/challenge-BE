import { Prisma, PrismaClient } from '@prisma/client'
import {
  CreateOrderDTO,
  CreatedOrderDTO,
  UpdateOrderDTO,
} from '../dto/order.dto'
import { IOrderRepository } from '../order-interface'

export class PrismaOrderRepository implements IOrderRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateOrderDTO): Promise<CreatedOrderDTO> {
    const order = await this.prisma.order.create({ data })
    return order
  }

  async findById(id: string): Promise<CreatedOrderDTO | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { OrderItem: true, client: true },
    })
    return order
  }

  async findByClientId(client_id: string): Promise<CreatedOrderDTO[] | null> {
    const orders = await this.prisma.order.findMany({
      where: { client_id },
      include: { OrderItem: true, client: true },
    })
    return orders
  }

  async findAll(
    startDate: string,
    endDate: string,
  ): Promise<CreatedOrderDTO[] | null> {
    const orders = await this.prisma.order.findMany({
      where: {
        AND: [
          {
            order_date: {
              gte: new Date(startDate),
            },
          },
          {
            order_date: {
              lte: new Date(endDate),
            },
          },
        ],
      },
      include: { OrderItem: true, client: true },
    })
    return orders
  }

  async update(
    id: string,
    data: UpdateOrderDTO,
  ): Promise<CreatedOrderDTO | null> {
    const order = await this.prisma.order.update({ where: { id }, data })
    return order
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.order.delete({ where: { id } })
    return true
  }

  async updateStatus(
    id: string,
    order_status: 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED',
  ): Promise<boolean> {
    await this.prisma.order.update({ where: { id }, data: { order_status } })
    return true
  }

  async updateTotal(id: string, total: number): Promise<boolean> {
    await this.prisma.order.update({
      where: { id },
      data: { total: new Prisma.Decimal(total) },
    })
    return true
  }
}
