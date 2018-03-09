function checkForValidUrl(tabId, changeInfo, tab) {
    let eDevletUrl = "https://www.turkiye.gov.tr/nvi-alt-ust-soy-bilgisi-sorgulama";
    if (tab.url === eDevletUrl)
        chrome.pageAction.show(tabId);
}

function onUpdate() {
    chrome.tabs.onUpdated.addListener(checkForValidUrl);
}

function onClick() {
    chrome.pageAction.onClicked.addListener(function (tab) {
        onWindowLoad();
    });
}

// *** Getting HTML of the source page ***

function onWindowLoad() {
    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError)
            console.log(chrome.runtime.lastError.message);
    });
}

function onMsg() {
    let htmlResult;
    chrome.runtime.onMessage.addListener(function (request, sender) {
        if (request.action === "getSource")
            htmlResult = request.source;
    });
    createTab(htmlResult);
}

// ***      ***

function createTab(htmlResult) {
    let actionUrl = "file:///home/yvz/soyagaci-extension/dist/index.html";
    chrome.tabs.create({url: actionUrl});
}

onUpdate();
onClick();
onMsg();
