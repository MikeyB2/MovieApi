const movie_SEARCH_URL = 'http://www.omdbapi.com?apikey=389ac1fa&';
const YOUTUBE_Trailer_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_MOVIE_URL = 'https://www.googleapis.com/youtube/v3/channels';

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
					<div class="col-4">
						<div class="card">
						<a class="card-image" onclick="movieSelected('${
							movie.imdbID
						}')" href="#"><img src="${movie.Poster}"></a>
							<div class="card-content">
							<h3>${movie.Title}</h3>
							<a onclick="movieSelected('${
								movie.imdbID
							}')" class="btn movieDetailScreen" href="#">Movie Details</a>
							<a onclick="youtubeTrailer('${
								movie.Title
							} Trailer')" class="btn trailer" href="#">Watch Trailer</a>
							</div>
						</div>
					</div>
    `;
}

///////////////////Get Detail of selected movie///////////////////////////

function movieSelected(id, title) {
	console.log(id, title, 'test1');
	sessionStorage.setItem('movieId', id); //stores id locally in application tab session storage
	sessionStorage.setItem('movieTitle', title);
	window.location = 'movie.html';
	return false;
}

function getMovieDetails() {
	console.log('get movie');
	let movieId = sessionStorage.getItem('movieId');
	const query = {
		i: movieId
	};
	$.getJSON(movie_SEARCH_URL, query, detailedMovie);
}

function detailedMovie(data) {
	console.log('get movie detail');
	const detailOfMovie = movieDetailResults(data);
	$('#movie').html(detailOfMovie);
}

function movieDetailResults(movie) {
	console.log('get movie results');
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
	<div class="btn-group">
	<a href="http://imdb.com/title/${
		movieDetail.imdbID
	}" target="_blank" class="btn">View IMDB</a>
		<a href="index.html" class="btn">Back To Search</a>
    <a href="https://www.youtube.com/channel/UClgRkhTL3_hImCAmdLfDE4g" id="watchNow" class="btn btn-red" target="_blank">Watch Now</a></div>
</div>

`;
}
// onclick="youtubeMovie('${movie.Title}')"
/////////////////////////////Watch Full Movie////////////////////////////////////////

function youtubeMovie(title) {
	console.log('1', title);
	sessionStorage.setItem('movieTitle', title); //stores id locally in application tab session storage
	getYoutubeMovie();
	return false;
}

function getYoutubeMovie() {
	console.log('2', 'get movie youtube');
	let youtubeMovieTitle = sessionStorage.getItem('movieTitle');
	const movieQuery = {
		id: 'UClgRkhTL3_hImCAmdLfDE4g',
		part: 'snippet, contentDetails, statistics',
		key: 'AIzaSyDbDK_yKzFivQBrkukDw3lwBVsFgdDUmNY',
		// AIzaSyBiFe0gSq_xIil6nwieRBdNbOuaI69AFnk created new key
		fields: 'items/snippet/title' + youtubeMovieTitle
	};

	$.getJSON(YOUTUBE_MOVIE_URL, movieQuery, movieLink);
}

function movieLink(data) {
	console.log('3', 'youtube movie data');
	console.log('4', 'testtest', data);
	const detailOfYoutubeMove = youtubeMoveResults(data);
	$('#movie').html(detailOfYoutubeMove);
}

function youtubeMoveResults(movie) {
	let youtubeMovieDetail = movie;
	console.log('5', youtubeMovieDetail);
	// console.log('6', youtubeMovieDetail.items[0].id.videoId);
	return `
	<div class="detail-row">
		<iframe id="ytplayer" type="text/html" width="700px" height="500px" src="https://www.youtube.com/embed/${
			youtubeMovieDetail.items[0].id.videoId
		}?autoplay=1" frameborder='0'>
		</iframe>
		<div class="trailerButton">
		<a href="index.html" class="btn">Back To Search</a>
		</div>
	</div>`;
}

///////////////////Get Movie Trailer///////////////////////////
function youtubeTrailer(title) {
	console.log(title);
	sessionStorage.setItem('trailerText', title); //stores id locally in application tab session storage
	getTrailer();
	return false;
}

function getTrailer() {
	console.log('get trailer');
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
	console.log('trailer data');
	const detailOfTrailer = trailerResults(data);
	$('#movies').html(detailOfTrailer);
}

function trailerResults(trailer) {
	let trailerDetail = trailer;
	console.log(trailerDetail);
	console.log(trailerDetail.items[0].id.videoId);
	return `
	<div class="detail-row">
		<iframe id="ytplayer" type="text/html" width="700px" height="500px" src="https://www.youtube.com/embed/${
			trailerDetail.items[0].id.videoId
		}?autoplay=1" frameborder='0'>
		</iframe>
	</div>`;
}

$(watchSubmit);
