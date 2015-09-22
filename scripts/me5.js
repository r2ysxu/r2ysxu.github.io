var skillSet = [0, 1, 2, 3, 4];
var selectedSkill = 2;

function scrollSelect() {
    selectedSkill =  (selectedSkill + 1) % skillSet.length;
    alert('hi');
}

function clickSkill(value, elem) {
    var offset = selectedSkill - value;

    /*for(var i in elems){
        var refElem = elems[i];
        refElem.parentNode.insertBefore(elementToInsert.CloneNode(), refElem.nextSibling);
    }

    if (offset > 0) {
        for (var i = 0; i <= offset;i++) {
            console.log(i);
            elem.parentNode.insertBefore(elem,elem.nextSibling);
        }
    } else if (offset < 0) {
        for (var i = offset; i <= 0;i++) {
            console.log(i);
            elem.parentNode.insertBefore(elem,elem.previousSibling);
        }
    } */

    selectedSkill = value;
    showSelectedValue(value);
}

function showSelectedValue(value) {
    switch(value) {
        case 0:
            document.getElementById('backendSkills').style.display = 'none';
            document.getElementById('frontendSkills').style.display = 'none';
            document.getElementById('nonWebSkills').style.display = 'none';
            document.getElementById('toolsSkills').style.display = 'block';
            document.getElementById('serversSkills').style.display = 'none';
            break;
        case 1:
            document.getElementById('backendSkills').style.display = 'none';
            document.getElementById('frontendSkills').style.display = 'none';
            document.getElementById('nonWebSkills').style.display = 'none';
            document.getElementById('toolsSkills').style.display = 'none';
            document.getElementById('serversSkills').style.display = 'block';
            break;
        case 2:
            document.getElementById('backendSkills').style.display = 'block';
            document.getElementById('frontendSkills').style.display = 'none';
            document.getElementById('nonWebSkills').style.display = 'none';
            document.getElementById('toolsSkills').style.display = 'none';
            document.getElementById('serversSkills').style.display = 'none';
            break;
        case 3:
            document.getElementById('backendSkills').style.display = 'none';
            document.getElementById('frontendSkills').style.display = 'block';
            document.getElementById('nonWebSkills').style.display = 'none';
            document.getElementById('toolsSkills').style.display = 'none';
            document.getElementById('serversSkills').style.display = 'none';
            break;
        case 4:
            document.getElementById('backendSkills').style.display = 'none';
            document.getElementById('frontendSkills').style.display = 'none';
            document.getElementById('nonWebSkills').style.display = 'block';
            document.getElementById('toolsSkills').style.display = 'none';
            document.getElementById('serversSkills').style.display = 'none';
            break;
        default:
            document.getElementById('backendSkills').style.display = 'block';
            document.getElementById('frontendSkills').style.display = 'none';
    }
}