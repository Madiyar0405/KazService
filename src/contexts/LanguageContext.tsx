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

    // Persons data
    'person.1.name': 'Ерлан Аккенженов',
    'person.1.position': 'Министр',
    'person.1.workplace': 'Министерство энергетики РК',
    'person.1.reason': 'Девятый ежегодный рейтинг на этот раз возглавил Ерлан Аккенженов. С марта 2025 года Ерлан Аккенженов возглавил Министерство энергетики РК. Его карьера охватывает более двух десятилетий в сфере нефтяной торговли, переработки и государственного управления. Он прошёл путь от трейдера сырой нефти в Chevron Texaco в Великобритании до топ-менеджера международной группы KMG International, отвечая за экспорт, трейдинг и розничную реализацию нефтепродуктов в Румынии, Болгарии и Сингапуре. В Казахстане занимал ключевые должности в структуре «КазМунайГаз», а с 2023 по 2025 годы был вице-министром энергетики. Возглавив министерство, сосредоточен на развитии экспортной инфраструктуры, цифровизации энергетики и усилении роли местного содержания в отраслевых проектах. Как министр, он активно продвигает стратегию национальных интересов в выборе уровня добычи нефти, публично заявив, что Казахстан будет определять производство исходя из внутренних приоритетов, а не строго следовать квотам OPEC+',

    'person.2.name': 'Тимур Кулибаев',
    'person.2.position': 'Председатель',
    'person.2.workplace': 'Almex Holding Group',
    'person.2.reason': 'В 2025 году поднялся на одну позицию. Остается одной из ключевых фигур в развитии нефтегазовой отрасли Казахстана и одним из наиболее влиятельных бизнесменов страны. Является бенефициаром десятков компаний в добыче, нефтесервисе и машиностроении с совокупной численностью персонала свыше 10 000 человек. По данным Forbes его состояние вместе с супругой оценивается примерно в 5,3 млрд долларов. Контролирует важные финансовые инструменты, включая Халык Банк, который остается одним из крупнейших кредиторов нефтегазового сектора. Рост влияния частного капитала и расширение портфеля активов усилили его позиции и обеспечили движение вверх в рейтинге. Дополнительным фактором являются устойчивые международные контакты, включая страны ОПЕК, а также прочные связи с европейскими инвесторами и глубокое понимание энергетической системы.',

    'person.3.name': 'Бекет Избастин',
    'person.3.position': 'Генеральный директор, Председатель Правления',
    'person.3.workplace': 'ТОО "PSA"',
    'person.3.reason': 'Бекет Темиртаевич Избастин – генеральный директор и председатель правления ТОО «PSA», уполномоченной организации, представляющей интересы Республики Казахстан в рамках соглашений о разделе продукции по проектам Кашаган, Карачаганак и Дунга. Под его руководством PSA реализует стратегию по оптимизации затрат на крупных проектах, управляет многомиллиардными бюджетами и активно отстаивает национальные интересы в отношениях с международными инвесторами. Среди ключевых достижений – успешный запуск пятого компрессора обратной закачки газа на Карачаганакском месторождении, позволивший увеличить эффективность добычи и уровень местного содержания. Также при его участии PSA продвигает реформу тендерных процедур, направленную на повышение участия казахстанских компаний в нефтегазовых контрактах.',
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

    // Persons data
    'person.1.name': 'Yerlan Akkenzhanov',
    'person.1.position': 'Minister',
    'person.1.workplace': 'Ministry of Energy of the Republic of Kazakhstan',
    'person.1.reason': 'The ninth annual rating was topped by Yerlan Akkenzhanov this time. Since March 2025, Yerlan Akkenzhanov has headed the Ministry of Energy of the Republic of Kazakhstan. His career spans more than two decades in oil trading, refining and public administration. He rose from crude oil trader at Chevron Texaco in the UK to top manager of KMG International, responsible for export, trading and retail sales of petroleum products in Romania, Bulgaria and Singapore. In Kazakhstan, he held key positions in KazMunayGas structure, and from 2023 to 2025 was Deputy Minister of Energy. Having headed the ministry, he is focused on developing export infrastructure, digitalization of energy and strengthening the role of local content in industry projects. As minister, he actively promotes a strategy of national interests in choosing the level of oil production, publicly stating that Kazakhstan will determine production based on internal priorities, rather than strictly following OPEC+ quotas.',

    'person.2.name': 'Timur Kulibayev',
    'person.2.position': 'Chairman',
    'person.2.workplace': 'Almex Holding Group',
    'person.2.reason': 'Rose one position in 2025. Remains one of the key figures in the development of Kazakhstan\'s oil and gas industry and one of the most influential businessmen in the country. He is the beneficiary of dozens of companies in mining, oilfield services and mechanical engineering with a total staff of over 10,000 people. According to Forbes, his fortune together with his spouse is estimated at approximately $5.3 billion. Controls important financial instruments, including Halyk Bank, which remains one of the largest creditors in the oil and gas sector. The growth of private capital influence and expansion of the asset portfolio strengthened his position and ensured upward movement in the ranking. An additional factor is sustainable international contacts, including OPEC countries, as well as strong ties with European investors and deep understanding of the energy system.',

    'person.3.name': 'Beket Izbastin',
    'person.3.position': 'General Director, Chairman of the Board',
    'person.3.workplace': 'PSA LLP',
    'person.3.reason': 'Beket Temirtayevich Izbastin is the General Director and Chairman of the Board of PSA LLP, an authorized organization representing the interests of the Republic of Kazakhstan under production sharing agreements for the Kashagan, Karachaganak and Dunga projects. Under his leadership, PSA implements a strategy to optimize costs on major projects, manages multi-billion budgets and actively defends national interests in relations with international investors. Among the key achievements is the successful launch of the fifth gas reinjection compressor at the Karachaganak field, which increased production efficiency and the level of local content. Also with his participation, PSA is promoting tender procedure reform aimed at increasing participation of Kazakhstani companies in oil and gas contracts.',
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
