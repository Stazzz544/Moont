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

//===================================================
//burger

burger();

function burger() {
	const burger = document.querySelector('#burger');
	const body = document.querySelector('body');

	burger.addEventListener('click', () => {
		

		if (!body.classList.contains('lock')) body.classList.add('lock')
		else body.classList.remove('lock');
		document.querySelector('#mainMenu').classList.toggle('active');
		burger.classList.toggle('active');
		
	});
};

//============================================

const goods = [
	{
		id: 1,
		title: 'пончо, размер М/Л',
		discription: 'Ручная вышивка, эко-кожа, замша',
		sale: true,
		sliderImg: 'img/collections/1/preview-img/1.jpg',
		altText:'пончо',
		urlToFullInformation: "/ru/collections/1/",
		galeryImages: [
			{link: '/img/collections/1/1.jpg', altText: 'product photo'},
			{link: '/img/collections/1/2.jpg', altText: 'product photo'},
			{link: '/img/collections/1/3.jpg', altText: 'product photo'},
			{link: '/img/collections/1/4.jpg', altText: 'product photo'},
			{link: '/img/collections/1/5.jpg', altText: 'product photo'},
			{link: '/img/collections/1/6.jpg', altText: 'product photo'},
		],
	},
	{
		id:  2,
		title: 'юбка',
		discription: 'Ручная вышивка, эко-кожа с подкладкой из сетки',
		sale: true,
		sliderImg: 'img/collections/2/preview-img/1.jpg',
		altText:'юбка',
		urlToFullInformation: "/ru/collections/2/",
		collection: 2021,
		galeryImages: [
			{link: '/img/collections/2/1.jpg', altText: 'product photo'},
			{link: '/img/collections/2/2.jpg', altText: 'product photo'},
			{link: '/img/collections/2/3.jpg', altText: 'product photo'},
			{link: '/img/collections/2/4.jpg', altText: 'product photo'},
			{link: '/img/collections/2/5.jpg', altText: 'product photo'},
			{link: '/img/collections/2/6.jpg', altText: 'product photo'},
			{link: '/img/collections/2/7.jpg', altText: 'product photo'},
			{link: '/img/collections/2/8.jpg', altText: 'product photo'},
		],
	},
	{
		id:  3,
		title: 'худи, размер L',
		discription: 'Ручная вышивка, хлопок',
		sale: true,
		sliderImg: '/img/collections/3/preview-img/1.jpg',
		altText:'худи',
		urlToFullInformation: "/ru/collections/3/",
		collection: 2021,
		galeryImages: [
			{link: '/img/collections/3/1.jpg', altText: 'product photo'},
			{link: '/img/collections/3/2.jpg', altText: 'product photo'},
			{link: '/img/collections/3/3.jpg', altText: 'product photo'},
			{link: '/img/collections/3/4.jpg', altText: 'product photo'},
			{link: '/img/collections/3/5.jpg', altText: 'product photo'},
		],
	},
	{
		id:  4,
		title: 'футболка, размер М',
		discription: 'Ручная вышивка, вискоза, хлопок',
		sale: false,
		sliderImg: '/img/collections/4/preview-img/1.jpg',
		altText:'футболка',
		urlToFullInformation: "/ru/collections/4/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  5,
		title: 'худи, размер М',
		discription: 'Ручная вышивка, кашемир, вискоза',
		sale: false,
		sliderImg: '/img/collections/5/preview-img/1.jpg',
		altText:'худи',
		urlToFullInformation: "/ru/collections/5/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  6,
		title: 'худи, размер М',
		discription: 'Ручная вышивка, хлопок',
		sale: false,
		sliderImg: '/img/collections/6/preview-img/1.jpg',
		altText:'худи',
		urlToFullInformation: "/ru/collections/6/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  7,
		title: 'футболка, размер М',
		discription: 'Ручная вышивка, вискоза, хлопок',
		sale: false,
		sliderImg: '/img/collections/7/preview-img/1.jpg',
		altText:'футболка',
		urlToFullInformation: "/ru/collections/7/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  8,
		title: 'футболка, размер М',
		discription: 'Ручная вышивка, хлопок',
		sale: false,
		sliderImg: '/img/collections/8/preview-img/1.jpg',
		altText:'футболка',
		urlToFullInformation: "/ru/collections/8/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  9,
		title: 'футболка, размер М',
		discription: 'Ручная вышивка, хлопок',
		sale: false,
		sliderImg: '/img/collections/9/preview-img/1.jpg',
		altText:'футболка',
		urlToFullInformation: "/ru/collections/9/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  10,
		title: 'бомбер, размер М',
		discription: 'Ручная вышивка',
		sale: false,
		sliderImg: '/img/collections/10/preview-img/1.jpg',
		altText:'бомбер',
		urlToFullInformation: "/ru/collections/10/",
		collection: 2021,
		galeryImages: [
			
		],
	},
	{
		id:  11,
		title: 'футболка, размер М',
		discription: 'Ручная вышивка, хлопок',
		sale: false,
		sliderImg: '/img/collections/11/preview-img/1.jpg',
		altText:'нет в продаже',
		urlToFullInformation: "/ru/collections/11/",
		collection: 2021,
		galeryImages: [
			
		],
	},

]


const currentLocation = document.location.pathname;
const arrCurrentLocation = currentLocation.split('/');
let numPage;//номер страницы  - это номер товара и его id, также это номер папки где лежит index.html товара в родилеьской папке collections

if(arrCurrentLocation[arrCurrentLocation.length - 3] === 'collections') numPage = arrCurrentLocation[arrCurrentLocation.length - 2];

switch (currentLocation) {
	case '/'://страница home   ru
		renderCardsForSlider(goods)
		break;
	case `/ru/collections/${numPage}/`:
		renderPageOfProduct(goods, numPage)
		break
}




function renderCardsForSlider(goodsObj) {
	const swiperContainer = document.querySelector('#swiper-out');

	goodsObj.forEach(e => {
		const swiperSlide = document.createElement('div');
		swiperSlide.classList.add('swiper-slide')

		swiperSlide.innerHTML = `
			<div class="card-type-1">
				<div class="card-type-1__flex-wrapper">
					<a href=${e.urlToFullInformation}>
						<div class="card-type-1__img-wrapper">
							<img src=${e.sliderImg} alt=${e.altText}>
						</div>
					</a>
					<div class="card-type-1__discription-wrapper">
						<h3 class="card-type-1__discription-title">${e.title}</h3>
						<p class="card-type-1__discription-text">${e.discription}</p>
						<div class="card-type-1__btn-wrapper">
							<button ${e.sale ? '' : 'disabled'} class="card-type-1__discription-button btn__type-1 btn__type-1">${e.sale ? 'узнать цену':'нет в продаже'}</button>
						</div>
					</div>
				</div>
			</div>
		`
		swiperContainer.append(swiperSlide)
	})
}

function renderPageOfProduct(goodsObj, numPage) {
	const collectionWrapper = document.querySelector('.collection__wrapper')
	const gridContainer = document.createElement('div');
	const collectionDiscription = document.createElement('div');
	const collectionGridMobil = document.createElement('div');
	
	gridContainer.classList.add('collection__grid', 'product_' + numPage)
	collectionDiscription.classList.add('collection__discription')
	collectionGridMobil.classList.add('collection__grid', 'mobile')

	goodsObj.forEach((good, index) => {
		if(good.id == numPage) {
			good.galeryImages.forEach((img, index) => {
				gridContainer.innerHTML += `
				<div class="collection__grid-item product_${good.id} img-${index+1}">
					<img class="collection__grid-img" src=${img.link} alt=${img.altText}>
				</div>
				`;
			});

			collectionDiscription.innerHTML += `
				<div class="collection__discription">
					<h1 class="collection__title">${good.title}</h1>
					<div class="collection__text">${good.discription}</div>
					<button ${good.sale ? '' : 'disabled'} class=" btn1 btn__type-1 collection__btn">${good.sale ? 'узнать цену':'нет в продаже'}</button>
				</div>
			`;

			collectionGridMobil.innerHTML += `
				<div class="collection__grid product_${good.id} mobile ">
					<div class="collection__grid-item mobile product_${good.id} img-${index+1}">
						<img class="collection__grid-img" src="/img/collections/${numPage}/1.jpg" alt="product photo">
					</div>
				</div>
			`;
			collectionGridMobil.classList.add(`product_${good.id}`);
		};
	});

	collectionWrapper.append(gridContainer);
	collectionWrapper.append(collectionDiscription);
	collectionWrapper.append(collectionGridMobil);
}


//===================================================
//slider-swiper
const swiper = new Swiper('.swiper', {
	speed: 400,
	spaceBetween: 20,
	loop: true,
	breakpoints: {
	// when window width is >= 320px
		320: {
			slidesPerView: 1,
		},
		640: {
			slidesPerView: 6,
		}
	},
	// autoplay: {
	// 	delay: 1500,
	//  },
});