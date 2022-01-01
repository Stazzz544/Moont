@@include('lib/swiper-bundle.min.js');
@@include('htmlGenerators.js')
@@include('goodsList.js'); // весь список товара (аналог json, только в js объекте)


//===================================================
//функция для подключения webp
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {callback(webP.height == 2)};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
	if (support == true) document.querySelector('body').classList.add('webp');
	else document.querySelector('body').classList.add('no-webp');
});


//===================================================
//Функция удаления и добавления класса активности в меню навигации


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
		else if(currentLocation.find(e => e === 'collections')){
			document.querySelectorAll('.dropdown-wrapper').forEach(e => e.classList.add('active'));
			return false;
		}
	});
};

//===================================================

burger();

function burger() {
	const burger = document.querySelector('#burger');
	const body = document.querySelector('body');

	burger.addEventListener('click', () => {
		if (!body.classList.contains('lock')) body.classList.add('lock');
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
else if(typeof(+arrCurrentLocation[arrCurrentLocation.length - 4]) == 'number') numPage = arrCurrentLocation[arrCurrentLocation.length - 2];


console.log('currentLocation', currentLocation)
console.log(numPage)

const enLang = currentLanguageOfPage(arrCurrentLocation);

function currentLanguageOfPage(arrCurrentLocation){
	if (arrCurrentLocation[1] == 'en') return true;
	else false;
}

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
		renderRusPageOfCollections(goods, false, numPage);
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
		yearsOfCollectionsArr.forEach(year => { menuDropWrapper.innerHTML += htmlGeneratordropDownMenu (year);
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
		.innerHTML += htmlGeneratorYearOfCollection(year));
	
	//проверяем год в карточке и отправляем её в блок коллекции 2021, 2022 и т.д.
	goodsObj.forEach(product => {
		document.querySelector(`.collection-galery__${product.collection}`)
		.innerHTML += htmlGeneratorProductTemplate(product)
	});


};

//функция добавляет карточки в слайдер
function renderRusCardsForSlider(goodsObj) {
	const swiperContainer = document.querySelector('#swiper-out');

	goodsObj.forEach(product => {
		const swiperSlide = document.createElement('div');
		swiperSlide.classList.add('swiper-slide');

		htmlGeneratorSliderTemlate(swiperSlide, product)

		swiperContainer.append(swiperSlide);
	});
};

//функция рисует содержиме страницы с полным отображением одного товара и галереей изобраджений
function renderRusPageOfProduct(goodsObj, numPage) {
	const collectionWrapper = document.querySelector('.collection__wrapper');

	const gridContainer = document.createElement('div');
	const collectionDiscription = document.createElement('div');
	const collectionGridMobile = document.createElement('div');
	
	gridContainer.classList.add('collection__grid', 'product_' + numPage);
	collectionDiscription.classList.add('collection__discription');
	collectionGridMobile.classList.add('collection__grid', 'mobile');

	goodsObj.forEach((product, index) => {
		if(product.id == numPage) {
			product.galeryImages.forEach((img, index) => gridContainer.innerHTML += htmlGeneratorGridContainer(product, index, img));
			collectionDiscription.innerHTML += htmlGeneratorCollectionDiscription(product);
			collectionGridMobile.innerHTML += htmlGeneratorcollectionGridMobil(product, index, numPage);
			collectionGridMobile.classList.add(`${product.gridStyleTamplate}`);
		};
	});

	collectionWrapper.append(gridContainer);
	collectionWrapper.append(collectionDiscription);
	collectionWrapper.append(collectionGridMobile);
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
