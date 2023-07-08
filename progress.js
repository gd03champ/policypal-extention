document.addEventListener('DOMContentLoaded', function() {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if (message.action === 'updateProgress') {
        updateProgress(message.progress);
      } else if (message.action === 'closeProgressPopup') {
        window.close(); // Close the progress popup window
      }
    });
  });
  
  function updateProgress(progress) {
    var progressText = document.getElementById('progressText');
    progressText.textContent = progress;
  }
  
  