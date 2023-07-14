document.addEventListener('DOMContentLoaded', () => {
  const filmDataEndpoint = 'http://localhost:3000/films';

  fetch(filmDataEndpoint)
    .then(response => response.json())
    .then(films => {
      const filmsList = document.getElementById('films');

      // Add a title to the movie list
      const listTitle = document.createElement('h2');
      listTitle.textContent = 'Movies Available:';
      filmsList.appendChild(listTitle);

      films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film', 'item');
        filmItem.textContent = film.title;
        filmItem.addEventListener('click', () => {
          populateMovieDetails(film);
        });
        filmsList.appendChild(filmItem);
      });

      if (films.length > 0) {
        populateMovieDetails(films[0]);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  const populateMovieDetails = (film) => {
    const moviePoster = document.querySelector('.movie-poster');
    const movieTitle = document.querySelector('.movie-title');
    const movieRuntime = document.querySelector('.movie-runtime');
    const movieShowtime = document.querySelector('.movie-showtime');
    const movieDescription = document.querySelector('.movie-description');
    const availableTicketsCount = document.getElementById('available-tickets-count');
    const buyTicketBtn = document.getElementById('buy-ticket-btn');

    moviePoster.src = film.poster;
    movieTitle.textContent = film.title;
    movieRuntime.textContent = `Runtime: ${film.runtime} minutes`;
    movieShowtime.textContent = `Showtime: ${film.showtime}`;
    movieDescription.textContent = `Movie Description: ${film.description}`; 
    const availableTickets = film.capacity - film.tickets_sold; // Calculate available tickets
    availableTicketsCount.textContent = availableTickets;

    buyTicketBtn.onclick = () => {
      if (availableTickets > 0) {
        film.tickets_sold++;
        availableTicketsCount.textContent = film.capacity - film.tickets_sold;
        if (film.capacity - film.tickets_sold === 0) {
          buyTicketBtn.disabled = true;
          buyTicketBtn.textContent = 'Sold Out';
        }
      }
    };
  };
});


