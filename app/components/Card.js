import { currency } from "../helpers/functions.js";
export function Card(item) {
  let { category, brand, name, cost, stock, image, id } = item;
  const $card = document.createElement('div');
  $card.className = 'card shadow-sm m-2 h-100 card-product';
  $card.style.width = '18rem';
  $card.title = category;
  $card.innerHTML = `
    <img class="card-img-top" src="${image}" alt="${name}">
    <div class="card-body bg-light">
      <div class="clearfix mb-3">
        <span class="float-start badge rounded-pill bg-primary">${brand}</span>
        <h4 class="float-end card-title">${currency(cost)}</h4>
      </div>
        <h6>Disponibles: ${stock}</h6>
        <p class="card-text">${item.getName()}</p>
      <div class="text-center" data-id="${id}"><a class="btn btn-primary btn-buy">Agregar al carrito</a></div>
    </div>
  `;
  return $card;
}
