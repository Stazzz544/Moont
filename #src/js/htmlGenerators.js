function htmlGeneratorYearOfCollection(year){
	return`
		<div class="collection-galery-wrapper">
			<div class="collection-galery__grid">
			
				${globSiteInfo.enLang ? 
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
			${globSiteInfo.enLang ? 
				`<a href=${product.urlToFullInformationEn} class="card-type-2__img-wrapper">
					<img src=${product.sliderImg} alt=${product.previewDiscriptionEn}>
				</a>
				<div class="card-type-2__discription-wrapper">
					<a card-type-1__discription-link href=${product.urlToFullInformationEn}>
						<h3 class="card-type-2__discription-title">${product.titleEn}</h3>
						<p class="card-type-2__discription-text">${product.previewDiscriptionEn}</p>
					</a>
					<div class="card-type-1__btn-wrapper">
					${product.sale ? 
						`<a href="mailto: fashion@moont.ru?body=Hi,%0D%0A%0D%0AI'm interested in:%0D%0A%0D%0A${product.titleEn}, ${product.previewDiscriptionEn}, ${product.collection}" class="card-type-1__discription-button btn__type-1">order</a>`
						:
						`<a class="card-type-1__discription-button btn__type-1 disabled">sold</a>`
					}
				</div>`
			:
			`<a href=${product.urlToFullInformation} class="card-type-2__img-wrapper">
				<img src=${product.sliderImg} alt=${product.previewDiscription}>
			</a>
			<div class="card-type-2__discription-wrapper">
				<a card-type-1__discription-link href=${product.urlToFullInformation}>
					<h3 class="card-type-2__discription-title">${product.title}</h3>
					<p class="card-type-2__discription-text">${product.previewDiscription}</p>
				</a>
				<div class="card-type-1__btn-wrapper">
				${product.sale ? 
					`<a href='mailto: fashion@moont.ru?body=Здравствуйте,%0D%0A%0D%0AИнтересует цена:%0D%0A%0D%0A${product.title}, ${product.previewDiscription}, ${product.collection}' class="card-type-1__discription-button btn__type-1">узнать цену</a>`
					:
					`<a class="card-type-1__discription-button btn__type-1 disabled">нет в продаже</a>`
					}
			</div>`
			}
			</div>
		</div>
	`
};

function htmlGeneratorSliderTemlate(swiperSlide, product) {
	swiperSlide.innerHTML = `
		<div class="card-type-1">
			<div class="card-type-1__flex-wrapper">

				${globSiteInfo.enLang ? 
				`<a href=${product.urlToFullInformationEn}>
					<div class="card-type-1__img-wrapper">
						<img class="card-type-1__img" src=${product.sliderImg} alt=${product.altTextEn}>
					</div>
				</a>`
				:
				`<a href=${product.urlToFullInformation}>
					<div class="card-type-1__img-wrapper">
						<img  class="card-type-1__img" src=${product.sliderImg} alt=${product.altText}>
					</div>
				</a>`
				}

				<div class="card-type-1__discription-wrapper">
					${globSiteInfo.enLang ?
						`<a card-type-1__discription-link href=${product.urlToFullInformationEn}>
							<h3 class="card-type-1__discription-title">${product.titleEn}</h3>
							<p class="card-type-1__discription-text">${product.previewDiscriptionEn}</p>
						</a>
						<div class="card-type-1__btn-wrapper">

						${product.sale ? 
							`<a href="mailto: fashion@moont.ru?body=Hi,%0D%0A%0D%0AI'm interested in:%0D%0A%0D%0A${product.titleEn}, ${product.previewDiscriptionEn}, ${product.collection}" class="card-type-1__discription-button btn__type-1">order</a>`
							:
							`<a class="card-type-1__discription-button btn__type-1 disabled">sold</a>`
							}
						</div>`
						:
						`<a card-type-1__discription-link href=${product.urlToFullInformation}>
							<h3 class="card-type-1__discription-title">${product.title}</h3>
							<p class="card-type-1__discription-text">${product.previewDiscription}</p>
						</a>
						<div class="card-type-1__btn-wrapper">

							${product.sale ? 
							`<a href='mailto: fashion@moont.ru?body=Здравствуйте,%0D%0A%0D%0AИнтересует цена:%0D%0A%0D%0A${product.title}, ${product.previewDiscription}, ${product.collection}' class="card-type-1__discription-button btn__type-1">узнать цену</a>`
							:
							`<a class="card-type-1__discription-button btn__type-1 disabled">нет в продаже</a>`
							}
						</div>`
					}
				</div>
			</div>
		</div>
		`;
};

function htmlGeneratordropDownMenu (year){
	return `
		<li class="menu__collection-dropdown-item">
		${globSiteInfo.enLang ?
			`<a href="/en/collections/year/${year}" class="menu__link">
				<span class="menu__link-text">collection ${year}</span>
			</a>`
			:
			`<a href="/ru/collections/year/${year}" class="menu__link">
				<span class="menu__link-text">коллекция ${year}</span>
			</a>`
		}
		</li>
	`;
};


function htmlGeneratorGridContainer (product, index, img){
	return `
		<div class="collection__grid-item ${product.gridStyleTamplate} img-${index+1}">
		${globSiteInfo.enLang ? 
			`<img class="collection__grid-img" src=${img.link} alt=${img.altTextEn}>`
		:
			`<img class="collection__grid-img" src=${img.link} alt=${img.altText}>`
		}
		</div>
	`;
};

function htmlGeneratorCollectionDiscription(product) {
	return `
	${globSiteInfo.enLang ?
		`<h1 class="collection__title">${product.titleEn}</h1>
		<div class="collection__text">${product.discriptionEn}</div>
		${product.sale ? 
			`<a href="mailto: fashion@moont.ru?body=Hi,%0D%0A%0D%0AI'm interested in:%0D%0A%0D%0A${product.titleEn}, ${product.previewDiscriptionEn}, ${product.collection}" class="card-type-1__discription-button collection__btn btn__type-1">order</a>`
			:
			`<a class="card-type-1__discription-button collection__btn btn__type-1 disabled">sold</a>`
			}`
		:
		`<h1 class="collection__title">${product.title}</h1>
		<div class="collection__text">${product.discription}</div>
		${product.sale ? 
			`<a href='mailto: fashion@moont.ru?body=Здравствуйте,%0D%0A%0D%0AИнтересует цена:%0D%0A%0D%0A${product.title}, ${product.previewDiscription}, ${product.collection}' class="card-type-1__discription-button collection__btn btn__type-1">узнать цену</a>`
			:
			`<a class="card-type-1__discription-button collection__btn btn__type-1 disabled">нет в продаже</a>`
			}`
	}
	`;
};

function htmlGeneratorcollectionGridMobil(product, index, numPage) {
	return `
		<div class="collection__grid ${product.gridStyleTamplate} mobile ">
			<div class="collection__grid-item mobile ${product.gridStyleTamplate} img-${index+1}">
			${globSiteInfo.enLang ? 
				`<img class="collection__grid-img" src="/img/collections/${numPage}/1.jpg" alt=${product.titleEn}>`
			:
				`<img class="collection__grid-img" src="/img/collections/${numPage}/1.jpg" alt=${product.title}>`
			}
			</div>
		</div>
	`;
}

function htmlGeneratorNextPrevArrow(prevPage, nextPage) {
	return `
		<div class="collection__arrow-prev">
		${globSiteInfo.enLang ? 
			`<a class="collection__arrow-prev-link" href="/en/collections/${prevPage}">previous</a>`
			:
			`<a class="collection__arrow-prev-link" href="/ru/collections/${prevPage}">предыдущий</a>`
		}
		</div>

		<div class="collection__arrow-next">
		${globSiteInfo.enLang ? 
			`<a class="collection__arrow-next-link" href="/en/collections/${nextPage}">next</a>`
			:
			`<a class="collection__arrow-next-link" href="/ru/collections/${nextPage}">следующий</a>`
		}
		</div>
	`;
};


function htmlGeneratorMainScreenPromoImages() {
    return (
        globSiteInfo.promoScreenImages === "type_1" &&
        `<div class="promo__flex-item for-huge-screen">
              <img class="promo__img" src="/img/home_page/1.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-screen-and-tablet">
              <img class="promo__img" src="/img/home_page/2.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item">
              <img class="promo__img" src="/img/home_page/3.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-huge-screen">
              <img class="promo__img" src="/img/home_page/4.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-screen-and-tablet">
              <img class="promo__img for-huge-screen" src="/img/home_page/5.jpg" alt="promo-img">
          </div>
          <div class="promo__center-logo-wrapper">
              <img class="promo__center-logo-img" src="/img/home_page/logo/center_logo.svg" alt="logo">
          </div>`
        ||
        globSiteInfo.promoScreenImages === "type_2" &&
        `<div class="promo__flex-item for-huge-screen">
              <img class="promo__img" src="/img/home_page/6-1.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-screen-and-tablet">
              <img class="promo__img" src="/img/home_page/7-1.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item">
              <img class="promo__img" src="/img/home_page/8.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-huge-screen">
              <img class="promo__img" src="/img/home_page/9.jpg" alt="promo-img">
          </div>
          <div class="promo__flex-item for-screen-and-tablet">
              <img class="promo__img for-huge-screen" src="/img/home_page/10.jpg" alt="promo-img">
          </div>
          <div class="promo__center-logo-wrapper">
              <img class="promo__center-logo-img" src="/img/home_page/logo/center_logo.svg" alt="logo">
          </div>
      `);
  }