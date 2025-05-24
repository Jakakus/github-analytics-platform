# GitHub Analytics Platform

## 🚀 [Live Demo on Vercel](https://aigithubanalytics.vercel.app/)

A modern, AI-powered analytics platform for GitHub repositories, users, trending projects, and custom searches. Built with React, TypeScript, Vite, and Gemini AI for actionable developer insights.

---

## 🚀 Features
- **Repository Analysis:** Get detailed metrics and AI-generated insights for any public GitHub repository.
- **User Analysis:** Analyze developer profiles, contributions, and influence.
- **Trending Repositories:** Discover trending projects by language or topic.
- **Search:** Find and analyze repositories by keyword or technology.
- **Gemini AI Integration:** Summarizes and explains results with concise, actionable insights.
- **Modern UI/UX:** Clean, responsive, and user-friendly interface with instant onboarding.

---

## 🖼️ Preview

Get a quick look at the GitHub Analytics Platform in action:

![GitHub Analytics Platform Screenshot](./screenshots/screenshot.png)

---

## 🖼️ App Walkthrough

### 1. Welcome & Onboarding
![Welcome Screen](./screenshots/welcome.png)
Start on a clean, modern welcome screen. Instantly search for any GitHub repository, user, or trending topic using the AI-powered search bar. Core features—analytics, discovery, and AI insights—are highlighted for easy onboarding.

---

### 2. Discover Trending & Relevant Projects
![Data Visualization Search](./screenshots/datareact.png)
Search by keyword or technology (e.g., "data visualization react") to discover trending and popular repositories. Results include stars, language, and concise project descriptions.

---

### 3. Deep-Dive Repository Analysis
![VSCode Search](./screenshots/microsoftvscode.png)
Analyze any public GitHub repository (e.g., `microsoft/vscode`). The app fetches real-time data and prepares a detailed, multi-stage analysis pipeline.

---

### 4. Actionable AI Insights
![VSCode AI Analysis](./screenshots/microsoftvscodeanalysis.png)
Get instant, AI-generated insights for any repository. Gemini AI summarizes key metrics, community trends, and technology choices—helping you make smarter decisions.

---

## 🛠️ Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/Jakakus/github-analytics-platform.git
cd github-analytics-platform
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root with the following:
```env
VITE_GITHUB_TOKEN=your_github_token
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_API_URL=your_gemini_api_url
```

### 4. Run Locally
```sh
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## 🌐 Deployment (Vercel)
1. **Push your code to GitHub** (see below for instructions).
2. **Import the repo into [Vercel](https://vercel.com/)** and connect your environment variables.
3. **Build settings:**
   - Framework: Vite
   - Build Command: `vite build`
   - Output Directory: `dist`

---

## 📦 Creating a New GitHub Repository & Pushing Code
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Jakakus/github-analytics-platform.git
git push -u origin main
```

---

## 📄 License
MIT

---

**Created by Jaka Kus**

## 🙏 Acknowledgments
- **Google Gemini AI** for advanced analytics capabilities
- **React Team** for the excellent frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful, consistent icons 