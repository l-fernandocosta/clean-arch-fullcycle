import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import { ListCustomerUseCase } from './list.customer.use-case';

const customer1 = CustomerFactory.createWithAddress(
  'customer 1',
  new Address('street', 123, 'zip', 'city')
);

const customer2 = CustomerFactory.createWithAddress(
  'customer 2',
  new Address('street', 345, 'zip', 'city')
);

const CustomerRepositoryMock = () => {
  const repository: CustomerRepositoryInterface = {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    update: jest.fn(),
  };

  return repository;
};

describe('unit test for listing customer usecase', () => {
  it('should list all customers', async () => {
    const customer_repository = CustomerRepositoryMock();
    const customer_usecase = new ListCustomerUseCase(customer_repository);

    const output = await customer_usecase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
  });
});
