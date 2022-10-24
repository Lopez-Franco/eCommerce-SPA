import { arrayProducts } from "../helpers/variables.js";
import { Product } from "../class/product.js";
import { ajax } from "../helpers/ajax.js";
import api from "../helpers/urls.js";

export async function getProducts() {
  await ajax({
    url: api.ALL,
    callback: (data) => {
      arrayProducts.length = 0;
      data.forEach(el => {
        let product = new Product(el.id, el.name, el.cost, el.stock, el.image, 0, el.category, el.brand);
        arrayProducts.push(product);
      });
    }
  });
  return arrayProducts;
}
export const currency = function (number) {
  return new Intl.NumberFormat('es-AR',
    {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    })
    .format(number);
}
export function getIconCart() {
  let $icon = document.createElement('img');
  $icon.id = 'icon-cart';
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    $icon.src = './app/multimedia/icons/bx-cart-add.svg';
  } else {
    $icon.src = './app/multimedia/icons/bx-cart.svg';
  }
  return $icon;
}
export function changeIconCart() {
  let $iconCart = document.querySelector('#icon-cart');
  $iconCart.src = getIconCart().src;
}
export function getProductsCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product;
  let Products = [];
  for (const p of cart) {
    product = new Product(p.id, p.name, p.cost, p.stock, p.image, p.units);
    Products.push(product);
  }
  return Products;
}
export function shoppingSummary() {
  let quantity = 0, total = 0;
  getProductsCart().forEach(element => {
    quantity += 1;
    total += element.total();
  });
  return { quantity, total };
}
export async function alertRedirectHome(msg) {
  let timerInterval;
  let i = 5;
  await Swal.fire({
    title: msg,
    html: 'Sera redireccionado al Home en <b>5</b>',
    timer: 5000,
    width: 600,
    padding: '3em',
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        i--
        b.textContent = i;
      }, 1000)
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  })
  location.hash = '#/';
  location.reload();
}
export function alertStock(msg) {
  Swal.fire({
    position: 'top-end',
    width: '16em',
    icon: 'error',
    title: msg,
    showConfirmButton: false,
    timer: 2500
  });
}
export const alertBuy = () => {
  Swal.fire({
    position: 'top-end',
    width: '16em',
    icon: 'success',
    title: 'Agregado a tu carrito',
    showConfirmButton: false,
    timer: 1500
  });
}
