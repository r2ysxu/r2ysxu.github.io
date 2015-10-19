function loadRepeatingDivs() {
}

function startDragWindow(elemid, event) {

	var elem = document.getElementById(elemid);
	var container = document.getElementById('skillsWindow');

	bringTofront(elem);
	drag(elem, container, event);
}

function startDragIcon(elemid, event) {
	var elem = document.getElementById(elemid);
	var container = document.getElementById('skillsWindow');
	console.log(event);	
}

function stopDragIcon(elemid, event) {
	event = event || window.event;

	console.log(event);	
}

function drag(elem, container, event) {
	event = event || window.event;

	var offsetX = (event.clientX - elem.style.left.replace('px',''));
	var offsetY = (event.clientY - elem.style.top.replace('px',''));

	document.onmousemove = function(evt){
        evt = evt || window.event;
        var posX =  evt.clientX - offsetX;
        var posY = evt.clientY - offsetY;

	    elem.style.left = posX + 'px';
	    elem.style.top = posY + 'px';
    }
}

function bringTofront(elem) {
	// Move all index to 1
	document.getElementById('notepadDiv').style.zIndex = 1;
	document.getElementById('browserDiv').style.zIndex = 1;
	document.getElementById('ovaflowDiv').style.zIndex = 1;
	document.getElementById('chitchatDiv').style.zIndex = 1;
	document.getElementById('pictoviewDiv').style.zIndex = 1;

	elem.style.zIndex = 2;
}

function stopDragWindow(elemid) {
	document.onmousemove = function(){};
}

function minimizeWindow(elemid) {
	var elem = document.getElementById(elemid+'Div');
	elem.style.display = 'none';

	if (elemid == 'browser') {
		document.getElementById('skillFrontendTask').checked = false;
	} else if (elemid == 'notepad') {
		document.getElementById('skillLanguageTask').checked = false;
	} else {
		document.getElementById('skill'+elemid+'Task').checked = false;
	}
}

function toggleWindow(radio, elemid) {
	var elem =  document.getElementById(elemid);

	if (radio.checked) elem.style.display = 'block';
	else elem.style.display = 'none';
}

function showStartMenu() {
	var elemButton = document.getElementById('skillStartTask');
	var elem =  document.getElementById('skillsStartMenu');
	if(elemButton.checked) elem.style.display = 'block';
	else elem.style.display = 'none';
}

//

function showStartTab(noteid) {
	hideStartSubTabs();
	if (noteid != '')
		document.getElementById(noteid).style.display = 'block';
}

function hideStartSubTabs() {
	document.getElementById('skillsProgramsTab').style.display = 'none';
	document.getElementById('skillsProjectsTab').style.display = 'none';
}

function hideStartTabs() {
	document.getElementById('skillStartTask').checked = false;
	document.getElementById('skillsStartMenu').style.display = 'none';
	hideStartSubTabs();
}

function openProjectNote(noteid) {
	document.getElementById(noteid+'Div').style.display = 'block';

	var taskBar = document.getElementById('skillsTaskbar');

	if (document.getElementById('skill'+noteid+'Task') == null){

		var projTaskInput = document.createElement('input');
		projTaskInput.checked = true;
		projTaskInput.id = 'skill'+noteid+'Task';
		projTaskInput.type = 'checkbox';
		projTaskInput.name = 'task';
		projTaskInput.className = 'taskbarBox';
		projTaskInput.onclick = function() {
			toggleWindow(projTaskInput, noteid+'Div');
		}

		var projTaskLabel = document.createElement('label');
		projTaskLabel.id = 'skill'+noteid+'TaskLb';
		projTaskLabel.htmlFor  = 'skill'+noteid+'Task';

		var imgLabel = document.createElement('img');
		imgLabel.src= "resources/images/pictoview-logo.png";
		imgLabel.className = "menuBarLogo";
		imgLabel.draggable = false;

		var textLabel = document.createElement('span');

		if (noteid == 'pictoview') textLabel.textContent = 'Pictoview';
		else if (noteid == 'chitchat') textLabel.textContent = 'Chitchat';
		else if (noteid == 'ovaflow') textLabel.textContent = 'Ovaflow';

		projTaskLabel.appendChild(imgLabel);
		projTaskLabel.appendChild(textLabel);


		taskBar.appendChild(projTaskInput);
		taskBar.appendChild(projTaskLabel);
	} else {
		document.getElementById('skill'+noteid+'Task').checked = true;
	}
}

function closeProjectNote(noteid) {
	document.getElementById(noteid+'Div').style.display = 'none';
	var taskBar = document.getElementById('skillsTaskbar');

	document.getElementById('skill'+noteid+'Task').remove();
	document.getElementById('skill'+noteid+'TaskLb').remove();
}

function openProjectDesc(buttonElem, noteid) {

	document.getElementById('pictoviewButton').className = 'projectOpener';
	document.getElementById('chitchatButton').className = 'projectOpener';
	document.getElementById('ovaflowButton').className = 'projectOpener';


	document.getElementById('pictoviewTextCell').style.display = 'none';
	document.getElementById('chitchatTextCell').style.display = 'none';
	document.getElementById('ovaflowTextCell').style.display = 'none';

	buttonElem.className = 'selectedProject';
	document.getElementById(noteid).style.display = 'block';
}