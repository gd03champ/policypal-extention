chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getContent') {
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    window.scrollTo(0, scrollHeight);
    setTimeout(function() {
      const textContent = document.documentElement.innerText;
      sendResponse({ content: textContent });
    }, 50); // Adjust the delay as needed based on the page's loading behavior
    return true; // Added to keep the message port open until sending the response
  }
});
