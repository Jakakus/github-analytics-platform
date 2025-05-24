import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  inputValue?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, inputValue, setInputValue }) => {
  const [internalInput, setInternalInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Use controlled input if provided, otherwise fallback to internal state
  const input = inputValue !== undefined ? inputValue : internalInput;
  const setInput = setInputValue !== undefined ? setInputValue : setInternalInput;

  const suggestions = [
    "microsoft/vscode",
    "@torvalds",
    "trending typescript",
    "data visualization react"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);
  
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Suggestions */}
      {!disabled && input.length === 0 && (
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 rounded-full transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              placeholder={disabled ? "Analyzing GitHub data..." : "Analyze repositories, users, or search GitHub... (e.g., 'microsoft/vscode' or '@octocat')"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={disabled}
              className="w-full p-4 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
            {disabled && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className={`p-4 rounded-xl transition-all duration-200 ${
              disabled || !input.trim()
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-105'
            } text-white`}
            aria-label="Send message"
          >
            <Send className={`h-5 w-5 ${disabled ? '' : 'animate-bounce-gentle'}`} />
          </button>
        </div>
        
        {/* Character count */}
        {input.length > 0 && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
            {input.length} characters
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput;