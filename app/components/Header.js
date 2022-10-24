import { getIconCart } from "../helpers/functions.js";
import { Search } from "./Search.js";

export function Header() {
    const $header = document.createElement('nav');
    $header.className = 'navbar navbar-expand-lg bg-light sticky-top';

    $header.innerHTML = `
    <div class="container-fluid">
      <a class="navbar-brand" href="#/">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav me-auto mb-2 mb-lg-0 start-100">
            <li class="nav-item dropdown me-3" id="category">
             ${Categories()}
            </li>          
            <li class="nav-item li-search">
                
            </li>    
        </ul>
        <a href="#/cart" class="btn btn-outline-secondary">${getIconCart().outerHTML}</a>
      </div>
    </div>
    `;

    //Search lo agrego asi por los eventos
    $header.querySelector('.li-search').appendChild(Search());

    return $header;
}

function Categories(){
    let $dropDown = '';
    $dropDown = 
    `
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
    Categorías
    </button>
    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" id="categories">
      <li><a class="dropdown-item" href="#/category/procesadores">Procesadores</a></li>
      <li><a class="dropdown-item" href="#/category/motherboards">Motherboards</a></li>
      <li><a class="dropdown-item" href="#/category/memorias">Memorias</a></li>
      <li><a class="dropdown-item" href="#/category/monitores">Monitores</a></li>
      <li><a class="dropdown-item" href="#/category/discos">Discos</a></li> 
      <li><a class="dropdown-item" href="#/category/noexiste">No existe</a></li>
    </ul>
    `;
    return $dropDown;
}