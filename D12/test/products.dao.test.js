import mongoose from "mongoose";
import ProductDao from '../src/services/dao/mongo/product.dao.js'
import { productModel } from '../src/models/product.model.js';
import Assert from 'assert'

const assert = Assert.strict

describe('ProductDAO', function () {
  let productDao;

  before(async function () {
    // Conéctate a la base de datos de prueba
    await mongoose.connect(`mongodb+srv://test:test@cluster0.pu728w1.mongodb.net/ecommerce-test?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // Configura el ProductDAO
    productDao = new ProductDao();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  describe('#addProduct()', function () {
    it('debería agregar un nuevo producto a la bdd', async function () {
      // Given
      const productData = {
        title: 'Product Title',
        description: 'Product Description',
        price: 10.99,
        code: 'ABC123',
        status: true,
      };

      // When
      await productDao.addProduct(productData);

      // Then
      const product = await productModel.findOne({ code: 'ABC123' });
      assert.strictEqual(product.title, 'Product Title');
      assert.strictEqual(product.description, 'Product Description');
      assert.strictEqual(product.price, 10.99);
      assert.strictEqual(product.code, 'ABC123');
      assert.strictEqual(product.status, true);
    });
  });

  describe('#getAllProducts()', function () {
    it('debería obtener todos los productos de la bdd', async function () {
      // When
      const allProducts = await productDao.getAllProducts({});

      // Then
      assert.strictEqual(Array.isArray(allProducts), true);
    });
  });

});