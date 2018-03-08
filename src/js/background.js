import {HTMLParser} from '@soyagaci/parser/format/html';

function checkForValidUrl(tabId, changeInfo, tab) {
    let eDevlet = "https://www.turkiye.gov.tr/nvi-alt-ust-soy-bilgisi-sorgulama";
    let test = "";
    if (tab.url.indexOf(eDevlet === 0)) {
        chrome.pageAction.show(tabId);
    }
}

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError)
            console.log(chrome.runtime.lastError.message);
    });
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function (tab) {
    let actionUrl = "file:///home/yvz/soyagaci-extension/dist/index.html";
    let htmlResult = "";
    chrome.runtime.onMessage.addListener(function (request, sender) {
        if (request.action == "getSource") {
            htmlResult = request.source;
        }
    });
    window.onload = onWindowLoad;
    chrome.tabs.create({url: actionUrl}).then(function (tab) {
        HTMLParser(htmlResult).then(console.log);
    })
});
