// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

app.post('/summarize', async (req, res) => {
  try {
    const { content } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': CLAUDE_API_KEY
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{
          role: "user",
          content: `Please provide a concise summary of the following text in 2-3 sentences: ${content}`
        }]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to get summary from Claude');
    }

    const data = await response.json();
    res.json({ summary: data.content[0].text });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});