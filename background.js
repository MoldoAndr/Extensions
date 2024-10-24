chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "cleanText",
      title: "Clean & Compress Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "cleanText") {
      const selectedText = info.selectionText;
  
      const apiKey = 'YOUR_CHATGPT_API_KEY';  // Înlocuiește cu cheia ta OpenAI
  
      const cleanedText = await cleanAndCompressText(selectedText, apiKey);
      alert(`Cleaned Text: \n\n${cleanedText}`);
    }
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
    return data.choices[0].message.content.trim();
  }
  