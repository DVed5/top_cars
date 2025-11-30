
// Бургер-меню и якоря
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__menu");
    const navLinks = document.querySelectorAll(".header__menu a");

    // Открытие / закрытие по бургеру
    burger.addEventListener("click", () => {
        header.classList.toggle("header--nav-open");
    });

    // Закрытие меню при клике на ссылку
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            header.classList.remove("header--nav-open");
            document.body.classList.remove("no-scroll");
        });
    });

    // ⭐ Закрытие при клике вне меню
    document.addEventListener("click", (e) => {
        const clickInsideMenu = menu.contains(e.target);
        const clickOnBurger = burger.contains(e.target);

        if (!clickInsideMenu && !clickOnBurger) {
            header.classList.remove("header--nav-open");
            document.body.classList.remove("no-scroll");
        }
    });

    // ⭐ Закрытие при свайпе вверх (мобильный UX)
    let touchStartY = 0;

    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener("touchmove", (e) => {
        const diff = e.touches[0].clientY - touchStartY;
        if (diff < -60) { // свайп вверх
            header.classList.remove("header--nav-open");
            document.body.classList.remove("no-scroll");
        }
    });



	// Кнопки, которые скроллят к квизу
	const quizButtons = document.querySelectorAll('a[href="#quiz"], .scroll-to-quiz');
	quizButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const href = btn.getAttribute("href");
			if (href && href.startsWith("#")) {
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			}
		});
	});

	// FAQ аккордеон
	const faqItems = document.querySelectorAll(".faq__item");

	faqItems.forEach((item) => {
		const questionBtn = item.querySelector(".faq__question");
		const answer = item.querySelector(".faq__answer");

		if (!questionBtn || !answer) return;

		questionBtn.addEventListener("click", () => {
			const isOpen = item.classList.contains("faq__item--open");

			faqItems.forEach((other) => {
				if (other !== item) {
					other.classList.remove("faq__item--open");
					const otherAnswer = other.querySelector(".faq__answer");
					if (otherAnswer) {
						otherAnswer.style.maxHeight = null;
						otherAnswer.style.paddingBottom = "0";
					}
				}
			});

			if (isOpen) {
				item.classList.remove("faq__item--open");
				answer.style.maxHeight = null;
				answer.style.paddingBottom = "0";
			} else {
				item.classList.add("faq__item--open");
				answer.style.maxHeight = answer.scrollHeight + "px";
				answer.style.paddingBottom = "10px";
			}
		});
	});

	// Reveal-анимация при скролле
	const revealElements = document.querySelectorAll(".reveal");

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal--visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.15,
			}
		);

		revealElements.forEach((el) => observer.observe(el));
	} else {
		// Фолбэк: просто сразу показываем
		revealElements.forEach((el) => el.classList.add("reveal--visible"));
	}

	// Фолбэк-форма – можно подключить к Tilda/CRM через JS / вебхук
	const fallbackForm = document.getElementById("fallback-calc-form");
	if (fallbackForm) {
		fallbackForm.addEventListener("submit", (e) => {
			e.preventDefault();

			// сюда в будущем можно добавить отправку через fetch или интеграцию Tilda
			alert("Спасибо! Мы получили ваши данные и свяжемся с вами в ближайшее время.");
			fallbackForm.reset();
		});
	}

	window.scrollTo({
		top: target.offsetTop - 20,
		behavior: "smooth"
	});
});