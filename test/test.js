import chai from 'chai';
import ProductManager from '../models/ProductManager.js';

const { assert } = chai;

describe('Product Manager', () => {

  const pm = new ProductManager('./test/', 'productosTEST.json');

  it('should initialize correctly or create the file if not exist', () => {
    
    let products = pm.getProducts();
    assert.equal(products.length === 0);
  });

  // Add more test cases as needed
});