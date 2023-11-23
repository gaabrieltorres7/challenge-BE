import { CreatedClientDTO } from '@/repositories/client/dto/client.dto'
import { CreatedOrderItemDTO } from '@/repositories/order-item/dto/order-item.dto'
import { Prisma } from '@prisma/client'

export type CreateOrderDTO = {
  client_id: string
}

export type CreatedOrderDTO = {
  id: string
  order_status: 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'
  order_date: Date
  total: Prisma.Decimal
  OrderItem?: CreatedOrderItemDTO[]
  client?: CreatedClientDTO
} & CreateOrderDTO

export type GetOrdersDTO = {
  startDate?: string
  endDate?: string
}

export type GetOrderDTO = {
  id: string
}

export type UpdateOrderDTO = {
  total?: Prisma.Decimal
}
