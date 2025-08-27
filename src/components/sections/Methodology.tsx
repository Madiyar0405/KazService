import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Parallax } from "@/components/common/Parallax";
import { Database, Users, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// --- Функция для получения данных с ИСПРАВЛЕННЫМИ ключами ---
const getMethodologyCriteria = (t: (key: string) => string) => [
  {
    icon: Users,
    // Используем ключ 'expertGroup' из вашего JSON
    title: t('methodology.criteria.expertGroup.title'),
    description: t('methodology.criteria.expertGroup.description'),
  },
  {
    icon: Database,
    // Используем ключ 'keyCriteria' из вашего JSON
    title: t('methodology.criteria.keyCriteria.title'),
    description: t('methodology.criteria.keyCriteria.description'),
  },
  {
    icon: FileText,
    // Используем ключ 'assessmentResults' из вашего JSON
    title: t('methodology.criteria.assessmentResults.title'),
    description: t('methodology.criteria.assessmentResults.description'),
  },
];

// --- Компонент для одного слоя (без изменений) ---
const MethodologyLayer = ({ criterion, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [100, 0, 0, -100]);
  const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="sticky top-1/2 -translate-y-1/2 w-full max-w-2xl text-center lg:text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr] items-center gap-6 p-8 rounded-xl bg-card/60 backdrop-blur-md border border-white/10 shadow-2xl shadow-primary/5">
        <div className="flex justify-center lg:justify-start">
          <criterion.icon className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{criterion.title}</h3>
          <p className="mt-2 text-muted-foreground">{criterion.description}</p>
        </div>
      </div>
    </motion.div>
  );
};


// --- Основной компонент Methodology ---
const Methodology: React.FC = () => {
  const { t } = useLanguage();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const pipelineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const methodologyCriteria = getMethodologyCriteria(t);

  return (
    <section id="method" ref={targetRef} className="relative h-[300vh] bg-background">
      <Parallax speed={-0.5}>
        <div className="absolute inset-0 bg-[url('/path-to-your/rock-texture.png')] bg-repeat opacity-5" />
      </Parallax>
      
      <div className="sticky top-0 left-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-white/10">
          <motion.div 
            className="h-full w-full bg-gradient-to-b from-primary/0 via-primary to-primary"
            style={{ height: pipelineFill }}
          />
        </div>

        <div className="absolute top-24 text-center px-4">
          {/* Эти ключи тоже должны совпадать */}
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">{t('methodology.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{t('methodology.subtitle')}</p>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {methodologyCriteria.map((criterion, i) => {
            const totalItems = methodologyCriteria.length;
            const start = i / totalItems;
            const end = (i + 1) / totalItems;
            return (
              <MethodologyLayer
                key={i}
                criterion={criterion}
                progress={scrollYProgress}
                range={[start, start + 0.05, end - 0.05, end]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Methodology;