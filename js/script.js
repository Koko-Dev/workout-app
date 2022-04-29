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
*/

navigator
	.geolocation
	.getCurrentPosition(function (position) {
		console.log(position);
	}, function () {
		alert('Could not get your position');
	})