$(document).ready(function() {
	// Мобильная навигация

	// Определяем переменные
	let navToggleButton = $('#menu-block__nav-button')
	let navBlock = $('.menu-block__nav-list')
	let navBlockOpen = 'menu-block__nav-list--open'
	let navLink = $('.menu-block__nav-list a')
	
	// Событие по клику на иконку
	navToggleButton.on('click', function(event) {
		event.preventDefault()
		navBlock.toggleClass(navBlockOpen)
		navToggleButton.toggleClass('menu-block__nav-toggle--fixed')
		navButtonToggle()
	});

	// Событие по клику на ссылки в меню
	navLink.on('click', function(event) {
		navBlock.removeClass(navBlockOpen)
		navToggleButton.toggleClass('menu-block__nav-toggle--fixed')
		navButtonToggle()
	});
	
	// Функция для анимации иконки
	function navButtonToggle() {
		if (navToggleButton.hasClass('active')) {
			navToggleButton.removeClass('active')
		} else {
			navToggleButton.addClass('active')
		}
	}

	// Собственный скрипт прокрутки навигации
	navBlock.on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top; // Расстояние от блока до верха всего документа
        $('body,html').animate({scrollTop: top}, 1500); // Количество пикселей на которое была прокручена страница
    });
});