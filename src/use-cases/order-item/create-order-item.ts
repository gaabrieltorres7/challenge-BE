import {
  CreateOrderItemDTO,
  CreatedOrderItemDTO,
} from '@/repositories/order-item/dto/order-item.dto'
import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { IProductRepository } from '@/repositories/product/product-interface'
import { Prisma } from '@prisma/client'
import { ActionNotAllowedError } from '../errors/action-not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class CreateOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}

  async execute({
    order_id,
    product_id,
    quantity,
  }: CreateOrderItemDTO): Promise<CreatedOrderItemDTO> {
    const currentOrder = await this.orderRepository.findById(order_id)

    const currentProduct = await this.productRepository.findById(product_id)

    if (!currentProduct) {
      throw new ResourceNotFoundError()
    }

    const unit_price = currentProduct.price

    const subtotalDecimal = Number(unit_price) * quantity

    if (!currentOrder) {
      throw new ResourceNotFoundError()
    }

    const totalNumber = Number(currentOrder.total)
    const newTotal = totalNumber + subtotalDecimal

    if (currentOrder?.order_status === 'RECEIVED') {
      await this.orderRepository.updateTotal(order_id, newTotal)
      const orderItem = await this.orderItemRepository.create({
        order_id,
        product_id,
        quantity,
        unit_price,
        subtotal: new Prisma.Decimal(subtotalDecimal),
      })

      return orderItem
    } else {
      throw new ActionNotAllowedError()
    }
  }
}
