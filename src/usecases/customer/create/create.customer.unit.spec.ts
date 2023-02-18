import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from './create.customer.dto';
import { CreateCustomerUseCase } from './create.customer.use-case';

const input: InputCreateCustomerDTO = {
  name: 'Jhon',
  address: {
    city: 'city',
    number: 123,
    street: 'street',
    zip: 'zip',
  },
};

const CustomerMockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('unit test create customer usecase', () => {
  it('should create a customer', async () => {
    const customer_repository = CustomerMockRepository();
    const customer_usecase = new CreateCustomerUseCase(customer_repository);

    const output: OutputCreateCustomerDTO = await customer_usecase.execute(
      input
    );

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it('should thrown an error when name is empty', async () => {
    const customer_repository = CustomerMockRepository();
    const customer_usecase = new CreateCustomerUseCase(customer_repository);

    input.name = '';

    await expect(customer_usecase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should thrown an error when street address is empty', async () => {
    const customer_repository = CustomerMockRepository();
    const customer_usecase = new CreateCustomerUseCase(customer_repository);

    input.address.street = '';

    await expect(customer_usecase.execute(input)).rejects.toThrow(
      'Street is required'
    );
  });
});
