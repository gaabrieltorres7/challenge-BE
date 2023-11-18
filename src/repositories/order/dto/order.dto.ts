import { Prisma } from '@prisma/client'

export type CreateOrderDTO = {
  client_id: string
}

export type CreatedOrderDTO = {
  id: string
  order_status: 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED'
  order_date: Date
  total: Prisma.Decimal
  // OrderItem: any[]
  // client: CreatedClientDTO
} & CreateOrderDTO

export type GetOrdersDTO = {
  skip?: number
  take?: number
}

export type GetOrderDTO = {
  id: string
}

export type UpdateOrderDTO = {
  total?: Prisma.Decimal
}
