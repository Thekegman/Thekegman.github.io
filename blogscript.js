var HOME_HASH = "cv";
var HASH2URL = {
    "cv": "cv.html",
    "conway": "conway.html"
};
var HASH2FUNC = {
    "conway": conway_init
};
async function fetchAsText(url) {
    return await (await fetch(url)).text();
}

async function loadContent(url, script_init) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = await fetchAsText(url);
    if (script_init) {
        script_init()
    }
}

function import_script() {
    var script = document.createElement('script');
    scripts = document.getElementsByTagName('script')[0];
    script.src = url;
    script.defer = true;
    scripts.parentNode.insertBefore(script, scripts);
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
    script_init = HASH2FUNC[hash];
    setActive("header-list", hash.concat('-link'));
    loadContent(url, script_init);
}

window.onhashchange();