import React from "react";
import Hero from "@/components/sections/Hero";
import Methodology from "@/components/sections/Methodology";
import Ranking from "@/components/sections/Ranking";
import Partners from "@/components/sections/Partners";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ТОП-75 — ежегодный рейтинг',
    description: 'Ежегодный премиальный рейтинг ТОП-75: методика, тенденции и интерактивный список участников.',
    url: '/',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background text-foreground">
        <LanguageSwitcher />
        <Hero />
        <main>
          <Methodology />
          <Ranking />
          <Partners />
        </main>
        <footer className="border-t border-border/50 py-10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ТОП-12131233200. {t('footer.copyright')}
        </footer>
      </div>
    </>
  );
};

export default Index;
