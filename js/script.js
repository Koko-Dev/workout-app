'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
	constructor() {
		// Get coordinates when page loads
		this._getPosition();
	}

	// Get Position
	_getPosition() {
		console.log('_getPosition');
		if (navigator.geolocation) {
			navigator
				.geolocation
				.getCurrentPosition(this._loadMap, function () {
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

		map = L.map('map').setView(coords, 13);
		L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		map.on('click', function (mapE) {
			mapEvent = mapE;
			form.classList.remove('hidden');
			inputDistance.focus();
		})
	}

	// Show Form
	_showForm() {
		console.log('Show Form');
	}

	// Hide Form
	_hideForm() {
		console.log('Hide Form');
	}

	// Toggle Elevation Field
	_toggleElevationField() {
		console.log('Toggle Elev');
	}

	// New Workout
	_newWorkout() {
		console.log('New Workout');
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

//  Create an instance of class App
const app = new App();


//  Todo: Add an event listener which displays a marker whenever
//   the form is submitted
form.addEventListener('submit', function (e) {
	e.preventDefault();

	// Clear input fields
	inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';


	// Display marker
	const {lat, lng} = mapEvent.latlng;
	L.marker([lat, lng])
		.addTo(map)
		.bindPopup(L.popup({
			maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup'
		}))
		.setPopupContent('Workout')
		.openPopup();
})

inputType.addEventListener('change', function (e) {
	inputElevation
		.closest('.form__row')
		.classList.toggle('form__row--hidden');

	inputCadence.closest('.form__row')
		.classList
		.toggle('form__row--hidden');
})
