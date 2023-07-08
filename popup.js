document.addEventListener('DOMContentLoaded', function () {
    var analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', function () {
        var linkInput = document.getElementById('linkInput');
        var link = linkInput.value.trim();

        if (link !== '') {
            fetchContent(link)
                .then(function (content) {
                    return analyzeContent(content);
                })
                .then(function (summary) {
                    showSummary(summary);
                })
                .catch(function (error) {
                    console.error('Error:', error);
                });
        }
    });
});

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
    const trucCont = cleanedCont.trim().split(/\s+/, 1500).join(' ')
    console.log("web content truncated to 1500 words: " + trucCont);
    return trucCont;
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
            const promptEng = "Given followed is the toc or privacy polcy content copied from a website. Analyze the content line by line and summarize and Also finally mention if there's any potential harmfull elements in the content" + content;
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
