import React, { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-top75.jpg";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/common/NumberTicker";
import { cn } from "@/lib/utils";

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<{x:number;y:number;vx:number;vy:number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; init(); };
    const count = Math.max(40, Math.floor((w*h)/9000));
    const init = () => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
      }));
    };
    init();
    const step = () => {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = `hsla(51,100%,50%,0.6)`;
      ctx.strokeStyle = `hsla(51,100%,50%,0.15)`;
      const pts = particlesRef.current;
      for (let i=0;i<pts.length;i++){
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>w) p.vx*=-1;
        if (p.y<0||p.y>h) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,1.2,0,Math.PI*2);
        ctx.fill();
        for (let j=i+1;j<pts.length;j++){
          const q = pts[j];
          const dx=p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<120){
            ctx.globalAlpha = (120-d)/120*0.6;
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, hsl(var(--primary) / 0.12), transparent 60%)`
      }}
    />
  );
};

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-premium">
      <img src={heroImage} alt="Премиальный тёмный инфографичный фон с золотыми линиями" loading="eager" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      <Particles />
      <CursorGlow />
      <div className="relative z-10 container mx-auto px-6 py-24 text-center">
        <p className="uppercase tracking-widest text-sm text-muted-foreground mb-4 animate-fade-in">ежегодный рейтинг</p>
        <h1 className={cn("text-[12vw] leading-none font-extrabold md:text-8xl tracking-tight", "drop-shadow-2xl")}>ТОП-75</h1>
        <div className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto animate-fade-in">
          Престиж. Данные. Тенденции. <span className="text-primary font-semibold">Интерактивный</span> спецпроект.
        </div>
        <div className="mt-10 flex items-center justify-center gap-4 animate-scale-in">
          <Button asChild variant="premium" size="lg">
            <a href="#rating" aria-label="Смотреть рейтинг">Смотреть рейтинг</a>
          </Button>
          <a href="#method" className="story-link text-foreground/90">Методика и тренды</a>
        </div>
        <div className="mt-14 flex items-center justify-center gap-3 text-muted-foreground">
          <span>Всего участников:</span>
          <span className="text-4xl font-extrabold text-primary tabular-nums"><NumberTicker to={75} /></span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
    </header>
  );
};

export default Hero;
