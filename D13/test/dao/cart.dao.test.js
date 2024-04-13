import mongoose from "mongoose";
import { expect } from 'chai';
import CartDao from "../../src/services/dao/mongo/cart.dao.js";
import { cartModel } from "../../src/models/cart.model.js";

describe('CartDAO', function () {

  before(async function () {
    this.timeout(5000);
    await mongoose.connect(`mongodb+srv://test:test@cluster0.pu728w1.mongodb.net/ecommerce-test?retryWrites=true&w=majority`);
  });

  beforeEach(async function () {
    await cartModel.deleteMany({});
  });

  describe('#createCart()', function () {
    it('debería crear un nuevo carrito', async function () {
      const cartDao = new CartDao();
      const newCart = await cartDao.createCart('user123');
      expect(newCart.userId).to.equal('user123');
      expect(newCart.products).to.be.an('array').that.is.empty;
    });
  });

  describe('#getCartById()', function () {
    it('debería obtener un carrito por su ID', async function () {
      const sampleCart = await cartModel.create({ userId: 'user123' });
      const cartDao = new CartDao();
      const foundCart = await cartDao.getCartById(sampleCart._id);
      expect(foundCart.userId).to.equal('user123');
    });
  });

});