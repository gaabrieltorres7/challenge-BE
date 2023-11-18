import {
  CreateProductDTO,
  CreatedProductDTO,
  UpdateProductDTO,
} from './dto/product.dto'

export interface IProductRepository {
  create(data: CreateProductDTO): Promise<CreatedProductDTO>
  findById(id: string): Promise<CreatedProductDTO | null>
  findByName(name: string): Promise<CreatedProductDTO | null>
  findAll(query: string): Promise<CreatedProductDTO[] | null>
  update(id: string, data: UpdateProductDTO): Promise<CreatedProductDTO | null>
  delete(id: string): Promise<boolean>
}
