const productList = document.getElementById('product-list');

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
}

async function main() {
  const cart = new Cart();
  // Create 3 Products for Now
  const tShirt = new Product(1, 'Blue T-Shirt', './asset/t-shirt.jpg', 500);
  const formalShirt = new Product(2, 'Gray Shirt', './asset/shirt.jpg', 600);
  const jeansPant = new Product(3, 'Blue Jeans', './asset/pant.jpg', 700);

  const products = [tShirt, formalShirt, jeansPant];

  products.forEach((product) => {
    productList.innerHTML += `
      <div class="col-lg-4">
        <!-- <div class="card">
          <div class="card-image">
            <img src="${product.image}" alt="${product.productName}" />
          </div>
          <div class="card-content">
            <h2 class="product-name">${product.productName}</h2>
            <p class="product-price">${product.unitPrice} tk</p>
            <button
              class="add_btn"
              data-id="${product.id}"
              data-image="${product.image}"
              data-name="${product.productName}"
              data-price="${product.unitPrice}"
              type="button">
              Add to Cart
            </button>
          </div>
        </div> -->
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
      console.log('cart now:', cart.items);
    });
  }
}

main();
