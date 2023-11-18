import { Prisma } from '@prisma/client'

export type CreateProductDTO = {
  name: string
  description: string
  price: Prisma.Decimal
  stock_quantity: number
  // OrderItem: any[]
}

export type CreatedProductDTO = {
  id: string
  created_at: Date
  updated_at: Date
  // OrderItem: any[]
} & CreateProductDTO

export type GetProductsDTO = {
  skip?: number
  take?: number
}

export type GetProductDTO = {
  id: string
}

export type UpdateProductDTO = {
  name?: string
  description?: string
  price?: Prisma.Decimal
  stock_quantity?: number
}
