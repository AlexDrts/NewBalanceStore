export class Order {
    constructor({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    streetAddress,
                    newsletter,
                    products,
                    subtotal,
                    tax,
                    total,
                }) {
        this.id = Date.now();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.streetAddress = streetAddress;
        this.newsletter = newsletter;
        this.products = products;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total.toFixed(2);
        this.date = new Date().toISOString();
        this.status = "Pending";
    }

    getTotal() {
        return Number(this.total);
    }

    getProductCount() {
        return this.products.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

    markAsPaid() {
        this.status = "Paid";
    }

    cancel() {
        this.status = "Cancelled";
    }
}