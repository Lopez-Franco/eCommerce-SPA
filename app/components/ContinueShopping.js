import { currency, getProductsCart } from "../helpers/functions.js";
export function ContinueShopping(){
    let cart = getProductsCart();
    let total = 0;
    cart.forEach(element => {
        total += element.units * element.cost;
    });
    let $div = document.createElement('div');
    $div.className = 'float-end';
    $div.innerHTML = `
        <div class="card border-dark" style="max-width: 18rem;">
            <div class="card-body bg-ligth">
                <h5 class="card-title ">Total: ${currency(total)}</h5>
                <div class="text-center">
                    <a href="#/checkout" class="btn btn-success btn-lg btn-block">Continuar compra</a>
                </div>
            </div>
        </div>
    `;
    return $div;
}