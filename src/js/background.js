import { HTMLParser } from '@soyagaci/parser/format/html';

chrome.pageAction.onClicked.addListener(function(tab) {
    let action_url = "file:///home/yvz/soyagaci-extension/dist/index.html";
    chrome.tabs.create({url: action_url}).then(function(tab) {
        HTMLParser("<h1>test</h1>").then(console.log);
    })
});

function checkForValidUrl(tabId, changeInfo, tab) {
    if(tab.url.indexOf("https://www.turkiye.gov.tr/nvi-alt-ust-soy-bilgisi-sorgulama") === 0) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
