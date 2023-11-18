import {
  CreatedOrderItemDTO,
  GetOrderItemDTO,
} from '@/repositories/order-item/dto/order-item.dto'
import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetOrderItemUseCase {
  constructor(private orderItemRepository: IOrderItemRepository) {}

  async execute({ id }: GetOrderItemDTO): Promise<CreatedOrderItemDTO | null> {
    const orderItem = await this.orderItemRepository.findById(id)

    if (!orderItem) throw new ResourceNotFoundError()

    return orderItem
  }
}
