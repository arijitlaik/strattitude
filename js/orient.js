var watchID;
getLocation();

function initUI() {
	var lockerbuttons = document.getElementsByClassName("lockerbutton");
	for (var i = 0; i < lockerbuttons.length; i++)
		lockerbuttons[i].addEventListener("click", toggleLocks);
	document.getElementById("editLatLon").addEventListener("click", toggleLocation);
}

initUI();

//Location Functions

function toggleLocation() {

	if (document.querySelector("#editLatLon i").innerHTML === "my_location") {
		getLocation();
		console.log("getlocation");
	}
	if (document.querySelector("#editLatLon i").innerHTML === "edit_location") {
		stopLocation();
		console.log("stoplocation");
		document.getElementById("Accpl").innerHTML = "Location not taken from device";
		document.getElementById("Accln").innerHTML = "Location not taken from device";
	}
	toggleEditLoc();
}


function showLocError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			document.getElementById("Accpl").innerHTML = "User denied the request for Geolocation.";
			document.getElementById("Accln").innerHTML = "User denied the request for Geolocation.";
			break;
		case error.POSITION_UNAVAILABLE:
			document.getElementById("Accpl").innerHTML = "Location information is unavailable.";
			document.getElementById("Accln").innerHTML = "Location information is unavailable.";
			break;
		case error.TIMEOUT:
			document.getElementById("Accpl").innerHTML = "The request to get user location timed out.";
			document.getElementById("Accln").innerHTML = "The request to get user location timed out.";
			break;
		case error.UNKNOWN_ERROR:
			document.getElementById("Accpl").innerHTML = "An unknown error occurred.";
			document.getElementById("Accln").innerHTML = "An unknown error occurred.";
			break;
	}
}

function showPosition(position) {

	document.getElementById("Planelat").parentNode.classList.add("is-dirty");
	document.getElementById("Planelon").parentNode.classList.add("is-dirty");
	document.getElementById("Linelat").parentNode.classList.add("is-dirty");
	document.getElementById("Linelon").parentNode.classList.add("is-dirty");

	document.getElementById("Planelat").value = position.coords.latitude;
	document.getElementById("Planelon").value = position.coords.longitude;
	document.getElementById("Linelat").value = position.coords.latitude;
	document.getElementById("Linelon").value = position.coords.longitude;
	document.getElementById("Accpl").innerHTML = position.coords.accuracy;
	document.getElementById("Accln").innerHTML = position.coords.accuracy;
}

function getLocation() {
	if (navigator.geolocation) {
		watchID = navigator.geolocation.watchPosition(showPosition, showLocError)
	} else {
		document.getElementById("Accpn").innerHTML = "Geolocation is not supported by this browser.";
		document.getElementById("Accln").innerHTML = "Geolocation is not supported by this browser.";
	}
}

function stopLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.clearWatch(watchID);
	}
}


//Orienation Functions

function getOrienation() {
	if (window.DeviceOrientationEvent) {
		//document.getElementById("doEvent").innerHTML = "DeviceOrientation";
		// Listen for the deviceorientation event and handle the raw data
		window.addEventListener('deviceorientation', function (eventData) {
			// gamma is the left-to-right tilt in degrees, where right is positive
			var plunge = eventData.gamma;

			// beta is the front-to-back tilt in degrees, where front is positive
			var dip = eventData.beta;

			// alpha is the compass direction the device is facing in degrees
			var strike = eventData.alpha;
			//console.log(eventData.absolute);
			// call our orientation event handler

			deviceOrientationHandler(strike, dip, plunge);
		}, false);
	} else {
		//document.getElementById("doEvent").innerHTML = "Not supported on your device or browser.  Sorry."
	}
}

//degree to radian torad(degree)
function torad(degrees) {
	return degrees * Math.PI / 180;
}
//radian to degree todeg(radian)
function todeg(radians) {
	return radians * 180 / Math.PI;
}

function deviceOrientationHandler(strike, dip, plunge) {

	document.getElementById("strike").parentNode.classList.add("is-dirty");
	document.getElementById("strike").value = strike;
	document.getElementById("dip").parentNode.classList.add("is-dirty");
	document.getElementById("dip").value = dip;

	document.getElementById("trend").parentNode.classList.add("is-dirty");
	document.getElementById("trend").value = strike;
	document.getElementById("plunge").parentNode.classList.add("is-dirty");
	document.getElementById("plunge").value = plunge;
}
