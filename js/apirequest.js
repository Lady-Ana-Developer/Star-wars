//https://swapi.dev/api/people //lista de personajes
//https://swapi.dev/api/films //para lista de peliculas
//https://swapi.dev/api/people/1 //para traerme la info de un personaje concreto

function getSwapi(pPage) {
    let url = 'https://swapi.dev/api/people/?page=' + pPage;
    let peticion = new XMLHttpRequest();
    peticion.open('GET', url, true);
    peticion.send();
    peticion.addEventListener('load', event => {
        //evento
        let texto = event.target.responseText;
        let objetoSwapi = JSON.parse(texto);
        //console.log(objetoSwapi);
        let listaPersonajes = objetoSwapi.results;

        let next = (objetoSwapi.next != null) ? objetoSwapi.next.split('=')[1] : "";

        let prev = (objetoSwapi.previous != null) ? objetoSwapi.previous.split('=')[1] : "";

        //console.log(next, prev);
        pintarPersonajes(listaPersonajes, prev, next);
    })
}
getSwapi(1);


function getSwapiInfo(pUrl, pTipo) {
    let peticion = new XMLHttpRequest();
    peticion.open('GET', pUrl, true);
    peticion.send();
    peticion.addEventListener('load', event => {
        if (event.target.status == 200) {
            let texto = event.target.responseText;
            let objetoSwapiInfo = JSON.parse(texto);
            //console.log(objetoSwapiPersonaje);
            if (pTipo == "people") {
                pintarPersonaje(objetoSwapiInfo);
            }
            else {
                pintarFilm(objetoSwapiInfo)
            }

        }
    })

}