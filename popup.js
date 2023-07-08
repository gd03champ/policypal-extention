document.addEventListener('DOMContentLoaded', function() {
    var analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', function() {
      var linkInput = document.getElementById('linkInput');
      var link = linkInput.value.trim();
      
      if (link !== '') {
        fetchContent(link)
          .then(function(content) {
            return analyzeContent(content);
          })
          .then(function(summary) {
            showSummary(summary);
          })
          .catch(function(error) {
            console.error('Error:', error);
          });
      }
    });
  });
  
  function fetchContent(link) {
    return new Promise(function(resolve, reject) {
      chrome.tabs.create({ url: link, active: false }, function(tab) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
          if (tabId === tab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
  
            setTimeout(function() {
              chrome.tabs.sendMessage(tab.id, { action: 'getContent' }, function(response) {
                if (chrome.runtime.lastError) {
                  reject(new Error('Error executing script: ' + chrome.runtime.lastError.message));
                } else {
                  resolve(response.content);
                }
  
                chrome.tabs.remove(tab.id); // Close the tab after scraping
              });
            }, 50); // Adjust the delay as needed based on the page's loading behavior
          }
        });
      });
    });
  }
  
  
  function analyzeContent(content) {
    return new Promise(function(resolve, reject) {
      // Perform your text analysis and summarization here
      // You can use NLP libraries or services to extract relevant information and generate summaries
      // Resolve with the summary
      var summary = "summary content: " + content;
      resolve(summary);
    });
  }
  
  function showSummary(summary) {
    // Show the summarized output to the user
    window.alert(summary);
    console.log(summary);
  }
  