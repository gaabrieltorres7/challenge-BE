import {
  CreateOrderItemDTO,
  CreatedOrderItemDTO,
  UpdateOrderItemDTO,
} from './dto/order-item.dto'

export interface IOrderItemRepository {
  create(data: CreateOrderItemDTO): Promise<CreatedOrderItemDTO>
  findById(id: string): Promise<CreatedOrderItemDTO | null>
  findByOrderId(order_id: string): Promise<CreatedOrderItemDTO[] | null>
  findAll(skip: number, take: number): Promise<CreatedOrderItemDTO[] | null>
  update(
    id: string,
    data: UpdateOrderItemDTO,
  ): Promise<CreatedOrderItemDTO | null>
  delete(id: string): Promise<boolean>
}
