import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { OutputMapperInterface } from '../../@shared/output-mapper/output-mapper.interface';
import { InputListProductDTO, OutputListProductDTO } from './list.product.dto';

export class ListProductUseCase {
  constructor(private product_repositorty: ProductRepositoryInterface) {}

  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.product_repositorty.findAll();
    return new ProductOutputMapper().to_output(products);
  }
}

export class ProductOutputMapper
  implements OutputMapperInterface<Product, OutputListProductDTO>
{
  public to_output(_product: Product[]): OutputListProductDTO {
    return {
      products: _product.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}
