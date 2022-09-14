










const main = document.querySelector('.main');

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err =>  console.log(err));
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"><img src="img/pre.png" alt=""></button>
        <h1 class="movie-category">${category.split("_").join(" ")}</h1>
        <div class="movie-container" id="${category}">
        </div>
        <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
    </div>
    `;
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${img_url}${item.backdrop_path}" alt="">
            <p class="movie-title">${item.title}</p>
        </div>
        `;

        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            }, 500);
        }
    })
}














// const main = document.querySelector(".main");
// fetch(genres_list_http + new URLSearchParams({ api_key: api_key }))
//   .then((res) => res.json())
//   .then((data) => {
//     data.genres.forEach((item) => {
//       PeliculasListaGeneros(item.id, item.name);
//     });
//     //console.log(data)
//     //0: {id: 28, name: 'Action'}
//     //1: {id: 12, name: 'Adventure'}
//   });

// PeliculasListaGeneros = (id, generos) => {
//   fetch(
//     movie_genres_http +
//       new URLSearchParams({
//         api_key: api_key,
//         with_genres: id,
//         page: Math.floor(Math.random() * 3) + 1,
//       })
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       CategoriaElemento(`${generos}_movies`, data.results);
//     })
//     .catch((err) => console.log(err));
// };

// const CategoriaElemento = (category, data) => {
//   main.innerHTML += `
// <div class="movie-list">
// <button class="pre-btn"><img src="img/pre.png" alt=""></button>
// <h1 class="movie-category">${category.split("_").join(" ")}</h1>
// <div class="movie-container" id="${category}">
 
// </div>
// <button class="nxt-btn"><img src="img/nxt.png" alt=""></button>
// </div>

// `;
//   hechocards(category, data);
// };

// const hechocards = (id, data) => {
//   const peliculacontainer = document.getElementById(id);
//   data.forEach((item, i) => {
//     if(item.backdrop_path == null){
//       item.backdrop_path = item.poster_path;
//       if(item.backdrop_path == null){
//           return;
//       }
//   }
//     peliculacontainer.innerHTML += `
//   <div class="movie">
//   <img src="${img_url}${item.backdrop_path}" alt="">
//   <p class="movie-title">${item.title}</p>
//   </div>
  
//   `;
//   });
// };
