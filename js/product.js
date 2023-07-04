export default class Product {
  constructor(id = 1, productName = '', image = '', unitPrice = 0) {
    this.id = id;
    this.productName = productName;
    this.image = image;
    this.unitPrice = unitPrice;
  }
}

export const tShirt = new Product(
  1,
  'Blue T-Shirt',
  './asset/t-shirt.jpg',
  500
);
export const formalShirt = new Product(
  2,
  'Gray Shirt',
  './asset/shirt.jpg',
  600
);
export const jeansPant = new Product(3, 'Blue Jeans', './asset/pant.jpg', 700);
export const shoe = new Product(4, 'Sport Shoe', './asset/shoe.jpg', 800);
export const products = [tShirt, formalShirt, jeansPant, shoe];
