document.getElementById('summarize').addEventListener('click', async () => {
  const summaryDiv = document.getElementById('summary');
  const button = document.getElementById('summarize');
  
  try {
    button.disabled = true;
    summaryDiv.innerHTML = '<div class="loading">Summarizing page...</div>';
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    const [{result}] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const elements = document.querySelectorAll('script, style, meta, link');
        elements.forEach(el => el.remove());
        return document.body.innerText
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 4000);
      }
    });

    // Send to backend proxy instead of directly to Claude
    const response = await fetch('http://localhost:3000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: result })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get summary');
    }

    const data = await response.json();
    summaryDiv.textContent = data.summary;
    
  } catch (error) {
    console.error('Error:', error);
    summaryDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  } finally {
    button.disabled = false;
  }
});