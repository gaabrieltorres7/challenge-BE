import { randomUUID } from 'crypto'
import {
  CreateOrderDTO,
  CreatedOrderDTO,
  UpdateOrderDTO,
} from '../dto/order.dto'
import { IOrderRepository } from '../order-interface'

export class InMemoryOrderRepository implements IOrderRepository {
  public items: CreatedOrderDTO[] = []

  async create(data: CreateOrderDTO): Promise<CreatedOrderDTO> {
    const order = {
      id: randomUUID(),
      order_status: 'RECEIVED',
      order_date: new Date(),
      total: 0,
      OrderItem: [],
      client_id: data.client_id,
    }

    this.items.push(order)

    return order
  }

  async findById(id: string): Promise<CreatedOrderDTO | null> {
    const order = this.items.find((item) => item.id === id)

    return order || null
  }

  async findByClientId(client_id: string): Promise<CreatedOrderDTO[] | null> {
    const order = this.items.filter((item) => item.client_id === client_id)

    return order || null
  }

  async findAll(skip: number, take: number): Promise<CreatedOrderDTO[] | null> {
    const order = this.items.slice(skip, take)

    return order || null
  }

  async update(
    id: string,
    data: UpdateOrderDTO,
  ): Promise<CreatedOrderDTO | null> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }

    Object.assign(order, data)

    return order
  }

  async delete(id: string): Promise<boolean> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return false
    }

    this.items.splice(this.items.indexOf(order), 1)

    return true
  }

  async updateStatus(
    id: string,
    order_status: 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED',
  ): Promise<boolean> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return false
    }

    order.order_status = order_status

    return true
  }

  async updateTotal(id: string, total: number): Promise<boolean> {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return false
    }

    order.total = total

    return true
  }
}
