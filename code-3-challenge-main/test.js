document.addEventListener('DOMContentLoaded', () => {
    // Fetch film data from the API
    const filmDataEndpoint ='http://localhost:3000/films' 
    fetch('http://localhost:3000/films' )
      .then(response => response.json())
      .then(data => {
        const films = data; // Assuming the data is an array of film objects
  
        // Populate the movie menu
        const filmsList = document.getElementById('films');
        films.forEach(film => {
          const filmItem = document.createElement('li');
          filmItem.classList.add('film', 'item');
          filmItem.textContent = film.title;
          filmItem.addEventListener('click', () => {
            populateMovieDetails(film);
          });
          filmsList.appendChild(filmItem);
        });
  // Function to handle ticket purchase
  const handleTicketPurchase = () => {
    const currentCount = parseInt(availableTicketsCount.textContent);
    if (currentCount > 0) {
      updateAvailableTickets();
      // Additional code to handle ticket purchase logic (e.g., API call, payment processing, etc.)
    } else {
      alert('Sorry, tickets are sold out!');
    }
  };
  
  // Add event listener to the "Buy Ticket" button
  buyTicketBtn.addEventListener('click', handleTicketPurchase);
  
  
    // Function to populate movie details
    const populateMovieDetails = (film) => {
      const moviePoster = document.querySelector('.movie-poster');
      const movieTitle = document.querySelector('.movie-title');
      const movieRuntime = document.querySelector('.movie-runtime');
      const movieShowtime = document.querySelector('.movie-showtime');
      const availableTicketsCount = document.getElementById('available-tickets-count');
  
      moviePoster.src = film.poster;
      movieTitle.textContent = film.title;
      movieRuntime.textContent = `Runtime: ${film.runtime} minutes`;
      movieShowtime.textContent = `Showtime: ${film.showtime}`;
      availableTicketsCount.textContent = film.availableTickets;
    };
  })});