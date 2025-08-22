import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-accent/80 transition-colors"
      aria-label={t('language.switch')}
    >
      <Globe className="w-4 h-4 mr-2" />
      <span className="font-medium">
        {language === 'ru' ? 'EN' : 'RU'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;