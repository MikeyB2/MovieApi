const movie_SEARCH_URL = 'https://www.omdbapi.com?apikey=389ac1fa&';
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
		s: `${searchText}`,
	};
	$.getJSON(movie_SEARCH_URL, query, callback);
}

function dataMovies(data) {
	console.log('test');
	const movie = data.Search.map((item, index) => displayMovies(item));
	$('#movies').html(movie);
}

function displayMovies(data) {
	console.log(data);
	let movie = returnResults(data);
	return movie;
}

function returnResults(movie) {
	return `
          <div class="column">
					<a class="card-image" onclick="movieSelected('${
		movie.imdbID
		}')" href="#"><img alt="${movie.Title}" src="${movie.Poster}"></a>
                <h3 class="mainTitle">${movie.Title}</h3>
								<a onclick="movieSelected(&quot;${
		movie.imdbID
		}&quot;, &quot;${movie.Title}&quot;)" class="btn movieDetailScreen gridBtn" href="#">Movie Details</a>
								<a onclick="youtubeTrailer('${
		movie.Title
		} Trailer')" class="btn movieDetailScreen gridBtn" href="#">Watch Trailer</a>
          </div>
    `;
}

///////////////////Get Detail of selected movie///////////////////////////

function movieSelected(id, title) {
	console.log(id, title);
	sessionStorage.setItem('movieId', id); //stores id locally in application tab session storage
	sessionStorage.setItem('movieTitle', title);
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
    <a onclick="youtubePoster('${
		movie.Title
		} Trailer')" href="#" id="ytTrailer" aria-disabled="false" aria-haspopup="true" aria-label="${movieDetail.Title}"><img alt="${movieDetail.Title}" src="${movieDetail.Poster}" class="thumbnail"></a>
  </div>
  </div>
  <div class="details-list">
		<h1>${movieDetail.Title}</h1>
		<div class="plot-row">
  <div class="plot">
    <h2>Plot</h2>
    <p>${movieDetail.Plot}</p>
    <hr>
  </div>
</div>
<div class="detail-row-group">
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
		<div class="btn-group">
	<a href="http://imdb.com/title/${
		movieDetail.imdbID
		}" target="_blank" class="btn">View IMDB</a>
    <a href="index.html" class="btn">Back To Search</a>
	</div>
</div>
`;
}

///////////////////Get Movie Trailer///////////////////////////
function youtubeTrailer(title) {
	console.log(title);
	sessionStorage.setItem("trailerText", title); //stores id locally in application tab session storage
	console.log(title);
	getTrailer();
	return false;
}

function getTrailer() {
	let trailer = sessionStorage.getItem("trailerText");
	console.log('test', trailer);
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
	<div class="detail-row-video">
		<iframe  title="${
			trailerDetail.items[0].snippet.title
			}" aria-disabled="false" aria-haspopup="true" id="ytplayer" type="text/html" width="700px" height="500px" arial-label="Movie Trailer"  src="https://www.youtube.com/embed/${
		trailerDetail.items[0].id.videoId
		}?autoplay=1" frameborder='0'>
		</iframe>
	</div>`;
}

/////////////////////Poster Trailer////////////////////////////////////////////////
function youtubePoster(title) {
	// this.classList.add('flip');
	console.log(title);
	sessionStorage.setItem("trailerText", title); //stores id locally in application tab session storage
	console.log(title);
	getPosterTrailer();
	return false;
}

function getPosterTrailer() {
	let posterTrailer = sessionStorage.getItem("trailerText");
	console.log('test', posterTrailer);
	const posterTrailerQuery = {
		part: 'snippet',
		key: 'AIzaSyDbDK_yKzFivQBrkukDw3lwBVsFgdDUmNY',
		// AIzaSyBiFe0gSq_xIil6nwieRBdNbOuaI69AFnk created new key
		q: posterTrailer
	};
	$.getJSON(YOUTUBE_Trailer_URL, posterTrailerQuery, posterTrailerLink);
}

function posterTrailerLink(data) {
	console.log('trailer data');
	const detailOfPosterTrailer = posterTrailerResults(data);
	$('#ytTrailer').html(detailOfPosterTrailer);
}

function posterTrailerResults(trailer) {
	let posterTrailerDetail = trailer;
	console.log(posterTrailerDetail);
	console.log(posterTrailerDetail.items[0].id.videoId);
	return `
	<div class="detail-row-video">
		<iframe title="Movie Trailer" arial-label="Movie Trailer" id="ytplayer" type="text/html" width="700px" height="500px" src="https://www.youtube.com/embed/${
			posterTrailerDetail.items[0].id.videoId
		}?autoplay=1" frameborder='0'>
		</iframe>
	</div>`;
}

$(watchSubmit);