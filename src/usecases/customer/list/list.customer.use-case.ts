import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from './list.customer.dto';

export class ListCustomerUseCase {
  constructor(
    private readonly customer_repository: CustomerRepositoryInterface
  ) {}

  async execute(input?: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customer_repository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          city: customer.Address.city,
          number: customer.Address.number,
          street: customer.Address.street,
          zip: customer.Address.zip,
        },
      })),
    };
  }
}
