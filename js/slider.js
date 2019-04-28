$(document).ready(function() {
	// slideNow - указывает какой слайд сейчас используется
	var slideNow = 1
	// slideCount - счетчик количества слайдов в слайдере (количество li)
	var slideCount = $('.sliderwprapper').children().length
	// var slideTime = 6000
	// Пагинация
	var navBtn = $('.slide-nav')
	const slider = $('.sliderwprapper')[0]
	// const slider = document.querySelector('.sliderwprapper')
	// console.log(slider)

	// let sliderTimer = setInterval(nextSlide, slideTime);
	
	navBtn.on('click', function(event) {
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
	// navBtn.on('mouseover', function(event) {
	// 	event.preventDefault()
	// 	clearInterval(sliderTimer)
	// });
	
	// Выходим из области кружка пагинации и возвращаем обратно таймер
	// navBtn.on('mouseout', function(event) {
	// 	event.preventDefault()
	// 	sliderTimer = setInterval(nextSlide, slideTime)
	// });

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

	function prevSlide() {
		// Если нынешний слайд является первым или вне количества слайдов
		if (slideNow == 1 || slideNow <=0 || slideNow > slideCount) {
			// (slideCount - 1) - с пролистыванием назад каждый раз уменьшаем количество слайдов на один. Отматываемся на 1500px
			var translateWidth = -$('.viewport').width() * (slideCount - 1);
			$('.sliderwprapper').css({
				'transform': 'translate('+translateWidth+'px,0)',
				'-o-transform': 'translate('+translateWidth+'px,0)',
				'-webkit-transform': 'translate('+translateWidth+'px,0)'
			});
			// Возвращаемся на последний слайд
			slideNow = slideCount;
			$('.active').removeClass('active');
			$('.slide-nav:eq(-1)').toggleClass('active')
		} else {
			// (slideNow - 2) - чтобы вернуться на предыдущий слайд отнимаем ширину этого и предыдущего
			var translateWidth = -$('.viewport').width()	* (slideNow - 2);
			$('.sliderwprapper').css({
				'transform': 'translate('+translateWidth+'px,0)',
				'-o-transform': 'translate('+translateWidth+'px,0)',
				'-webkit-transform': 'translate('+translateWidth+'px,0)'
			});	
			slideNow--;
			// Номер слайда сразу вверху кода определяем как 1, поэтому счет слайдеров идет с 1. Счет кнопок идет с 0. Поэтому если номер кнопки пагинации не совпадает с номеров слайдера, то кнопке мы присваиваем номер слайдера меньше на 1, т.к. счет кнопок с 0 
			if (navBtn - 1 != slideNow){
				navBtn = slideNow - 1;
				$('.active').removeClass('active');
				$('.slide-nav:eq(' + navBtn + ')').toggleClass('active')
			}
		}
	}

	// флаг при клике. по умолчанию false, т.е. не нажат 
	let isDown = false
	// Стартовая точка
	let startX
	// Следит за тем в какую сторону идет смещение (плюс/минус) относительно точки нажатия
	let walk
	
	slider.addEventListener('mousedown', (e) => {
		isDown = true
		slider.classList.add('cursor-active')
		startX = e.pageX
		// scrollLeft = slider.scrollLeft
	})

	slider.addEventListener('mouseleave', () => {
		isDown = false
		slider.classList.remove('cursor-active')
	})

	slider.addEventListener('mouseup', () => {
		isDown = false
		slider.classList.remove('cursor-active')
		if (walk >= 0) {
			$('.slide').css({
				'transform': 'translate(0,0)',
				'-o-transform': 'translate(0,0)',
				'-webkit-transform': 'translate(0,0)'
			});
			prevSlide()
		} else {
			$('.slide').css({
				'transform': 'translate(0,0)',
				'-o-transform': 'translate(0,0)',
				'-webkit-transform': 'translate(0,0)'
			});
			nextSlide()
		}
	})

	slider.addEventListener('mousemove', (e) => {
		if (!isDown) { return } // останавливаем выполнении функции
		e.preventDefault()
		// пересчитываем координату x при каждом сдвиге
		const x = e.pageX
		walk = (x - startX) * 3
		// slider.scrollLeft = scrollLeft - walk
		if (document.documentElement.clientWidth > 768) {
			if (walk >= 0) {
				$('.slide').css({
					'transform': 'translate(30px,0)',
					'-o-transform': 'translate(30px,0)',
					'-webkit-transform': 'translate(30px,0)'
				});
			} else {
				$('.slide').css({
					'transform': 'translate(-30px,0)',
					'-o-transform': 'translate(-30px,0)',
					'-webkit-transform': 'translate(-30px,0)'
				});
			}
		}
	})
});