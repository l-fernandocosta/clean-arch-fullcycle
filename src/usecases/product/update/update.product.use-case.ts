import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import {
  InputUpdateProductDTO,
  OutputUpdateProductDTO,
} from './update.product.dto';

export class UpdateProductUseCase {
  constructor(private product_repository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const updated_product = await this.product_repository.find(input.id);

    updated_product.changeName(input.name);
    updated_product.changePrice(input.price);

    await this.product_repository.update(updated_product);

    return {
      id: updated_product.id,
      name: updated_product.name,
      price: updated_product.price,
    };
  }
}
