import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Pokemons from './Pokemon.js';
    
window.onload = function () {
    ReactDOM.render(<Pokemons />, document.getElementById('content'));
    registerServiceWorker();
}


