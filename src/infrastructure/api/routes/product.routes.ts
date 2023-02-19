import { Request, Response, Router } from 'express';
import { InputCreateProductDTO } from '../../../usecases/product/create/create.product.dto';
import { CreateProductUseCase } from '../../../usecases/product/create/create.produt.use-case';
import { ListProductUseCase } from '../../../usecases/product/list/list.product.use-case';
import ProductRepository from '../../product/repository/sequelize/product.repository';

export const product_route = Router();

product_route.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  const input: InputCreateProductDTO = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const output = await usecase.execute(input);
    return res.status(201).send(output);
  } catch (e) {
    return res.status(500).send(e);
  }
});

product_route.get('/', async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const all_products = await usecase.execute({});
    return res.status(200).send(all_products);
  } catch (e) {
    return res.status(500).send(e);
  }
});
