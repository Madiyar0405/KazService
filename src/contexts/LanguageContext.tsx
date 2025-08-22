import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Переводы
const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Hero
    'hero.subtitle': 'Девятый ежегодный рейтинг',
    'hero.title': 'ТОП-75',
    'hero.description': 'ВЛИЯТЕЛЬНЫХ ЛИЦ НЕФТЕГАЗОВОЙ ОТРАСЛИ КАЗАХСТАНА',
    'hero.viewRating': 'Смотреть рейтинг',
    'hero.methodology': 'Методика и тренды',
    
    // Language switcher
    'language.switch': 'Switch to English',
    
    // Footer
    'footer.copyright': 'Все права защищены.',
    
    // Other sections
    'methodology.title': 'Методология',
    'ranking.title': 'Рейтинг',
    'partners.title': 'Партнеры',
  },
  en: {
    // Hero
    'hero.subtitle': 'Ninth Annual Rating',
    'hero.title': 'TOP-75',
    'hero.description': 'MOST INFLUENTIAL PEOPLE IN KAZAKHSTAN\'S OIL & GAS INDUSTRY',
    'hero.viewRating': 'View Rating',
    'hero.methodology': 'Methodology and Trends',
    
    // Language switcher
    'language.switch': 'Переключить на русский',
    
    // Footer
    'footer.copyright': 'All rights reserved.',
    
    // Other sections
    'methodology.title': 'Methodology',
    'ranking.title': 'Rating',
    'partners.title': 'Partners',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  // Сохранение выбранного языка в localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
