const movie_SEARCH_URL = 'http://www.omdbapi.com?apikey=389ac1fa&';
const YOUTUBE_Trailer_URL = 'https://www.googleapis.com/youtube/v3/search';

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
}

function getDataForMovies(searchText, callback) {
	const query = {
		s: `${searchText}`
	};
	$.getJSON(movie_SEARCH_URL, query, callback);
}

function dataMovies(data) {
	const movie = data.Search.map((item, index) => displayMovies(item));
	$('#movies').html(movie);
}

function displayMovies(data) {
	let movie = returnResults(data);
	return movie;
}

function returnResults(movie) {
	return `
          <div class="column">
                <img src="${movie.Poster}" class="img-list">
                <h3>${movie.Title}</h3>
								<a onclick="movieSelected('${movie.imdbID}')" class="btn" href="#">Movie Details</a>
								<a onclick="youtubeTrailer('${movie.Title} Trailer')" class="btn" href="#">Watch Trailer</a>
          </div>
    `;
}

function youtubeTrailer(title) {
	console.log(title);
	sessionStorage.setItem('trailerText', title); //stores id locally in application tab session storage
	window.location = 'movie.html';

	return false;
}

function getTrailer() {
	let trailer = sessionStorage.getItem('trailerText');
	const trailerQuery = {
		part: 'snippet',
		key: 'AIzaSyDbDK_yKzFivQBrkukDw3lwBVsFgdDUmNY',
		// AIzaSyBiFe0gSq_xIil6nwieRBdNbOuaI69AFnk created new key
		q: trailer
	};
	$.getJSON(YOUTUBE_Trailer_URL, trailerQuery, trailerLink);
}

function trailerLink(data) {
	console.log('test20', data);
	const detailOfTrailer = trailerResults(data);
	$('#movie').html(detailOfTrailer);
	console.log('test8', detailOfTrailer);
}

function trailerResults(trailer) {
	let trailerDetail = trailer;
	console.log('test22', trailerDetail);
	return `
<div class="detail-row">
<img src="${trailerDetail}" class="thumbnail">
</div>`;
}


///////////////////Get Detail of selected movie///////////////////////////

function movieSelected(id, title) {
	console.log(id, title);
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
	const detailOfMovie = movieDetailResults(data);
	$('#movie').html(detailOfMovie);
}

function movieDetailResults(movie) {
	let movieDetail = movie;
	return `
<div class="detail-row">
  <div class="details-card">
    <img src="${movieDetail.Poster}" class="thumbnail">
  </div>
  <div class="details-list">
		<h2>${movieDetail.Title}</h2>
		<div class="plot-row">
  <div class="plot">
    <h3>Plot</h3>
    ${movieDetail.Plot}
    <hr>
    
  </div>
</div>
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
		<hr>
	</div>
	<div>
	<a href="http://imdb.com/title/${
			movieDetail.imdbID
		}" target="_blank" class="btn">View IMDB</a>
    <a href="index.html" class="btn">Back To Search</a>
    <a href="#" id="watchNow" class="btn btn-red">Watch Now</a></div>
</div>

`;
}

///////////////////Get Movie Trailer///////////////////////////




$(watchSubmit);