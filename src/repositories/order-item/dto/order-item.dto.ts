import { Prisma } from '@prisma/client'

export type CreateOrderItemDTO = {
  order_id: string
  product_id: string
  quantity: number
  unit_price: Prisma.Decimal
  subtotal?: Prisma.Decimal
}

export type CreatedOrderItemDTO = {
  id: string
  // order: CreatedOrderDTO
  // product: CreatedProductDTO
} & CreateOrderItemDTO

export type GetOrdersItemDTO = {
  skip?: number
  take?: number
}

export type GetOrderItemDTO = {
  id: string
}

export type UpdateOrderItemDTO = {
  quantity?: number
  unit_price?: Prisma.Decimal
  subtotal?: Prisma.Decimal
}
