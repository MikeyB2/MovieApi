//  http://www.omdbapi.com?apikey=389ac1fa&s=
const YOUTUBE_SEARCH_URL = 'http://www.omdbapi.com?';
let query = '';

function getDataForMovies(searchText, callback) {
    console.log('test3');
    const query = {
        apikey: '389ac1fa',
        s: `${searchText}`,

    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function returnResults(movie) {
    return `
        <div class="row">
          <div class="column">
            <div class="card">
                <img src="${movie.Poster}">
                <h3>${movie.Title}</h3>
                <a onclick="movieSelected('${
                                movie.imdbID
                            }')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        </div>
    `
}

function displayMovies(data) {
    console.log(data);
    const movie = data.search.map((item, index) => returnResults(item));
    $('#movies').html(movie);
}

function watchSubmit() {
    $('#searchForm').submit(event => {
        event.preventDefault();
        const queryTarget = $(event.currentTarget).find('#searchText');
        query = queryTarget.val();
        queryTarget.val('');
        getDataForMovies(query, displayMovies);
    });
}

// $(document).ready(() => {
//     $('#searchForm').on('submit', e => {
//         event.preventDefault();
//         let searchText = $('#searchText').val();
//         getMovies(searchText);
//     });
// });

// function getMovies(searchText) {
//     console.log(searchText);
//     axios
//         .get('http://www.omdbapi.com?apikey=389ac1fa&s=' + searchText)
//         .then(response => {
//             console.log(response);
//             let movies = response.data.Search;
//             let output = '';
//             $.each(movies, (index, movie) => {
//                 output += `
//         <div class="row">
//           <div class="column">
//             <div class="card">
//                 <img src="${movie.Poster}">
//                 <h3>${movie.Title}</h3>
//                 <a onclick="movieSelected('${
//                                 movie.imdbID
//                             }')" class="btn btn-primary" href="#">Movie Details</a>
//             </div>
//           </div>
//         </div>`;
//             });

//             $('#movies').html(output);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

function movieSelected(id) {
    sessionStorage.setItem('movieId', id); //stores id locally in application tab session storage
    window.location = 'movie.html';
    return false;
}

function getMovieDetails() {
    let movieId = sessionStorage.getItem('movieId');
    const query = {
        apikey: '389ac1fa',
        i: movieId,

    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function movieDetailResults() {
    return `
<div class="detail-row">
  <div class="details-card">
    <img src="${movie.Poster}" class="thumbnail">
  </div>
  <div class="details-list">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
      <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
      <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
      <li class="list-group-item"><strong>Run Time:</strong> ${movie.Runtime}</li>
      <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
      <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
      <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
      <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
      <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
      <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
      <li class="list-group-item"><strong>Box Office:</strong> ${movie.BoxOffice}</li>
    </ul>
  </div>
</div>
<div class="plot-row">
  <div class="plot">
    <h3>Plot</h3>
    ${movie.Plot}
    <hr>
    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="index.html" class="btn btn-default">Back To Search</a>
    <a href="#" class="btn btn-primary">Buy Now</a>
  </div>
</div>
`;
}

function displayMovies(data) {
    console.log('test5', data);
    const movie = data.search.map((item, index) => movieDetailResults(item));
    $('#movies').html(movie);
}

$(watchSubmit);

// function getMovie() {
//     let movieId = sessionStorage.getItem('movieId');

//     axios.get('http://www.omdbapi.com?apikey=389ac1fa&i=' + movieId)
//         .then((response) => {
//             console.log(response);
//             let movie = response.data;

//             let output = `
//         <div class="detail-row">
//           <div class="details-card">
//             <img src="${movie.Poster}" class="thumbnail">
//           </div>
//           <div class="details-list">
//             <h2>${movie.Title}</h2>
//             <ul class="list-group">
//               <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
//               <li class="list-group-item"><strong>Type:</strong> ${movie.Type}</li>
//               <li class="list-group-item"><strong>Run Time:</strong> ${movie.Runtime}</li>
//               <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
//               <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
//               <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
//               <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
//               <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
//               <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
//               <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
//               <li class="list-group-item"><strong>Box Office:</strong> ${movie.BoxOffice}</li>
//             </ul>
//           </div>
//         </div>
//         <div class="plot-row">
//           <div class="plot">
//             <h3>Plot</h3>
//             ${movie.Plot}
//             <hr>
//             <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
//             <a href="index.html" class="btn btn-default">Back To Search</a>
//             <a href="#" class="btn btn-primary">Buy Now</a>
//           </div>
//         </div>
//       `;

//             $('#movie').html(output);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

// movie.title of omdb matches ebay searchResult.item.title get searchResult.item.itemId on click

// ebay tokens User:  MichaelB-movie-PRD-72630a405-65a0dfb8	
// Dev:  80ccc753-194c-4194-af41-70ddba9374e7	
// cert id client secret:  PRD-2630a4057ccf-f14e-494d-b752-6c89