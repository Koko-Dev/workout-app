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
	// Define map and mapEvent as private properties of the object
	// class App using a private class field (private instance properties)
	// https://ultimatecourses.com/blog/private-properties-methods-javascript-classes
	#map;
	#mapEvent;
	constructor() {
		// Step: Get position coordinates when page loads
		this._getPosition();

		form.addEventListener('submit', this._newWorkout.bind(this));

// Todo: toggle the input form based on <select> options Running or Cycling
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
		console.log('this inside of _loadMap:  ', this);

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
		console.log('this inside of _newWorkout', this);
		e.preventDefault();

		// Clear input fields
		inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

		// Display marker
		const {lat, lng} = this.#mapEvent.latlng;
		L.marker([lat, lng])
			.addTo(this.#map)
			.bindPopup(L.popup({
				maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: 'running-popup'
			}))
			.setPopupContent('Workout')
			.openPopup();
	}

	//step one complete =================

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


