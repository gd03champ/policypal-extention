chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.fetchContent) {
      chrome.tabs.executeScript(sender.tab.id, {code: 'document.documentElement.innerHTML'}, function(results) {
        var content = results[0];
        // Send the content back to the content script for analysis
        chrome.tabs.sendMessage(sender.tab.id, {sendContent: true, content: content});
      });
    }
  });
  