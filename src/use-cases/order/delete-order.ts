import { IOrderRepository } from '@/repositories/order/order-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<boolean> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new ResourceNotFoundError()

    await this.orderRepository.delete(id)

    return true
  }
}
