import React from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  to: string;
  icon: string;
};

export function Sidebar() {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const navigation: NavItem[] = [
    { name: t('sidebar.dashboard'), to: '/dashboard', icon: 'dashboard' },
    { name: t('sidebar.myCourses'), to: '/courses', icon: 'menu_book' },
    { name: t('sidebar.quizzes'), to: '/quizzes', icon: 'quiz' },
    { name: t('sidebar.achievements'), to: '/achievements', icon: 'emoji_events' },
    { name: t('sidebar.community'), to: '/community', icon: 'forum' },
    { name: t('sidebar.helpCenter'), to: '/help', icon: 'support_agent' },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link key={item.to} href={item.to}>
                <a className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive(item.to)
                    ? "bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}>
                  <span className={cn(
                    "material-icons-round mr-3",
                    isActive(item.to)
                      ? "text-primary-500"
                      : "text-gray-400 dark:text-gray-500"
                  )}>
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto px-3 py-4">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('sidebar.studyStreak')}
              </h4>
              <div className="mt-2 flex items-center">
                <span className="material-icons-round text-yellow-500">local_fire_department</span>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">7 {t('sidebar.days')}</span>
                <div className="ml-auto text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">+2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
