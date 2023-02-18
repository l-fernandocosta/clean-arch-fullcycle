import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import { InputUpdateCustomerDTO } from './update.customer.dto';
import { UpdateCustomerUseCase } from './update.customer.use-case';

const customer = CustomerFactory.createWithAddress(
  'name',
  new Address('street', 123, 'zip', 'city')
);

const input: InputUpdateCustomerDTO = {
  id: customer.id,
  name: 'name updated',
  address: {
    city: 'city updated',
    number: 1234,
    street: 'street updated',
    zip: 'zip updated',
  },
};

const CustomerMockRepository = () => {
  const repository: CustomerRepositoryInterface = {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  return repository;
};

describe('unit tests customer unit spec', () => {
  it('should update a customer', async () => {
    const customer_repository = CustomerMockRepository();
    const customer_update_usecase = new UpdateCustomerUseCase(
      customer_repository
    );
    await customer_update_usecase.execute(input);
  });
});
