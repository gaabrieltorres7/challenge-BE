import { IClientRepository } from '@/repositories/client/client-interface'
import {
  CreateOrderDTO,
  CreatedOrderDTO,
} from '@/repositories/order/dto/order.dto'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
  ) {}

  async execute({ client_id }: CreateOrderDTO): Promise<CreatedOrderDTO> {
    const client = await this.clientRepository.findById(client_id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    const order = await this.orderRepository.create({
      client_id,
    })

    return order
  }
}
