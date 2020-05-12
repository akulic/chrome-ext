// Message listener for article
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    copyToClip(request.value);
    sendResponse({value: 'Text copied'});
});


// Copy to clipboard
function copyToClip(text) {
    const ta = document.createElement('textarea');
    ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
    ta.value = text;
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand('copy');
    ta.remove();
}