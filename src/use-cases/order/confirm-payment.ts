import { IOrderItemRepository } from '@/repositories/order-item/order-item-interface'
import { IOrderRepository } from '@/repositories/order/order-interface'
import { IProductRepository } from '@/repositories/product/product-interface'
import { InsufficientStockError } from '../errors/insufficient-stock-error'
import { PaymentNotApprovedError } from '../errors/payment-not-approved-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class ConfirmPaymentUseCase {
  constructor(
    private productRepository: IProductRepository,
    private orderRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
  ) {}

  async execute(order_id: string): Promise<boolean> {
    const pagamentoSimuladoAprovado = Math.random() < 0.7 // 70% de chance de aprovar

    const order = await this.orderRepository.findById(order_id)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    const orderItems = await this.orderItemRepository.findByOrderId(order_id)

    if (!orderItems || orderItems.length === 0) {
      throw new ResourceNotFoundError()
    }

    // Verificando se há tipos diferentes de produtos no pedido
    const uniqueProductIds = new Set(
      orderItems.map((orderItem) => orderItem.product_id),
    )

    if (uniqueProductIds.size > 1) {
      // Se houver tipos diferentes de produtos
      const totalQuantityByProductId: Record<string, number> = {}

      for (const orderItem of orderItems) {
        if (!totalQuantityByProductId[orderItem.product_id]) {
          totalQuantityByProductId[orderItem.product_id] = 0
        }

        totalQuantityByProductId[orderItem.product_id] += orderItem.quantity

        const product = await this.productRepository.findById(
          orderItem.product_id,
        )

        if (!product) {
          throw new ResourceNotFoundError()
        }

        if (orderItem.quantity > product.stock_quantity) {
          throw new InsufficientStockError()
        }
      }

      for (const productId in totalQuantityByProductId) {
        const quantity = totalQuantityByProductId[productId]
        const product = await this.productRepository.findById(productId)
        if (!product) {
          throw new ResourceNotFoundError()
        }
        const newTotal = product.stock_quantity - quantity
        if (pagamentoSimuladoAprovado) {
          await this.productRepository.debitStock(productId, newTotal)
          await this.orderRepository.updateStatus(order_id, 'PROCESSING')
        } else {
          throw new PaymentNotApprovedError()
        }
      }
    } else {
      // Se for o mesmo tipo de produto
      for (const orderItem of orderItems) {
        const product = await this.productRepository.findById(
          orderItem.product_id,
        )

        if (!product) {
          throw new ResourceNotFoundError()
        }

        if (orderItem.quantity > product.stock_quantity) {
          throw new InsufficientStockError()
        }
      }

      if (pagamentoSimuladoAprovado) {
        const quantity = orderItems.reduce(
          (acc, orderItem) => acc + orderItem.quantity,
          0,
        )
        const productId = orderItems[0].product_id
        const product = await this.productRepository.findById(productId)
        if (!product) {
          throw new ResourceNotFoundError()
        }
        const newTotal = product.stock_quantity - quantity
        await this.productRepository.debitStock(
          orderItems[0].product_id,
          newTotal,
        )
        await this.orderRepository.updateStatus(order_id, 'PROCESSING')
      } else {
        throw new PaymentNotApprovedError()
      }
    }
    return true
  }
}
