import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import partner1 from "@/assets/partners/partner-1.png";
import Reveal from "@/components/common/Reveal";

const Partners: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="partners" className="py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('partners.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('partners.subtitle')}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative flex items-center justify-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main partner card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75 group-hover:opacity-100"></div>

              <div className="relative bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-12 md:p-16 shadow-2xl group-hover:shadow-glow-premium transition-all duration-500 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <img
                      src={partner1}
                      alt={t('partners.mainPartnerAlt')}
                      className="max-h-24 md:max-h-32 object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-2xl"
                    />
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>

                  

                  {/* Decorative stats */}
               
                </div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Partners;