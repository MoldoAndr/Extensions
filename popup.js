document.getElementById("cleanButton").addEventListener("click", async () => {
    const inputText = document.getElementById("inputText").value;
  
    if (!inputText.trim()) {
      alert("Please enter some text.");
      return;
    }
  
    const apiKey = 'YOUR_CHATGPT_API_KEY';
  
    // Apelare API ChatGPT pentru curățare text
    const cleanedText = await cleanAndCompressText(inputText, apiKey);
    document.getElementById("outputText").value = cleanedText;
  });
  
  async function cleanAndCompressText(text, apiKey) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a tool that cleans and compresses text by removing redundant words, excess spaces, and unnecessary symbols using regular expressions." },
        { role: "user", content: `Clean and compress the following text: ${text}` }
      ]
    };
  
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
  
    const data = await response.json();
    const cleanedText = data.choices[0].message.content;
    return cleanedText.trim();
  }
  