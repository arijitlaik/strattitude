function toggleLocks() {

	lockIcons = document.querySelectorAll(".lockerbutton i");
	for (var i = 0; i < lockIcons.length; i++) {

		if (lockIcons[i].innerHTML == 'lock')
			lockIcons[i].innerHTML = 'lock_open';
		else if (lockIcons[i].innerHTML === 'lock_open')
			lockIcons[i].innerHTML = 'lock';
	}
}

function initUI() {
	var lockerbuttons = document.getElementsByClassName("lockerbutton");
	for (var i = 0; i < lockerbuttons.length; i++)
		lockerbuttons[i].addEventListener("click", toggleLocks);
	document.getElementById("editLatLon").addEventListener("click", toggleEditLoc);
}
initUI();

function toggleEditLoc() {
	if (
		document.getElementById("Planelat").hasAttribute("disabled") &&
		document.getElementById("Linelat").hasAttribute("disabled") &&
		document.getElementById("Planelon").hasAttribute("disabled") &&
		document.getElementById("Linelon").hasAttribute("disabled")
	) {
		document.getElementById("Planelat").removeAttribute("disabled");
		document.getElementById("Linelat").removeAttribute("disabled");
		document.getElementById("Planelon").removeAttribute("disabled");
		document.getElementById("Linelon").removeAttribute("disabled");
		document.querySelector("#editLatLon i").innerHTML = "my_location";

	} else {
		document.getElementById("Planelat").setAttribute("disabled", true);
		document.getElementById("Linelat").setAttribute("disabled", true);
		document.getElementById("Planelon").setAttribute("disabled", true);
		document.getElementById("Linelon").setAttribute("disabled", true);
		document.querySelector("#editLatLon i").innerHTML = "edit_location";
	}
	document.getElementById("Planelat").parentNode.classList.toggle("is-disabled");
	document.getElementById("Linelat").parentNode.classList.toggle("is-disabled");
	document.getElementById("Planelon").parentNode.classList.toggle("is-disabled");
	document.getElementById("Linelon").parentNode.classList.toggle("is-disabled");

}

//.parentNode.className +=" is-focused"//
