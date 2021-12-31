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
	console.log(pathName)

	menuLinks.forEach(e => e.closest('.menu__link-wrapper').classList.remove('active'));

	menuLinks.forEach(e => {
		const linkLocation = e.getAttribute('href').split('/');
		const locationName = linkLocation[linkLocation.length - 1];
	
		if (locationName === pathName) e.closest('.menu__link-wrapper').classList.add('active');
		else if(currentLocation.find(e => e === 'collections')){
			console.log((currentLocation.find(e => e === 'collections')))
			document.querySelectorAll('.dropdown-wrapper').forEach(e => e.classList.add('active'));
			return false;
		}
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
console.log()

if(arrCurrentLocation[arrCurrentLocation.length - 3] === 'collections') numPage = arrCurrentLocation[arrCurrentLocation.length - 2];
else if(typeof(+arrCurrentLocation[arrCurrentLocation.length - 4]) == 'number') numPage = arrCurrentLocation[arrCurrentLocation.length - 2];

console.log(numPage)

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
	case `/ru/collections/year/${numPage}/`:
		renderRusPageOfCollections(goods, false , numPage);
		break;
	case `/ru/for-sale/`:
		renderRusPageOfCollections(goods, true);
		break;
}

//функция получает уникальные года коллекций из главного объекта, возвращает массив
function arrYearsOfCollections(goodsObj){
	const yearsOfCollectionsSet = new Set();
	goodsObj.forEach(e => yearsOfCollectionsSet.add(e.collection));
	return Array.from(yearsOfCollectionsSet).sort((a,b)=>b-a);
};

dropdownRender(goods);

function dropdownRender(goodsObj) {
	const yearsOfCollectionsArr = arrYearsOfCollections(goodsObj);

	const menu = document.querySelectorAll('.menu__collection-dropdown');

	menu.forEach(menuDropWrapper => {
		yearsOfCollectionsArr.forEach(year => { menuDropWrapper.innerHTML += `
			<li class="menu__collection-dropdown-item">
				<a href="/ru/collections/year/${year}" class="menu__link">
					<span class="menu__link-text">коллекция ${year}</span>
				</a>
			</li>
			`;
		});
	});
};

//функция отрисовывает страницу с коллекциями и годами.
function renderRusPageOfCollections(goodsObj, forSale=false, year = false) {

	if (forSale) { //фильтр по наличию товара для страницы "На продажу"
		goodsObj = goodsObj.filter(e => e.sale == true);

	} else if (year) { //фильтр по годам для дропдауна страницы "Коллекции"
		goodsObj = goodsObj.filter(e => e.collection == year);
	}

	const collectionGaleryContainer = document.querySelector('.collection-galery__container');

	const yearsOfCollectionsArr = arrYearsOfCollections(goodsObj);

	yearsOfCollectionsArr.forEach(year => collectionGaleryContainer
		.innerHTML += htmlTemplateYearOfCollection(year));
	
	//проверяем год в карточке и отправляем её в блок коллекции 2021, 2022 и т.д.
	goodsObj.forEach(product => {
		document.querySelector(`.collection-galery__${product.collection}`)
		.innerHTML += htmlProductTemplate(product)
	});

	function htmlTemplateYearOfCollection(year){
		return`
			<div class="collection-galery-wrapper">
				<div class="collection-galery__grid">
					<h2 class="collection-galery__title">Коллекция ${year}</h2>
				</div>
				<div class="collection-galery__grid collection-galery__${year}"></div>
			</div>
		`
	};

	function htmlProductTemplate(product){
		return`
			<div class="card-type-2 card-type-2__grid-item">
				<div class="card-type-2__flex-wrapper">
					<a href=${product.urlToFullInformation} class="card-type-2__img-wrapper">
						<img src=${product.sliderImg} alt=${product.previewDiscription}>
					</a>
					<div class="card-type-2__discription-wrapper">
						<h3 class="card-type-2__discription-title">${product.title}</h3>
						<p class="card-type-2__discription-text">${product.previewDiscription}</p>
						<div class="card-type-1__btn-wrapper">
						<button ${product.sale ? '' : 'disabled'} class="card-type-1__discription-button btn__type-1 btn__type-1">${product.sale ? 'узнать цену':'нет в продаже'}</button>
					</div>
				</div>
			</div>
		`
	;}
};

//функция добавляет карточки в слайдер
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

//функция рисует содержиме страницы с полным отображением одного товара и галереей изобраджений
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
