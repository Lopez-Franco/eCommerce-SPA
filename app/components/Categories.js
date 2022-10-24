import { alertRedirectHome } from "../helpers/functions.js";
import { arrayProducts } from "../helpers/variables.js";
import { ContainerCards } from "./ContainerCards.js";

export async function Categories() {
    let category = location.hash;
    category = category.slice(category.lastIndexOf('/') + 1);
    let filterProducts;
    switch (category) {
        case 'motherboards':
            filterProducts = arrayProducts.filter(product => product.category === 'MOTHERBOARD');
            break;
        case 'memorias':
            filterProducts = arrayProducts.filter(product => product.category === 'MEMORIA');
            break;
        case 'monitores':
            filterProducts = arrayProducts.filter(product => product.category === 'MONITOR');
            break;
        case 'procesadores':
            filterProducts = arrayProducts.filter(product => product.category === 'PROCESADOR');
            break;
        case 'discos':
            filterProducts = arrayProducts.filter(product => product.category === 'DISCO');
            break;
        default:
            document.querySelector('.loading').style.display = 'none';
            await alertRedirectHome('<p class="text-danger">Categoria inexistente</p>');
            location.hash = '#/';
            location.reload();
            break;
    }

    return ContainerCards(filterProducts);
}