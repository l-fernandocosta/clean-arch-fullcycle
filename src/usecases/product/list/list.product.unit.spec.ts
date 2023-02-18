import Product from '../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { ListProductUseCase } from './list.product.use-case';

const product1 = new Product('1', 'product 1', 100);
const product2 = new Product('2', 'product 2', 200);

const ProductMockRepository = () => {
  const product_repository: ProductRepositoryInterface = {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    update: jest.fn(),
  };

  return product_repository;
};

describe('unit test list products usecase', () => {
  it('should list all products', async () => {
    const product_repository = ProductMockRepository();
    const product_usecase = new ListProductUseCase(product_repository);

    const all_products = await product_usecase.execute({});

    expect(all_products.products.length).toBeGreaterThan(1);
    expect(all_products.products[0].id).toBe('1');
    expect(all_products.products[1].id).toBe('2');
    expect(all_products.products[0].price).toBe(100);
    expect(all_products.products[1].price).toBe(200);
  });
});
