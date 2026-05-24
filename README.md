

# ALU Regex Data Extraction Assignment

By: Joshua Mulongo



##  How `main.js` Works 

1. **Reads the Input:** The script wakes up and looks inside the `input/raw-text.txt` file to read the messy data.
2. **Runs the Regex Filters:** It passes the text through several **Regular Expression (Regex)** patterns to detect specific data types (Emails, URLs, Phone Numbers, and Hashtags).
3. **Applies Custom Rules:** * **ALU Verification:** It checks if discovered emails belong to official ALU domains (`@alueducation.com`, etc.).
* **Security Scrubbing:** It scans the text for malicious attempts like script tags (`<script>`) or SQL Injection phrases to flag them.
* **Privacy Masking:** If it spots a credit card number, it masks it (e.g., `****-****-****-1234`) so sensitive data isn't exposed.


4. **Writes the Output:** Finally, it bundles all these discovered and cleaned data points into a well-structured JSON object and saves it directly to `output/regex-check-output.json`.



## Project Architecture

```text
alu-regex-data-extraction_gunnogere/
├── input/
│   └── raw-text.txt               # The messy source text to scan
├── src/
│   └── main.js                    # The core logic & regex engine
├── output/
│   └── regex-check-output.json    # outpu for main.js. I separated this from the sample file  
|   └── sample-output.json # sample output for the script
└── README.md

```



##  How to Run the Project

### Step 1: Ensure Node.js is Installed

You need Node.js installed on your machine to run the JavaScript file locally.

* **Windows / macOS:** Download and install the LTS version from [nodejs.org](https://nodejs.org).
* **Ubuntu / Linux:** Use the following commands in case you are using ubuntu OS:

```bash
# Download and install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash

# Activate nvm without restarting your terminal
source ~/.bashrc

# Install Node.js version 24
nvm install 24

# Verify it works (Should print version numbers)
node -v
npm -v

```

### Step 2: Run the Script

Open your terminal, navigate to the project's root folder, and execute:

```bash
node src/main.js

```

Once executed, check the `output/` folder for the  `regex-check-output.json` file for the extracted insights.



##  Core Features & Regex Breakdown

The system  scans for and processes the following features:

### 1. Data Extraction

* **Standard Emails:** Captures normal everyday email formats.
* **URLs & Links:** Finds web links starting with `http://`, `https://`, or `www.`.
* **Phone Numbers:** Extracts both local numbers and complex international formats.
* **Hashtags:** Grabs social media style hashtags (e.g., `#ALU`, `#Programming`).

### 2. ALU email Filtering 

The script finds emails ending with the connotations specified for the ALU staff, Alumni and SI:

* `@alueducation.com`
* `@alumni.alueducation.com`
* `@si.alueducation.com`


### 3. Security & Data Privacy

* **XSS & SQLi Detection:** Flags suspicious code syntax to keep the application safe.
* **Credit Card Masking:** Protects user financial data by hiding core credit card digits.
* **Bad Email Filtering:** Smart enough to skip malformed or broken email addresses.
=======
```text
output/regex-check-output.json
```

