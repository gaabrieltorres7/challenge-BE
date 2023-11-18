import {
  CreatedOrderItemDTO,
  UpdateOrderItemDTO,
} from '@/repositories/order-item/dto/order-item.dto'
import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateOrderItemUseCase {
  constructor(private orderItemRepository: IOrderItemRepository) {}

  async execute(
    id: string,
    data: UpdateOrderItemDTO,
  ): Promise<CreatedOrderItemDTO | null> {
    const orderItem = await this.orderItemRepository.findById(id)

    if (!orderItem) throw new ResourceNotFoundError()

    if (data.quantity && data.unit_price) {
      const subtotal = Number(data.unit_price) * data.quantity
      const subtotalDecimal = new Prisma.Decimal(subtotal)

      const updatedOrderItem = await this.orderItemRepository.update(id, {
        quantity: data.quantity,
        subtotal: subtotalDecimal,
      })

      return updatedOrderItem
    }

    if (data.quantity) {
      const subtotal = Number(orderItem.unit_price) * data.quantity
      const subtotalDecimal = new Prisma.Decimal(subtotal)

      const updatedOrderItem = await this.orderItemRepository.update(id, {
        quantity: data.quantity,
        subtotal: subtotalDecimal,
      })

      return updatedOrderItem
    }

    if (data.unit_price) {
      const subtotal = Number(data.unit_price) * orderItem.quantity
      const subtotalDecimal = new Prisma.Decimal(subtotal)

      const updatedOrderItem = await this.orderItemRepository.update(id, {
        unit_price: data.unit_price,
        subtotal: subtotalDecimal,
      })

      return updatedOrderItem
    }

    return null
  }
}
