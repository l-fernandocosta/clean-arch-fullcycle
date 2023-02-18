import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputUpdateProductDTO } from './update.product.dto';
import { UpdateProductUseCase } from './update.product.use-case';

const product = new Product('123', 'product', 100);
const input: InputUpdateProductDTO = {
  id: '123',
  name: 'updated product',
  price: 200,
};

const ProductRepositoryMock = () => {
  const product_repository: ProductRepositoryInterface = {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };

  return product_repository;
};

describe('unit test update product usecase', () => {
  it('should update a product', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new UpdateProductUseCase(product_repository);

    const updated_product = await product_usecase.execute(input);

    expect(updated_product.name).toBe(input.name);
    expect(updated_product.price).toBe(input.price);
  });
});
