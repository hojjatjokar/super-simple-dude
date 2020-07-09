const container = document.querySelector('.container');
const seats = document.querySelectorAll('.seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

hydrate();

let ticketPrice = Number(movieSelect.value);

function hydrate() {
  const selectedSeats = localStorage.getItem('selectedSeats');
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  selectedSeatsIndexes = JSON.parse(selectedSeats);

  if (selectedMoviePrice) {
    movieSelect.value = selectedMoviePrice;
  }

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  if (selectedSeatsIndexes && selectedSeatsIndexes.length > 0) {
    selectedSeatsIndexes.forEach((item) => {
      seats[item].classList.add('selected');
    });
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndexes = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexes));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

function setMovieData(index, price) {
  localStorage.setItem('selectedMovieIndex', index);
  localStorage.setItem('selectedMoviePrice', price);
}

movieSelect.addEventListener('change', (e) => {
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener('click', (e) => {
  const classList = e.target.classList;

  if (classList.contains('seat') && !classList.contains('occupied')) {
    classList.toggle('selected');
    updateSelectedCount();
  }
});

updateSelectedCount();
