!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=898)}({898:function(e,t){let r;chrome.tabs.onUpdated.addListener(function(e,t,r){"https://www.turkiye.gov.tr/nvi-alt-ust-soy-bilgisi-sorgulama"===r.url&&chrome.pageAction.show(e)}),chrome.pageAction.onClicked.addListener(function(e){chrome.tabs.executeScript(null,{file:"getPagesSource.js"},function(){chrome.runtime.lastError&&console.log(chrome.runtime.lastError.message)})}),chrome.runtime.onMessage.addListener(function(e,t){"getSource"===e.action&&(r=e.source,chrome.tabs.create({url:"file:///home/yvz/yvz-dev/soyagaci-extension/dist/index.html"}))}),chrome.runtime.onMessage.addListener(function(e,t,n){return"getHtml"===e.action&&n({result:r}),!0})}});
//# sourceMappingURL=background.bundle.js.map