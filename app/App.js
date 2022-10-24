import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Router } from "./components/Router.js";
import { Loading } from "./components/Loading.js";

export function App() {
    const $root = document.querySelector('#root');
    $root.innerHTML = '';

    $root.appendChild(Header());    
    $root.appendChild(Main());
    $root.appendChild(Loading());
    
    Router();
}