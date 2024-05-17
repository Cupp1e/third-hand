// Entry point for the sidebar add-in
async function main() {
    // Initialize UI elements
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const generateButton = document.getElementById("generateButton");

    // Set event listener for the generate button
    generateButton.addEventListener("click", async () => {
        const inputText = inputBox.value.trim();
        if (inputText) {
            try {
                const apiKey = "sk-third-hand-tfNwGxlKQZJ2U6Ni1u3ST3BlbkFJsaO9iKGicCkOcjjK0ZN4"; // Temporarily hard-coded for testing
                const endpoint = "https://api.openai.com/v1/completions";
                const model = "text-davinci-002";
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                headers.append("Authorization", `Bearer ${apiKey}`);
                const body = JSON.stringify({
                    model: model,
                    prompt: inputText,
                    max_tokens: 1024,
                    n: 1,
                    temperature: 0.5,
                });
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: headers,
                    body: body,
                });
                const json = await response.json();
                const generatedText = json.choices[0].text;
                outputBox.value = generatedText;
            } catch (error) {
                console.error("Error:", error);
                outputBox.value = "An error occurred. Please try again.";
            }
        } else {
            outputBox.value = "Please enter text before generating.";
        }
    });
}

// Run the main function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", main);