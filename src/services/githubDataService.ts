import { Octokit } from '@octokit/rest';
import { 
  getRepositoryCommitsUrl,
  getRepositoryLanguagesUrl,
  getRepositoryContributorsUrl,
  getRepositoryIssuesUrl,
  getRepositoryReleasesUrl,
  getGitHubToken
} from '../config/api';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  watchers_count: number;
  open_issues_count: number;
  size: number;
  created_at: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  company: string | null;
}

export interface GitHubUserStats {
  totalStars: number;
  avgRepoSize: number;
  topLanguage: string;
  contributionStreak: number;
}

export interface GitHubSearchResult {
  items: GitHubRepository[];
  total_count: number;
}

export interface GitHubTrendingResult {
  items: GitHubRepository[];
  filters: {
    language?: string;
    timeRange: string;
  };
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  contributions: number;
}

export interface GitHubLanguages {
  [language: string]: number;
}

export class GitHubDataService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepositoryData(fullName: string): Promise<GitHubRepository> {
    const [owner, repo] = fullName.split('/');
    const response = await this.octokit.repos.get({ owner, repo });
    return response.data as GitHubRepository;
  }

  async getUserData(username: string): Promise<GitHubUser> {
    const response = await this.octokit.users.getByUsername({ username });
    return response.data as GitHubUser;
  }

  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const response = await this.octokit.repos.listForUser({ username });
    return response.data as GitHubRepository[];
  }

  async getUserStats(username: string): Promise<GitHubUserStats> {
    const [repos] = await Promise.all([
      this.getUserRepositories(username)
    ]);

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const languages = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    const topLanguage = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang)[0] || 'Unknown';

    return {
      totalStars,
      avgRepoSize: 0, // This would require additional API calls to calculate
      topLanguage,
      contributionStreak: 0 // This would require additional API calls to calculate
    };
  }

  async getTrendingRepositories(language?: string, timeRange: string = 'daily'): Promise<GitHubTrendingResult> {
    const query = `created:>${this.getDateRange(timeRange)}${language ? ` language:${language}` : ''}`;
    const response = await this.octokit.search.repos({
      q: query,
      sort: 'stars',
      order: 'desc',
      per_page: 30
    });

    return {
      items: response.data.items as GitHubRepository[],
      filters: { language, timeRange }
    };
  }

  async searchRepositories(query: string): Promise<GitHubSearchResult> {
    const response = await this.octokit.search.repos({
      q: query,
      sort: 'stars',
      order: 'desc',
      per_page: 30
    });

    return {
      items: response.data.items as GitHubRepository[],
      total_count: response.data.total_count
    };
  }

  private getDateRange(timeRange: string): string {
    const now = new Date();
    switch (timeRange) {
      case 'daily':
        now.setDate(now.getDate() - 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() - 1);
        break;
      default:
        now.setDate(now.getDate() - 1);
    }
    return now.toISOString().split('T')[0];
  }

  // Get repository commits
  async getRepositoryCommits(owner: string, repo: string): Promise<GitHubCommit[]> {
    const url = getRepositoryCommitsUrl(owner, repo);
    return await this.fetchFromGitHub(url);
  }

  // Get repository languages
  async getRepositoryLanguages(owner: string, repo: string): Promise<GitHubLanguages> {
    const url = getRepositoryLanguagesUrl(owner, repo);
    return await this.fetchFromGitHub(url);
  }

  // Get repository contributors
  async getRepositoryContributors(owner: string, repo: string): Promise<GitHubContributor[]> {
    const url = getRepositoryContributorsUrl(owner, repo);
    return await this.fetchFromGitHub(url);
  }

  // Get repository issues
  async getRepositoryIssues(owner: string, repo: string): Promise<any[]> {
    const url = getRepositoryIssuesUrl(owner, repo);
    return await this.fetchFromGitHub(url);
  }

  // Get repository releases
  async getRepositoryReleases(owner: string, repo: string): Promise<any[]> {
    const url = getRepositoryReleasesUrl(owner, repo);
    return await this.fetchFromGitHub(url);
  }

  // Analyze repository (comprehensive analysis)
  async analyzeRepository(owner: string, repo: string): Promise<any> {
    try {
      console.log(`Analyzing repository: ${owner}/${repo}`);

      // Fetch all repository data in parallel
      const [
        repoData,
        commits,
        languages,
        contributors,
        issues,
        releases
      ] = await Promise.allSettled([
        this.getRepositoryData(`${owner}/${repo}`),
        this.getRepositoryCommits(owner, repo),
        this.getRepositoryLanguages(owner, repo),
        this.getRepositoryContributors(owner, repo),
        this.getRepositoryIssues(owner, repo),
        this.getRepositoryReleases(owner, repo)
      ]);

      // Extract successful results
      const repository = repoData.status === 'fulfilled' ? repoData.value : null;
      const commitData = commits.status === 'fulfilled' ? commits.value : [];
      const languageData = languages.status === 'fulfilled' ? languages.value : {};
      const contributorData = contributors.status === 'fulfilled' ? contributors.value : [];
      const issueData = issues.status === 'fulfilled' ? issues.value : [];
      const releaseData = releases.status === 'fulfilled' ? releases.value : [];

      // Calculate analytics
      const totalBytes = Object.values(languageData).reduce((sum: number, bytes: number) => sum + bytes, 0);
      const languagePercentages = Object.entries(languageData).map(([lang, bytes]: [string, number]) => ({
        language: lang,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes * 100).toFixed(1) : '0'
      }));

      const analysis = {
        repository,
        overview: {
          name: repository?.name || 'Unknown',
          description: repository?.description || 'No description available',
          owner: repository?.owner?.login || 'Unknown',
          stars: repository?.stargazers_count || 0,
          forks: repository?.forks_count || 0,
          watchers: repository?.watchers_count || 0,
          open_issues: repository?.open_issues_count || 0,
          size_kb: repository?.size || 0,
          created_at: repository?.created_at || '',
          updated_at: repository?.updated_at || '',
          primary_language: repository?.language || 'Unknown',
          topics: repository?.topics || []
        },
        activity: {
          total_commits: commitData.length,
          recent_commits: commitData.slice(0, 10),
          contributors_count: contributorData.length,
          top_contributors: contributorData.slice(0, 10),
          open_issues_count: issueData.length,
          recent_issues: issueData.slice(0, 5),
          releases_count: releaseData.length,
          latest_release: releaseData[0] || null
        },
        languages: {
          total_bytes: totalBytes,
          breakdown: languagePercentages,
          primary_language: languagePercentages[0]?.language || 'Unknown'
        },
        health_score: this.calculateHealthScore({
          stars: repository?.stargazers_count || 0,
          forks: repository?.forks_count || 0,
          commits: commitData.length,
          contributors: contributorData.length,
          issues: issueData.length,
          hasReadme: true, // GitHub API doesn't easily provide this
          hasLicense: true, // GitHub API doesn't easily provide this
          recentActivity: repository?.updated_at ? new Date(repository.updated_at) > new Date(Date.now() - 30*24*60*60*1000) : false
        }),
        metadata: {
          analyzed_at: new Date().toISOString(),
          data_source: 'GitHub API v3',
          api_rate_limit_remaining: 'N/A' // Would need to check response headers
        }
      };

      console.log('Repository analysis complete:', analysis);
      return analysis;

    } catch (error) {
      console.error('Error analyzing repository:', error);
      return {
        error: 'Failed to analyze repository',
        message: error instanceof Error ? error.message : 'Unknown error',
        repository_name: `${owner}/${repo}`,
        analyzed_at: new Date().toISOString()
      };
    }
  }

  private calculateHealthScore(metrics: {
    stars: number;
    forks: number;
    commits: number;
    contributors: number;
    issues: number;
    hasReadme: boolean;
    hasLicense: boolean;
    recentActivity: boolean;
  }): number {
    let score = 0;
    
    // Stars (0-25 points)
    score += Math.min(metrics.stars / 100, 25);
    
    // Forks (0-20 points)
    score += Math.min(metrics.forks / 50, 20);
    
    // Commits (0-20 points)
    score += Math.min(metrics.commits / 100, 20);
    
    // Contributors (0-15 points)
    score += Math.min(metrics.contributors * 3, 15);
    
    // Low issues is good (0-10 points)
    score += Math.max(10 - metrics.issues / 10, 0);
    
    // Documentation and licensing (0-10 points)
    if (metrics.hasReadme) score += 5;
    if (metrics.hasLicense) score += 5;
    
    // Recent activity (0-10 points)
    if (metrics.recentActivity) score += 10;
    
    return Math.round(Math.min(score, 100));
  }

  // Get popular repositories for demo purposes
  async getPopularRepositories(): Promise<GitHubRepository[]> {
    const searchResults = await this.searchRepositories('stars:>10000');
    return searchResults.items.slice(0, 20);
  }

  private async fetchFromGitHub(url: string): Promise<any> {
    try {
      console.log(`Fetching GitHub data from: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Analytics-Platform'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('GitHub API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const githubDataService = new GitHubDataService(getGitHubToken()); 