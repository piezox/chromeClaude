# Claude Page Summarizer Chrome Extension

A Chrome extension that uses Claude AI to summarize web pages.

## Project Structure

```
├── backend/             # Backend server
│   ├── server.js        # Express server
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables (not in repo)
│
├── extension/           # Chrome extension
│   ├── manifest.json    # Extension manifest
│   ├── popup.html       # Extension popup
│   ├── popup.js         # Extension logic
│   ├── icon48.png       # Small icon
│   └── icon128.png      # Large icon
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file:
   - Copy `.env.template` to `.env`
   - Add your Claude API key

4. Start the server:
   ```bash
   node server.js
   ```

### Extension Setup
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` directory

## Usage
1. Make sure the backend server is running
2. Click the extension icon on any webpage
3. Click "Summarize Page" to get a summary

## Security Notes
- Never commit your `.env` file
- Keep your API key secure
- The backend server should be properly secured before deployment

## Local Development
The extension is configured to work with a local backend server on port 3000. For production use, update the server URL in the extension code.