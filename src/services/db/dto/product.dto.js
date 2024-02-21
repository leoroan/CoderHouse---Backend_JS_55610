class ProductDTO {
  constructor(id, title, description, price, oldPrice, thumbnail, code, stock, status, category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.oldPrice = oldPrice;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
  }
}

export { ProductDTO };