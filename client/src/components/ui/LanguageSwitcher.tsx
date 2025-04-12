import React from 'react';
import { useLanguage, LanguageCode } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages, t } = useLanguage();

  // Flag emojis for different languages
  const languageFlags: Record<LanguageCode, string> = {
    en: '🇺🇸',
    hi: '🇮🇳',
    te: '🇮🇳',
    ta: '🇮🇳',
    mr: '🇮🇳',
    bn: '🇮🇳',
    gu: '🇮🇳',
    kn: '🇮🇳',
    ml: '🇮🇳',
    pa: '🇮🇳',
    ur: '🇮🇳',
    or: '🇮🇳'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-2 md:px-3">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">
            {languageFlags[language]} {availableLanguages.find(lang => lang.code === language)?.name}
          </span>
          <span className="inline-block md:hidden">
            {languageFlags[language]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 ${language === lang.code ? 'bg-primary-50 font-medium' : ''}`}
            onClick={() => setLanguage(lang.code)}
          >
            <span>{languageFlags[lang.code]}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}