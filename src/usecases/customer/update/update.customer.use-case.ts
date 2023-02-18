import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO,
} from './update.customer.dto';

export class UpdateCustomerUseCase {
  constructor(private customer_repository: CustomerRepositoryInterface) {}

  async execute(
    input: InputUpdateCustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customer_repository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );

    await this.customer_repository.update(customer);

    const output: OutputUpdateCustomerDTO = {
      id: customer.id,
      name: customer.name,
      address: {
        city: customer.Address.city,
        number: customer.Address.number,
        street: customer.Address.street,
        zip: customer.Address.zip,
      },
    };

    return output;
  }
}
