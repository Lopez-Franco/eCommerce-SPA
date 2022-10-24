import { Card } from "./Card.js";
import { Product } from "../class/Product.js";
import { arrayProducts } from "../helpers/variables.js";
import { getProductsCart, changeIconCart, alertStock, alertBuy } from "../helpers/functions.js";

export function ContainerCards(items) {
    const $div = document.createElement('div');
    $div.id = "container";
    $div.className = 'd-flex flex-wrap justify-content-evenly m-2';

    items.map(element => {
        $div.appendChild(Card(element));
    });

    $div.addEventListener('click', (event) => {
        if (event.target.matches('.btn-buy')) {
            let id = event.target.parentNode.attributes[1].textContent;
            saveProductLS(id);
            changeIconCart();
        }
    });

    return $div;
}

function saveProductLS(id) {
    let cartLS = getProductsCart();
    let product;
    if (cartLS.length > 0) {
        product = cartLS.find(element => element.id === id);
        if (product) {
            if (!product.addUnit()) {
                alertStock('No pudimos agregar más unidades del producto a tu carrito');
                return;
            }
        }
    }
    if (!product) {
        for (const p of arrayProducts) {
            if (p.id === id) {
                product = new Product(id, p.name, p.cost, p.stock - 1, p.image, 1);
                cartLS.push(product);
                break;
            }
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartLS));
    alertBuy();
}
