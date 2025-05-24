# Contributing to Smart Energy Platform

Thank you for your interest in contributing to the Smart Energy Platform! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

### 🐛 Bug Reports
- Use the GitHub issue tracker to report bugs
- Include detailed steps to reproduce the issue
- Provide system information (OS, browser, Node.js version)
- Include screenshots or error messages when applicable

### 💡 Feature Requests
- Suggest new energy management features
- Propose UI/UX improvements
- Request new API integrations
- Share ideas for sustainability metrics

### 🔧 Code Contributions
- Fix bugs and implement new features
- Improve documentation
- Add tests and improve code coverage
- Optimize performance

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Modern web browser

### Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/smart-energy-platform.git
   cd smart-energy-platform
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow React best practices
- Ensure responsive design

### Testing
- Write unit tests for new features
- Test across different browsers
- Verify mobile responsiveness
- Test with different API scenarios

## 🔄 Pull Request Process

### Before Submitting
1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add energy consumption forecasting"
   ```

### Commit Message Format
Use conventional commits format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

### Submitting the PR
1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Use descriptive title and description
   - Reference related issues
   - Include screenshots for UI changes
   - Add testing instructions

3. **Review Process**
   - Address reviewer feedback
   - Keep PR focused and atomic
   - Update documentation if needed

## 🏗️ Project Structure

```
src/
├── agents/           # AI analysis pipeline
│   └── energyAgent.ts
├── components/       # React UI components
│   ├── Header.tsx
│   ├── WelcomeScreen.tsx
│   └── ...
├── config/          # Configuration files
│   └── api.ts
├── services/        # Data services
│   ├── energyDataService.ts
│   └── geminiService.ts
├── types/           # TypeScript definitions
│   └── index.ts
└── utils/           # Utility functions
```

## 🎯 Priority Areas

### High Priority
- Real API integrations
- Performance optimizations
- Mobile responsiveness
- Accessibility improvements

### Medium Priority
- Additional chart types
- Export functionality
- User preferences
- Offline support

### Future Enhancements
- Machine learning models
- Advanced reporting
- Multi-language support
- Real-time notifications

## 🔍 Code Review Checklist

### Functionality
- [ ] Feature works as expected
- [ ] No breaking changes
- [ ] Error handling implemented
- [ ] Edge cases considered

### Code Quality
- [ ] TypeScript types defined
- [ ] ESLint rules followed
- [ ] No console.log statements
- [ ] Proper error handling

### UI/UX
- [ ] Responsive design
- [ ] Accessibility standards
- [ ] Consistent styling
- [ ] Loading states

### Documentation
- [ ] Code comments added
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Examples provided

## 🐛 Issue Templates

### Bug Report
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js: [e.g. 18.0.0]
```

### Feature Request
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Additional context**
Any other context about the feature request.
```

## 📞 Getting Help

### Community
- GitHub Discussions for questions
- Issue tracker for bugs
- Pull requests for contributions

### Documentation
- README.md for setup instructions
- Code comments for implementation details
- API documentation for integrations

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Smart Energy Platform!** 🌱

Together, we're building tools for a more sustainable future. 