import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useMouse } from "@uidotdev/usehooks";
import heroImage from "@/assets/hero-top75.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaTelegramPlane } from "react-icons/fa"; // Импорт иконки

// --- Компонент частиц (остается без изменений) ---
const InteractiveParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({ x: -999, y: -999 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let particles: any[] = [];

        const particleSettings = {
            count: Math.max(60, Math.floor((w * h) / 15000)),
            mouseRadius: 150,
            restitution: 0.1,
        };

        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleSettings.count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    ox: Math.random() * w,
                    oy: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 1.5 + 1,
                    color: `hsla(51, 100%, ${Math.random() * 50 + 50}%, ${Math.random() * 0.4 + 0.2})`,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            const mouse = mouseRef.current;
            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < particleSettings.mouseRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (particleSettings.mouseRadius - dist) * particleSettings.restitution;
                    p.x += Math.cos(angle) * force;
                    p.y += Math.sin(angle) * force;
                }
                p.x += (p.ox - p.x) * 0.005;
                p.y += (p.oy - p.y) * 0.005;
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            }
            requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; createParticles(); };

        createParticles();
        animate();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('resize', handleResize); };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};


// --- Основной компонент Hero ---
const Hero: React.FC = () => {
  const [mouse, ref] = useMouse();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const glowX = mouse.x ?? -9999;
  const glowY = mouse.y ?? -9999;

  return (
    <motion.header
      ref={ref as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* --- УВЕЛИЧЕННАЯ ИКОНКА И ТЕКСТ TELEGRAM --- */}
      <motion.a
        href="https://t.me/kazservice" // <-- ЗАМЕНИТЕ НА ВАШУ ССЫЛКУ
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Подписаться в наш Telegram канал"
        variants={itemVariants}
        className="fixed top-6 left-6 z-50 flex items-center gap-4 text-foreground/80 transition-all duration-300 hover:scale-105 hover:text-primary md:top-8 md:left-8"
      >
        <FaTelegramPlane className="h-8 w-8" />
        <span className="hidden text-lg font-semibold md:inline">
          Подписаться в Telegram
        </span>
      </motion.a>

      {/* Улучшенный фон с параллаксом */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${-glowX / 80}px) translateY(${-glowY / 80}px)` }}
      >
        <img
          src={heroImage}
          alt="Премиальный тёмный инфографичный фон с золотыми линиями"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>
      
      <InteractiveParticles />
      
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(800px circle at ${glowX}px ${glowY}px, hsl(var(--primary) / 0.1), transparent 50%)` }}
      />
      
      <div className="relative z-10 container mx-auto px-6 py-24 text-center flex flex-col items-center">
        <motion.p variants={itemVariants} className="uppercase tracking-widest text-sm text-muted-foreground mb-4">
          {t('hero.subtitle')}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className={cn("text-[12vw] leading-none font-extrabold md:text-8xl tracking-tight text-gold", "drop-shadow-2xl")}
        >
          {t('hero.title')}
        </motion.h1>
        <motion.div variants={itemVariants} className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          {t('hero.description')}
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-4">
          <Button asChild variant="premium" size="lg">
            <a href="#rating" aria-label={t('hero.viewRating')}>{t('hero.viewRating')}</a>
          </Button>
          <a href="#method" className="story-link text-foreground/90 transition-colors hover:text-primary">
            {t('hero.methodology')}
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </motion.header>
  );
};

export default Hero;