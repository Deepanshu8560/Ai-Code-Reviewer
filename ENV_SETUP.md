# Environment Variables Setup

This guide explains how to configure the environment variables for the AI Code Reviewer application.

## Required Environment Variables

### 1. OpenAI API Key

The application uses OpenAI's GPT-4 for AI-powered code analysis.

**Steps to get your API key:**

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the generated key (it starts with `sk-`)

**Add to your `.env.local` file:**

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 2. Application URL (Optional)

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`:**
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Save the file

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

## Important Notes

- ⚠️ **Never commit `.env.local` to version control** - it contains sensitive API keys
- ✅ The `.env.local` file is already in `.gitignore` for your security
- 💡 You can use the app without an API key - it will only run static analysis
- 🔑 With an API key, you get AI-powered suggestions and explanations

## Testing the Setup

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000/review
3. Upload a code file
4. Enable "Use AI analysis" toggle
5. Click "Analyze Code"

If configured correctly, you'll see AI-powered suggestions along with static analysis results.

## Troubleshooting

**Error: "OpenAI API key not found"**
- Make sure `.env.local` exists in the project root
- Verify the key starts with `sk-`
- Restart the dev server after adding the key

**Error: "Invalid API key"**
- Check that you copied the entire key correctly
- Verify the key is active in your OpenAI dashboard
- Make sure there are no extra spaces or quotes around the key

## API Usage & Costs

- OpenAI charges per token used
- GPT-4 costs approximately $0.03 per 1K input tokens
- Each code analysis typically uses 500-2000 tokens
- Monitor your usage at https://platform.openai.com/usage
