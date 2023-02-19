import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequelize/customer.model';
import ProductModel from '../product/repository/sequelize/product.model';
import { customer_route } from './routes/customer.routes';
import { product_route } from './routes/product.routes';

export const app: Express = express();
app.use(express.json());

app.use('/product', product_route);
app.use('/customer', customer_route);

export let sequelize: Sequelize;

async function setup_db() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });

  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setup_db();
