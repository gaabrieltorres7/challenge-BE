import {
  CreateOrderDTO,
  CreatedOrderDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ client_id }: CreateOrderDTO): Promise<CreatedOrderDTO> {
    const order = await this.orderRepository.create({
      client_id,
    })

    return order
  }
}
