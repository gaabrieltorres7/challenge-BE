import {
  CreatedOrderItemDTO,
  GetOrdersItemDTO,
} from '@/repositories/order-item/dto/order-item.dto'
import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'

export class GetOrdersItemUseCase {
  constructor(private ordersItemRepository: IOrderItemRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: GetOrdersItemDTO): Promise<CreatedOrderItemDTO[] | null> {
    const ordersItem = await this.ordersItemRepository.findAll(skip, take)
    return ordersItem
  }
}
