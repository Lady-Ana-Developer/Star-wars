let personajesUl = document.querySelector('#personajes');
let btnNext = document.querySelector('.botones div:last-child');
let btnPrev = document.querySelector('.botones div:first-child');
let seccionPersonaje = document.querySelector('#vistaPersonaje');


function pintarPersonajes(pLista, pAnterior, pSiguiente) {
    personajesUl.innerHTML = "";
    //console.log(pLista);
    for (personaje of pLista) {
        let li = document.createElement('li');
        let nombrePersonaje = document.createTextNode(personaje.name);

        li.dataset.url = personaje.url;

        li.appendChild(nombrePersonaje);
        personajesUl.appendChild(li);
        li.addEventListener('click', recogerInfoPersonaje);
    }

    btnNext.dataset.page = pSiguiente;
    btnPrev.dataset.page = pAnterior;

    btnNext.style.display = (pSiguiente == "") ? 'none' : 'block';
    btnPrev.style.display = (pAnterior == "") ? 'none' : 'block';

    btnNext.addEventListener('click', irPagina);
    btnPrev.addEventListener('click', irPagina);
}

function irPagina(event) {
    let pagina = event.target.dataset.page;
    getSwapi(pagina);
}

function recogerInfoPersonaje(event) {
    let urlPersonaje = event.target.dataset.url;
    //console.log(urlPersonaje);
    getSwapiInfo(urlPersonaje, 'people');
}

function pintarPersonaje(pObjetoPersonaje) {
    // console.log(pObjetoPersonaje);
    seccionPersonaje.innerHTML = `<h2>${pObjetoPersonaje.name}</h2>
                <ul>
                    <li>Altura: ${pObjetoPersonaje.height}</li>
                    <li>Peso: ${pObjetoPersonaje.mass}</li>
                    <li>Color de piel: ${pObjetoPersonaje.skin_color}</li>
                    <li>Color de pelo; ${pObjetoPersonaje.hair_color}</li>
                    <li>Genero: ${pObjetoPersonaje.gender}</li>
                    <li>Año de nacimiento: ${pObjetoPersonaje.birth_year}</li>
                </ul>
                <h2>Peliculas en las que aparece</h2>
                <div class="peliculas"></div>`
    let films = pObjetoPersonaje.films;
    for (film of films) {
        getSwapiInfo(film, 'film');
    }
}

function pintarFilm(pObjetoFilm) {
    // console.log('film', pObjetoFilm);
    //en este momento si existe el div peliculas por que ya he cargado la info del personaje y pintado un template,  luego puedo capturar con DOM el div peliculas antes no existia luego podia capturarlo.

    let divPeliculas = document.querySelector('.peliculas');

    divPeliculas.innerHTML += `<article>
                        <h3>${pObjetoFilm.title}</h3>
                        <ul>
                            <li>Capitulo: ${pObjetoFilm.episode_id} </li>
                            <li>Director: ${pObjetoFilm.director}</li>
                            <li>Año: ${pObjetoFilm.release_date}</li>
                        </ul>
                    </article>`;



}
