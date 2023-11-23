import { assert } from 'chai';
import ProductManager from '../models/ProductManager.js';

describe('Product Manager', () => {

  let productManager;

  beforeEach(() => {
    productManager = new ProductManager('./test/', 'productosTEST.json');
  });

  it('should initialize correctly or create the products array if not exist', () => {
    let products = productManager.getProducts();
    assert.equal(products.length, 0);
  });

  it('should add a new product', async () => {
    const productData = {
      title: 'Test Product',
      description: 'Test Description',
      price: 50,
      thumbnail: 'test-thumbnail.jpg',
      code: 'TEST001',
      stock: 5,
      category: 'Test Category'
    };

    await productManager.addProduct(productData);

    const products = productManager.getProducts();
    assert.equal(products.length, 1);
    assert.equal(products[0].title, 'Test Product');
  });

  it('should get all products', () => {
    const products = productManager.getProducts();
    assert.isArray(products);
  });

  it('should get a product by ID', () => {
    const productData = {
      title: 'Test Product',
      description: 'Test Description',
      price: 50,
      thumbnail: 'test-thumbnail.jpg',
      code: 'TEST001',
      stock: 5,
      category: 'Test Category'
    };

    productManager.addProduct(productData);

    const product = productManager.getProductById(1);
    assert.equal(product.title, 'Test Product');
  });

  it('should throw an error for an invalid ID', () => {
    assert.throws(() => productManager.getProductById('invalid'), 'Product ID must be a valid number');
  });

  afterEach(async () => {
    // Clean up after each test
    // For simplicity, you can remove the test file after each test
    // Note: This assumes you have implemented the 'saveProductsToFile' method in your ProductManager class
    await productManager.saveProductsToFile([]);
  });



  // Add more test cases as needed
});