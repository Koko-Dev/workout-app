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


/*
 Note:  Geolocation.getCurrentPosition syntax
 The Geolocation.getCurrentPosition() method is used to get
 the current position of the device
 code:
 getCurrentPosition(success)
 getCurrentPosition(success, error)
 getCurrentPosition(success, error, options)

 Note: From google maps: https://www.google.com/maps/place/Virginia/@37.9820815,-81.6639165,7z/data=!3m1!4b1!4m5!3m4!1s0x884cd670bdbcb2cd:0xc04e4149b746a695!8m2!3d37.4315734!4d-78.6568942

 https://www.google.com/maps/@37.0722523,-76.3753041,15z
 */

// Todo:  Reassign leaflet's map variable  and the mapEvent to the global scope
let map, mapEvent;

class App {
	constructor() {

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
