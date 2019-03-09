(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  //   const DOM
  const genreList = document.getElementById('genre-list')
  const dataPanel = document.getElementById('data-panel')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  axios
    .get(INDEX_URL)
    .then(response => {
      data.push(...response.data.results)
      displayMovieGenre(data)
    })
    .catch(error =>
      console.log(error))

  // EventListener
  genreList.addEventListener('click', event => {
    if (event.target.matches('.nav-link')) {
      const movie = []
      for (i of data) {
        if (i.genres.includes(parseInt(event.target.dataset.genre))) {
          movie.push(i)
        }
      }
      displayMovieGenre(movie)
    }
  })

  function displayMovieGenre(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-8 col-md-2">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
      `
      // genre number change to str 
      let displayGenre = item.genres
      for (genreNum of displayGenre) {
        htmlContent += `
          <label>${genres[genreNum]}</label>
        `
        console.log(genres[genreNum])
      }
      htmlContent += ` 
            </div> 
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }
})()