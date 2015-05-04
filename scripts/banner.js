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