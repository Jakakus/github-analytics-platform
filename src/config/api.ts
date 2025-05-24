// API Configuration for GitHub Repository Analytics Platform
export const API_CONFIG = {
  // AI/ML Analysis
  GEMINI_API_KEY: 'AIzaSyCE26gZD-KTzRBN0dixYtjKl5yN8bhgrBQ',
  GEMINI_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
  
  // ============ REAL GITHUB DATA APIs (NO API KEY REQUIRED) ============
  
  // GitHub API - FREE, no key required for public repositories
  GITHUB_API_BASE_URL: 'https://api.github.com',
  
  // Additional free APIs for enhanced features
  GITHUB_TRENDING_URL: 'https://api.github.com/search/repositories',
  
  // Real data source preferences
  USE_REAL_DATA: true,
  
  // Popular programming languages for analysis
  PROGRAMMING_LANGUAGES: {
    JavaScript: 'javascript',
    TypeScript: 'typescript',
    Python: 'python',
    Java: 'java',
    'C++': 'cpp',
    'C#': 'csharp',
    Go: 'go',
    Rust: 'rust',
    PHP: 'php',
    Ruby: 'ruby',
    Swift: 'swift',
    Kotlin: 'kotlin',
    Dart: 'dart',
    Scala: 'scala',
    Lua: 'lua'
  },
  
  // Repository categories for analysis
  REPO_CATEGORIES: {
    'Machine Learning': 'machine-learning',
    'Web Development': 'web-development',
    'Mobile Apps': 'mobile',
    'DevOps': 'devops',
    'Data Science': 'data-science',
    'Game Development': 'game-development',
    'Blockchain': 'blockchain',
    'AI': 'artificial-intelligence',
    'Frontend': 'frontend',
    'Backend': 'backend',
    'Full Stack': 'fullstack',
    'Open Source': 'open-source'
  },
  
  // Time ranges for repository analysis
  TIME_RANGES: {
    'Today': 'today',
    'This Week': 'week',
    'This Month': 'month',
    'This Year': 'year',
    'All Time': 'all'
  },
  
  // Sort options for repository searches
  SORT_OPTIONS: {
    'Stars': 'stars',
    'Forks': 'forks',
    'Updated': 'updated',
    'Created': 'created',
    'Issues': 'help-wanted-issues'
  },
  
  // Popular GitHub topics for trending analysis
  TRENDING_TOPICS: [
    'react', 'vue', 'angular', 'nodejs', 'python', 'machine-learning',
    'artificial-intelligence', 'blockchain', 'cryptocurrency', 'devops',
    'docker', 'kubernetes', 'aws', 'terraform', 'microservices'
  ]
};

export const getGeminiUrl = () => import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const getGeminiApiKey = () => import.meta.env.VITE_GEMINI_API_KEY || '';

export const getGitHubToken = () => import.meta.env.VITE_GITHUB_TOKEN || '';

// GitHub API endpoints
export const getRepositoryUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}`;
};

export const getUserUrl = (username: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/users/${username}`;
};

export const getUserReposUrl = (username: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=100`;
};

export const getRepositoryCommitsUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/commits?per_page=100`;
};

export const getRepositoryLanguagesUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/languages`;
};

export const getRepositoryContributorsUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contributors?per_page=100`;
};

export const getRepositoryIssuesUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/issues?state=open&per_page=100`;
};

export const getRepositoryReleasesUrl = (owner: string, repo: string) => {
  return `${API_CONFIG.GITHUB_API_BASE_URL}/repos/${owner}/${repo}/releases?per_page=10`;
};

export const getTrendingRepositoriesUrl = (language?: string, timeRange: string = 'week') => {
  const since = timeRange === 'today' ? new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0] 
              : timeRange === 'week' ? new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0]
              : timeRange === 'month' ? new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0]
              : '2020-01-01';
  
  let query = `created:>${since}`;
  if (language) {
    query += `+language:${language}`;
  }
  
  return `${API_CONFIG.GITHUB_TRENDING_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=100`;
};

export const searchRepositoriesUrl = (query: string, sort: string = 'stars') => {
  return `${API_CONFIG.GITHUB_TRENDING_URL}?q=${encodeURIComponent(query)}&sort=${sort}&order=desc&per_page=100`;
}; 