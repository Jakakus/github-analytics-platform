import React from 'react';
import { Github, BarChart3, Star, TrendingUp, Users } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* Main Logo */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Github className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <Star className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GitHub Analytics Platform
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real-time repository insights, developer intelligence, and trending analysis
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Get concise, actionable summaries and trends for any repository, user, or search.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending Discovery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Explore trending repositories and technologies across the GitHub ecosystem.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Developer Intelligence</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Analyze user profiles, contributions, and open source impact.
            </p>
          </div>
        </div>

        {/* Sample Queries */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Example GitHub Queries:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>"facebook/react"</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>"@torvalds"</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>"trending javascript"</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>"machine learning python"</span>
          </div>
        </div>

        {/* Attribution */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created by <span className="font-medium text-blue-600 dark:text-blue-400">Jaka Kus</span> - Empowering Developer Communities
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 