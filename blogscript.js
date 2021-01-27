async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function loadtext(url) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = await fetchHtmlAsText(url);
}

function loadCH1() {
    ret = setActive("header-list", "ch1-link");
    if (ret == 0) {
        loadtext("moby1.html");
        window.location.hash = "#moby1";
    }
}

function loadCH2() {
    ret = setActive("header-list", "ch2-link");
    if (ret == 0) {
        loadtext("moby2.html");
        window.location.hash = "#moby2";
    }
}

function loadCV() {
    ret = setActive("header-list", "cv-link");
    if (ret == 0) {
        loadtext("cv.html");
        window.location.hash = "#cv";
    }
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

hash = "";
if (window.location.hash) {
    hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
}
if (hash == "moby1") {
    loadCH1();
} else if (hash == "moby2") {
    loadCH2();
} else {
    loadCV();
}