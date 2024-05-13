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
	response: {
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
}

// new Tabs('tabs-example', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });

new Accordion('.accordion', {
	shouldOpenAll: false, // true
	defaultOpen: [], // [0,1]
	collapsedClass: 'open',
});