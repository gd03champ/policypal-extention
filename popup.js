// Create the context menu item
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "inspectTos",
        title: "PolicyPal✨ - Inspect policy",
        contexts: ["link"],
        documentUrlPatterns: ["*://*/*"]
    });
});

// Add a listener for the context menu item click event
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "inspectTos") {
        var link = info.linkUrl;

        if (link !== '') {
            openProgressPopup();
            fetchContent(link)
                .then(function (content) {
                    updateProgress('Prompting Content');
                    return analyzeContent(content);
                })
                .then(function (summary) {
                    updateProgress('Analysis complete ✅');
                    showSummary(summary);
                    closeProgressPopup();
                })
                .catch(function (error) {
                    console.error('Error:', error);
                    updateProgress('Error: \n' + error + "\n Please try again later or contact GD");
                });
        } else {
            window.alert("Please paste link before clikcing the button! What will I analyze with an empty input box? Your head ?")
        }
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', function () {
        var linkInput = document.getElementById('linkInput');
        var link = linkInput.value.trim();

        if (link !== '') {
            openProgressPopup();
            fetchContent(link)
                .then(function (content) {
                    updateProgress('Prompting Content');
                    return analyzeContent(content);
                })
                .then(function (summary) {
                    updateProgress('Analysis complete ✅ \n' + summary);
                    showSummary(summary);
                    closeProgressPopup();
                })
                .catch(function (error) {
                    console.error('Error:', error);
                    updateProgress('Error:', error + "\n Please try again later or contact GD");
                });
        }
    });

    var optionsLink = document.getElementById('optionsLink');
    optionsLink.addEventListener('click', function () {
        chrome.runtime.openOptionsPage();
    });
});

//progress interact functions
function openProgressPopup() {
    var progressUrl = chrome.extension.getURL('progress.html');
    chrome.windows.create({
        url: progressUrl,
        type: 'popup',
        width: 365,
        height: 460
    }, function (window) {
        // Send a message to the progress popup to update the progress
        chrome.tabs.sendMessage(window.tabs[0].id, { action: 'updateProgress', progress: 'Processing...' });
    });
}

function updateProgress(progress) {
    // Send a message to the progress popup to update the progress
    chrome.runtime.sendMessage({ action: 'updateProgress', progress: progress });
}

function closeProgressPopup() {
    // Send a message to the progress popup to update the progress
    chrome.runtime.sendMessage({ action: 'closeProgressPopup' });
}

function fetchContent(link) {
    return new Promise(function (resolve, reject) {
        chrome.tabs.create({ url: link, active: false }, function (tab) {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);

                    setTimeout(function () {
                        chrome.tabs.sendMessage(tab.id, { action: 'getContent' }, function (response) {
                            if (chrome.runtime.lastError) {
                                reject(new Error('Error executing script: ' + chrome.runtime.lastError.message));
                            } else {
                                const result = processTos(response.content);

                                console.log("toc extracted: " + result);
                                resolve(result);
                            }

                            chrome.tabs.remove(tab.id); // Close the tab after scraping
                        });
                    }, 50); // Adjust the delay as needed based on the page's loading behavior
                }
            });
        });
    });
}

function processTos(content) {
    const cleanedCont = content.replace(/\n/g, ' ').replace(/"/g, '').replace(/\t/g, '').replace("Learn more", ""); //removing all unwanted elements that hinder the prompting
    const trucCont = shortenString(cleanedCont, 1450)
    console.log("web content truncated to 1500 words: " + trucCont);
    return trucCont;
}

function shortenString(str, wordLimit) {
    if (str.length <= wordLimit) {
      return str; // No need to shorten if the string is already within the limit
    }
    
    const words = str.split(' ');
    const topPortion = words.slice(0, Math.floor(wordLimit / 3)).join(' ');
    const middlePortion = words.slice(
      Math.floor((words.length - wordLimit) / 2),
      Math.floor((words.length - wordLimit) / 2) + Math.floor(wordLimit / 3)
    ).join(' ');
    const bottomPortion = words.slice(-Math.floor(wordLimit / 3)).join(' ');
    
    return topPortion + ' ' + middlePortion + ' ' + bottomPortion;
  }

function analyzeContent(content) {
    return new Promise(function (resolve, reject) {

        // Retrieve the stored API key from the browser's storage
        chrome.storage.sync.get('apiKey', function (data) {
            var apiKey = data.apiKey;

            if (!apiKey) {
                alert('Please enter your API key in the options page.');
                reject(new Error('API key not found'));
                return;
            }

            // Create the request body
            //const promptEng = "Given below is the terms of servoce or privacy policy of a website. Analyze and summarize it : ";
            const promptEng = "Given followed is the toc or privacy polcy content copied from a website. Please analyze the content provided below and identify any policy or terms that may be concerning or problematic. Provide detailed insights and explanations regarding your findings." + content;
            var requestBody = JSON.stringify({
                prompt: promptEng,
                psidCookie: apiKey
            });

            // Create the request options
            var requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestBody
            };

            console.log("posting summary request to bard...");

            // Make the POST request to the endpoint
            fetch("https://bardapi-gd.onrender.com/ask", requestOptions)
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Request failed with status: " + response.status);
                    }
                    return response.json();
                })
                .then(function (data) {
                    // Extract the summarized text from the response
                    var summarizedText = data; //data.summary;

                    // Resolve with the summarized text
                    resolve(summarizedText);
                })
                .catch(function (error) {
                    // Handle any errors
                    reject(error);
                });
        })
    });
}


function showSummary(summary) {
    // Show the summarized output to the user
    window.alert(summary);
    console.log(summary);
}
