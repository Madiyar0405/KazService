import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Parallax } from "@/components/common/Parallax";
import { Database, Users, Ratio, FileText } from "lucide-react";

// --- Данные для слоев методики ---
const methodologyCriteria = [
  {
    icon: Database,
    title: "Как оценивались участники рейтинга?",
    value: "30+",
    description: "Более 20 экспертов оценили 130 кандидатов по влиянию в отрасли, учитывая стоимость и долю компании на рынке, налоги, штат и значимость. Кадровые изменения этого года повлияли на результаты. **Экспертный совет:** 25 аналитиков и ветеранов отрасли анонимно оценивают участников.",
  },
  {
    icon: Users,
    title: "Экспертный совет",
    value: "25",
    description: "25 ведущих аналитиков и ветеранов нефтегазовой отрасли анонимно оценивают кандидатов.",
  },
  {
    icon: Ratio,
    title: "Весовые коэффициенты",
    value: "30+",
    description: "Более 30 параметров сгруппированы в индексы: финансовое влияние, операционный контроль и стратегическое видение.",
  },
    {
    icon: FileText,
    title: "Итоговый балл",
    value: "ТОП-75",
    description: "Результаты объединяются в единый взвешенный рейтинг, определяющий самых влиятельных фигур индустрии.",
  },
];

// --- Компонент для одного слоя методики ---
const MethodologyLayer = ({ criterion, index, progress, range }) => {
  // Трансформация для плавного появления и исчезновения
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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Анимация для "заполнения" центральной линии
  const pipelineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="method" ref={targetRef} className="relative h-[400vh] bg-background">
      {/* Фоновый эффект, создающий глубину */}
      <Parallax speed={-0.5}>
          <div className="absolute inset-0 bg-[url('/path-to-your/rock-texture.png')] bg-repeat opacity-5" />
      </Parallax>
      
      <div className="sticky top-0 left-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Центральная "скважина" / "трубопровод" */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-white/10">
            <motion.div 
                className="h-full w-full bg-gradient-to-b from-primary/0 via-primary to-primary"
                style={{ height: pipelineFill }}
            />
        </div>

        {/* Заголовок секции */}
        <div className="absolute top-24 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Как мы определяем влияние</h2>
            <p className="mt-4 text-lg text-muted-foreground">Процесс, основанный на данных и экспертизе</p>
        </div>

        {/* Контейнер для "слоев" методики */}
        <div className="relative w-full flex flex-col items-center">
          {methodologyCriteria.map((criterion, i) => {
            const totalItems = methodologyCriteria.length;
            // Определяем диапазон скролла, в котором активен текущий элемент
            const start = i / totalItems;
            const end = (i + 1) / totalItems;
            return (
              <MethodologyLayer
                key={i}
                criterion={criterion}
                index={i}
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