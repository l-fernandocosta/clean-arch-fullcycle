import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from './find.customer.dto';

export class FindCustomerUseCase {
  constructor(private customer_repository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customer_repository.find(input.id);

    return {
      id: customer.id,
      address: {
        city: customer.Address.city,
        number: customer.Address.number,
        street: customer.Address.street,
        zip: customer.Address.zip,
      },
      name: customer.name,
    };
  }
}
