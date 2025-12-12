// Security test file with intentional vulnerabilities

const API_KEY = "sk-1234567890abcdefghijklmnopqrstuvwxyz123456";
const SECRET_TOKEN = "secret_abc123def456ghi789";

function processUserInput(userInput) {
    // Dangerous: eval usage
    eval(userInput);

    // Dangerous: XSS vulnerability
    return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}

function checkValue(a, b) {
    // Issue: Loose equality
    if (a == b) {
        return true;
    }
    return false;
}

export { processUserInput, checkValue };
