import { alertRedirectHome, currency } from "../helpers/functions.js";

export async function Checkout(summary) {
    document.querySelector('.loading').style.display = 'none';
    document.querySelector('#search').style.display = 'none';
    document.querySelector('#category').style.display = 'none';

    await alertLoadingPurchase();

    return getPurchaseSummary(summary);
}

function getPurchaseSummary(summary){
    let { quantity, total } = summary;
    let $section = document.createElement('section');
    $section.className = 'container p-4';
    $section.innerHTML =
        `
    <div class="col card py-3 mb-4 rounded-3 shadow-sm border-dark">
        <h2 class="text-center">Resumen de compra</h2>
        <div class="d-flex flex-column rounded-3 p-3 bg-light">
            <span class="fs-5">Productos: <strong>${quantity}</strong></span>
            <hr>
            <span class="fs-5">
                <p>Envio <a class="text-success text-decoration-none">Gratis</a></p>
            </span>
            <hr>
            <span class="fs-4">Pagás <strong>${currency(total)}</strong></span>
        </div>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success btn-confirm mt-4" style="width: max-content;">Confirmar compra</button>
        </div>
    </div>
    `;
    $section.addEventListener('click', async (event) => {
        if (event.target.matches('.btn-confirm')) {
            localStorage.removeItem('cart');
            let msg = '<h1 class="text-success p-3 bg-info bg-opacity-10 border border-info rounded">Muchas gracias por tu compra!</h1>';
            await alertRedirectHome(msg);
        }
    })
    return $section;
}
async function alertLoadingPurchase(){
    await Swal.fire({
        title: 'Preparando todo para tu compra',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        }
    })
}