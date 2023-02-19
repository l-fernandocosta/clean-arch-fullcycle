import request from 'supertest';
import { app, sequelize } from '../express';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Jhon',
        address: {
          street: 'Street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jhon');
    expect(response.body.address.street).toBe('Street');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe('city');
    expect(response.body.address.zip).toBe('zip');
  });

  it('should return a status 500 if the dto is invalid', async () => {
    const response = await request(app).post('/customer').send({
      name: 'Jhon',
    });

    expect(response.status).toBe(500);
  });

  it('should return each customer', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'Jane',
        address: {
          street: 'Street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      });

    await request(app)
      .post('/customer')
      .send({
        name: 'Jhon',
        address: {
          street: 'Street',
          number: 123,
          city: 'city',
          zip: 'zip',
        },
      });

    const all_customers = await request(app).get('/customer').send();
    const first_customer = all_customers.body.customers[0];
    const second_customer = all_customers.body.customers[1];

    expect(all_customers.status).toBe(200);
    expect(first_customer.name).toBe('Jane');
    expect(second_customer.name).toBe('Jhon');
    expect(all_customers.body.customers.length).toBe(2);
  });
});
