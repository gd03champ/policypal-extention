README.md

# PolicyPal: Your Smart Companion for Terms & Privacy Analysis 🕵️‍♀️🔍

Policypal is a browser extension that allows users to analyze and summarize terms & conditions and privacy policies of websites. The extension 🚀 harnesses the power of the Bard API 🧙‍♂️✨, a custom API built with Node.js and Express, to perform the analysis and generate the summaries. Get ready to dive into the world of legal jargon and privacy policies with ease! 💪 and never fall for hidden terms or harmfull privacy policies again.

## Tech Stack 🛠️

The project is built using an awesome tech stack:

- JavaScript 🌐
- Chrome Extension API 🧩
- HTML/CSS 🎨
- Node.js 🚀
- Express ⚡️
- Bard API (Custom API for analysis and summarization) 🧪

## How it Works 🔄

The Policypal extension provides two main functionalities: analyzing a specific TOS or privacy policy page and summarizing its content. The process flow is as follows:

1. Right-click Context Menu 🖱️: When you right-click on a link to a terms of service (TOS) or privacy policy page, the extension adds an option "Inspect TOS or Privacy Policy" to the context menu. Go ahead, give it a try! 😉

2. Clicking the Context Menu Option 🖱️: When you select the "Inspect TOS or Privacy Policy" option from the context menu, the extension opens a progress popup window and initiates the analysis process. Get ready for some behind-the-scenes action! 🎬

3. Fetching the Content 🌐: The extension fetches the content of the selected TOS or privacy policy page and sends it to the Bard API for analysis. The progress popup window shows the progress as "Processing...". Time to gather all the juicy details! 📚🔎

4. Analyzing the Content 🔬: The Bard API receives the content and puts on its magic hat 🎩 to analyze it using sophisticated natural language processing techniques. It generates a summary and identifies potential harmful elements in the content. It's like having a legal wizard by your side! 🧙‍♂️✨

5. Displaying the Summary 📋: The generated summary is sent back to the extension, which then displays it in an alert window and updates the progress popup with "Analysis complete ✅". Sit back, relax, and enjoy the condensed version! 📖📝

6. Closing the Progress Popup 🚪: After displaying the summary or encountering an error, the progress popup window is automatically closed. No need to say goodbye, it knows when to exit gracefully! 👋

## Usage 🚀

To use the Terms Trackers extension, follow these steps:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/gd03champ/policypal-extention.git
   ```

2. Open Google Chrome and go to the Extensions page by entering the following URL in the address bar:

   ```
   chrome://extensions/
   ```

3. Enable Developer mode by toggling the switch at the top right corner.

4. Click on the "Load unpacked" button and select the cloned project directory (`policypal-extention`). Let the extension come to life! ⚡️

5. Update the API key in the Options page:
   
   - Click on the Policypal extension icon in the Extensions menu. It's time to give it some personal touch! 😎 <br>
   <img width="960" alt="image" src="https://github.com/gd03champ/policypal-extention/assets/63779654/9c700672-5ecb-4b51-bdf4-351e2f7621ab"><br>
   - Select "Options" and enter your API key in the provided input field. Let the magic happen! 🪄✨

7. To analyze a TOS or privacy policy page:
   - Right-click on a link to a TOS or privacy policy page.
   - Select the "[PolicyPal✨] - Inspect Policy" option from the context menu. It's like having a secret detective tool! 🕵️‍♂️<br>
   <img width="437" alt="image" src="https://github.com/gd03champ/policypal-extention/assets/63779654/10be369e-2c33-4bf3-b7bf-a704733d87c6"><br>
   - The progress popup window will appear, showing the progress of the analysis. Stay tuned! ⌛️📊<br>
   <img width="290" alt="image" src="https://github.com/gd03champ/policypal-extention/assets/63779654/aed70404-3f1b-4ab5-8259-8c68fab602fe"><br>
   - After the analysis is complete, the summary will be displayed in an alert window. Get ready to see the essence of the content! 🧪✨<br>
   <img width="353" alt="image" src="https://github.com/gd03champ/policypal-extention/assets/63779654/706af74c-4b33-4dc3-bf16-1e8696203c73"><br>
   - The progress popup window will automatically close. It knows when it's time to exit the stage! 🚪🎭

## Bard API 🧙‍♂️🔮

The Bard API is an unofficial custom API developed by me using Node.js and Express. The Bard API uses bard to generate result using bard cookieID and input prompt. In the Terms Trackers extension, the Bard API works its magic to analyze the content of TOS or privacy policy pages. It provides the summarized results and identifies potential harmful elements. Make sure to set up and deploy the Bard API to unlock its full potential! ✨

## Contributing 🤝

Contributions to the Terms Trackers project are highly appreciated! We believe in the power of collaboration and welcome your contributions with open arms. If you find any issues or have suggestions for improvements, please create a GitHub issue or submit a pull request. Before contributing, make sure to review the project's guidelines for contributing and code of conduct.

Let's make the PolicyPal extension even more awesome together!

## License 📄

The Terms Trackers project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to explore, modify, and use the code according to the terms of the license. Let the magic begin! ✨✨
