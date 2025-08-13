import React from "react";
import { Parallax } from "@/components/common/Parallax";
import { Reveal } from "@/components/common/Reveal";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { name: "2019", score: 30 },
  { name: "2020", score: 35 },
  { name: "2021", score: 45 },
  { name: "2022", score: 52 },
  { name: "2023", score: 61 },
  { name: "2024", score: 68 },
];

const Methodology: React.FC = () => {
  return (
    <section id="method" className="relative py-28 overflow-hidden">
      <Parallax speed={-0.25} className="pointer-events-none absolute -top-24 right-0 w-[60vw] h-[60vw] rounded-full opacity-20 blur-3xl" style={{
        background: 'radial-gradient(closest-side, hsl(var(--primary) / 0.12), transparent)'
      }} />
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex items-start justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Методика и тенденции</h2>
              <p className="mt-6 text-lg text-muted-foreground">Мы используем <mark className="bg-transparent text-primary font-semibold">взвешенную шкалу</mark>, экспертные оценки и <mark className="bg-transparent text-primary font-semibold">публичные данные</mark> для расчёта итогового балла. Система прозрачна и воспроизводима.</p>
              <p className="mt-4 text-lg text-muted-foreground">Ключевые тренды последних лет: рост роли <mark className="bg-transparent text-primary font-semibold">технологий</mark>, значимость <mark className="bg-transparent text-primary font-semibold">устойчивого развития</mark> и влияние <mark className="bg-transparent text-primary font-semibold">коммуникаций</mark>.</p>
            </div>
            <div className="grid gap-6 min-w-[320px] w-full max-w-xl">
              <div className="rounded-xl border bg-card p-6 shadow-glow-premium">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Индекс влияния</h3>
                  <TrendingUp className="text-primary" />
                </div>
                <div className="h-56 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35}/>
                          <stop offset="90%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))"/>
                      <YAxis stroke="hsl(var(--muted-foreground))"/>
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gold)"/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Источники', value: '12+' },
                  { label: 'Эксперты', value: '25' },
                  { label: 'Параметры', value: '30+' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border bg-card p-4 text-center">
                    <div className="text-2xl font-extrabold text-primary">{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Methodology;
