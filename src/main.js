const fs = require("fs"); // export the fs module to read and write files
const path = require("path"); // export the path module to handle file paths

// 1. Read the input file
const filePath = path.join(__dirname, "../input/raw-text.txt");
const text = fs.readFileSync(filePath, "utf8"); //store the file content as plain text

// 2. Define search patterns using regular expressions
const patterns = {
  emails: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  aluOfficialEmails: /\b[A-Za-z0-9._%+-]+@alueducation\.com\b/g,
  aluAlumniEmails: /\b[A-Za-z0-9._%+-]+@alumni\.alueducation\.com\b/g,
  aluSIEmails: /\b[A-Za-z0-9._%+-]+@si\.alueducation\.com\b/g,
  urls: /\b(https?:\/\/[^\s]+|www\.[^\s]+)\b/g,
  phones: /(\+\d{1,3}[- ]?)?\(?\d{2,4}\)?[- ]?\d{3}[- ]?\d{3,4}/g,
  hashtags: /#[A-Za-z0-9_]+/g,
  maskedCreditCards: /\b(?:\d[ -]*?){13,16}\b/g
};

// 3. Automatically run text.match() for all basic patterns
const output = {};
for (const key in patterns) {
  output[key] = text.match(patterns[key]) || [];
}

// 4. Post-process the credit cards to mask everything except the last 4 digits
output.maskedCreditCards = output.maskedCreditCards.map(card => 
  card.replace(/\d(?=\d{4})/g, "*")
);

// 5. Look for security risks (malicious code or SQL injections) and add to output
const securityRisks = [/<script.*?>.*?<\/script>/gi, /DROP TABLE/gi];
output.suspiciousContent = [];

for (const risk of securityRisks) {
  const matches = text.match(risk) || [];
  output.suspiciousContent.push(...matches); // push matches into the array
}

// 6. Save results to a JSON file
const outputPath = path.join(__dirname, "../output/regex-check-output.json");
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log("Extraction complete. \n\n\n", output);