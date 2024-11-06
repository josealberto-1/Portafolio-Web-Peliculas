// URL de la API para obtener las películas más populares
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

// Ruta base para las imágenes de las películas en The Movie Database (TMDb)
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

// URL de la API para buscar películas por nombre
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// Selecciona el contenedor principal donde se mostrarán las películas
const main = document.getElementById('main')

// Selecciona el formulario de búsqueda y el campo de texto
const form = document.getElementById('form')
const search = document.getElementById('search')

// Obtiene y muestra las películas iniciales llamando a la función `getMovies`
getMovies(API_URL)

async function getMovies(url) {
    // Realiza una solicitud a la API y Convierte la respuesta en formato JSON
    const res = await fetch(url)
        
    const data = await res.json()

    showMovies(data.results)
}

// Función para mostrar las películas en la página
function showMovies(movies) {
    // Limpia el contenedor principal antes de agregar nuevas películas
    main.innerHTML = ''

    // Recorre cada película en el array de películas
    movies.forEach((movie) => {
        // Aqui Utilize las propiedades necesarias de cada objeto de película
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        // Define el contenido HTML para el elemento de la película, incluyendo imagen, título, calificación y descripción
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        // Añade el elemento de película al contenedor principal
        main.appendChild(movieEl)
    })
}

// Función para determinar la clase CSS de la calificación según el puntaje
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green' // Calificación alta
    } else if (vote >= 5) {
        return 'orange' // Calificación media
    } else {
        return 'red' // Calificación baja
    }
}

// Escucha el evento `submit` del formulario para manejar la búsqueda de películas
form.addEventListener('submit', (e) => {
    e.preventDefault() 

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        // Si el campo está vacío, recarga la página para mostrar las películas populares
        window.location.reload()
    }
})