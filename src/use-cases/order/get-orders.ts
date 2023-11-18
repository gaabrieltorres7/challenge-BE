import {
  CreatedOrderDTO,
  GetOrdersDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: GetOrdersDTO): Promise<CreatedOrderDTO[] | null> {
    const orders = await this.orderRepository.findAll(skip, take)
    return orders
  }
}
