import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Header() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results or filter courses
    console.log(`Searching for: ${searchQuery}`);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard">
                <a className="flex items-center">
                  <span className="material-icons-round text-primary-600 dark:text-primary-500 text-3xl mr-2">school</span>
                  <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white">VidyAI++</h1>
                </a>
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link href="/dashboard">
                <a className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  {t('sidebar.dashboard')}
                </a>
              </Link>
              <Link href="/courses">
                <a className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  {t('sidebar.myCourses')}
                </a>
              </Link>
              <Link href="/community">
                <a className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  {t('sidebar.community')}
                </a>
              </Link>
              <Link href="/achievements">
                <a className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  {t('sidebar.achievements')}
                </a>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Theme Toggle */}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 border-0 text-gray-800 dark:text-gray-200"
            >
              <span className="material-icons-round dark:hidden">dark_mode</span>
              <span className="material-icons-round hidden dark:block">light_mode</span>
            </Button>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons-round text-gray-400 text-sm">search</span>
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md"
                placeholder={t('header.searchPlaceholder')}
              />
            </form>
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon"
              className="p-1.5 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <span className="material-icons-round">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </Button>
            
            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center focus:outline-none p-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl || ''} alt={user?.fullName || user?.username || 'User'} />
                    <AvatarFallback>{getInitials(user?.fullName || user?.username || 'U')}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.fullName || user?.username}
                  </span>
                  <span className="material-icons-round ml-1 text-gray-400 text-sm">arrow_drop_down</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setLocation('/profile')}>
                  <span className="material-icons-round mr-2 text-sm">person</span>
                  {t('header.profile')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/community')}>
                  <span className="material-icons-round mr-2 text-sm">forum</span>
                  {t('sidebar.community')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/achievements')}>
                  <span className="material-icons-round mr-2 text-sm">emoji_events</span>
                  {t('sidebar.achievements')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/settings')}>
                  <span className="material-icons-round mr-2 text-sm">settings</span>
                  {t('header.settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation('/help')}>
                  <span className="material-icons-round mr-2 text-sm">help</span>
                  {t('header.help')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <span className="material-icons-round mr-2 text-sm">logout</span>
                  {t('header.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
