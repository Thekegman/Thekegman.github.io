var HOME_HASH = "cv";
var HASH2URL = {
    "cv": "cv.html",
    "conway": "conway.html"
};
var HASH2INITFUNC = {
    "conway": conway_init
};
var HASH2ENDFUNC = {
    "conway": conway_end
};
async function fetchAsText(url) {
    return await (await fetch(url)).text();
}
var lasthash;

async function loadContent(url, init_func, end_func) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = await fetchAsText(url);
    if (end_func) {
        end_func();
    }
    if (init_func) {
        init_func();
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
    end_func = HASH2ENDFUNC[lasthash];
    init_func = HASH2INITFUNC[hash];
    setActive("header-list", hash.concat('-link'));
    loadContent(url, init_func, end_func);
    lasthash = hash;
}

window.onhashchange();