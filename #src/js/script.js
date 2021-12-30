@@include('lib/swiper-bundle.min.js');
@@include('goodsList.js'); // весь список товара (аналог json, только в js объекте)


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
//Функции отрисовки шаблонов

const currentLocation = document.location.pathname;
const arrCurrentLocation = currentLocation.split('/');
let numPage;//номер страницы  - это номер товара и его id, также это номер папки где лежит index.html товара в родилеьской папке collections

if(arrCurrentLocation[arrCurrentLocation.length - 3] === 'collections') numPage = arrCurrentLocation[arrCurrentLocation.length - 2];

console.log(currentLocation)

switch (currentLocation) {
	case '/'://страница home   ru
		renderRusCardsForSlider(goods);
		break;
	case `/ru/collections/${numPage}/`:
		renderRusPageOfProduct(goods, numPage);
		break;
	case `/ru/collections/`:
		renderRusPageOfCollections(goods);
		break;
}

function renderRusPageOfCollections(goodsObj) {
	const collectionGaleryContainer = document.querySelector('.collection-galery__container');
	const yearsOfCollectionsSet = new Set();
	
	goodsObj.forEach(e => yearsOfCollectionsSet.add(e.collection));
	const yearsOfCollectionsArr = Array.from(yearsOfCollectionsSet).reverse();

	yearsOfCollectionsArr.forEach(year => collectionGaleryContainer.innerHTML += htmlTemplateYearOfCollection(year));

	const collection2021 = collectionGaleryContainer.querySelector('.collection-galery__2021');
	const collection2022 = collectionGaleryContainer.querySelector('.collection-galery__2022');
	
	goodsObj.forEach(product => {
		switch (product.collection) {
			case 2021:
				collection2021.innerHTML += htmlProductTemplate(product);
			break;
			case 2022:
				collection2022.innerHTML += htmlProductTemplate(product);
			break;
	}
})

	function htmlTemplateYearOfCollection(year){
		return`
			<div class="collection-galery-wrapper">
				<h2 class="collection-galery__title">Коллекция ${year}</h2>
				<div class="collection-galery__grid collection-galery__${year}"></div>
			</div>
		`
	}

	function htmlProductTemplate(product){
		return`
			<div class="card-type-2 card-type-2__grid-item">
				<div class="card-type-2__flex-wrapper">
					<div class="card-type-2__img-wrapper">
						<img src=${product.sliderImg} alt=${product.previewDiscription}>
					</div>
					<div class="card-type-2__discription-wrapper">
						<h3 class="card-type-2__discription-title">${product.title}</h3>
						<p class="card-type-2__discription-text">${product.previewDiscription}</p>
						<div class="card-type-1__btn-wrapper">
						<button ${product.sale ? '' : 'disabled'} class="card-type-1__discription-button btn__type-1 btn__type-1">${product.sale ? 'узнать цену':'нет в продаже'}</button>
					</div>
				</div>
		</div>
	`;}
};


function renderRusCardsForSlider(goodsObj) {
	const swiperContainer = document.querySelector('#swiper-out');

	goodsObj.forEach(e => {
		const swiperSlide = document.createElement('div');
		swiperSlide.classList.add('swiper-slide');

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
						<p class="card-type-1__discription-text">${e.previewDiscription}</p>
						<div class="card-type-1__btn-wrapper">
							<button ${e.sale ? '' : 'disabled'} class="card-type-1__discription-button btn__type-1 btn__type-1">${e.sale ? 'узнать цену':'нет в продаже'}</button>
						</div>
					</div>
				</div>
			</div>
		`;
		swiperContainer.append(swiperSlide);
	});
};

function renderRusPageOfProduct(goodsObj, numPage) {
	const collectionWrapper = document.querySelector('.collection__wrapper');
	const gridContainer = document.createElement('div');
	const collectionDiscription = document.createElement('div');
	const collectionGridMobil = document.createElement('div');
	
	gridContainer.classList.add('collection__grid', 'product_' + numPage);
	collectionDiscription.classList.add('collection__discription');
	collectionGridMobil.classList.add('collection__grid', 'mobile');

	goodsObj.forEach((good, index) => {
		if(good.id == numPage) {
			good.galeryImages.forEach((img, index) => {
				gridContainer.innerHTML += `
				<div class="collection__grid-item ${good.gridStyleTamplate} img-${index+1}">
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
				<div class="collection__grid ${good.gridStyleTamplate} mobile ">
					<div class="collection__grid-item mobile ${good.gridStyleTamplate} img-${index+1}">
						<img class="collection__grid-img" src="/img/collections/${numPage}/1.jpg" alt=${good.title}>
					</div>
				</div>
			`;
			collectionGridMobil.classList.add(`${good.gridStyleTamplate}`);
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


//img/collections/1/preview-img/1.jpg
//img/collections/1/preview-img/1.jpg