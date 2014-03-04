$(function() {
	var imgs = [];
	imgs.push('images/checkbox.png');
	imgs.push('images/checkbox-s.png');
	imgs.push('images/radio.png');
	imgs.push('images/radio-s.png');
	imgs.push('images/drag_arrow.png');
	imgs.push('images/drag_arrow-a.png');
	imgs.push('images/error.png');
	imgs.push('images/select.png');

	$(imgs).each(function() {
		var image = $('<img />').attr('src', this).bind("load", function() {
		});
	});
})
