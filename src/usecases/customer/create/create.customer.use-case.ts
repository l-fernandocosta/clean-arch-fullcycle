import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from './create.customer.dto';

export class CreateCustomerUseCase {
  constructor(private customer_repository: CustomerRepositoryInterface) {}

  async execute(
    input: InputCreateCustomerDTO
  ): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customer_repository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
        street: customer.Address.street,
      },
    };
  }
}
