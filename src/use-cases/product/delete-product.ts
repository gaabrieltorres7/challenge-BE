import { IProductRepository } from '@/repositories/product/product-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id)

    if (!product) throw new ResourceNotFoundError()

    await this.productRepository.delete(id)

    return true
  }
}
