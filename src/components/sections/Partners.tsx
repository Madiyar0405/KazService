import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import partner1 from "@/assets/partners/partner-1.png";
import partner2 from "@/assets/partners/partner-2.png";
import partner3 from "@/assets/partners/partner-3.png";
import partner4 from "@/assets/partners/partner-4.png";
import partner5 from "@/assets/partners/partner-5.png";
import partner6 from "@/assets/partners/partner-6.png";

const logos = [partner1, partner2, partner3, partner4, partner5, partner6];

const Partners: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="partners" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">{t('partners.title')}</h2>
          <p className="text-muted-foreground">{t('partners.subtitle')}</p>
        </div>
        <div className="relative">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2">
              {logos.concat(logos).map((src, idx) => (
                <CarouselItem key={idx} className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <Card className="flex items-center justify-center h-28 border bg-card/60 hover:shadow-glow-premium transition-shadow">
                    <img src={src} alt={`Логотип партнёра ${idx + 1}`} loading="lazy" className="max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-background/80 backdrop-blur" />
            <CarouselNext className="bg-background/80 backdrop-blur" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Partners;
