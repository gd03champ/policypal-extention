# terms-tracer

README.md

# Terms Trackers

Terms Trackers is a browser extension that allows users to analyze and summarize terms & conditions and privacy policies of websites. The extension utilizes the Bard API, a custom API built with Node.js and Express, to perform the analysis and generate the summaries. This README provides an overview of the project, explains how it works, and provides instructions on how to use and contribute to the project.

## Tech Stack

The project uses the following technologies and tools:

- JavaScript
- Chrome Extension API
- HTML/CSS
- Node.js
- Express
- Bard API (Custom API for analysis and summarization)

## How it Works

The Terms Trackers extension provides two main functionalities: analyzing a specific TOS or privacy policy page and summarizing its content. The process flow is as follows:

1. Right-click Context Menu: When you right-click on a link to a terms of service (TOS) or privacy policy page, the extension adds an option "Inspect TOS or Privacy Policy" to the context menu.

2. Clicking the Context Menu Option: When you select the "Inspect TOS or Privacy Policy" option from the context menu, the extension opens a progress popup window and initiates the analysis process.

3. Fetching the Content: The extension fetches the content of the selected TOS or privacy policy page and sends it to the Bard API for analysis. The progress popup window shows the progress as "Processing...".

4. Analyzing the Content: The Bard API receives the content and analyzes it using natural language processing techniques. It generates a summary and identifies potential harmful elements in the content.

5. Displaying the Summary: The generated summary is sent back to the extension, which then displays it in an alert window and updates the progress popup with "Analysis complete ✅". If any errors occur during the process, the progress popup shows an error message.

6. Closing the Progress Popup: After displaying the summary or encountering an error, the progress popup window is automatically closed.

## Usage

To use the Terms Trackers extension, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/terms-trackers.git
   ```

2. Open Google Chrome and go to the Extensions page by entering the following URL in the address bar:

   ```
   chrome://extensions/
   ```

3. Enable Developer mode by toggling the switch at the top right corner.

4. Click on the "Load unpacked" button and select the cloned project directory (`terms-trackers`).

5. The extension should now be added to your Chrome browser.

6. Update the API key in the Options page:
   - Click on the Terms Trackers extension icon in the Extensions menu.
   - Select "Options".
   - Enter your API key in the provided input field and click "Save".

7. To analyze a TOS or privacy policy page:
   - Right-click on a link to a TOS or privacy policy page.
   - Select the "Inspect TOS or Privacy Policy" option from the context menu.
   - The progress popup window will appear, showing the progress of the analysis.
   - After the analysis is complete, the summary will be displayed in an alert window.
   - The progress popup window will automatically close.

## Bard API

The Bard API is a custom API developed using Node.js and Express. It leverages natural language processing techniques to analyze and summarize text input. The API requires an API key (psidCookie) to authenticate the requests and provides the analyzed results.

In the Terms Trackers extension, the Bard API is utilized to analyze the content of TOS or privacy policy pages. The extension sends the content to the Bard API, which processes it and returns the summary and identified harmful elements. The API key is stored in the extension's options page and retrieved when making requests to the Bard API.

To set up and deploy the Bard API, refer to the Bard API documentation and make sure to have the API running and accessible for the extension to communicate with.

## Contributing

Contributions to the Terms Trackers project are welcome! If you find any issues or have suggestions for improvements, please create a GitHub issue or submit a pull request. Before contributing, make sure to review the project's guidelines for contributing and code of conduct.

We appreciate all contributions and look forward to collaborating with the open-source community to enhance the functionality and usability of the Terms Trackers extension.

## License

The Terms Trackers project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
