import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import AgentWorkflow from './components/AgentWorkflow';
import { Message, ProcessingState } from './types';
import { githubAgent } from './agents/githubAgent';

// Suggestions for onboarding
const SUGGESTIONS = [
  'microsoft/vscode',
  '@gaearon',
  'trending typescript',
  'data visualization react'
];

// Mock workflow state for GitHub Analytics
const getGitHubProcessingState = (): ProcessingState => ({
  steps: [],
  currentProcess: null,
  completed: false
});

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);
  const [workflow, setWorkflow] = useState<ProcessingState>(getGitHubProcessingState());
  const [inputValue, setInputValue] = useState('');
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Update workflow step with more informative output
  const updateWorkflowStep = (processName: string, output?: string) => {
    setWorkflow(prev => ({
      steps: [...prev.steps, {
        id: Date.now().toString(),
        process: processName,
        input: 'GitHub Query',
        output: output || getDefaultStepOutput(processName),
        timestamp: new Date()
      }],
      currentProcess: processName,
      completed: false
    }));
  };

  // Helper for default step output
  function getDefaultStepOutput(processName: string): string {
    switch (processName) {
      case 'Query Analysis':
        return 'Analyzing your query to determine intent (repository, user, trending, or search)...';
      case 'Fetching Repository Data':
        return 'Fetching repository data from GitHub...';
      case 'Fetching User Profile':
        return 'Fetching user profile and statistics from GitHub...';
      case 'Fetching Trending Repositories':
        return 'Fetching trending repositories from GitHub...';
      case 'Searching Repositories':
        return 'Searching repositories on GitHub...';
      case 'Processing Data':
        return 'Processing and structuring the data...';
      case 'Generating AI Insights':
        return 'Generating insights using Gemini AI...';
      case 'Formatting Results':
        return 'Formatting the results for display...';
      case 'Error':
        return 'An error occurred during analysis.';
      default:
        return 'Processing...';
    }
  }

  // Process GitHub queries
  const processGitHubQuery = async (content: string): Promise<void> => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Step 1: Query Analysis
      updateWorkflowStep('Query Analysis');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let result;
      let analysisType = 'general';

      // Determine query type and route to appropriate agent method
      if (content.includes('/') && !content.includes(' ')) {
        // Repository analysis: "owner/repo"
        const [owner, repo] = content.split('/');
        if (owner && repo) {
          analysisType = 'repository';
          updateWorkflowStep('Fetching Repository Data', `Fetching data for repository: ${owner.trim()}/${repo.trim()}`);
          
          result = await githubAgent.analyzeRepository(owner.trim(), repo.trim());
        }
      } else if (content.startsWith('@') || content.toLowerCase().includes('user ')) {
        // User analysis: "@username" or "user username"
        const username = content.replace('@', '').replace(/user\s+/i, '').trim();
        if (username) {
          analysisType = 'user';
          updateWorkflowStep('Fetching User Profile', `Fetching profile for user: @${username}`);
          
          result = await githubAgent.analyzeUser(username);
        }
      } else if (content.toLowerCase().includes('trending')) {
        // Trending analysis
        analysisType = 'trending';
        const languageMatch = content.match(/trending\s+(\w+)/i);
        const language = languageMatch ? languageMatch[1] : undefined;
        updateWorkflowStep('Fetching Trending Repositories', `Fetching trending repositories${language ? ` for language: ${language}` : ''}`);
        
        result = await githubAgent.analyzeTrending(language);
      } else {
        // General search
        analysisType = 'search';
        updateWorkflowStep('Searching Repositories', `Searching repositories for: "${content}"`);
        
        result = await githubAgent.searchRepositories(content);
      }

      // Step 2: Data Processing
      updateWorkflowStep('Processing Data', 'Processing and structuring the data...');
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 3: Generating Insights
      updateWorkflowStep('Generating AI Insights', 'Generating insights using Gemini AI...');
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 4: Formatting Results
      updateWorkflowStep('Formatting Results', 'Formatting the results for display...');
      await new Promise(resolve => setTimeout(resolve, 400));

      // Format response message
      const responseContent = formatGitHubResponse(result, analysisType);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error processing GitHub query:', error);
      updateWorkflowStep('Error');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ **GitHub Analysis Error**\n\nSorry, something went wrong while analyzing the GitHub data.\n\nThis may be due to an invalid repository/user name, API rate limits, or network issues. Please check your input and try again.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  // Utility: Clean up Gemini AI insights for professional display
  function cleanAIInsights(raw: string, maxPoints = 4): string[] {
    if (!raw) return ['No AI insights.'];
    // Split into lines, remove empty/duplicate/numbered/bullet lines, trim
    let lines = raw
      .split(/\n|\r/)
      .map(l => l.replace(/^[-•\d.\s]+/, '').trim())
      .filter(l => l.length > 0);
    // Remove meta/intro lines
    const metaPatterns = [
      /^here(’|')?s/i,
      /^okay/i,
      /^based on/i,
      /^analysis( of|:)?/i,
      /^offering/i,
      /^focusing on/i,
      /^in summary/i,
      /^key insights[:]?/i,
      /^insights[:]?/i,
      /^the following/i,
      /^this suggests/i,
      /^we see/i,
      /^considering/i,
      /^provided information/i,
      /^let'?s/i
    ];
    lines = lines.filter(l => !metaPatterns.some(pat => pat.test(l)));
    // Remove duplicates
    const unique = Array.from(new Set(lines));
    // Only keep lines that look like real insights (start with a word/number, not meta)
    const insights = unique.filter(l => /[a-zA-Z0-9]/.test(l));
    // Format: Capitalize first letter, ensure period at end
    const formatted = insights.slice(0, maxPoints).map(l => {
      let s = l.charAt(0).toUpperCase() + l.slice(1);
      if (!/[.?!]$/.test(s)) s += '.';
      return s;
    });
    return formatted.length ? formatted : ['No AI insights.'];
  }

  // Utility: Format repo entry for search/trending results
  function formatRepo(repo: any, i: number): string {
    if (!repo.full_name || !repo.html_url) return `${i + 1}. (Missing repository data)`;
    // Deprioritize config/script-only repos (move them to the end)
    const configKeywords = ['config', 'setup', 'dotfiles', 'init', 'install', 'build', 'script'];
    const isConfig = configKeywords.some(k => repo.full_name.toLowerCase().includes(k) || (repo.description || '').toLowerCase().includes(k));
    // Format stats line
    const stats = `⭐ ${repo.stargazers_count?.toLocaleString?.() ?? 0} | 🍴 ${repo.forks_count?.toLocaleString?.() ?? 0} | ${repo.language || 'Multiple'}`;
    // Format description
    const desc = repo.description ? repo.description.substring(0, 120) : 'No description available';
    return `**[${repo.full_name}](${repo.html_url})**  
${stats}  
${desc}...`;
  }

  // Format GitHub API response for display
  const formatGitHubResponse = (result: any, type: string): string => {
    const { data, insights } = result;
    const aiInsightsArr = cleanAIInsights(result.analysis || insights || '');
    if (!data) {
      return `❌ Analysis Failed\n\nNo data was returned from the GitHub API. Please try again or check your query.`;
    }
    switch (type) {
      case 'repository':
        if (!data.overview) {
          return `❌ Analysis Failed\n\nRepository data is missing or incomplete.`;
        }
        return `Repository Analysis: ${data.overview.name || 'Unknown'}

Overview
Description: ${data.overview.description || 'No description available'}
Owner: @${data.overview.owner}
Primary Language: ${data.overview.primary_language}

Metrics
⭐ ${data.overview.stars?.toLocaleString?.() ?? 0} stars | 🍴 ${data.overview.forks?.toLocaleString?.() ?? 0} forks | 👀 ${data.overview.watchers?.toLocaleString?.() ?? 0} watchers | 🐛 ${data.overview.open_issues ?? 0} open issues

Activity
(total commits, contributors, releases: coming soon)

---

**Key Insights**
${aiInsightsArr.map(l => `- ${l}`).join('\n')}

Analysis completed at ${new Date().toLocaleTimeString()}`;
      case 'user':
        if (!data.profile) {
          return `❌ Analysis Failed\n\nUser profile data is missing or incomplete.`;
        }
        return `User Analysis: @${data.profile.login}

Profile
Name: ${data.profile.name || 'Not specified'}
Company: ${data.profile.company || 'Not specified'}
Location: ${data.profile.location || 'Not specified'}
Bio: ${data.profile.bio || 'No bio available'}

Statistics
Public Repos: ${data.profile.public_repos ?? 0} | Followers: ${data.profile.followers ?? 0} | Following: ${data.profile.following ?? 0} | Total Stars: ${data.statistics?.totalStars ?? 0}
Most Used Language: ${data.statistics?.topLanguage || 'Unknown'}

---

**Key Insights**
${aiInsightsArr.map(l => `- ${l}`).join('\n')}

Analysis completed at ${new Date().toLocaleTimeString()}`;
      case 'trending':
        let repos = data.repositories && Array.isArray(data.repositories)
          ? data.repositories.slice(0, 10)
          : [];
        // Move config/script-only repos to the end
        repos = [
          ...repos.filter((r: any) => !['config', 'setup', 'dotfiles', 'init', 'install', 'build', 'script'].some(k => r.full_name?.toLowerCase().includes(k) || (r.description || '').toLowerCase().includes(k))),
          ...repos.filter((r: any) => ['config', 'setup', 'dotfiles', 'init', 'install', 'build', 'script'].some(k => r.full_name?.toLowerCase().includes(k) || (r.description || '').toLowerCase().includes(k)))
        ];
        if (!repos.length) {
          return `Trending Repositories\n\nNo trending repositories found for your query. Try a different language or time range.`;
        }
        return `Trending Repositories${data.filters?.language ? ` for: ${data.filters.language}` : ''}
Top ${repos.length} Trending Projects
${repos.map(formatRepo).join('\n\n')}

---

**Key Insights**
${aiInsightsArr.map(l => `- ${l}`).join('\n')}

Analysis completed at ${new Date().toLocaleTimeString()}`;
      case 'search':
        let searchRepos = data.repositories && Array.isArray(data.repositories)
          ? data.repositories.slice(0, 8)
          : [];
        // Move config/script-only repos to the end
        searchRepos = [
          ...searchRepos.filter((r: any) => !['config', 'setup', 'dotfiles', 'init', 'install', 'build', 'script'].some(k => r.full_name?.toLowerCase().includes(k) || (r.description || '').toLowerCase().includes(k))),
          ...searchRepos.filter((r: any) => ['config', 'setup', 'dotfiles', 'init', 'install', 'build', 'script'].some(k => r.full_name?.toLowerCase().includes(k) || (r.description || '').toLowerCase().includes(k)))
        ];
        if (!searchRepos.length) {
          return `Search Results\n\nNo repositories found for your search query.`;
        }
        return `Search Results for: "${data.filters?.query || result.query || ''}"
Found ${data.total_count ?? 0} repositories

${searchRepos.map(formatRepo).join('\n\n')}

---

**Key Insights**
${aiInsightsArr.map(l => `- ${l}`).join('\n')}

Analysis completed at ${new Date().toLocaleTimeString()}`;
      default:
        return `GitHub Analysis Complete\n\n${JSON.stringify(data, null, 2)}`;
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    setThinking(true);
    setWorkflow(getGitHubProcessingState()); // Reset workflow
    
    try {
      await processGitHubQuery(content);
    } catch (error) {
      console.error('Error processing GitHub query:', error);
    } finally {
      setThinking(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue('');
    handleSendMessage(suggestion);
  };
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 flex flex-col md:flex-row container mx-auto p-4 gap-4">
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors duration-200">
          {/* Intro section */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">GitHub Analytics Platform</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">AI-powered insights for repositories, users, trending topics, and search queries. Powered by real-time GitHub data and Gemini AI.</p>
            <div className="mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Try asking:</span>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={s}
                  className="ml-2 mb-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  onClick={() => handleSuggestionClick(s)}
                  disabled={thinking}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Chat container */}
          <ChatContainer 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            thinking={thinking} 
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          {/* Spinner overlay when thinking */}
          {thinking && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 z-10">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                <span className="text-blue-700 dark:text-blue-300 font-medium">Generating AI Insights…</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <div className="p-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analysis Pipeline</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Multi-stage GitHub analysis workflow</p>
          </div>
          <div className="h-[500px]">
            <AgentWorkflow workflow={workflow} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>GitHub Analytics Platform - <span className="font-semibold text-blue-600 dark:text-blue-400">AI-powered Developer Intelligence & Insights</span></p>
          <p className="mt-1">Repository analysis • User insights • Trending discovery • Gemini AI integration</p>
          <p className="mt-2 text-xs">Created by <span className="font-medium text-blue-600 dark:text-blue-400">Jaka Kus</span> - Empowering Developer Communities</p>
        </div>
      </footer>
    </div>
  );
}

export default App;