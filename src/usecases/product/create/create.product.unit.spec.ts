import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputCreateProductDTO } from './create.product.dto';
import { CreateProductUseCase } from './create.produt.use-case';

const input: InputCreateProductDTO = {
  name: 'product',
  price: 100,
};

const ProductRepositoryMock = () => {
  const product_repository: ProductRepositoryInterface = {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  return product_repository;
};

describe('unit test for create product usecase', () => {
  it('should create a product', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new CreateProductUseCase(product_repository);

    const output = await product_usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should  throw an error if the name is empty', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new CreateProductUseCase(product_repository);

    input.name = '';

    await expect(product_usecase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should throw an error if the price is less than zero', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new CreateProductUseCase(product_repository);

    input.price = -1;
    input.name = 'Teste';

    await expect(product_usecase.execute(input)).rejects.toThrow(
      'Price must be greater than zero'
    );
  });
});
