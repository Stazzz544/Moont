@@include('lib/swiper-bundle.min.js');

//===================================================
//функция для подключения webp
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


//===================================================
//slider-swiper
const swiper = new Swiper('.swiper', {
	speed: 400,

	slidesPerView: 6,
	spaceBetween: 20,
	loop: true,
});


//===================================================
//function to add or remove class active to menu item


activeClassesForNavMenu()

function activeClassesForNavMenu() {
	const menuLinks = document.querySelectorAll('.menu__link');
	const currentLocation = document.location.pathname.split('/');
	const pathName = currentLocation[currentLocation.length - 2];
	
	menuLinks.forEach(e => e.closest('.menu__link-wrapper').classList.remove('active'));

	menuLinks.forEach(e => {
		const linkLocation = e.getAttribute('href').split('/');
		const locationName = linkLocation[linkLocation.length - 1];
	
		if (locationName === pathName) e.closest('.menu__link-wrapper').classList.add('active');
	});
};