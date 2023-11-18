import {
  CreateProductDTO,
  CreatedProductDTO,
} from '@/repositories/product/dto/product.dto'
import { IProductRepository } from '@/repositories/product/product-interface'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-error'

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({
    name,
    description,
    price,
    stock_quantity,
  }: CreateProductDTO): Promise<CreatedProductDTO> {
    const findUserByName = await this.productRepository.findByName(name)
    if (findUserByName) throw new ProductAlreadyExistsError()

    const product = await this.productRepository.create({
      name,
      description,
      price,
      stock_quantity,
    })

    return product
  }
}
