import { arrayProducts } from "../helpers/variables.js";
import { ContainerCards } from "./ContainerCards.js";
export function Search(){
    const $input = document.createElement('input');

    $input.className = 'form-control me-2';
    $input.id = 'search';
    $input.name = 'search';
    $input.type = 'search';
    $input.placeholder = 'Buscar';

    $input.addEventListener('input',(event)=>{
        let search = event.target.value.toUpperCase();        
        let searchProducts;
        let $main = document.querySelector('#main');
        $main.innerHTML = '';
        searchProducts = arrayProducts.filter(e => e.name.toUpperCase().indexOf(search) >= 0);
        $main.appendChild(ContainerCards(searchProducts));
    })

    return $input;
}