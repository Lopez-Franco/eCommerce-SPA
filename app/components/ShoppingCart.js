import { alertStock, changeIconCart, currency, getProductsCart } from "../helpers/functions.js";
import { ContinueShopping } from "./ContinueShopping.js";
import { EmptyCart } from "./EmptyCart.js";

export function ShoppingCart(products) {

  document.querySelector('#search').style.display = 'none';
  document.querySelector('#category').style.display = 'none';

  if (products.length > 0) {
    let $table = getTableCart(products);
    $table.appendChild(ContinueShopping());
    return $table;
  } else {
    return EmptyCart();
  }

}

function getTableCart(products) {
  const $cart = document.createElement('div');
  $cart.className = 'container';
  $cart.innerHTML = `
  <div class="row table-responsive-sm">
    <div>
      <table class="table table-striped table-hover table-sm align-middle caption-top table-cart bg-info bg-opacity-10">
      <caption><h3 class="text-white">Mi carrito</h3></caption>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imagen</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Importe</th>
            <th scope="col" class="text-center">X</th>
          </tr>
        </thead>
        ${tbodyProducts(products.slice(), document.createElement('tbody'), 1)}
      </table>
    </div>
  </div>
  `;

  $cart.querySelector('tbody').addEventListener('click', async (event) => {

    if (event.target.matches('.btn')) {

      let id = event.target.parentNode.parentNode.parentNode.attributes.id.textContent;
      if (event.target.matches('.btn-add')) {
        addUnit(id);
      } else if (event.target.matches('.btn-remove')) {
        removeUnit(id);
      } else if (event.target.matches('.btn-delet')) {
        let confirm = await alertConfirmDeletBuy();
        if (confirm) {
          deletProductLS(id);
          event.target.parentNode.parentNode.parentNode.remove();
          alertDeletBuy();
          changeIconCart();
          refreshShoppingCart(getProductsCart());
        }
      }

    }

  })

  return $cart;
}

function tbodyProducts(products, $tbody, i) {
  if (products.length > 0) {
    let p = products.shift();
    let { id, name, cost, image, units } = p;
    $tbody.innerHTML += `
    <tr id="${id}" class="text-bg-light">
      <th scope="row">${i++}</th>
      <td><img src="${image}" class="img-fluid img-thumbnail" alt="${name}"></td>
      <td title="${name}">${p.getName()}</td>
      <td><h6>${currency(cost)}</h6></td>
      <td>
          <div class="d-flex flex-nowrap justify-content-between">
            <a class="btn btn-light btn-remove">-</a> 
              <p>${units}</p> 
            <a class="btn btn-light btn-add">+</a>
          </div>

      </td>  
      <td><h5>${currency(cost * units)}</h5></td>
      <td>
        <div>
          <a class="btn btn-danger btn-delet">Eliminar</a>
        </div>
      </td>
    </tr>
    `
    return tbodyProducts(products, $tbody, i++);
  }

  return $tbody.innerHTML;
}

function addUnit(id) {
  let cartLS = getProductsCart();
  let index = cartLS.findIndex(item => item.id == id);
  if (cartLS[index].addUnit()) {
    localStorage.setItem('cart', JSON.stringify(cartLS));
    refreshShoppingCart(cartLS);
  } else {
    alertStock('Sin stock');
  }

}
function removeUnit(id) {
  let cartLS = getProductsCart();
  let index = cartLS.findIndex(item => item.id == id);
  if (cartLS[index].removeUnit()) {
    localStorage.setItem('cart', JSON.stringify(cartLS));
    refreshShoppingCart(cartLS);
  } else {
    alertStock('Las unidades deben ser superiores a 0');
  }

}
function deletProductLS(id) {
  let cartLS = getProductsCart();
  cartLS = cartLS.filter(element => element.id != id);
  localStorage.setItem('cart', JSON.stringify(cartLS));
}
function refreshShoppingCart(products) {
  let $main = document.querySelector('#main')
  $main.innerHTML = '';
  $main.appendChild(ShoppingCart(products));
}
const alertDeletBuy = () => {
  Swal.fire({
    position: 'top-end',
    width: '16em',
    icon: 'error',
    title: 'Eliminado del carrito',
    showConfirmButton: false,
    timer: 1500
  })
}
const alertConfirmDeletBuy = async () => {
  let confirm = false;
  await Swal.fire({
    title: '¿Eliminar producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
  }).then((result) => {
    confirm = result.isConfirmed;
  })
  return confirm;
}