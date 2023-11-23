import {
  CreatedOrderDTO,
  GetOrdersDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({
    startDate,
    endDate,
  }: GetOrdersDTO): Promise<CreatedOrderDTO[] | null> {
    const searchTerm1 = startDate !== 'undefined' ? startDate : '2023-01-01'
    const searchTerm2 = endDate !== 'undefined' ? endDate : '2024-01-01'

    const orders = await this.orderRepository.findAll(searchTerm1, searchTerm2)
    return orders
  }
}
