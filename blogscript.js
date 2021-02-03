var HOME_HASH = "cv";
var HASH2URL = {
    "cv": "cv.html",
    "ch1": "chapter1.html",
    "ch2": "chapter2.html",
    "splines": "splines.html"
};
var HASH2SCRIPT = {
    "splines": "splines.js"
};
async function fetchAsText(url) {
    return await (await fetch(url)).text();
}

async function loadContent(url, script) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = await fetchAsText(url);
    if (script) {
        addScript(script);
    }
}

function addScript(src) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.defer = true
    document.getElementsByTagName('head')[0].appendChild(s);
}

function flip() {
    card = document.getElementById("maincard");
    content = card.getElementsByClassName("card-inner")[0]
    if (content.classList.contains('flipped')) {
        content.classList.remove('flipped');
    } else {
        content.classList.add('flipped')
    }
}

function setActive(ul_id, active_id) {
    var ul = document.getElementById(ul_id);
    var items = ul.getElementsByTagName("li");
    ret = -1;
    for (var i = 0; i < items.length; ++i) {
        if (items[i].id == active_id) {
            if (items[i].className == "active") {
                ret = 1;
            } else {
                items[i].className = "active";
                ret = 0;
            }
        } else {
            items[i].className = "inactive";
        }
    }
    return ret;
}

window.onhashchange = function() {
    hash = window.location.hash.substring(1).toLowerCase();
    if (!(hash in HASH2URL)) {
        hash = HOME_HASH;
    }
    url = HASH2URL[hash];
    script = HASH2SCRIPT[hash];
    setActive("header-list", hash.concat('-link'));
    loadContent(url, script);
}

window.onhashchange();