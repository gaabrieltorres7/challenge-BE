import {
  CreatedProductDTO,
  GetProductsDTO,
} from '@/repositories/product/dto/product.dto'
import { IProductRepository } from '@/repositories/product/product-interface'

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    skip = 0,
    take = 10,
  }: GetProductsDTO): Promise<CreatedProductDTO[] | null> {
    const products = await this.productRepository.findAll(skip, take)

    return products
  }
}
