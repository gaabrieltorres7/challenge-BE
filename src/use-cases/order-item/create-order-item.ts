import {
  CreateOrderItemDTO,
  CreatedOrderItemDTO,
} from '@/repositories/order-item/dto/order-item.dto'
import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { Prisma } from '@prisma/client'

export class CreateOrderItemUseCase {
  constructor(private orderItemRepository: IOrderItemRepository) {}

  async execute({
    order_id,
    product_id,
    quantity,
    unit_price,
  }: CreateOrderItemDTO): Promise<CreatedOrderItemDTO> {
    const subtotalDecimal = Number(unit_price) * quantity
    const orderItem = await this.orderItemRepository.create({
      order_id,
      product_id,
      quantity,
      unit_price,
      subtotal: new Prisma.Decimal(subtotalDecimal),
    })

    return orderItem
  }
}
