window.onscroll = checkBannerOnScroll;

function checkBannerOnScroll() {
    var scrollPos = document.body.scrollTop;
    var scrollHeight = document.body.scrollHeight;

    if (scrollPos > 188) {
        document.getElementById("banner").className= "scrolldown";
        document.getElementById("bannerFill").style.height = "200px";
    } else {

        document.getElementById("banner").className = "relativeStatic";
        document.getElementById("bannerFill").style.height = "0px";
    }
}

function showModal(id) {
    document.getElementById(id).style.opacity = 1;
    $('#' + id).addClass('selectedDialog');
}

function hideModal() {
    document.getElementById('ovaflowModal').style.opacity = 0;
    $('#ovaflowModal').removeClass('selectedDialog');
    document.getElementById('chitchatModal').style.opacity = 0;
    $('#chitchatModal').removeClass('selectedDialog');
    document.getElementById('pictoviewModal').style.opacity = 0;
    $('#pictoviewModal').removeClass('selectedDialog');
}