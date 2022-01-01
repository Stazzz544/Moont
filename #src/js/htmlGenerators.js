function htmlGeneratorYearOfCollection(year){
	return`
		<div class="collection-galery-wrapper">
			<div class="collection-galery__grid">
			
				${enLang ? 
					`<h2 class="collection-galery__title">Collection ${year}</h2>`
					:
					`<h2 class="collection-galery__title">Коллекция ${year}</h2>`
				}

			</div>
			<div class="collection-galery__grid collection-galery__${year}"></div>
		</div>
	`
};

function htmlGeneratorProductTemplate(product){
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
};

function htmlGeneratorSliderTemlate(swiperSlide, product) {
	swiperSlide.innerHTML = `
		<div class="card-type-1">
			<div class="card-type-1__flex-wrapper">
				<a href=${product.urlToFullInformation}>
					<div class="card-type-1__img-wrapper">
						<img src=${product.sliderImg} alt=${product.altText}>
					</div>
				</a>
				<div class="card-type-1__discription-wrapper">
					<h3 class="card-type-1__discription-title">${product.title}</h3>
					<p class="card-type-1__discription-text">${product.previewDiscription}</p>
					<div class="card-type-1__btn-wrapper">
						<button ${product.sale ? '' : 'disabled'} class="card-type-1__discription-button btn__type-1 btn__type-1">${product.sale ? 'узнать цену':'нет в продаже'}</button>
					</div>
				</div>
			</div>
		</div>
		`;
};

function htmlGeneratordropDownMenu (year){
	return `
		<li class="menu__collection-dropdown-item">
			<a href="/ru/collections/year/${year}" class="menu__link">
				<span class="menu__link-text">коллекция ${year}</span>
			</a>
		</li>
	`;
};


function htmlGeneratorGridContainer (product, index, img){
	return `
		<div class="collection__grid-item ${product.gridStyleTamplate} img-${index+1}">
			<img class="collection__grid-img" src=${img.link} alt=${img.altText}>
		</div>
	`;
};

function htmlGeneratorCollectionDiscription(product) {
	return `
		<div class="collection__discription">
			<h1 class="collection__title">${product.title}</h1>
			<div class="collection__text">${product.discription}</div>
			<button ${product.sale ? '' : 'disabled'} class=" btn1 btn__type-1 collection__btn">${product.sale ? 'узнать цену':'нет в продаже'}</button>
		</div>
	`;
};

function htmlGeneratorcollectionGridMobil(product, index, numPage) {
	return `
		<div class="collection__grid ${product.gridStyleTamplate} mobile ">
			<div class="collection__grid-item mobile ${product.gridStyleTamplate} img-${index+1}">
				<img class="collection__grid-img" src="/img/collections/${numPage}/1.jpg" alt=${product.title}>
			</div>
		</div>
	`;
}