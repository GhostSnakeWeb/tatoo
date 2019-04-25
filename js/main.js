$(document).ready(function() {
	// jQuery Validate JS
	// $('#contact-form').validate({
	// 	rules: {
	// 		name: { required: true },
	// 		phone: { required: true }
	// 	},
	// 	messages: {
	// 		name: "Пожалуйста, введите имя",
	// 		phone: "Пожалуйста, введите телефон"
	// 	}
	// })

	// Маска телефона
	$(function(){
	  $("#phone").mask("+7(999) 999-99-99");
	});
});