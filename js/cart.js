export default class Cart {
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
