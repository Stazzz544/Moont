@@include('lib/swiper-bundle.min.js');
@@include('htmlGenerators.js');
@@include('goodsList.js'); // весь список товара (аналог json, только в js объекте)


const globSiteInfo= {
	numPage: 1,
	currentLocation: '',
	arrCurrentLocation: [],
	enLang: false,
	totalProducts: goods.length,
	nextProductPage: '',
	prevProductPage: '',

	numPageFunc() {
		if(this.arrCurrentLocation[this.arrCurrentLocation.length - 3] === 'collections') {
			this.numPage = +this.arrCurrentLocation[this.arrCurrentLocation.length - 2]
		}
		else if(typeof(+this.arrCurrentLocation[this.arrCurrentLocation.length - 4]) == 'number') {
			this.numPage = +this.arrCurrentLocation[this.arrCurrentLocation.length - 2];
		}
	},
	currentLanguageOfPageFunc() {
		if (this.arrCurrentLocation[1] &&  this.arrCurrentLocation[1] == 'en') this.enLang = true;
		else this.enLang = false;
	},
	currentLocationFunc() {
		this.currentLocation = document.location.pathname;
	},
	arrCurrentLocationFunc() {
		this.arrCurrentLocation = this.currentLocation.split('/');
	},
	productPageFunc() {
		if (this.numPage == 1){
			this.prevProductPage = this.totalProducts;
			this.nextProductPage = this.numPage + 1;
		}
		else if(this.numPage == this.totalProducts) {
			this.prevProductPage = this.numPage - 1;
			this.nextProductPage = 1;
		}
		else {
			this.prevProductPage = this.numPage - 1;
			this.nextProductPage = this.numPage + 1;
		};
	}
};

globSiteInfo.currentLocationFunc();
globSiteInfo.arrCurrentLocationFunc();
globSiteInfo.currentLanguageOfPageFunc();
globSiteInfo.numPageFunc();
globSiteInfo.productPageFunc();

console.log(globSiteInfo) 

switch (globSiteInfo.currentLocation) {
	case '/':
	case '/en/':
		renderCardsForSlider(goods);
		break;
	case `/ru/collections/${globSiteInfo.numPage}/`:
	case `/en/collections/${globSiteInfo.numPage}/`:
		renderPageOfProduct(goods, globSiteInfo.numPage);
		break;
	case `/ru/collections/`:
	case `/en/collections/`:
		renderPageOfCollections(goods);
		break;
	case `/ru/collections/year/${globSiteInfo.numPage}/`:
	case `/en/collections/year/${globSiteInfo.numPage}/`:
		renderPageOfCollections(goods, false, globSiteInfo.numPage);
		break;
	case `/ru/for-sale/`:
	case `/en/for-sale/`:
		renderPageOfCollections(goods, true);
		break
};

burger();
activeClassesInNavMenu(globSiteInfo);
dropdownRender(goods);
currentYearForFuter();

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

function activeClassesInNavMenu(globSiteInfo) {
	const menuLinks = document.querySelectorAll('.menu__link');
	const arrCurrentLocation = globSiteInfo.arrCurrentLocation;
	const pathName = arrCurrentLocation[arrCurrentLocation.length - 2];

	menuLinks.forEach(e => e.closest('.menu__link-wrapper').classList.remove('active'));

	menuLinks.forEach(e => {
		const linkLocation = e.getAttribute('href').split('/');
		const locationName = linkLocation[linkLocation.length - 1];
	
		if (locationName === pathName) e.closest('.menu__link-wrapper').classList.add('active');
		else if(arrCurrentLocation.find(e => e === 'collections')){
			document.querySelectorAll('.dropdown-wrapper').forEach(e => e.classList.add('active'));
			return false;
		} else if(locationName == '' && pathName == 'en') {
			document.querySelectorAll('.menu__link-wrapper-home').forEach(e => e.classList.add('active'));
		}
	});
};


function burger() {
	const burger = document.querySelector('#burger');
	const body = document.querySelector('body');
	const submenu = document.querySelector('.submenu ');

	burger.addEventListener('click', () => {
		if (!body.classList.contains('lock')) body.classList.add('lock');
		else body.classList.remove('lock');
		document.querySelector('#mainMenu').classList.toggle('active');
		burger.classList.toggle('active');
		if(submenu.classList.contains('active'))submenu.classList.remove('active');
	});
};

//функция получает уникальные года в коллекцию из главного объекта, возвращает массив
function arrYearsOfCollections(goodsObj){
	const yearsOfCollectionsSet = new Set();
	goodsObj.forEach(product => yearsOfCollectionsSet.add(product.collection));
	return Array.from(yearsOfCollectionsSet).sort((a,b)=>b-a);
};


function dropdownRender(goodsObj) {
	const yearsOfCollectionsArr = arrYearsOfCollections(goodsObj);

	const menu = document.querySelectorAll('.menu__collection-dropdown');

	menu.forEach(menuDropWrapper => {
		yearsOfCollectionsArr.forEach(year => { menuDropWrapper.innerHTML += htmlGeneratordropDownMenu (year);
		});
	});
};

//субменю в мобильной версии
document.querySelector('.submenu__activator').addEventListener('click', () => {
	const submenu = document.querySelector('.submenu');
	submenu.classList.add('active');
	document.querySelector('.submenu__wrapper-item-back').addEventListener('click', () => {
		submenu.classList.remove('active');
	})
})


//функция отрисовывает страницу с коллекциями и годами.
function renderPageOfCollections(goodsObj, forSale=false, year = false) {

	if (forSale) { //фильтр по наличию товара для страницы "На продажу"
		goodsObj = goodsObj.filter(e => e.sale == true);

	} else if (year) { //фильтр по годам для дропдауна страницы "Коллекции"
		goodsObj = goodsObj.filter(e => e.collection == year);
	};

	const collectionGaleryContainer = document.querySelector('.collection-galery__container');

	const yearsOfCollectionsArr = arrYearsOfCollections(goodsObj);

	yearsOfCollectionsArr.forEach(year => collectionGaleryContainer
		.innerHTML += htmlGeneratorYearOfCollection(year));
	
	//проверяем год в карточке и отправляем её в блок коллекции 2021, 2022 и т.д.
	goodsObj.forEach(product => {
		document.querySelector(`.collection-galery__${product.collection}`)
		.innerHTML += htmlGeneratorProductTemplate(product);
	});
};

//функция добавляет карточки в слайдер
function renderCardsForSlider(goodsObj) {
	const swiperContainer2021 = document.querySelector('#collection-2021');

	goodsObj.forEach(product => {
		if (product.collection === 2021) {
			const swiperSlide = document.createElement('div');
			swiperSlide.classList.add('swiper-slide');
			htmlGeneratorSliderTemlate(swiperSlide, product);
			swiperContainer2021.append(swiperSlide);
		}
	});
};

//функция рисует содержиме страницы с полным отображением одного товара и галереей изобраджений
function renderPageOfProduct(goodsObj, numPage) {
	const collectionGridContainer = document.querySelector('.collection__wrapper');
	const collectionWrapper = document.querySelector('.collection');

	const gridContainer = document.createElement('div');
	const collectionDiscription = document.createElement('div');
	const collectionGridMobile = document.createElement('div');
	const nextPrevArrow = document.createElement('div');
	
	gridContainer.classList.add('collection__grid', 'product_' + numPage);
	collectionDiscription.classList.add('collection__discription');
	collectionGridMobile.classList.add('collection__grid', 'mobile');
	nextPrevArrow.classList.add('collection__arrow-container');


	goodsObj.forEach((product, index) => {
		if(product.id == numPage) {
			product.galeryImages.forEach((img, index) => gridContainer.innerHTML += htmlGeneratorGridContainer(product, index, img));
			collectionDiscription.innerHTML += htmlGeneratorCollectionDiscription(product);
			collectionGridMobile.innerHTML += htmlGeneratorcollectionGridMobil(product, index, numPage);
			collectionGridMobile.classList.add(`${product.gridStyleTamplate}`);
			nextPrevArrow.innerHTML += htmlGeneratorNextPrevArrow(globSiteInfo.prevProductPage, globSiteInfo.nextProductPage);
		};
	});

	collectionGridContainer.append(gridContainer);
	collectionGridContainer.append(collectionDiscription);
	collectionGridContainer.append(collectionGridMobile);
	collectionWrapper.append(nextPrevArrow);
}
//===================================================

function currentYearForFuter(){
	const date = new Date()
	const year = date.getFullYear()
	document.querySelector('#current-year').textContent = year
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
		641: {
			slidesPerView: 6,
		}
	},
	autoplay: {
		delay: 1500,
	},
});
