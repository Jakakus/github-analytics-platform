import React, { useEffect, useRef } from 'react';
import { ProcessingState } from '../types';
import { 
  Search, 
  Database, 
  BarChart3, 
  FileText, 
  Star, 
  CheckCircle, 
  Clock
} from 'lucide-react';

interface AgentWorkflowProps {
  workflow: ProcessingState;
}

const AgentWorkflow: React.FC<AgentWorkflowProps> = ({ workflow }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Auto-scroll to bottom when new steps are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [workflow.steps]);
  
  const stepDetails = {
    query_analysis: {
      name: 'Intent Detection',
      desc: 'Understanding your query (repo, user, trending, or search)',
      icon: Search,
      color: 'text-blue-600 bg-blue-100 border-blue-200 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-800',
    },
    fetching_data: {
      name: 'Data Fetching',
      desc: 'Retrieving real-time data from GitHub',
      icon: Database,
      color: 'text-orange-600 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-900/30 dark:border-orange-800',
    },
    processing_data: {
      name: 'Data Processing',
      desc: 'Structuring and preparing the data',
      icon: BarChart3,
      color: 'text-purple-600 bg-purple-100 border-purple-200 dark:text-purple-400 dark:bg-purple-900/30 dark:border-purple-800',
    },
    generating_insights: {
      name: 'AI Analysis',
      desc: 'Gemini AI is analyzing and summarizing',
      icon: Star,
      color: 'text-yellow-600 bg-yellow-100 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-800',
    },
    formatting_results: {
      name: 'Result Formatting',
      desc: 'Formatting results for display',
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-800',
    },
  };
  
  type StepKey = keyof typeof stepDetails;

  if (workflow.steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-gray-500 dark:text-gray-400">
        <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p className="text-base font-semibold mb-1">Start your analysis</p>
        <p className="text-xs">Type a repository, user, or topic to begin</p>
      </div>
    );
  }

  // Progress bar/stepper
  <div className="flex items-center justify-between mb-4">
    {workflow.steps.map((step, idx) => {
      const details = stepDetails[step.process as StepKey] || {};
      const isActive = idx === workflow.steps.length - 1;
      return (
        <div key={step.id} className={`flex-1 flex flex-col items-center ${isActive ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-gray-400 dark:text-gray-500'}`}>
          <div className={`w-3 h-3 rounded-full mb-1 ${isActive ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
          <span className="text-xs">{details.name || step.process}</span>
        </div>
      );
    })}
  </div>

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto pr-1">
      {workflow.steps.map((step, index) => {
        const details = stepDetails[step.process as StepKey] || {};
        const Icon = details.icon || Clock;
        const color = details.color || 'text-gray-600 bg-gray-100 border-gray-200 dark:text-gray-400 dark:bg-gray-900/30 dark:border-gray-800';
        const isActive = index === workflow.steps.length - 1;
        const isCompleted = workflow.completed && index === workflow.steps.length - 1;
        return (
          <div key={step.id} className={`flex items-start space-x-3 mb-4 p-3 rounded-lg border ${color}`}> 
            <div className="flex-shrink-0">
              <span title={details.desc}><Icon className="h-6 w-6" /></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">
                  {details.name || step.process}
                </h4>
                <span className="text-xs opacity-75">
                  {step.timestamp.toLocaleTimeString()}
                </span>
              </div>
              {details.desc && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{details.desc}</p>
              )}
              {step.output && (
                <p className="text-xs mt-1 opacity-80 break-words">
                  {step.output.length > 120 ? `${step.output.substring(0, 120)}...` : step.output}
                </p>
              )}
              {isActive && !isCompleted && (
                <div className="flex items-center space-x-1 mt-2">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-xs ml-2 opacity-75">Processing...</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {workflow.completed && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Analysis Complete
            </span>
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            GitHub analytics pipeline finished successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default AgentWorkflow;