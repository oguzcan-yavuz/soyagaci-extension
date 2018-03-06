import { HTMLParser } from '@soyagaci/parser/format/html';

HTMLParser("<h1>test</h1>").then(console.log);

chrome.pageAction.onClicked.addListener(function(tab) {
    let action_url = "file:///home/yvz/soyagaci-extension/dist/index.html";
    chrome.tabs.create({url: action_url});
});

function checkForValidUrl(tabId, changeInfo, tab) {
    if(tab.url.indexOf("https://www.google.com.tr") === 0) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
