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
    
    // Methodology
    'methodology.title': 'Как мы определяем влияние',
    'methodology.subtitle': 'Процесс, основанный на данных и экспертизе',
    'methodology.criteria.evaluation.title': 'Как оценивались участники рейтинга?',
    'methodology.criteria.evaluation.description': 'Более 20 экспертов оценили 130 кандидатов по влиянию в отрасли, учитывая стоимость и долю компании на рынке, налоги, штат и значимость. Кадровые изменения этого года повлияли на результаты. **Экспертный совет:** 25 аналитиков и ветеранов отрасли анонимно оценивают участников.',
    'methodology.criteria.experts.title': 'Экспертный совет',
    'methodology.criteria.experts.description': '25 ведущих аналитиков и ветеранов нефтегазовой отрасли анонимно оценивают кандидатов.',
    'methodology.criteria.weights.title': 'Весовые коэффициенты',
    'methodology.criteria.weights.description': 'Более 30 параметров сгруппированы в индексы: финансовое влияние, операционный контроль и стратегическое видение.',
    'methodology.criteria.result.title': 'Итоговый балл',
    'methodology.criteria.result.description': 'Результаты объединяются в единый взвешенный рейтинг, определяющий самых влиятельных фигур индустрии.',
    
    // Ranking
    'ranking.title': 'Рейтинг ТОП-75',
    'ranking.subtitle': 'Самые влиятельные люди нефтегазовой отрасли Казахстана',
    'ranking.search.placeholder': 'Поиск по имени, должности или организации...',
    'ranking.search.button': 'Найти',
    'ranking.search.clear': 'Очистить',
    'ranking.filters.all': 'Все',
    'ranking.filters.government': 'Государство',
    'ranking.filters.business': 'Бизнес',
    'ranking.filters.noc': 'НОК',
    'ranking.filters.international': 'Международные',
    'ranking.modal.position': 'Позиция',
    'ranking.modal.workplace': 'Место работы',
    'ranking.modal.reason': 'Почему в рейтинге',
    'ranking.modal.details': 'Подробнее',
    'ranking.modal.workplacePrefix': 'в',
    'ranking.modal.trend.up': 'Повышение',
    'ranking.modal.trend.down': 'Понижение',
    'ranking.modal.close': 'Закрыть',
    'ranking.modal.previous': 'Предыдущий',
    'ranking.modal.next': 'Следующий',
    'ranking.noResults': 'Ничего не найдено',
    'ranking.noResultsDesc': 'Попробуйте изменить критерии поиска',
    
    // Partners
    'partners.title': 'Партнёры',
    'partners.subtitle': 'Поддержка проекта',
    
    // Language switcher
    'language.switch': 'Switch to English',
    
    // Footer
    'footer.copyright': 'Все права защищены.',
  },
  en: {
    // Hero
    'hero.subtitle': 'Ninth Annual Rating',
    'hero.title': 'TOP-75',
    'hero.description': 'MOST INFLUENTIAL PEOPLE IN KAZAKHSTAN\'S OIL & GAS INDUSTRY',
    'hero.viewRating': 'View Rating',
    'hero.methodology': 'Methodology and Trends',
    
    // Methodology
    'methodology.title': 'How We Determine Influence',
    'methodology.subtitle': 'Data and expertise-driven process',
    'methodology.criteria.evaluation.title': 'How were rating participants evaluated?',
    'methodology.criteria.evaluation.description': 'More than 20 experts evaluated 130 candidates based on industry influence, considering company value and market share, taxes, staff and significance. This year\'s personnel changes affected the results. **Expert Council:** 25 analysts and industry veterans anonymously evaluate participants.',
    'methodology.criteria.experts.title': 'Expert Council',
    'methodology.criteria.experts.description': '25 leading analysts and veterans of the oil and gas industry anonymously evaluate candidates.',
    'methodology.criteria.weights.title': 'Weight Coefficients',
    'methodology.criteria.weights.description': 'More than 30 parameters are grouped into indices: financial influence, operational control and strategic vision.',
    'methodology.criteria.result.title': 'Final Score',
    'methodology.criteria.result.description': 'Results are combined into a single weighted rating that determines the most influential figures in the industry.',
    
    // Ranking
    'ranking.title': 'TOP-75 Rating',
    'ranking.subtitle': 'Most influential people in Kazakhstan\'s oil & gas industry',
    'ranking.search.placeholder': 'Search by name, position or organization...',
    'ranking.search.button': 'Search',
    'ranking.search.clear': 'Clear',
    'ranking.filters.all': 'All',
    'ranking.filters.government': 'Government',
    'ranking.filters.business': 'Business',
    'ranking.filters.noc': 'NOC',
    'ranking.filters.international': 'International',
    'ranking.modal.position': 'Position',
    'ranking.modal.workplace': 'Workplace',
    'ranking.modal.reason': 'Why in the rating',
    'ranking.modal.details': 'Details',
    'ranking.modal.workplacePrefix': 'at',
    'ranking.modal.trend.up': 'Up',
    'ranking.modal.trend.down': 'Down',
    'ranking.modal.close': 'Close',
    'ranking.modal.previous': 'Previous',
    'ranking.modal.next': 'Next',
    'ranking.noResults': 'No results found',
    'ranking.noResultsDesc': 'Try changing your search criteria',
    
    // Partners
    'partners.title': 'Partners',
    'partners.subtitle': 'Project support',
    
    // Language switcher
    'language.switch': 'Переключить на русский',
    
    // Footer
    'footer.copyright': 'All rights reserved.',
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
