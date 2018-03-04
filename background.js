chrome.pageAction.onClicked.addListener(function(tab) {
    console.log("test");
    let action_url = "file:///home/yvz/soyagaci-extension/index.html";
    chrome.tabs.create({url: action_url});
});

function checkForValidUrl(tabId, changeInfo, tab) {
    if(tab.url.indexOf("https://www.google.com.tr") === 0) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
