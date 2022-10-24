import { getProducts, getProductsCart, shoppingSummary } from "../helpers/functions.js";
import { ContainerCards } from "./ContainerCards.js";
import { Categories } from "./Categories.js";
import { ShoppingCart } from "./ShoppingCart.js";
import { Checkout } from "./Checkout.js";

export async function Router() {
    let { hash } = location;
    let $main = document.querySelector("#main");

    if (!hash || hash === '#/') {

        $main.appendChild(ContainerCards(await getProducts()));

    } else if (hash.includes('#/category')) {

        $main.appendChild(await Categories());

    } else if (hash === '#/cart') {

        $main.appendChild(ShoppingCart(getProductsCart()));

    } else if (hash === '#/checkout') {

        $main.appendChild(await Checkout(shoppingSummary()));

    }

    document.querySelector('.loading').style.display = 'none';
}