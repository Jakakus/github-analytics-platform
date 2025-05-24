import React from 'react';
import { Github, Moon, Sun, Star, GitBranch } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Github className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <Star className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">GitHub Analytics Platform</h1>
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <GitBranch className="h-3 w-3" />
              <span>Advanced Developer Intelligence</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Real-time Analysis</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-3 text-xs">
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Repository Metrics</span>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full flex items-center space-x-1">
              <GitBranch className="h-3 w-3" />
              <span>AI Insights</span>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-400 animate-spin-slow" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;