 init();

 function init() {
 	if (window.DeviceOrientationEvent) {
 		//document.getElementById("doEvent").innerHTML = "DeviceOrientation";
 		// Listen for the deviceorientation event and handle the raw data
 		window.addEventListener('deviceorientation', function (eventData) {
 			// gamma is the left-to-right tilt in degrees, where right is positive
 			var rake = eventData.gamma;

 			// beta is the front-to-back tilt in degrees, where front is positive
 			var dip = eventData.beta;

 			// alpha is the compass direction the device is facing in degrees
 			var strike = eventData.alpha;

 			// call our orientation event handler
 			deviceOrientationHandler(strike, dip, rake);
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

 function deviceOrientationHandler(strike, dip, rake) {

 	document.getElementById("strike").parentNode.className += " is-focused";
 	document.getElementById("strike").value = strike;
 	document.getElementById("dip").parentNode.className += " is-focused"
 	document.getElementById("dip").value = dip;
 	var tp = sdrtotp(strike, dip, rake);
 	document.getElementById("trend").parentNode.className += " is-focused";
 	document.getElementById("trend").value = tp[1];
 	document.getElementById("plunge").parentNode.className += " is-focused"
 	document.getElementById("plunge").value = tp[0];
 	//	document.getElementById("").innerHTML = Math.round(dir);
 }

 //strike dip rake to trend plunge
 function sdrtotp(strike, dip, rake, op_flag) {
 	/*if ((op_flag === true) && rake != 90) {
 		strike += 180;
 		rake = 180 - rake;
 	}*/
 	//plunge
 	var Temp_Pl = Math.asin(Math.sin(torad(dip)) * Math.sin(torad(rake)));
 	//trend
 	var Temp_Tr = torad(strike) + Math.atan(Math.cos(torad(dip)) * Math.tan(torad(rake)));
 	return [todeg(Temp_Pl), todeg(Temp_Tr)];
 }
