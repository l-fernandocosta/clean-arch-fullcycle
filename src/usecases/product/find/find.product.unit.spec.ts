import Product from '../../../domain/product/entity/product';
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto';
import { FindProductUseCase } from './find.product.use-case';

const input: InputFindProductDTO = {
  id: '123',
};

const product = new Product('123', 'product', 100);

const output: OutputFindProductDTO = {
  id: product.id,
  name: product.name,
  price: product.price,
};

const ProductRepositoryMock = () => {
  const product_repository = {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  return product_repository;
};

describe('unit test find product usecase', () => {
  it('should find a product by id', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new FindProductUseCase(product_repository);

    const result = await product_usecase.execute(input);

    expect(output).toEqual(result);
  });

  it('should throw an error if user doesnt exists', async () => {
    const product_repository = ProductRepositoryMock();
    const product_usecase = new FindProductUseCase(product_repository);

    product_repository.find.mockImplementation(() => {
      throw new Error('User not found');
    });

    expect(async () => {
      await product_usecase.execute(input);
    }).rejects.toThrow('User not found');
  });
});
