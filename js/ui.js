function toggleLocks() {

	lockIcons = document.querySelectorAll(".lockerbutton i");
	for (var i = 0; i < lockIcons.length; i++) {

		if (lockIcons[i].innerHTML == 'lock')
			lockIcons[i].innerHTML = 'lock_open';
		else if (lockIcons[i].innerHTML === 'lock_open')
			lockIcons[i].innerHTML = 'lock';
	}
}


var lockerbuttons = document.getElementsByClassName("lockerbutton");
for (var i = 0; i < lockerbuttons.length; i++)
	lockerbuttons[i].addEventListener("click", toggleLocks);
lockerbuttons = [];

//.parentNode.className +=" is-focused"//
