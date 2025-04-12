import React from 'react';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  title: string;
  description: string;
  iconName: string;
  colorClass: 'yellow' | 'green' | 'blue' | 'red' | 'purple';
  className?: string;
}

export function AchievementCard({
  title,
  description,
  iconName,
  colorClass = 'yellow',
  className,
}: AchievementCardProps) {
  const colorClasses = {
    base: {
      yellow: 'bg-yellow-50 dark:bg-yellow-900 bg-opacity-50 dark:bg-opacity-20',
      green: 'bg-green-50 dark:bg-green-900 bg-opacity-50 dark:bg-opacity-20',
      blue: 'bg-blue-50 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-20',
      red: 'bg-red-50 dark:bg-red-900 bg-opacity-50 dark:bg-opacity-20',
      purple: 'bg-purple-50 dark:bg-purple-900 bg-opacity-50 dark:bg-opacity-20',
    },
    icon: {
      yellow: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-400',
      green: 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400',
      blue: 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400',
      red: 'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-400',
      purple: 'bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-400',
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center p-3 rounded-lg",
        colorClasses.base[colorClass],
        className
      )}
    >
      <div className={cn(
        "flex-shrink-0 rounded-full p-2",
        colorClasses.icon[colorClass]
      )}>
        <span className="material-icons-round">{iconName}</span>
      </div>
      <div className="ml-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
