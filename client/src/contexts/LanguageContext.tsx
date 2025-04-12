import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

// Define available languages
export type LanguageCode = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn' | 'gu' | 'kn' | 'ml' | 'pa' | 'ur' | 'or';

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  availableLanguages: { code: LanguageCode; name: string }[];
};

const availableLanguages = [
  { code: 'en' as LanguageCode, name: 'English' },
  { code: 'hi' as LanguageCode, name: 'हिंदी (Hindi)' },
  { code: 'te' as LanguageCode, name: 'తెలుగు (Telugu)' },
  { code: 'ta' as LanguageCode, name: 'தமிழ் (Tamil)' },
  { code: 'mr' as LanguageCode, name: 'मराठी (Marathi)' },
  { code: 'bn' as LanguageCode, name: 'বাংলা (Bengali)' },
  { code: 'gu' as LanguageCode, name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn' as LanguageCode, name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml' as LanguageCode, name: 'മലയാളം (Malayalam)' },
  { code: 'pa' as LanguageCode, name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'ur' as LanguageCode, name: 'اردو (Urdu)' },
  { code: 'or' as LanguageCode, name: 'ଓଡ଼ିଆ (Odia)' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Check if user previously selected a language
    const savedLanguage = localStorage.getItem('vidyai-language');
    return (savedLanguage as LanguageCode) || 'en';
  });

  useEffect(() => {
    // Update html lang attribute
    document.documentElement.lang = language;
    
    // Save language preference
    localStorage.setItem('vidyai-language', language);
  }, [language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    // Split the key by dots to support nested objects
    const keys = key.split('.');
    let translation: any = translations[language] || translations.en;
    
    // Navigate through the nested structure
    for (const k of keys) {
      translation = translation?.[k];
      if (!translation) {
        // Fallback to English if translation not found
        translation = translations.en;
        for (const k of keys) {
          translation = translation?.[k];
          if (!translation) break;
        }
        
        // If still not found, return the key itself
        if (!translation) return key;
        break;
      }
    }
    
    return translation as string;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage,
      t,
      availableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
