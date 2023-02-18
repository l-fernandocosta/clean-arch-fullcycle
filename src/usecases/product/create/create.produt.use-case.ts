import { v4 as uuid } from 'uuid';
import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from './create.product.dto';

export class CreateProductUseCase {
  constructor(private product_repository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product_entity = new Product(uuid(), input.name, input.price);
    await this.product_repository.create(product_entity);

    const output: OutputCreateProductDTO = {
      id: product_entity.id,
      name: input.name,
      price: input.price,
    };

    return output;
  }
}
