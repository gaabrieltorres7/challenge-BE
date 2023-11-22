import { CreatedOrderItemDTO } from '@/repositories/order-item/dto/order-item.dto'
import { Prisma } from '@prisma/client'

export type CreateProductDTO = {
  name: string
  description: string
  price: Prisma.Decimal
  stock_quantity: number
}

export type CreatedProductDTO = {
  id: string
  created_at: Date
  updated_at: Date
  OrderItem?: CreatedOrderItemDTO[]
} & CreateProductDTO

export type GetProductDTO = {
  id: string
}

export type UpdateProductDTO = {
  name?: string
  description?: string
  price?: Prisma.Decimal
  stock_quantity?: number
}
