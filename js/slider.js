$(document).ready(function() {
	// slideNow - указывает какой слайд сейчас используется
	var slideNow = 1;
	// slideCount - счетчик количества слайдов в слайдере (количество li)
	var slideCount = $('.sliderwprapper').children().length;
	var slideTime = 6000;
	// Пагинация
	var navBtn = $('.slide-nav');

	let sliderTimer = setInterval(nextSlide, slideTime);

	navBtn.click(function() {
		// index - возвращяет индекс заданного элемента в наборе
		navBtn = $(this).index();
		$('.active').removeClass('active');
		$(this).toggleClass('active');
		// Если индекс паггинации внизу не равен нынешнему слайду
		if (navBtn + 1 != slideNow) {
			var translateWidth = -$('.viewport').width()	* (navBtn);	
			$('.sliderwprapper').css({
				'transform': 'translate('+translateWidth+'px,0)',
				'-o-transform': 'translate('+translateWidth+'px,0)',
				'-webkit-transform': 'translate('+translateWidth+'px,0)'
			});
			// Переключаем слайд на слайд по номеру кнопки
			slideNow = navBtn + 1;
		}
	});
	
	// При наведении на любой из кружков пагинации отключаем установленный интервал
	navBtn.on('mouseover', function(event) {
		event.preventDefault()
		clearInterval(sliderTimer)
	});
	
	// Выходим из области кружка пагинации и возвращаем обратно таймер
	navBtn.on('mouseout', function(event) {
		event.preventDefault()
		sliderTimer = setInterval(nextSlide, slideTime)
	});

	// Функция переворачивающая слайды
	function nextSlide() {
		// Если нынешний слайд является последним или вне количества слайдов
		if (slideNow == slideCount || slideNow <=0 || slideNow > slideCount) {
			// Для обертки слайдера сбрасываем css свойства и возвращаем первый слайд
			$('.sliderwprapper').css({
				'transform': 'translate(0,0)',
				'-o-transform': 'translate(0,0)',
				'-webkit-transform': 'translate(0,0)'
			});
			slideNow = 1;
			$('.active').removeClass('active');
			$('.slide-nav:eq(0)').toggleClass('active')
		} else {
			// Иначе считаем ширину на которую надо сдвинуть слайд (ширина области видимости * на номер слайда сейчас)
			var translateWidth = -$('.viewport').width()	* (slideNow);	
			$('.sliderwprapper').css({
				'transform': 'translate('+translateWidth+'px,0)',
				'-o-transform': 'translate('+translateWidth+'px,0)',
				'-webkit-transform': 'translate('+translateWidth+'px,0)'
			});
			// Переключаем на следующий слайд
			slideNow++;
			// Номер слайда сразу вверху кода определяем как 1, поэтому счет слайдеров идет с 1. Счет кнопок идет с 0. Поэтому если номер кнопки пагинации не совпадает с номеров слайдера, то кнопке мы присваиваем номер слайдера меньше на 1, т.к. счет кнопок с 0 
			if (navBtn + 1 != slideNow){
				navBtn = slideNow - 1;
				$('.active').removeClass('active');
				$('.slide-nav:eq(' + navBtn + ')').toggleClass('active')
			}
		}
	}
});