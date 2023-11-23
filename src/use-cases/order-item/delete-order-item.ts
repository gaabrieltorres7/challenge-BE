import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { ActionNotAllowedError } from '../errors/action-not-allowed-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteOrderItemUseCase {
  constructor(
    private orderItemRepository: IOrderItemRepository,
    private orderRepository: IOrderRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const orderItem = await this.orderItemRepository.findById(id)

    if (!orderItem) throw new ResourceNotFoundError()

    const currentOrder = await this.orderRepository.findById(orderItem.order_id)

    if (!currentOrder?.OrderItem?.length) {
      await this.orderRepository.updateTotal(orderItem.order_id, 0)
    }

    const subtotal = Number(orderItem.subtotal)
    const newTotal = Number(currentOrder?.total) - subtotal

    if (currentOrder?.order_status === 'RECEIVED') {
      await this.orderRepository.updateTotal(orderItem.order_id, newTotal)
      await this.orderItemRepository.delete(id)
    } else {
      throw new ActionNotAllowedError()
    }

    return true
  }
}
