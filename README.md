# AI-Powered Code Reviewer

An intelligent code review tool that analyzes front-end code (React, JavaScript, CSS) for best practices, performance issues, accessibility problems, and security vulnerabilities using AI and static analysis.

![Code Quality](https://img.shields.io/badge/code%20quality-A+-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Comprehensive Analysis
- **Performance**: Detect large bundles, expensive re-renders, and optimization opportunities
- **Accessibility**: Ensure WCAG compliance with automated checks
- **Security**: Identify XSS risks, exposed secrets, and vulnerable patterns
- **Code Quality**: Reduce complexity and eliminate anti-patterns
- **Best Practices**: Follow React hooks rules and modern standards
- **Design System**: Maintain CSS consistency and Tailwind best practices

### 🤖 AI-Powered Insights
- Intelligent code suggestions using GPT-4
- Context-aware explanations
- Automated fix generation
- Educational documentation links

### 💡 Interactive Features
- Side-by-side diff viewer
- Line-by-line code highlighting
- One-click fix application
- Real-time quality metrics
- Export reports (JSON, Markdown)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (optional, for AI analysis)

### Installation

1. **Clone the repository**
   ```bash
   cd code-reviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   # Create .env.local file
   echo "OPENAI_API_KEY=your_api_key_here" > .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Upload Your Code**
   - Drag and drop files or click to browse
   - Supports: `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.html`

2. **Analyze**
   - Click "Analyze Code" to run static analysis
   - Enable "Use AI analysis" for intelligent suggestions (requires API key)

3. **Review Issues**
   - Browse issues grouped by severity (Critical, Warning, Suggestion)
   - Filter by category (Performance, Accessibility, Security, etc.)
   - Read explanations and view suggested fixes

4. **Export Results**
   - Download analysis as JSON or Markdown
   - Share with your team

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Code Editor**: Monaco Editor (VS Code)
- **UI Components**: Radix UI
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Icons**: Lucide React

## 📁 Project Structure

```
code-reviewer/
├── app/
│   ├── api/analyze/          # Analysis API route
│   ├── review/               # Review page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── CodeUploader.tsx      # File upload component
│   ├── CodeEditor.tsx        # Monaco editor wrapper
│   ├── IssueCard.tsx         # Issue display card
│   ├── IssueList.tsx         # Issue list with filters
│   └── MetricsPanel.tsx      # Quality metrics display
├── lib/
│   ├── analyzers/
│   │   ├── rules.ts          # Analysis rules
│   │   ├── static-analyzer.ts # Static code analysis
│   │   └── ai-analyzer.ts    # AI-powered analysis
│   ├── utils.ts              # Utility functions
│   └── constants.ts          # App constants
├── store/
│   └── review-store.ts       # Zustand state management
└── types/
    └── index.ts              # TypeScript types
```

## 🎨 Analysis Categories

### Performance
- Large library imports
- Inline functions in JSX
- Missing React.memo
- Expensive operations

### Accessibility
- Missing alt text
- Poor color contrast
- Missing ARIA labels
- Keyboard navigation issues

### Security
- XSS vulnerabilities
- Exposed API keys
- Dangerous HTML injection
- eval() usage

### Code Quality
- High complexity
- Code duplication
- var usage
- Loose equality (==)

### Best Practices
- React hooks violations
- Missing key props
- useEffect dependencies
- State management patterns

### Design System
- Excessive !important
- Inline styles
- CSS specificity issues

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Required for AI analysis
OPENAI_API_KEY=sk-...

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Custom Rules

Add custom analysis rules in `lib/analyzers/rules.ts`:

```typescript
{
  id: 'custom-rule',
  name: 'Custom Rule Name',
  category: 'best-practices',
  severity: 'warning',
  pattern: /your-regex-pattern/,
  message: 'Rule description',
  explanation: 'Why this matters',
  documentationLinks: ['https://docs.example.com'],
}
```

## 📊 Example Analysis

```javascript
// Before
const MyComponent = () => {
  const [state, setState] = useState({});
  
  return (
    <div>
      {items.map(item => (
        <div onClick={() => handleClick(item)}>
          <img src={item.image} />
        </div>
      ))}
    </div>
  );
};

// Issues Found:
// ❌ Critical: Missing key prop in list
// ⚠️ Warning: Missing alt text on image
// 💡 Suggestion: Inline function in onClick
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for better code quality**
