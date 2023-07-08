document.addEventListener('DOMContentLoaded', function() {
    var optionsForm = document.getElementById('optionsForm');
    var apiKeyInput = document.getElementById('apiKey');
  
    // Retrieve the stored API key and populate the input field if it exists
    chrome.storage.sync.get('apiKey', function(data) {
      if (data.apiKey) {
        apiKeyInput.value = data.apiKey;
      }
    });
  
    optionsForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var apiKey = apiKeyInput.value.trim();
  
      // Save the entered API key to the browser's storage
      chrome.storage.sync.set({ 'apiKey': apiKey }, function() {
        window.alert('API key saved!');
      });
    });
  });
  