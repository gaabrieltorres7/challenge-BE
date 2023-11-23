import { CreatedProductDTO } from '@/repositories/product/dto/product.dto'
import { IProductRepository } from '@/repositories/product/product-interface'

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(query: string): Promise<CreatedProductDTO[] | null> {
    const searchTerm = query !== 'undefined' ? query : ''
    const products = await this.productRepository.findAll(searchTerm)

    return products
  }
}
