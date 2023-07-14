document.addEventListener('DOMContentLoaded', () => {
  const filmDataEndpoint = 'http://localhost:3000/films';
  let filmState = {};

  fetch(filmDataEndpoint)
    .then(response => response.json())
    .then(films => {
    const filmsList = document.getElementById('films');

      // Add a title to the movie list
      const listTitle = document.createElement('h2');
      listTitle.textContent = 'Movies Available:';
      filmsList.appendChild(listTitle);

      films.forEach(film => {
        // Initialize tickets_sold for each film in filmState if not done before
        if(!filmState[film.id]) {
          filmState[film.id] = film.tickets_sold;
        }

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
    movieDescription.textContent = ` Movie Description: ${film.description}`;
    let availableTickets = film.capacity - filmState[film.id];
    availableTicketsCount.textContent = `Available Tickets: ${availableTickets}`;

    // Remove previous click event listener if it exists
    buyTicketBtn.replaceWith(buyTicketBtn.cloneNode(true));

    // Get the fresh copy of button without any attached event
    const freshBuyTicketBtn = document.getElementById('buy-ticket-btn');

    freshBuyTicketBtn.onclick = () => {
      if (availableTickets > 0) {
        filmState[film.id]++;
        availableTickets = film.capacity - filmState[film.id];
        availableTicketsCount.textContent = `Available Tickets: ${availableTickets}`;
        if (availableTickets === 0) {
          freshBuyTicketBtn.disabled = true;
          freshBuyTicketBtn.textContent = 'Sold Out';
        } else {
          freshBuyTicketBtn.disabled = false;
          freshBuyTicketBtn.textContent = 'Buy Ticket';
        }
      }
    };
  };
});




