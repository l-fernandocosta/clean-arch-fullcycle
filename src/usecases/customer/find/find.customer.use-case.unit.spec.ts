import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from './find.customer.dto';
import { FindCustomerUseCase } from './find.customer.use-case';

const customer = new Customer('123', 'Jhon');
const address = new Address('Street', 123, 'zip', 'city');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('unit test find customer usecase', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customer_repository = MockRepository();
    const customer_usecase = new FindCustomerUseCase(customer_repository);

    const input: InputFindCustomerDTO = {
      id: '123',
    };

    const output: OutputFindCustomerDTO = {
      id: '123',
      name: 'Jhon',
      address: {
        city: 'city',
        number: 123,
        street: 'Street',
        zip: 'zip',
      },
    };

    const response = await customer_usecase.execute(input);
    expect(output).toEqual(response);
  });
  it('should throw an error when user id doesnt exists', async () => {
    const customer_repository = MockRepository();
    const customer_usecase = new FindCustomerUseCase(customer_repository);

    customer_repository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const input: InputFindCustomerDTO = {
      id: '12x',
    };

    expect(() => {
      return customer_usecase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
