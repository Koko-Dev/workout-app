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
if (navigator.geolocation) {
	navigator
		.geolocation
		.getCurrentPosition(function (position) {
			const {latitude} = position.coords;
			const {longitude} = position.coords;
			console.log(latitude, longitude);
			// console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
			// console.log(`https://www.google.com/maps/@${latitude},${longitude}`)

			const coords = [latitude, longitude];

			// Note: From leaflet
			const map = L.map('map').setView(coords, 13);
			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			//	Todo: Extract position on the map on click
			map.on('click', function(mapEvent) {
				// console.log(mapEvent);
				const { lat, lng } = mapEvent.latlng;
				L.marker([lat, lng])
					.addTo(map)
					.bindPopup(L.popup({
						maxWidth: 250,
						minWidth: 100,
						autClose: false,
						closeOnClick: false
					}))
					.openPopup();

			})
		}, function () {
			alert('Could not get your position');
		})
}
