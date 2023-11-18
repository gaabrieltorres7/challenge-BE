import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteOrderItemUseCase {
  constructor(private orderItemRepository: IOrderItemRepository) {}

  async execute(id: string): Promise<boolean> {
    const orderItem = await this.orderItemRepository.findById(id)

    if (!orderItem) throw new ResourceNotFoundError()

    await this.orderItemRepository.delete(id)

    return true
  }
}
