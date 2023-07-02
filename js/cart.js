const productList = document.getElementById('product-list');
const cartTable = document.getElementById('cart-table');
const clearCart = document.getElementById('clear-cart');

class Product {
  constructor(id = 1, productName = '', image = '', unitPrice = 0) {
    this.id = id;
    this.productName = productName;
    this.image = image;
    this.unitPrice = unitPrice;
  }
}

class Cart {
  constructor(items = [], total = 0) {
    this.items = items;
    this.total = total;
  }

  addItem(product) {
    if (!product) return;

    const index = this.items.findIndex(
      (item) => item.id === Number(product.id)
    );

    if (index > -1) {
      this.items[index].quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  clear() {
    this.items = [];
  }
}

class UI {
  constructor() {}

  updateCart(items = []) {
    if (items.length === 0) {
      cartTable.innerHTML = `
            <tr>
                <p>No items in the cart!</p>
            </tr>
        `;
      return;
    }

    let rows = '';
    items.forEach((item, index) => {
      rows += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.productName}</td>
          <td>
            <img class="td_img" src="${item.image}" alt="${item.productName}" />
          </td>
          <td>${item.unitPrice}</td>
          <td>
            <button class="btn btn-danger">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-info">+</button>
          </td>
        </tr>
      `;
    });
    cartTable.innerHTML = rows;
  }
}

async function main() {
  const cart = new Cart();
  const ui = new UI();

  // Create 3 Products for Now
  const tShirt = new Product(1, 'Blue T-Shirt', './asset/t-shirt.jpg', 500);
  const formalShirt = new Product(2, 'Gray Shirt', './asset/shirt.jpg', 600);
  const jeansPant = new Product(3, 'Blue Jeans', './asset/pant.jpg', 700);

  const products = [tShirt, formalShirt, jeansPant];

  clearCart.addEventListener('click', () => {
    cart.clear();
    ui.updateCart();
  });

  products.forEach((product) => {
    productList.innerHTML += `
      <div class="col-lg-4">
        <div class="card">
        <img src="${product.image}" alt="${product.productName}" />
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">
            BDT. 
            ${product.unitPrice}
            </p>
            <button
              class="btn btn-success"
              data-id="${product.id}"
              data-image="${product.image}"
              data-name="${product.productName}"
              data-price="${product.unitPrice}"
              type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });

  const addBtns = document.querySelectorAll('.add_btn');
  for (let i = 0; i < addBtns.length; i++) {
    addBtns[i].addEventListener('click', (e) => {
      const btn = e.target;
      const dataset = btn.dataset;
      cart.addItem({
        ...dataset,
        id: Number(dataset.id),
        price: Number(dataset.price),
      });
      alert(JSON.stringify(cart.items, null, 2));
    });
  }
}

main();
