import {
  CreatedOrderDTO,
  UpdateOrderDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(
    id: string,
    data: UpdateOrderDTO,
  ): Promise<CreatedOrderDTO | null> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new ResourceNotFoundError()

    const updatedOrder = await this.orderRepository.update(id, data)

    return updatedOrder
  }
}
