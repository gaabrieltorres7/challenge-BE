import {
  CreatedProductDTO,
  UpdateProductDTO,
} from '@/repositories/product/dto/product.dto'
import { IProductRepository } from '@/repositories/product/product-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    id: string,
    data: UpdateProductDTO,
  ): Promise<CreatedProductDTO | null> {
    const product = await this.productRepository.findById(id)

    if (!product) throw new ResourceNotFoundError()

    const updatedClient = await this.productRepository.update(id, data)

    return updatedClient
  }
}
