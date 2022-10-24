export async function ajax(props) {
    let { url, callback } = props;
    await fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            let $main = document.querySelector('#main');
            $main.innerHTML = '';
            $main.appendChild(msgError(error));
        });
}

function msgError(error){
    let $error = document.createElement('div');
    $error.className = 'error';
    $error.innerHTML = `
    <div class="error text-center border bg-danger h5 m-5">
        <p class="h1 p-1 border">Se produjo un error inesperado</p>
        <p>${error}</p>
        <p>${error.status}</p>
        <p>${error.statusText}</p>
    </div>
    `;
    return $error;
}