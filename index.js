//  http://www.omdbapi.com?apikey=389ac1fa&s=
const movie_SEARCH_URL = 'http://www.omdbapi.com?apikey=389ac1fa&';
let query = '';
///////////////////Get Initial search list of movies///////////////////////////
function watchSubmit() {
	$('#searchForm').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('#searchText');
		query = queryTarget.val();
		queryTarget.val('');
		getDataForMovies(query, dataMovies);
	});
	console.log(query);
}

function getDataForMovies(searchText, callback) {
	console.log('test3');
	const query = {
		s: `${searchText}`
	};
	$.getJSON(movie_SEARCH_URL, query, callback);
}

function dataMovies(data) {
	console.log('test5', data);
	const movie = data.Search.map((item, index) => displayMovies(item));
	$('#movies').html(movie);
}

function displayMovies(data) {
	console.log(data);
	let movie = returnResults(data);
	console.log(movie);
	return movie;
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
    `;
}

///////////////////Get Detail of selected movie///////////////////////////

function movieSelected(id) {
	console.log(id);
	sessionStorage.setItem('movieId', id); //stores id locally in application tab session storage
	window.location = 'movie.html';
	return false;
}

function getMovieDetails() {
	let movieId = sessionStorage.getItem('movieId');
	const query = {
		i: movieId
	};
	$.getJSON(movie_SEARCH_URL, query, detailedMovie);
}

function detailedMovie(data) {
	console.log('test7', data);
	const detailOfMovie = movieDetailResults(data);
	$('#movie').html(detailOfMovie);
	console.log('test8', detailOfMovie);
}

function movieDetailResults(movie) {
	let movieDetail = movie;
	console.log(movieDetail);
	return `
<div class="detail-row">
  <div class="details-card">
    <img src="${movieDetail.Poster}" class="thumbnail">
  </div>
  <div class="details-list">
    <h2>${movieDetail.Title}</h2>
    <ul class="list-group">
      <li class="list-group-item"><strong>IMDB Rating:</strong> ${
				movieDetail.imdbRating
			}</li>
      <li class="list-group-item"><strong>Type:</strong> ${
				movieDetail.Type
			}</li>
      <li class="list-group-item"><strong>Run Time:</strong> ${
				movieDetail.Runtime
			}</li>
      <li class="list-group-item"><strong>Genre:</strong> ${
				movieDetail.Genre
			}</li>
      <li class="list-group-item"><strong>Released:</strong> ${
				movieDetail.Released
			}</li>
      <li class="list-group-item"><strong>Rated:</strong> ${
				movieDetail.Rated
			}</li>
      <li class="list-group-item"><strong>Director:</strong> ${
				movieDetail.Director
			}</li>
      <li class="list-group-item"><strong>Writer:</strong> ${
				movieDetail.Writer
			}</li>
      <li class="list-group-item"><strong>Actors:</strong> ${
				movieDetail.Actors
			}</li>
      <li class="list-group-item"><strong>Awards:</strong> ${
				movieDetail.Awards
			}</li>
      <li class="list-group-item"><strong>Box Office:</strong> ${
				movieDetail.BoxOffice
			}</li>
    </ul>
  </div>
</div>
<div class="plot-row">
  <div class="plot">
    <h3>Plot</h3>
    ${movieDetail.Plot}
    <hr>
    <a href="http://imdb.com/title/${
			movieDetail.imdbID
		}" target="_blank" class="btn btn-primary">View IMDB</a>
    <a href="index.html" class="btn btn-default">Back To Search</a>
    <a href="#" id="buyNow" class="btn btn-primary">Buy Now</a>
  </div>
</div>
`;
}

///////////////////Get Ebay results///////////////////////////

// movie.title of omdb matches ebay searchResult.item.title get searchResult.item.itemId on click

// ebay tokens User:  MichaelB-movie-PRD-72630a405-65a0dfb8
// Dev:  80ccc753-194c-4194-af41-70ddba9374e7
// cert id client secret:  PRD-2630a4057ccf-f14e-494d-b752-6c89
// onclick="ebayFunction('${movie.imdbID}')"

$(watchSubmit);
