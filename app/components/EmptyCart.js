export function EmptyCart(){
    let $div = document.createElement('div');
    $div.className = 'text-center p-5';
    $div.innerHTML = `
    <h2>Tu carrito está vacío</h2>
    <img src="app/multimedia/emptycart.png" alt="">
    <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
    `;
    return $div;
}