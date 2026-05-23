# ALU Regex Data Extraction Assignment

##  Overview

Welcome! This project is a simple tool designed to find and "extract" specific types of information (like emails, phone numbers, and web links) from a messy block of text.

It uses **Regular Expressions (Regex)**—which are like advanced search patterns—to identify data automatically.

### What this tool does:

**Extracts:**

- Email addresses
- URLs
- Phone numbers
- Hashtags

**Protects and Validates:**

- ALU-specific email validation
- Basic security checks
- Credit card masking

---

##  Project Structure

```text
alu-regex-data-extraction_gunnogere/
├── input/
│   └── raw-text.txt
├── src/
│   └── main.js
├── output/
│   └── regex-check-output.json
└── README.md
```

---

## How to Run

### 1. Install Node.js

Download Node.js from:
https://nodejs.org

### Steps for Ubuntu
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.16.0".
# Verify npm version:
npm -v # Should print "11.13.0".

### 2. Run the program

```bash
node src/main.js
```

---

## Regex Patterns Used

### Emails

Extracts valid email formats.

### ALU Email Validation

Validates:

- `@alueducation.com`
- `@alumni.alueducation.com`
- `@si.alueducation.com`

### URLs

Extracts HTTP, HTTPS, and WWW links.

### Phone Numbers

Supports international and local formats.

### Hashtags

Extracts hashtags from text.

---

## Security Considerations

The program demonstrates defensive handling of untrusted input:

- Detects suspicious script tags
- Detects SQL injection-like text
- Masks credit card numbers before output
- Ignores malformed emails

Sensitive information is not fully exposed in logs or outputs.

---

## Output

Results are saved in:

```text
output/regex-check-output.json
```
