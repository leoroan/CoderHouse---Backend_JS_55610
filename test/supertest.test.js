import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('http://localhost:8080');

describe('Pruebas de la API', () => {
  it('Debería obtener una respuesta exitosa', async () => {
    const response = await request.get('/api-docs/');
    expect(response.status).to.equal(200);
  });

});

describe('Obtener un producto por ID', () => {  
  it('Debería devolver un producto válido cuando se proporciona un ID válido', async () => {
    const response = await request.get(`/api/products/657a35033177e7c4d870e88b`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('title', 'Refrigerador FrostFree 400L');
    expect(response.body).to.have.property('price', 799.99);
    expect(response.body).to.have.property('code', 'REF008');
    expect(response.body).to.have.property('status', true);
  });
});