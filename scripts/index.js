function openDescription(buttonElem) {
	$('.tabBar-item').removeClass('tabBar-item_selected');

	$(buttonElem).addClass('tabBar-item_selected');

	$('.projectInfo').show();
	$('.projectDesign').hide();
}

function openDesign(buttonElem) {
	$('.tabBar-item').removeClass('tabBar-item_selected');

	$(buttonElem).addClass('tabBar-item_selected');
	$('.projectInfo').hide();
	$('.projectDesign').show();
}