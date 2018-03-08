import { HTMLParser } from '@soyagaci/parser/format/html';
import { convertRecordArrayToRelations } from '@soyagaci/models';

let relationArray;

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

chrome.runtime.onMessage.addListener(function (request, sender) {
    let htmlResult = "";
    let actionUrl = "file:///home/yvz/soyagaci-extension/dist/index.html";
    if (request.action === "getSource")
        htmlResult = request.source;
    chrome.tabs.create({url: actionUrl}, function (tab) {
        HTMLParser(htmlResult)
            .then(function(parsedResults) {
                relationArray = convertRecordArrayToRelations(parsedResults.records);
                console.log(relationArray);
            })
    })
});
