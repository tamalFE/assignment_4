import Cart from './cart.js';
import { products } from './product.js';
import UI from './ui.js';

const clearCart = document.getElementById('clear-cart');

function main() {
  const cart = new Cart();
  const ui = new UI(cart);

  clearCart.addEventListener('click', () => {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;
    cart.clear();
    ui.updateCart();
  });

  ui.generateProductCards(products);

  const addBtns = document.querySelectorAll('.add-btn');
  ui.attachAddEvent(addBtns);
}

main();
