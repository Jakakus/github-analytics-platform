import React from 'react';
import { Github, BarChart3, Star, TrendingUp, Users } from 'lucide-react';
import ChatInput from './ChatInput';
import { Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  "microsoft/vscode",
  "@torvalds",
  "trending typescript",
  "data visualization react"
];

const WelcomeScreen: React.FC<{ onSendMessage?: (msg: string) => void, disabled?: boolean }> = ({ onSendMessage = () => {}, disabled = false }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-4xl text-center space-y-4">
        {/* Main Logo */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Github className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              <Star className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            AI-Powered GitHub Analytics
          </h1>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instant insights. Smarter decisions. <span className="text-blue-600 dark:text-blue-400 font-semibold">Real-time GitHub data & Gemini AI</span>.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Analyze repositories, users, trends, and topics with actionable, developer-focused intelligence.
          </p>

          {/* Search bar and suggestions */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="w-full max-w-xl">
              <ChatInput onSendMessage={onSendMessage} disabled={disabled} />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics & Metrics</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Deep-dive into repository stats, user profiles, and open source activity.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trending & Discovery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Explore trending projects, languages, and technologies across GitHub.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Gemini AI summarizes results with concise, actionable recommendations.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            How it Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex flex-col items-center">
              <span className="font-bold text-blue-600 dark:text-blue-400 mb-1">1. Ask</span>
              <span>Type a repository, user, or topic (e.g., <span className="font-mono">facebook/react</span> or <span className="font-mono">trending python</span>).</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-green-600 dark:text-green-400 mb-1">2. Analyze</span>
              <span>We fetch real-time GitHub data and process it with Gemini AI.</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-purple-600 dark:text-purple-400 mb-1">3. Act</span>
              <span>Get instant, actionable insights to guide your next steps.</span>
            </div>
          </div>
        </div>


        {/* Attribution */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created by <span className="font-medium text-blue-600 dark:text-blue-400">Jaka Kus</span> – Empowering Developer Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 