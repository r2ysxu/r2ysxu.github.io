var currentProject = 0;
var MAX_PROJECT = 3;

function loader() {
	$(window).on("load", loaderHandler)
}

function loaderHandler() {
	$('.loader').hide();
}

function openProject(projectId) {
	currentProject = projectId;
	var p_id = "#";
	$('.dot').removeClass('active');
	$('.dot').eq(currentProject).addClass('active');
	switch(currentProject) {
		case 0 : p_id = "#pictoviewTextCell";
		break;
		case 1 : p_id = "#chitchatTextCell";
		break;
		case 2 : p_id = "#ovaflowTextCell";
		break;
	}

	$('#pictoviewTextCell').hide();
	$('#chitchatTextCell').hide();
	$('#ovaflowTextCell').hide();
	$(p_id).show();
}

function openNextProject() {
	if (currentProject < MAX_PROJECT - 1) currentProject++;
	else currentProject = 0;

	openProject(currentProject);
}

function openPrevProject() {
	if (currentProject > 0) currentProject--;
	else currentProject = MAX_PROJECT - 1;

	openProject(currentProject);
}

function toggleFishes() {
	$('#tank-canvas').toggle();
}