import { githubDataService } from '../services/githubDataService';
import { geminiService } from '../services/geminiService';

export interface GitHubAnalysisResult {
  query: string;
  data: any;
  analysis: string;
  timestamp: string;
}

// Utility to clean up Gemini AI markdown for Key Insights
function cleanInsightsMarkdown(md: string): string {
  // Remove duplicate 'Key Insights' headings (h1/h2/h3)
  md = md.replace(/(#+\s*Key Insights\s*)+/gi, '## Key Insights\n');

  // Remove stray bullets or code blocks for repo names
  md = md.replace(/\n?\*\s*\*\s*/g, '\n'); // Remove double bullets
  md = md.replace(/```[\s\S]*?```/g, ''); // Remove code blocks

  // Remove single-item code blocks (e.g., for repo names)
  md = md.replace(/\n?`([^`]+)`\n?/g, ' `$1` ');

  // Remove empty or malformed bullets
  md = md.replace(/\n\*\s*\n/g, '\n');

  // Remove extra blank lines
  md = md.replace(/\n{3,}/g, '\n\n');

  // Limit to 3-4 bullets under Key Insights
  const keyInsightsMatch = md.match(/(## Key Insights[\s\S]*?)(\n## |$)/);
  if (keyInsightsMatch) {
    const section = keyInsightsMatch[1];
    const bullets = section.match(/\* .+/g) || [];
    const limited = bullets.slice(0, 4).join('\n');
    md = md.replace(section, `## Key Insights\n${limited}\n`);
  }

  // Ensure all bullets are proper sentences (capitalize, end with period)
  md = md.replace(/\* ([a-z])/g, (_match, p1) => `* ${p1.toUpperCase()}`);
  md = md.replace(/([^.])\n\*/g, '$1.\n*');

  return md.trim();
}

export class GitHubAgent {
  async analyzeRepository(owner: string, repo: string): Promise<GitHubAnalysisResult> {
    try {
      const repoData = await githubDataService.getRepositoryData(`${owner}/${repo}`);
      // Build overview object for UI compatibility
      const overview = {
        name: repoData.name,
        description: repoData.description,
        owner: repoData.owner?.login,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        open_issues: repoData.open_issues_count,
        size_kb: repoData.size,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        primary_language: repoData.language,
        topics: repoData.topics || []
      };
      const prompt = `Analyze this GitHub repository and provide 3-4 key insights.\n\nRepository: ${repoData.full_name}\nStars: ${repoData.stargazers_count}\nForks: ${repoData.forks_count}\nLanguage: ${repoData.language}\nDescription: ${repoData.description}\nLast updated: ${repoData.updated_at}`;
      let aiInsights = '';
      try {
        aiInsights = await geminiService.generateContent(prompt);
        if (!aiInsights.trim()) aiInsights = 'No AI insights available for this repository.';
        else aiInsights = cleanInsightsMarkdown(aiInsights);
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        aiInsights = 'AI insights unavailable (Gemini API error).';
      }
      return {
        query: `${owner}/${repo}`,
        data: {
          overview
        },
        analysis: aiInsights,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('GitHub API error (analyzeRepository):', error);
      throw error;
    }
  }

  async analyzeUser(username: string): Promise<GitHubAnalysisResult> {
    try {
      const userProfile = await githubDataService.getUserData(username);
      const userRepos = await githubDataService.getUserRepositories(username);
      const stats = await githubDataService.getUserStats(username);
      const prompt = `Analyze this GitHub user and provide 3-4 key insights.\n\nUser: ${userProfile.login}\nRepositories: ${userRepos.length}\nFollowers: ${userProfile.followers}\nFollowing: ${userProfile.following}\nAccount created: ${userProfile.created_at}\nMost used language: ${stats.topLanguage}\nTotal stars: ${stats.totalStars}`;
      let aiInsights = '';
      try {
        aiInsights = await geminiService.generateContent(prompt);
        if (!aiInsights.trim()) aiInsights = 'No AI insights available for this user.';
        else aiInsights = cleanInsightsMarkdown(aiInsights);
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        aiInsights = 'AI insights unavailable (Gemini API error).';
      }
      return {
        query: username,
        data: {
          profile: userProfile,
          repositories: userRepos,
          statistics: stats
        },
        analysis: aiInsights,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('GitHub API error (analyzeUser):', error);
      throw error;
    }
  }

  async analyzeTrending(language?: string, timeRange: string = 'daily'): Promise<GitHubAnalysisResult> {
    try {
      const trendingData = await githubDataService.getTrendingRepositories(language, timeRange);
      const topRepos = trendingData.items.slice(0, 5).map((repo: any) => `${repo.full_name}: ${repo.stargazers_count} stars, ${repo.language}`).join('\n');
      const prompt = `Analyze these trending GitHub repositories and provide 3-4 key insights.\n\nTop 5 trending repositories:\n${topRepos}\nTime range: ${timeRange}\nLanguage: ${language || 'all'}`;
      let aiInsights = '';
      try {
        aiInsights = await geminiService.generateContent(prompt);
        if (!aiInsights.trim()) aiInsights = 'No AI insights available for trending repositories.';
        else aiInsights = cleanInsightsMarkdown(aiInsights);
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        aiInsights = 'AI insights unavailable (Gemini API error).';
      }
      return {
        query: `trending_${language || 'all'}`,
        data: {
          repositories: trendingData.items,
          filters: { language, timeRange },
          total_count: trendingData.items.length
        },
        analysis: aiInsights,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('GitHub API error (analyzeTrending):', error);
      throw error;
    }
  }

  async searchRepositories(query: string): Promise<GitHubAnalysisResult> {
    try {
      const searchResults = await githubDataService.searchRepositories(query);
      const topRepos = searchResults.items.slice(0, 3).map((repo: any) => `${repo.full_name}: ${repo.stargazers_count} stars, ${repo.language}`).join('\n');
      const prompt = `Analyze these GitHub search results and provide 3-4 key insights.\n\nTop 3 results:\n${topRepos}\nTotal results: ${searchResults.items.length}\nQuery: ${query}`;
      let aiInsights = '';
      try {
        aiInsights = await geminiService.generateContent(prompt);
        if (!aiInsights.trim()) aiInsights = 'No AI insights available for these search results.';
        else aiInsights = cleanInsightsMarkdown(aiInsights);
      } catch (geminiError) {
        console.error('Gemini API error:', geminiError);
        aiInsights = 'AI insights unavailable (Gemini API error).';
      }
      return {
        query,
        data: {
          repositories: searchResults.items,
          filters: { query },
          total_count: searchResults.items.length
        },
        analysis: aiInsights,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('GitHub API error (searchRepositories):', error);
      throw error;
    }
  }
}

export const githubAgent = new GitHubAgent(); 