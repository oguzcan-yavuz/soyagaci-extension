function checkForValidUrl(tabId, changeInfo, tab) {
    let eDevletUrl = "https://www.turkiye.gov.tr/nvi-alt-ust-soy-bilgisi-sorgulama";
    if (tab.url === eDevletUrl)
        chrome.pageAction.show(tabId);
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.pageAction.onClicked.addListener(function (tab) {
    onWindowLoad();
});

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

let htmlResult;

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "getSource") {
        htmlResult = request.source;
        createTab();
    }
});

// ***      ***

function createTab() {
    let actionUrl = "file:///home/yvz/yvz-dev/soyagaci-extension/dist/index.html";
    chrome.tabs.create({url: actionUrl});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "getHtml") {
        sendResponse({ result: htmlResult });
    }
    return true;
});
