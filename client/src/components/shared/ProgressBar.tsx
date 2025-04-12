import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  icon?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'blue',
  size = 'md',
  showPercentage = true,
  icon,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5',
  };

  return (
    <div className={cn("space-y-1", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-1">
          {label && (
            <div className="flex items-center">
              {icon && <span className={`material-icons-round text-${color}-500 mr-2`}>{icon}</span>}
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h4>
            </div>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-900 dark:text-white">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className={cn("overflow-hidden rounded bg-gray-200 dark:bg-gray-700", heightClasses[size])}>
        <div 
          className={cn("h-full rounded", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
