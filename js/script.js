'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
	date = new Date();
	id = (Date.now() + '').slice(-10);

	constructor(coords, distance, duration) {
		this.coords = coords;  // [lat, lng]
		this.distance = distance;  //km
		this.duration = duration;  // min
	}
}

class Running extends Workout {
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace();
	}

	// Method for calculating pace
	calcPace() {
		// min/km
		this.pace = this.duration / this.distance;
		return this.pace;
	}
}

class Cycling extends Workout {
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;
		this.calcSpeed();
	}

	calcSpeed() {
		// calculated in hours so must divide by 60
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
}

// TEST
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);


// ================================
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
	#map;
	#mapEvent;
	#workouts = [];

	constructor() {
		this._getPosition();

		form.addEventListener('submit', this._newWorkout.bind(this));
		inputType.addEventListener('change', this._toggleElevationField);
	}

	// Get Position
	_getPosition() {
		console.log('Get Position');
		if (navigator.geolocation) {
			navigator
				.geolocation
				.getCurrentPosition(this._loadMap.bind(this), function () {
					alert('Could not get your position');
				})
		}
	}

	// Load Map
	_loadMap(position) {
		console.log('Load Map');

		const {latitude} = position.coords;
		const {longitude} = position.coords;
		console.log(latitude, longitude);

		const coords = [latitude, longitude];

		this.#map = L.map('map').setView(coords, 13);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.#map);

		// Step: Handling clicks on map
		this.#map.on('click', this._showForm.bind(this));
	}

	// Show Form
	_showForm(mapE) {
		console.log('Show Form');
		this.#mapEvent = mapE;
		form.classList.remove('hidden');
		inputDistance.focus();
	}

	// Hide Form
	_hideForm() {
		console.log('Hide Form');
	}

	// Toggle Elevation Field
	_toggleElevationField() {
		console.log('Toggle Elev');
		inputElevation
			.closest('.form__row')
			.classList.toggle('form__row--hidden');

		inputCadence.closest('.form__row')
			.classList
			.toggle('form__row--hidden');
	}

	// New Workout
	_newWorkout(e) {
		console.log('New Workout');


		// Helper function to determine if input is a number
		const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));

		// Helper function to determine if number is positive
		const allPositive = (...inputs) => inputs.every(inp => inp > 0);

		e.preventDefault();

		// step: Get data from the form
		const type = inputType.value; // running or cycling
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const {lat, lng} = this.#mapEvent.latlng;
		let workout;



		// step: If activity running, then create running object
		if (type === 'running') {
			const cadence = +inputCadence.value;
			// step: Check if data is valid
			if (
				!validInputs(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			)
				return alert('Inputs must be positive numbers!');

			workout = new Running([lat, lng],  distance, duration, cadence);
		}



		// step: If activity cycling, then create cycling object
		if (type === 'cycling') {
			const elevation = +inputElevation.value;
			if (
				!validInputs(
					distance, duration, elevation) ||
				!allPositive(distance, duration)
			)
				return alert('Inputs must be a numbers!');

			workout = new Cycling([lat, lng], distance, duration, elevation);
		}


		// step: Add new object to workout array
		this.#workouts.push(workout);




		// step: Render workout on map as marker



		// step: Render workout on list



		// step:  Hide form and clear input fields;




		// Clear input fields
		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

		// Display marker

		L.marker([lat, lng])
			.addTo(this.#map)
			.bindPopup(L.popup({
				maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup'
			}))
			.setPopupContent('Workout')
			.openPopup();
	}

	// Render Workout Marker
	_renderWorkoutMarker() {
		console.log('Render Workout Marker');
	}

	// Render Workout
	_renderWorkout() {
		console.log('Render Workout');
	}

	// Move to Popup
	_moveToPopup() {
		console.log('Move to Popup');
	}

	// Set Local Storage
	_setLocalStorage() {
		console.log('Set Local Storage');
	}

	// Get Local Storage
	_getLocalStorage() {
		console.log('Get Local Storage');
	}

	// Reset
	reset() {
		console.log('Reset');
	}
}

//  Step: Create an instance of class App
const app = new App();


