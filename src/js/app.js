/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
// import AOS from 'aos'
// import Swiper, { Navigation, Pagination } from 'swiper';

import BaseHelpers from './helpers/BaseHelpers.js';
import PopupManager from './modules/PopupManager';
import BurgerMenu from './modules/BurgerMenu';
import Tabs from './modules/Tabs';
import Accordion from './modules/Accordion.js';

BaseHelpers.checkWebpSupport();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
// AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();



var swiper = new Swiper(".prod-slider", {
	navigation: {
		nextEl: ".prod-slider-next",
		prevEl: ".prod-slider-prev",
	},
});
new Swiper(".trending__slider", {
	slidesPerView: "auto",
	spaceBetween: 16,
	breakpoints: {
		1380: {
			slidesPerView: 3,
			spaceBetween: 24,
		}
	},
	navigation: {
		nextEl: ".trending-slider-next",
		prevEl: ".trending-slider-prev",
	},
});
var swiper2 = new Swiper(".mySwiper3", {
	direction: "vertical",
	spaceBetween: 16,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});
new Swiper(".products__list", {
	navigation: {
		nextEl: ".products__next",
		prevEl: ".products__prev",
	},
	slidesPerView: 2,
	spaceBetween: 8,
	grid: {
		rows: 3,
	},
	breakpoints: {
		768: {
			spaceBetween: 16,
		},
		1380: {
			slidesPerView: 3,
			spaceBetween: 24,
		}
	},
	pagination: {
		el: ".products__pagination",
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + "</span>";
		},
	},
});

let html = document.documentElement;
let body = document.body;
let pageWrapper = document.querySelector('.page');
let lockPaddingElements = document.querySelectorAll('[data-lp]');

function toggleBodyLock2(isLock) {
	const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;

	if (lockPaddingElements) {
		lockPaddingElements.forEach((element) => {
			element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
		});
	}

	body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
	html.classList.toggle('lock', isLock);
}

window.onload = function () {
	document.querySelectorAll(".cookie__btn").forEach(btn => {

		btn.addEventListener('click', () => {
			document.querySelector('.cookie').style.display = 'none';
		})
	})
	if (document.querySelector(".header-mob__lang-btn")) {
		document.querySelector(".header-mob__lang-btn").addEventListener("click", () => {
			document.querySelector('.header-mob__langs').classList.toggle('active')
		})
	}
	try {

		document.querySelector(".products__filter-btn").addEventListener('click', () => {
			document.querySelector(".products__filters").classList.add('active')
			toggleBodyLock2(true);
		})
		document.querySelector(".products-filters__close").addEventListener('click', () => {
			document.querySelector(".products__filters").classList.remove('active')
			if (!html.classList.contains('menu-open')) {
				toggleBodyLock2(false)
			}
		})
		document.querySelector(".products__result").addEventListener('click', () => {
			document.querySelector(".products__filters").classList.remove('active')
			if (!html.classList.contains('menu-open')) {
				toggleBodyLock2(false)
			}
		})
		document.querySelector(".products__filters").addEventListener('click', (e) => {
			if (e.target === document.querySelector(".products__filters")) {
				document.querySelector(".products__filters").classList.remove('active')
				if (!html.classList.contains('menu-open')) {
					toggleBodyLock2(false)
				}
			}
		})
		document.querySelector(".products__clear").addEventListener('click', () => {
			document.querySelector(".products__filters").classList.remove('active')
			if (!html.classList.contains('menu-open')) {
				toggleBodyLock2(false)
			}
		})
	} catch (err) { console.log(err) }

	document.querySelectorAll(".dropdown__btn").forEach((item) => {
		item.addEventListener('click', (e) => {
			if (item.parentElement.classList.contains('active')) {
				document.querySelectorAll(".dropdown__btn").forEach((btn) => {
					btn.parentElement.classList.remove('active')
				})
			}
			else {
				document.querySelectorAll(".dropdown__btn").forEach((btn) => {
					btn.parentElement.classList.remove('active')
				})
				item.parentElement.classList.add('active')
			}
		})
	})
	try {
		document.querySelector(".header__cart").addEventListener('click', () => {
			document.documentElement.classList.add('cart-open');
			toggleBodyLock2(true)
		})
		let closeCart = () => {
			document.documentElement.classList.remove('cart-open');
			if (!html.classList.contains('menu-open')) {
				toggleBodyLock2(false)
			}
		}
		document.querySelector(".cart__close").addEventListener('click', closeCart)
		document.querySelector(".cart").addEventListener('click', (e) => {
			if (e.target == document.querySelector('.cart')) {
				closeCart();
			}
		})
	} catch (err) { console.log(err) }

	document.querySelectorAll(".header-swiper__back").forEach(backBtn => {
		backBtn.addEventListener('click', () => {
			document.querySelectorAll(`.header-swiper`).forEach(menu => {
				menu.classList.remove("active");
				document.querySelector(".header-mob__container").classList.remove("closed")
			})
		})
	})
	document.querySelectorAll(".header-swiper__btn").forEach(item => {
		item.addEventListener('click', () => {

			document.querySelectorAll(`.header-swiper`).forEach(menu => {
				if (menu.dataset.id === item.dataset.id) {
					menu.classList.add("active");
					document.querySelector(".header-mob__container").classList.add("closed")
				}
			})
		})
	})
	try {
		customSelect();
	}
	catch (err) { console.log(err) }
}

function customSelect() {
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "products__select": */
	x = document.getElementsByClassName("products__select");
	l = x.length;
	for (i = 0; i < l; i++) {
		selElmnt = x[i].getElementsByTagName("select")[0];
		ll = selElmnt.length;
		/* For each element, create a new DIV that will act as the selected item: */
		a = document.createElement("DIV");
		a.setAttribute("class", "select-selected");
		a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
		x[i].appendChild(a);
		/* For each element, create a new DIV that will contain the option list: */
		b = document.createElement("DIV");
		b.setAttribute("class", "select-items select-hide");
		for (j = 1; j < ll; j++) {
			/* For each option in the original select element,
			create a new DIV that will act as an option item: */
			c = document.createElement("DIV");
			c.innerHTML = selElmnt.options[j].innerHTML;
			c.addEventListener("click", function (e) {
				/* When an item is clicked, update the original select box,
				and the selected item: */
				var y, i, k, s, h, sl, yl;
				s = this.parentNode.parentNode.getElementsByTagName("select")[0];
				sl = s.length;
				h = this.parentNode.previousSibling;
				for (i = 0; i < sl; i++) {
					if (s.options[i].innerHTML == this.innerHTML) {
						s.selectedIndex = i;
						h.innerHTML = this.innerHTML;
						y = this.parentNode.getElementsByClassName("same-as-selected");
						yl = y.length;
						for (k = 0; k < yl; k++) {
							y[k].removeAttribute("class");
						}
						this.setAttribute("class", "same-as-selected");
						break;
					}
				}
				h.click();
			});
			b.appendChild(c);
		}
		x[i].appendChild(b);
		a.addEventListener("click", function (e) {
			/* When the select box is clicked, close any other select boxes,
			and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
	}

	function closeAllSelect(elmnt) {
		/* A function that will close all select boxes in the document,
		except the current select box: */
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}

	/* If the user clicks anywhere outside the select box,
	then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
}

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

new Accordion('.products__accordion', {
	shouldOpenAll: false, // true
	defaultOpen: [0, 1], // [0,1]
	collapsedClass: 'open',
});
new Accordion('.product__accordion', {
	shouldOpenAll: true, // true
	defaultOpen: [0, 1], // [0,1]
	collapsedClass: 'open',
});
new Accordion('.accordion', {
	shouldOpenAll: false, // true
	defaultOpen: [], // [0,1]
	collapsedClass: 'open',
});