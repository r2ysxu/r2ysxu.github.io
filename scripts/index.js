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

function openProjectDesc(buttonElem, noteid) {

	$('#project1_tab').removeClass('selectedProject');
	$('#project2_tab').removeClass('selectedProject');
	$('#project3_tab').removeClass('selectedProject');


	document.getElementById('pictoviewTextCell').style.display = 'none';
	document.getElementById('chitchatTextCell').style.display = 'none';
	document.getElementById('ovaflowTextCell').style.display = 'none';

	$(buttonElem).addClass('selectedProject');
	document.getElementById(noteid).style.display = 'block';
}