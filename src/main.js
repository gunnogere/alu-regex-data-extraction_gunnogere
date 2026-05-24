// Assignment: Regex Onboarding Hackathon
// Data Extraction & Secure Validation Assignment
// Repo: https://github.com/gunnogere/alu-regex-data-extraction_gunnogere/blob/main/src/main.js
// May 21, 2026
// To run code install Node.js, navigate to the project root folder in terminal, and run: node src/main.js

//selected regex patterns for this assignemt 
// Email 
// ALU emails
// WEbsite URls
// Phone numbers
// Hashtags
// Credit card numbers

const fs = require("fs"); // require file system module
const path = require("path"); // require path module to find file path

// specify the file path and read the file_text_data and record into plain file_text_data 
const file_path = path.join(__dirname, "../input/raw-text.txt");
const file_text_data = fs.readFileSync(file_path, "utf8"); 

// 2. Setup all our Regular Expression patterns in separate variables
const regex_for_email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const regex_for_alu_education = /\b[A-Za-z0-9._%+-]+@alueducation\.com\b/g;
const regex_for_alue_alumni = /\b[A-Za-z0-9._%+-]+@alumni\.alueducation\.com\b/g;
const regex_for_alu_si = /\b[A-Za-z0-9._%+-]+@si\.alueducation\.com\b/g;
const regex_for_website_urls = /\b(https?:\/\/[^\s]+|www\.[^\s]+)\b/g;
const regex_for_phone_numbers = /(\+\d{1,3}[- ]?)?\(?\d{2,4}\)?[- ]?\d{3}[- ]?\d{3,4}/g;
const regex_for_hashtag = /#[A-Za-z0-9_]+/g;
const regex_for_credit_cards = /\b(?:\d[ -]*?){13,16}\b/g;

// security checking patterns 
const raw_scripts_from_text = /<script.*?>.*?<\/script>/gi; //external scripts
const sql_scripts_from_text = /DROP TABLE/gi; //Sql injections

// Loop through the text in the file and apply the defined regex patterns to find matches
const emails_from_text = file_text_data.match(regex_for_email) || [];
const alueduc_emails_from_text = file_text_data.match(regex_for_alu_education) || [];
const alumni_emails_from_text = file_text_data.match(regex_for_alue_alumni) || [];
const si_emails_from_text = file_text_data.match(regex_for_alu_si) || [];
const urls_from_text = file_text_data.match(regex_for_website_urls) || [];
const phone_numbers_from_text = file_text_data.match(regex_for_phone_numbers) || [];
const hashtags_from_text = file_text_data.match(regex_for_hashtag) || [];

// Extract and safely hide some digits from the found credit cards in the text
const credit_cards_from_text = file_text_data.match(regex_for_credit_cards) || [];
const cleaned_cards_from_text = [];

// Using a basic forEach loop to fix the credit cards one by one
credit_cards_from_text.forEach(function(card) {
  const hiddenCard = card.replace(/\d(?=\d{4})/g, "*"); // replace all digits except that last 4 with * to hide card details
  cleaned_cards_from_text.push(hiddenCard);
});

// 5. Look for security dangers individually and combine them into one list
const detected_raw_scripts = file_text_data.match(raw_scripts_from_text) || [];
const detected_sql_injection = file_text_data.match(sql_scripts_from_text) || [];
const all_detected_security_risks = [];

// FInd any threats from the text in the file
detected_raw_scripts.forEach(function(match) {
  all_detected_security_risks.push(match);
});

// Adding SQL issues to our risk list
detected_sql_injection.forEach(function(match) {
  all_detected_security_risks.push(match);
});

// 6. Create the final output object structure
const check_result = {
  emails: emails_from_text,
  alueduc_emails_from_text: alueduc_emails_from_text,
  alumni_emails_from_text: alumni_emails_from_text,
  alu_si_emails_from_text: si_emails_from_text,
  urls: urls_from_text,
  phones: phone_numbers_from_text,
  hashtags: hashtags_from_text,
  maskedCreditCards: cleaned_cards_from_text,
  suspiciousContent: all_detected_security_risks
};

// 7. Save the final object into a readable JSON file
const output_file = path.join(__dirname, "../output/regex-check-output.json");
const json_output = JSON.stringify(check_result, null, 2);

fs.writeFileSync(output_file, json_output);

// Print out results to see if it worked
console.log("Analysis has been completed.");
console.log(check_result);