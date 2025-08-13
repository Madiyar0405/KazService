import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import p1 from "@/assets/portraits/p1.jpg";
import p2 from "@/assets/portraits/p2.jpg";
import p3 from "@/assets/portraits/p3.jpg";
import p4 from "@/assets/portraits/p4.jpg";
import p5 from "@/assets/portraits/p5.jpg";
import p6 from "@/assets/portraits/p6.jpg";

interface Person { id: number; name: string; title: string; photo: string; reason: string; }

const basePeople: Omit<Person, 'id'>[] = [
  { name: 'Алия К.', title: 'Генеральный директор', photo: p1, reason: 'Системные трансформации и рост компании на 35%.' },
  { name: 'Руслан Т.', title: 'Партнёр по стратегиям', photo: p2, reason: 'Лидерство в цифровых инициативах и ESG.' },
  { name: 'Жанна А.', title: 'Руководитель инноваций', photo: p3, reason: 'Сильное портфолио внедрений и экспертиза.' },
  { name: 'Данияр С.', title: 'Финансовый директор', photo: p4, reason: 'Устойчивый рост и прозрачная отчётность.' },
  { name: 'Мадина Р.', title: 'Коммерческий директор', photo: p5, reason: 'Расширение рынков и повышение NPS.' },
  { name: 'Ержан Н.', title: 'Директор по развитию', photo: p6, reason: 'Партнёрства и международные проекты.' },
];

const Ranking: React.FC = () => {
  const people: Person[] = useMemo(() => {
    const arr: Person[] = [];
    for (let i = 0; i < 12; i++) {
      const base = basePeople[i % basePeople.length];
      arr.push({ id: i + 1, ...base });
    }
    return arr;
  }, []);

  return (
    <section id="rating" className="py-28">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Сам рейтинг</h2>
          <p className="text-muted-foreground">Топ участников с краткими досье</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {people.map((p) => (
            <Dialog key={p.id}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer overflow-hidden border-border/60 bg-card hover:shadow-glow-premium transition-all hover-scale">
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={p.photo} alt={`Фото участника ${p.name}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 z-10 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-sm ring-1 ring-primary/40">
                        № {p.id}
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/80 via-background/20 to-transparent">
                        <div className="font-semibold text-lg">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.title}</div>
                        <div className="mt-3">
                          <Button variant="premium" size="sm">Подробнее</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{p.name}</DialogTitle>
                <DialogDescription>{p.title}</DialogDescription>
                <div className="text-sm leading-relaxed">
                  <span className="text-primary font-semibold">Почему в рейтинге: </span>
                  {p.reason}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ranking;
