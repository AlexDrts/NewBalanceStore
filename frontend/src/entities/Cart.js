export class Cart {
  products;
  deliveryPrice;

  constructor(products = [], deliveryPrice = 0) {
    this.products = products;
    this.deliveryPrice = deliveryPrice;
  }

  addProduct(product, color, size) {
    const existingItem = this.products.find(item =>
        item.productId === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) {
      if (existingItem.quantity >= 5) {
        return;
      }

      ++existingItem.quantity;
    }
    else {
      this.products.push({
        productId: product.id,
        color,
        size,
        quantity: 1
      });
    }
  }

  updateQuantity(productId, color, size, quantity) {
    const item = this.products.find(item =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
    );

    if (item) {
      item.quantity = quantity;
    }
  }

  removeProduct(productId, color, size) {
    this.products = this.products.filter(item =>
        !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
        )
    );
  }

  getItems(products) {
    const items = [];

    for (const item of this.products) {

      const product = products.find(p => p.id === item.productId);

      items.push({
        productId: item.productId,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        product: product
      });

    }

    return items;
  }

  getSubtotal(products) {
    let subtotal = 0;

    const items = this.getItems(products);

    for (const item of items) {
      subtotal += item.product.price * item.quantity;
    }

    return subtotal;

  }

  getProductCount() {
    let count = 0;

    for (const item of this.products) {
      count += item.quantity;
    }

    return count;
  }

  isEmpty() {
    return this.products.length === 0;
  }

  getTax(products) {
    return this.getSubtotal(products) * 0.08;
  }

  getTotal(products) {
    return this.getSubtotal(products) + this.getTax(products);
  }

  getOriginalPrice(products) {
    let total = 0;

    const items = this.getItems(products);

    for (const item of items) {
      let price;

      if (item.product.hasDiscount()) {
        price = item.product.oldPrice;
      }
      else {
        price = item.product.price;
      }

      total += price * item.quantity;
    }

    return total;
  }

  getSavings(products) {
    return this.getOriginalPrice(products) - this.getSubtotal(products);
  }
}
