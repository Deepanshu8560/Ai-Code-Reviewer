# 🤖 CodeGuardian - AI-Powered Code Review Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-19.0-blue.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.110.1-teal.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

**Automated code review powered by AI to enhance code quality, security, and best practices**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**CodeGuardian** is an intelligent code review platform that leverages advanced AI to automatically analyze pull requests, detect security vulnerabilities, assess code quality, and provide actionable insights. It helps development teams maintain high standards and ship better code faster.

### Key Highlights

- ⚡ **Fast Analysis**: Get comprehensive code reviews in under 10 seconds
- 🔒 **Security First**: Automatic detection of vulnerabilities and security issues
- 📊 **Quality Metrics**: Track code quality scores across all pull requests
- 🎓 **Learning Resources**: Personalized recommendations to improve coding skills
- 🌐 **Multi-Language Support**: Works with JavaScript, Python, TypeScript, Java, Go, Rust, and more
- 📁 **File Upload**: Support for both code paste and multi-file uploads

---

## ✨ Features

### 🔍 AI-Powered Analysis
- Advanced AI reviews code for quality, security, and best practices
- Line-by-line suggestions with severity levels
- Context-aware recommendations

### 🛡️ Security Scanning
- Automatic vulnerability detection
- Security score assessment (0-100)
- Detailed security issue reporting

### ♿ Accessibility Audits
- Automated accessibility checks
- WCAG compliance suggestions
- Inclusive design recommendations

### 📈 Code Quality Metrics
- Overall code quality score
- Category-specific scoring (quality, security, accessibility)
- Historical trend tracking

### 💡 Smart Suggestions
- Actionable improvement recommendations
- Line-number specific feedback
- Categorized by severity (info, warning, critical)

### 📚 Learning Resources
- Personalized learning recommendations
- Best practices guidance
- Technology-specific resources

### 📊 Dashboard Analytics
- Real-time statistics
- Recent reviews overview
- Performance metrics

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **MongoDB** - NoSQL database with Motor async driver
- **Pydantic** - Data validation using Python type annotations
- **Emergent Integrations** - AI/LLM integration for code analysis
- **Uvicorn** - ASGI server for FastAPI

### Frontend
- **React 19** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications

### DevOps & Tools
- **Python-dotenv** - Environment variable management
- **CORS Middleware** - Cross-origin resource sharing
- **ESLint** - JavaScript linting
- **Black** - Python code formatter

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 16.x or higher
- **npm** or **yarn** package manager
- **MongoDB** (local instance or MongoDB Atlas account)
- **Git** for version control

---

## 🚀 Installation

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```
   
   On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create a `.env` file** in the `backend` directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=codeguardian
   EMERGENT_LLM_KEY=your-emergent-llm-api-key
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

6. **Start the backend server**
   ```bash
   uvicorn server:app --reload --port 8000
   ```

   The API will be available at `http://localhost:8000`
   API documentation (Swagger UI) at `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file** in the `frontend` directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

   The frontend will be available at `http://localhost:3000`

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`.env` in `backend/`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | Database name | `codeguardian` |
| `EMERGENT_LLM_KEY` | Emergent LLM API key | `sk-emergent-...` |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:3000` |

#### Frontend (`.env` in `frontend/`)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `http://localhost:8000` |

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017`

**Option 2: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGO_URL` in `.env` with your Atlas connection string

---

## 📖 Usage

### Getting Started

1. **Start both servers** (backend and frontend)
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Explore the dashboard** to see statistics and recent reviews

### Submitting a Pull Request for Review

1. **Navigate to "Submit PR"** from the dashboard
2. **Fill in the PR details**:
   - PR Title
   - Author name
   - Repository (format: `owner/repo-name`)
   - Branch name
   - Programming language
   - Description of changes
3. **Choose input method**:
   - **Paste Code**: Paste your code directly into the text area
   - **Upload Files**: Drag and drop or browse to upload code files
4. **Click "Submit for Review"**
5. **Wait for analysis** (typically under 10 seconds)
6. **View results** with detailed scores, suggestions, and recommendations

### Viewing Reviews

- **Dashboard**: Overview of all statistics and recent reviews
- **Reviews Page**: Browse all completed code reviews
- **Individual Review**: Click on any review to see detailed analysis

### Understanding Analysis Results

Each analysis includes:

- **Overall Score** (0-100): Overall code quality rating
- **Code Quality Score**: Code structure and best practices
- **Security Score**: Security vulnerability assessment
- **Accessibility Score**: Accessibility compliance rating
- **Suggestions**: Actionable improvements with severity levels
- **Vulnerabilities**: List of security issues found
- **Test Recommendations**: Suggested tests to add
- **Learning Resources**: Relevant topics to improve skills

---

## 📁 Project Structure

```
Ai-Code-Reviewer-main/
│
├── backend/                    # FastAPI backend
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables (create this)
│
├── frontend/                   # React frontend
│   ├── public/                # Static files
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── components/        # React components
│   │   │   └── ui/            # UI component library
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utility functions
│   ├── package.json           # Node dependencies
│   └── .env                   # Environment variables (create this)
│
├── tests/                      # Test files
│   └── __init__.py
│
├── README.md                  # This file
└── test_result.md             # Test results documentation
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 🏠 Root
```
GET /api/
```
Returns API welcome message.

#### 📝 Pull Requests

**Create Pull Request**
```
POST /api/pull-requests
Content-Type: application/json

{
  "title": "Fix authentication bug",
  "description": "Fixed login issue",
  "code": "function login() {...}",
  "language": "javascript",
  "author": "John Doe",
  "repository": "owner/repo",
  "branch": "feature/fix-auth",
  "files": [] // Optional
}
```

**Get All Pull Requests**
```
GET /api/pull-requests
```

**Get Pull Request by ID**
```
GET /api/pull-requests/{pr_id}
```

#### 🔍 Analysis

**Analyze Pull Request**
```
POST /api/analyze/{pr_id}
```
Starts AI analysis for the specified pull request.

**Get Analysis Results**
```
GET /api/analysis/{pr_id}
```

#### 📊 Dashboard

**Get Dashboard Statistics**
```
GET /api/dashboard/stats
```
Returns:
```json
{
  "total_prs": 10,
  "completed_reviews": 8,
  "avg_code_quality": 85,
  "avg_security_score": 90,
  "vulnerabilities_found": 3
}
```

**Get Recent Reviews**
```
GET /api/recent-reviews
```

### Interactive API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 💻 Development

### Backend Development

1. **Enable hot reload** (already enabled with `--reload` flag)
2. **Code formatting**: Use `black` for Python code
   ```bash
   black server.py
   ```
3. **Linting**: Use `flake8` for code quality
   ```bash
   flake8 server.py
   ```

### Frontend Development

1. **Hot reload** is enabled by default with `react-scripts`
2. **Code formatting**: Configure ESLint and Prettier
3. **Component development**: Use the UI component library in `src/components/ui/`

### Adding New Features

1. **Backend**: Add new routes in `server.py` using FastAPI decorators
2. **Frontend**: Create new components in `src/components/` and add routes in `App.js`

---

## 🧪 Testing

### Backend Testing

```bash
cd backend
pytest tests/
```

### Frontend Testing

```bash
cd frontend
npm test
# or
yarn test
```

### Manual Testing

1. Test PR submission with various code samples
2. Verify analysis results accuracy
3. Test file upload functionality
4. Check dashboard statistics updates

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Emergent Integrations** for AI/LLM capabilities
- **FastAPI** team for the excellent framework
- **React** team for the powerful UI library
- **Radix UI** for accessible components
- All contributors and users of this project

---

## 📞 Support

For issues, questions, or contributions:

- 🐛 **Report Bugs**: Open an issue on GitHub
- 💡 **Suggest Features**: Create a feature request
- 📧 **Contact**: [Your contact information]

---

## 🔮 Roadmap

Future enhancements planned:

- [ ] GitHub integration for automatic PR reviews
- [ ] Support for more programming languages
- [ ] Customizable analysis rules
- [ ] Team collaboration features
- [ ] CI/CD pipeline integration
- [ ] Advanced reporting and analytics
- [ ] Code diff visualization
- [ ] Integration with popular IDEs

---

<div align="center">

**Made with ❤️ by the CodeGuardian Team**

⭐ Star this repo if you find it helpful!

</div>
