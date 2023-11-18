import {
  CreatedOrderDTO,
  GetOrderDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ id }: GetOrderDTO): Promise<CreatedOrderDTO | null> {
    const order = await this.orderRepository.findById(id)

    if (!order) throw new ResourceNotFoundError()

    return order
  }
}
