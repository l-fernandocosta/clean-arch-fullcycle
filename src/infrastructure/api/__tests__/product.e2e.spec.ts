import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E product routes', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const _res = await request(app).post('/product').send({
      name: 'product',
      price: 100,
    });

    expect(_res.status).toBe(201);
    expect(_res.body.name).toBe('product');
    expect(_res.body.price).toBe(100);
  });

  it('should return status 500 if the input is invalid', async () => {
    const _res = await request(app).post('/product').send({
      name: 'Should return status 500 because there is no price in the input',
    });

    expect(_res.status).toBe(500);
  });

  it('should return each product', async () => {
    await request(app).post('/product').send({
      name: 'product 1',
      price: 100,
    });
    await request(app).post('/product').send({
      name: 'product 2',
      price: 200,
    });

    const all_products = await request(app).get('/product').send();
    const first_product = all_products.body.products[0];
    const second_product = all_products.body.products[1];

    expect(all_products.body.products.length).toBe(2);
    expect(first_product.name).toBe('product 1');
    expect(second_product.name).toBe('product 2');
    expect(first_product.price).toBe(100);
    expect(second_product.price).toBe(200);
  });
});
