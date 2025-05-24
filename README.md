# GitHub Analytics Platform

A professional, AI-powered analytics platform for GitHub repositories, users, trending projects, and custom searches. Built with React, TypeScript, Vite, and Gemini AI for actionable developer insights.

## Features
- **Repository Analysis:** Get detailed metrics and AI-generated insights for any public GitHub repository.
- **User Analysis:** Analyze developer profiles, contributions, and influence.
- **Trending Repositories:** Discover trending projects by language or topic.
- **Search:** Find and analyze repositories by keyword or technology.
- **Gemini AI Integration:** Summarizes and explains results with concise, actionable insights.
- **Modern UI:** Clean, responsive, and user-friendly interface.

## Getting Started

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
```
VITE_GITHUB_TOKEN=your_github_token
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_API_URL=your_gemini_api_url
```

### 4. Run Locally
```sh
npm run dev
```

The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Deployment (Vercel)
1. **Push your code to GitHub** (see below for instructions).
2. **Import the repo into [Vercel](https://vercel.com/)** and connect your environment variables.
3. **Build settings:**
   - Framework: Vite
   - Build Command: `vite build`
   - Output Directory: `dist`

## Creating a New GitHub Repository & Pushing Code
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Jakakus/github-analytics-platform.git
git push -u origin main
```

## License
MIT

---

**Created by Jaka Kus**

## 🌱 Smart Energy Platform

**Enterprise Energy Management & Sustainability Platform**

A comprehensive, AI-powered energy management solution designed for enterprise environments. This platform provides real-time energy monitoring, predictive analytics, carbon footprint tracking, and intelligent optimization recommendations.

![Smart Energy Platform](https://img.shields.io/badge/Energy-Management-green?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?style=for-the-badge&logo=typescript)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge&logo=brain)

## 🚀 Features

### 🔋 **Energy Management**
- **Real-time Monitoring**: Live energy consumption tracking across multiple facilities
- **Equipment Analytics**: HVAC, lighting, and industrial equipment performance monitoring
- **Cost Optimization**: Identify savings opportunities and reduce operational costs
- **Demand Forecasting**: Predictive analytics for energy planning and budgeting

### 🌍 **Sustainability & ESG**
- **Carbon Footprint Tracking**: Real-time CO2 emissions monitoring and reporting
- **Renewable Energy Integration**: Track solar, wind, and other renewable sources
- **ESG Compliance**: Automated sustainability reporting for regulatory compliance
- **Environmental Impact**: Comprehensive environmental metrics and benchmarking

### 🤖 **AI-Powered Analytics**
- **Multi-Agent Analysis Pipeline**: Sophisticated AI workflow for energy insights
- **Intelligent Recommendations**: ML-driven optimization suggestions
- **Anomaly Detection**: Automated identification of energy inefficiencies
- **Predictive Maintenance**: Equipment failure prediction and maintenance scheduling

### 📊 **Enterprise Features**
- **Multi-Facility Management**: Centralized control for multiple locations
- **Role-Based Access**: Secure access control for different user types
- **API Integration**: Connect with existing building management systems
- **Custom Dashboards**: Tailored views for different stakeholders

## 🏗️ Technical Architecture

### **Frontend Stack**
- **React 18.3.1** with TypeScript for type-safe development
- **Tailwind CSS** for responsive, modern UI design
- **Lucide React** for consistent iconography
- **Recharts** for advanced data visualization
- **Vite** for fast development and optimized builds

### **AI & Analytics**
- **Google Gemini API** integration for advanced AI analysis
- **Multi-stage processing pipeline** with specialized agents:
  - **Query Router**: Intelligent query categorization
  - **Data Collector**: Automated data aggregation
  - **Energy Analyst**: Pattern recognition and insights
  - **Report Generator**: Professional report formatting
  - **Sustainability Assessor**: Environmental impact analysis

### **Data Integration**
- **Real-time APIs** for energy data collection
- **Weather API** integration for environmental correlation
- **Building Management System** connectivity
- **Smart Meter** data integration
- **IoT Device** monitoring capabilities

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with ES2020+ support

### Quick Start

```bash
# Clone the repository
git clone https://github.com/jaka-kus/smart-energy-platform.git
cd smart-energy-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# AI/ML Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Energy Data APIs
VITE_ENERGY_PLATFORM_API=your_energy_api_key
VITE_WEATHER_API_KEY=your_weather_api_key

# Optional: Real Energy Platform Integration
VITE_UTILITY_API_KEY=your_utility_api_key
VITE_BUILDING_MANAGEMENT_API=your_bms_api_key
```

## 📱 Usage Examples

### Energy Consumption Analysis
```
"Show energy consumption trends for this month"
"Compare energy usage between our facilities"
"What are the peak consumption hours?"
```

### Cost Optimization
```
"Identify opportunities to reduce energy costs"
"Analyze our electricity bill breakdown"
"Recommend energy efficiency improvements"
```

### Sustainability Tracking
```
"What are our current carbon emissions?"
"Track progress toward our sustainability goals"
"Generate ESG compliance report"
```

### Equipment Monitoring
```
"Analyze HVAC system performance"
"Show equipment efficiency metrics"
"Predict maintenance requirements"
```

## 🔧 Development

### Project Structure
```
src/
├── agents/           # AI analysis pipeline
├── components/       # React UI components
├── config/          # API and app configuration
├── services/        # Data services and API clients
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Components
- **EnergyAgent**: Multi-stage AI analysis pipeline
- **EnergyDataService**: Real-time data collection and processing
- **GeminiService**: AI-powered analysis and insights
- **AgentWorkflow**: Visual pipeline progress tracking

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🌟 Key Benefits

| Feature | Benefit | Impact |
|---------|---------|---------|
| **Real-time Monitoring** | Immediate visibility into energy usage | 15-30% reduction in energy waste |
| **AI Analytics** | Intelligent insights and recommendations | 20-40% improvement in efficiency |
| **Carbon Tracking** | ESG compliance and sustainability goals | Meet regulatory requirements |
| **Predictive Maintenance** | Prevent equipment failures | 25-50% reduction in maintenance costs |
| **Multi-facility Management** | Centralized control and optimization | Streamlined operations |

## 🔮 Future Enhancements

### Planned Features
- [ ] **Machine Learning Models**: Custom ML models for energy prediction
- [ ] **Mobile Application**: Native iOS/Android apps
- [ ] **Advanced Reporting**: Custom report builder with scheduling
- [ ] **Integration Hub**: Pre-built connectors for popular BMS systems
- [ ] **Energy Trading**: Automated energy market participation
- [ ] **Blockchain Integration**: Renewable energy certificate tracking

### Technical Roadmap
- [ ] **Microservices Architecture**: Scalable backend services
- [ ] **Real-time WebSocket**: Live data streaming
- [ ] **Advanced Caching**: Redis-based performance optimization
- [ ] **Multi-tenant Support**: SaaS-ready architecture
- [ ] **API Gateway**: Centralized API management

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Created by Jaka Kus**

This Smart Energy Platform showcases advanced full-stack development skills including:
- React/TypeScript frontend architecture
- AI integration with Google Gemini
- Multi-agent processing pipelines
- Enterprise-grade UI/UX design
- Real-time data visualization

## 📄 Acknowledgments

- **Google Gemini AI** for advanced analytics capabilities
- **React Team** for the excellent frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful, consistent icons

---

**Built with ❤️ for a sustainable future**

*Empowering organizations to optimize energy consumption, reduce costs, and achieve sustainability goals through intelligent automation and AI-driven insights.* 