import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository';
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from './find.customer.dto';
import { FindCustomerUseCase } from './find.customer.use-case';

describe('test find customer usecase', () => {
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
    const customer = new Customer('123', 'Jhon');
    const address = new Address('Street', 123, 'zip', 'city');
    customer.changeAddress(address);

    const customer_repository = new CustomerRepository();
    const customer_usecase = new FindCustomerUseCase(customer_repository);
    const isCreated = await customer_repository.create(customer);

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
});
