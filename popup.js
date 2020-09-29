// Triggered when the checkbox state changes
// var pro_pretraga = document.getElementById('pro_pretraga');
var clear_input = document.getElementById('clear_input');
var hide_sidepanel = document.getElementById('hide_sidepanel');

// pro_pretraga.addEventListener('change', saveState);
clear_input.addEventListener('change', saveState);
hide_sidepanel.addEventListener('change', saveState);

function saveState() {
    let elem;
    if (this.id == "pro_pretraga") {
        elem = {ProsirenaChecked: this.checked}
    } else if (this.id == "clear_input") {
        elem = {ClearInput: this.checked}
    } else if (this.id == "hide_sidepanel") {
        elem = {HideSidepanel: this.checked}
    }
    chrome.storage.sync.set(elem); // Save checkbox state to storage
    window.close(); // Close popup window
}

// Set checkbox state from storage
window.onload = function () {
    chrome.storage.sync.get({ProsirenaChecked: false, ClearInput: false, HideSidepanel: false}, function (items) {
        // pro_pretraga.checked = items.ProsirenaChecked;
        clear_input.checked = items.ClearInput;
        hide_sidepanel.checked = items.HideSidepanel;
    });
};