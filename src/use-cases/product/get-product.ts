import {
  CreatedProductDTO,
  GetProductDTO,
} from '@/repositories/product/dto/product.dto'
import { IProductRepository } from '@/repositories/product/product-interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class GetProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({ id }: GetProductDTO): Promise<CreatedProductDTO | null> {
    const product = await this.productRepository.findById(id)

    if (!product) throw new ResourceNotFoundError()

    return product
  }
}
