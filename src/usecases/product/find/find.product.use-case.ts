import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto';

export class FindProductUseCase {
  constructor(private product_repository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.product_repository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
