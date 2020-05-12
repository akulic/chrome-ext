// CONTEXT MENU (RIGHT CLICK)
// Desnim klikom na kataloški broj artikla, automatski se kopira proizvođač i kataloški broj.

// Listener for right click
document.addEventListener("contextmenu", function (e) {
    let clickedEl = e.target;
    if (clickedEl.tagName == 'NOBR' || clickedEl.tagName == 'A') {
        if (clickedEl.tagName == 'A') {
            clickedEl = clickedEl.children[0] // Ako je kliknut link, postavi nobr
        }
        if (clickedEl != null && clickedEl.parentElement.getAttribute('title') == 'Broj proizvoda') {
            sendToBackground(clickedEl);
            e.preventDefault();
        }
    }
});

function sendToBackground(elem) {
    let kataloski = elem.innerHTML.replace(/  +/g, ' ');
    let brand = $(elem).closest('tr').prevAll("tr.main_artikel_panel_tr_einspeiser").first().find("span:eq(1)").text();
    chrome.runtime.sendMessage({value: brand + "\t" + kataloski});
}

// --------------------------------------------------------------------------------------------------------------------
// PROSIRENA PRETRAGA
// Ako je označena 'Proširena pretraga', klikom na tipku Enter kod pretrage artikla, automatski se prikazuje prošireni asortiman.

// Event for Enter press
window.onload = function () {
    let article_search = $("#txt_articleSearch");

    article_search.keydown(function (e) {
        if ((e.which || e.keyCode) == 13) {
            getCheckState(function (prosirenaCheck) {
                if (prosirenaCheck == true) { // Return value
                    e.preventDefault();
                    createHref();
                }
            });
        }
    });

    article_search.focus(function () {
        chrome.storage.sync.get({ClearInput: false}, function (items) {
            if (items.ClearInput) {
                article_search.val("");
            }
        });
    });

    chrome.storage.sync.get({HideSidepanel: false}, function (items) {
        if (items.HideSidepanel && $("#Main").attr("class") == 'hybridView open') {
            $("#Main").attr('class', 'hybridView close');
        }
    });
};

// Get check state from chrome storage
function getCheckState(_callback) {
    chrome.storage.sync.get({ProsirenaChecked: false}, function (items) {
        if (typeof _callback == "function") {
            _callback(items.ProsirenaChecked);  // Return value
        }
    });
}

function createHref() {
    let article = $("#txt_articleSearch").val();
    // let sess = window.location.href.split('&')[0].split('?')[1].replace('10=', '');
    let sess = window.location.href.split("10=")[1].split('&')[0];
    let link = '10={sess}&12=2192&14=24&230=28&1116={art}&1117=127&1121=1&1130=1&1153=&1271=71&1272=&1273=&txt_articleSearch={art}&tp_articlesearch%24txt_articleSearch={art}';
    link = link.replace("{sess}", sess).replace(/{art}/g, article);
    link = "http://web1.carparts-cat.com/default.aspx?" + link;
    window.location.href = link;
}

// osnovno = {
//     10: "0077476D3431431BA40C70B6C03CE9C3328024",  # Session
//     12: "2192",
//     14: "24",
//     230: "28",
//     1116: "35682",  # Broj artikla
//     1117: "127",  # Prosirena pretraga
//     1121: "1",  # Prosirena pretraga
//     1130: '1',  # Prosirena pretraga
//     1153: "",
//     1271: "71",
//     1272: "",
//     1273: "",
//     "txt_articleSearch": "35682", # Broj artikla
//     'tp_articlesearch%24txt_articleSearch': '35682'  # Broj artikla
// }