import { Request, Response, Router } from 'express';
import { CreateCustomerUseCase } from '../../../usecases/customer/create/create.customer.use-case';
import { ListCustomerUseCase } from '../../../usecases/customer/list/list.customer.use-case';
import CustomerRepository from '../../customer/repository/sequelize/customer.repository';

export const customer_route = Router();

customer_route.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customer_dto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        zip: req.body.address.zip,
        number: req.body.address.number,
      },
    };

    const output = await usecase.execute(customer_dto);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

customer_route.get('/', async (req: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    return res.send(output);
  } catch (e) {
    return res.status(500).send();
  }
});
