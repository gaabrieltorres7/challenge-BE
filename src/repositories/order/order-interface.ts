import {
  CreateOrderDTO,
  CreatedOrderDTO,
  UpdateOrderDTO,
} from './dto/order.dto'

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<CreatedOrderDTO>
  findById(id: string): Promise<CreatedOrderDTO | null>
  findByClientId(client_id: string): Promise<CreatedOrderDTO[] | null>
  findAll(skip: number, take: number): Promise<CreatedOrderDTO[] | null>
  update(id: string, data: UpdateOrderDTO): Promise<CreatedOrderDTO | null>
  delete(id: string): Promise<boolean>
  updateStatus(
    id: string,
    order_status: 'RECEIVED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED',
  ): Promise<boolean>
  updateTotal(id: string, total: number): Promise<boolean>
}
