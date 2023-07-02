const productList = document.getElementById('product-list');
const cartTable = document.getElementById('cart-table');
const clearCart = document.getElementById('clear-cart');
const cartTotal = document.getElementById('cart-total');

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

  removeItem(id) {
    if (!id) return;

    const found = this.items.find((item) => item.id === id);

    if (!found) return;

    if (found.quantity > 1) {
      const index = this.items.findIndex((item) => item.id === id);
      this.items[index].quantity--;
      return;
    }

    const newItems = this.items.filter((item) => item.id !== id);
    this.items = newItems;
  }

  clear() {
    this.items = [];
  }
}

class UI {
  constructor(cart) {
    this.cart = cart;
  }

  updateTotal() {
    const total = this.cart.items.reduce((acc, curr) => {
      return (acc += curr.quantity * curr.unitPrice);
    }, 0);
    cartTotal.innerText = `Total: BDT. ${total}`;
  }

  updateCart(items = []) {
    if (items.length === 0) {
      cartTotal.style.display = 'none';
      cartTable.innerHTML = `
      <tr>
      <p>No items in the cart!</p>
      </tr>
      `;
      return;
    }

    cartTotal.style.display = 'block';

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
            <button class="btn btn-danger remove-btn" data-id="${
              item.id
            }">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-info add-btn" data-id="${item.id}"
            data-image="${item.image}"
            data-name="${item.productName}"
            data-price="${item.unitPrice}">+</button>
          </td>
        </tr>
      `;
    });
    cartTable.innerHTML = rows;
    const addBtns = cartTable.querySelectorAll('.add-btn');
    this.attachAddEvent(addBtns);

    const removeBtns = document.querySelectorAll('.remove-btn');
    this.attachRemoveEvent(removeBtns);

    this.updateTotal();
  }

  attachAddEvent(buttons) {
    if (!buttons || !this.cart) return;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        const btn = e.target;
        const dataset = btn.dataset;
        this.cart.addItem({
          id: Number(dataset.id),
          price: Number(dataset.price),
          productName: dataset.name,
          unitPrice: Number(dataset.price),
          image: dataset.image,
        });
        this.updateCart(this.cart.items);
      });
    }
  }

  attachRemoveEvent(buttons) {
    if (!buttons || !this.cart) return;
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        const btn = e.target;
        const dataset = btn.dataset;
        this.cart.removeItem(Number(dataset.id));
        this.updateCart(this.cart.items);
      });
    }
  }
}

async function main() {
  const cart = new Cart();
  const ui = new UI(cart);

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
      <div class="col-lg-6">
        <div class="card">
        <img src="${product.image}" alt="${product.productName}" />
          <div class="card-body">
            <h5 class="card-title">${product.productName}</h5>
            <p class="card-text">
            BDT. 
            ${product.unitPrice}
            </p>
            <button
              class="btn btn-success add-btn"
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

  const addBtns = document.querySelectorAll('.add-btn');
  ui.attachAddEvent(addBtns);

  //   const removeBtns = document.querySelectorAll('.remove-btn');
  //   ui.attachRemoveEvent(removeBtns);
}

main();
