export class Product {
    constructor(id, name, cost, stock, image, units, category, brand) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.stock = parseInt(stock);
        this.image = image;
        this.units = parseInt(units);
        this.category = category;
        this.brand = brand;
    }
    getName() {
        if (this.name.length < 50) {
            return this.name;
        }
        return this.name.slice(0, 50) + '...';
    }
    addUnit() {
        if (this.stock > 0) {
            this.units += 1;
            this.stock -= 1;
            return true;
        }
        return false;
    }
    removeUnit() {
        if (this.units > 1) {
            this.units -= 1;
            this.stock += 1;
            return true;
        }
        return false
    }
    total() {
        return this.units * this.cost;
    }
}