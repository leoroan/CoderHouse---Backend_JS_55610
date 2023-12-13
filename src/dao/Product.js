

class Product {
  constructor(id, title, description, price, thumbnail, code, stock, category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = true;
    this.category = category;
  }
}

export default Product;
