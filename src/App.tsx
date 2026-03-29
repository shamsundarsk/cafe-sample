import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Coffee, 
  Dog, 
  Cat, 
  MapPin, 
  Instagram, 
  Phone, 
  Star, 
  ArrowRight, 
  Utensils, 
  IceCream, 
  Pizza as PizzaIcon, 
  Sandwich as SandwichIcon,
  Wind,
  Heart
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor flex items-center justify-center">
      <div className="bg-brand-orange rounded-full p-2 shadow-lg">
        <Cat size={20} className="text-white" />
      </div>
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <motion.div className="scroll-progress" style={{ scaleX, originX: 0 }} />;
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cat waking up and stretching
      gsap.fromTo(catRef.current, 
        { scale: 0.8, opacity: 0, y: 100 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "back.out(1.7)" 
        }
      );

      // Text reveal with stagger
      gsap.from(".hero-text", {
        y: 150,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
      });

      // Subtle floating for background elements
      gsap.to(".floating-coffee", {
        y: -30,
        rotation: 15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Cat walking animation across the screen after stretch
      gsap.to(catRef.current, {
        x: "120vw",
        duration: 25,
        repeat: -1,
        ease: "none",
        delay: 2,
        onRepeat: () => {
          gsap.set(catRef.current, { x: "-20vw" });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-brand-blue text-brand-beige h-screen relative">
      <div ref={textRef} className="text-center z-10 px-6">
        <h2 className="heading-huge hero-text">WAKE UP.</h2>
        <h2 className="heading-huge hero-text text-brand-orange">STRETCH.</h2>
        <p className="text-punchy hero-text mt-4 opacity-80">A DAY IN THE LIFE OF A COOL CAT.</p>
      </div>
      
      <div ref={catRef} className="absolute bottom-32 flex flex-col items-center pointer-events-none">
        <div className="relative">
          <Cat size={120} className="text-brand-orange doodle" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-8 -right-8"
          >
            <Coffee size={50} className="text-brand-beige" />
          </motion.div>
        </div>
        <div className="mt-4 bg-brand-beige text-brand-blue px-4 py-1 rounded-full text-xs font-bold shadow-lg">
          NEED... CAFFEINE...
        </div>
      </div>

      <div className="floating-coffee absolute top-1/4 right-1/4 opacity-10 pointer-events-none">
        <Coffee size={180} />
      </div>
      
      <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-30">
        <div className="w-12 h-[1px] bg-brand-beige" />
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase">Scroll to explore</p>
      </div>
    </section>
  );
};

const IntroVibe = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".vibe-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
      });

      // SVG Stroke reveal
      const path = svgRef.current?.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-beige text-brand-blue">
      <div className="max-w-4xl text-center space-y-8 px-6">
        <h2 className="heading-huge vibe-text">FOLLOW THE SMELL.</h2>
        <p className="text-punchy vibe-text">IT LEADS TO THE GOOD STUFF.</p>
        
        <div className="flex justify-center mt-12 relative">
          <svg ref={svgRef} width="200" height="100" viewBox="0 0 200 100" fill="none" className="doodle">
            <path d="M10 80 Q 50 10, 100 80 T 190 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <motion.div 
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2"
          >
            <Cat size={60} className="text-brand-orange" />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-20 left-20 opacity-10">
        <Coffee size={60} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10">
        <Wind size={60} />
      </div>
      
      {/* Extra SVG Doodle: Steam */}
      <div className="absolute top-1/2 right-10 opacity-20">
        <svg width="100" height="150" viewBox="0 0 100 150">
          <motion.path 
            initial={{ d: "M50 140 Q 30 100, 50 60 T 50 10" }}
            animate={{ d: ["M50 140 Q 30 100, 50 60 T 50 10", "M50 140 Q 70 100, 50 60 T 50 10"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none" 
            strokeLinecap="round" 
          />
        </svg>
      </div>
    </section>
  );
};

const ChaoticFun = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".chaotic-item");
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { y: -200, rotation: 0 },
          { 
            y: "110vh", 
            rotation: 360 + Math.random() * 720,
            duration: 2.5 + Math.random() * 2,
            repeat: -1,
            ease: "bounce.out",
            delay: Math.random() * 5
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-orange text-white overflow-hidden">
      <div className="z-10 text-center relative pointer-events-none">
        <h2 className="heading-huge">SOMETIMES…</h2>
        <h2 className="heading-huge text-brand-blue">WE GET A LITTLE CRAZY.</h2>
      </div>

      <motion.div 
        animate={{ 
          x: [0, 50, -50, 0], 
          y: [0, -30, 30, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10"
      >
        <Cat size={400} />
      </motion.div>

      {/* Falling items */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="chaotic-item absolute top-[-100px] opacity-80" style={{ left: `${Math.random() * 100}%` }}>
          {i % 4 === 0 ? <Coffee size={50 + Math.random() * 30} /> : 
           i % 4 === 1 ? <Utensils size={40 + Math.random() * 20} /> : 
           i % 4 === 2 ? <PizzaIcon size={50 + Math.random() * 30} /> :
           <div className="text-4xl select-none">🥐</div>}
        </div>
      ))}
    </section>
  );
};

const Shakes = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const strawRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Liquid fill controlled by scroll
      gsap.to(fillRef.current, {
        height: "80%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
        }
      });

      // Global wobble for the liquid/glass content
      gsap.to(".liquid-vibe", {
        rotation: 3,
        x: 5,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Straw tilt on scroll
      gsap.to(strawRef.current, {
        rotation: 10,
        x: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text animations
      gsap.from(".shake-title-1", {
        x: -100,
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top center+=100", scrub: true }
      });
      gsap.from(".shake-title-2", {
        y: 100,
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top center+=200", scrub: true }
      });
      gsap.from(".shake-title-3", {
        scale: 0.5,
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top center+=300", scrub: true }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-beige text-brand-blue relative overflow-hidden flex items-center justify-center">
       {/* Layered Text - Fixed Positioning */}
       <div className="absolute top-20 left-10 md:left-20 z-0">
         <motion.h2 
           initial={{ x: -100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           className="text-[10vw] font-display font-black leading-none text-brand-blue"
         >
           THICK.
         </motion.h2>
       </div>
       <div className="absolute top-[45%] left-10 md:left-20 -translate-y-1/2 z-0">
         <motion.h2 
           initial={{ x: -100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
           className="text-[10vw] font-display font-black leading-none text-brand-blue"
         >
           COLD.
         </motion.h2>
       </div>
       <div className="absolute bottom-20 right-10 md:right-20 z-0">
         <motion.h2 
           initial={{ x: 100, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-[10vw] font-display font-black leading-none text-brand-orange"
         >
           ADDICTIVE.
         </motion.h2>
       </div>
        
        <div ref={glassRef} className="relative shake-glass-container z-10 scale-90 md:scale-110 liquid-vibe flex items-center justify-center">
          <div className="relative w-64 h-[480px] border-[14px] border-brand-blue rounded-b-[5rem] rounded-t-xl overflow-hidden glass shadow-2xl">
            
            {/* Liquid Layer with Wave distortion */}
            <div 
              ref={fillRef} 
              className="absolute bottom-0 left-0 w-full bg-brand-orange h-0 origin-bottom"
              style={{ filter: 'url(#liquid-wobble)' }}
            >
               {/* Foam layer top */}
               <motion.div 
                 animate={{ y: [0, -5, 0], scaleX: [1, 1.05, 1] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="absolute top-0 left-0 w-full h-12 bg-white/30 rounded-full blur-md"
               />
               
               {/* Bubble particles */}
               {Array.from({ length: 12 }).map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     y: [400, -50], 
                     x: [0, Math.sin(i) * 20, 0],
                     opacity: [0, 1, 0] 
                   }}
                   transition={{ 
                     repeat: Infinity, 
                     duration: 3 + Math.random() * 2, 
                     delay: Math.random() * 2 
                   }}
                   className="absolute w-2 h-2 bg-white/40 rounded-full"
                   style={{ left: `${15 + Math.random() * 70}%` }}
                 />
               ))}

               {/* Floating Ice Cubes */}
               {Array.from({ length: 4 }).map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     y: [0, -15, 0],
                     rotate: [0, 10, 0]
                   }}
                   transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
                   className="absolute bottom-[20%] w-10 h-10 bg-white/20 rounded-md border border-white/10"
                   style={{ left: `${10 + i * 25}%`, bottom: `${10 + (i % 2) * 20}%` }}
                 />
               ))}
            </div>

            {/* Shine/Gloss diagonal layer */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            
            {/* Straw */}
            <div ref={strawRef} className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-8 h-[600px] bg-brand-blue/20 rounded-full border-x-4 border-brand-blue/10 backdrop-blur-sm z-30 flex items-center justify-center">
               <div className="w-1 h-full bg-brand-blue/5" />
            </div>
          </div>
          
          {/* SVG Filter for liquid wobble */}
          <svg className="hidden">
            <defs>
              <filter id="liquid-wobble">
                <feTurbulence type="fractalNoise" baseFrequency="0.015 0.03" numOctaves="4" result="noise">
                  <animate attributeName="baseFrequency" values="0.015 0.03; 0.03 0.06; 0.015 0.03" dur="8s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Parallax background cat */}
        <motion.div 
          animate={{ y: [0, -40, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none z-0"
        >
          <Cat size={400} />
        </motion.div>
    </section>
  );
};

const Burger = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="bg-brand-blue text-brand-beige overflow-hidden flex items-center justify-center">
      <div className="text-center space-y-24 z-10 px-6 flex flex-col items-center justify-center">
        <div className="space-y-4">
          <h2 className="heading-huge burger-title-1 py-10">ONE BITE.</h2>
          <motion.h2 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1.2, opacity: 1 }}
            className="heading-huge text-brand-orange burger-title-2 py-10"
          >
            AND YOU’RE DONE.
          </motion.h2>
        </div>
        
        <div className="relative group flex justify-center items-center mt-20 p-20 overflow-visible">
           {/* Layered Burger Assembly - Scaled up */}
           <motion.div 
             style={{ scale }}
             className="relative w-96 h-96 md:w-[650px] md:h-[650px] flex flex-col items-center justify-center cursor-pointer group scale-125"
           >
              {/* Top Bun */}
              <motion.div 
                initial={{ y: -500, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.5 }}
                className="relative z-40 w-80 md:w-[480px] h-24 md:h-40 bg-[#E6C9A2] rounded-t-[5rem] shadow-xl border-b-8 border-black/10 flex items-center justify-center"
              >
                 {/* Sesame dots */}
                 <div className="absolute inset-0 p-8 grid grid-cols-6 gap-2 opacity-30">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-2 h-3 bg-white rounded-full rotate-45" />
                    ))}
                 </div>
              </motion.div>

              {/* Lettuce */}
              <motion.div 
                initial={{ y: -400, opacity: 0 }}
                whileInView={{ y: -10, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.4 }}
                className="z-30 w-80 md:w-[500px] h-6 md:h-10 bg-green-500 rounded-full shadow-lg"
              />

              {/* Cheese (Drippy Morph) */}
              <motion.div 
                initial={{ y: -300, opacity: 0 }}
                whileInView={{ y: -15, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.3 }}
                className="z-20 w-80 md:w-[480px] h-8 md:h-14 bg-yellow-400 rounded-lg relative"
              >
                 <motion.div 
                   animate={{ height: [10, 50, 10], borderRadius: ["0 0 50% 50%", "0 0 80% 80%", "0 0 50% 50%"] }}
                   transition={{ repeat: Infinity, duration: 3 }}
                   className="absolute top-full left-10 w-10 bg-yellow-400"
                 />
                 <motion.div 
                   animate={{ height: [30, 80, 20], borderRadius: ["0 0 50% 50%", "0 0 80% 80%", "0 0 50% 50%"] }}
                   transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                   className="absolute top-full right-24 w-12 bg-yellow-400"
                 />
              </motion.div>

              {/* Patty */}
              <motion.div 
                initial={{ y: -200, opacity: 0 }}
                whileInView={{ y: -25, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
                className="z-10 w-80 md:w-[480px] h-14 md:h-24 bg-[#5D4037] rounded-3xl shadow-2xl border-b-8 border-black/20"
              />

              {/* Bottom Bun */}
              <motion.div 
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: -30, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                className="z-0 w-80 md:w-[480px] h-14 md:h-24 bg-[#E6C9A2] rounded-b-3xl shadow-xl"
              />

              {/* Bite Mask Effect (Circular) */}
              <motion.div 
                whileHover={{ x: -180, scale: 1.1, opacity: 1 }}
                initial={{ x: 0, scale: 0.8, opacity: 0 }}
                className="absolute top-[10%] right-[-100px] w-64 h-64 md:w-[400px] md:h-[400px] bg-brand-blue rounded-full z-50 transition-all duration-300 pointer-events-none shadow-inner"
              />
              
              {/* Crumbs - Tiny Circles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, 300], 
                      x: [0, (i - 10) * 40], 
                      opacity: [1, 0], 
                      scale: [1, 0.5]
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 md:w-3 md:h-3 bg-[#E6C9A2] rounded-full"
                  />
                ))}
              </div>

              {/* Squash Jive on Hover */}
              <motion.div 
                 whileHover={{ 
                   scaleY: [1, 0.95, 1],
                   transition: { repeat: Infinity, duration: 0.6 }
                 }}
                 className="absolute inset-0 z-0"
              />
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const Pizza = () => {
  const [dragX, setDragX] = useState(0);

  return (
    <section className="bg-brand-beige text-brand-blue relative overflow-hidden flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center space-y-16 z-10 px-6 flex flex-col items-center justify-center">
        <div className="space-y-8 md:space-y-12">
          <motion.h2 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="heading-huge font-black leading-[1.2] tracking-wide"
          >
            SHARE
          </motion.h2>
          <motion.h2 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="heading-huge text-brand-orange font-black leading-[1.2] tracking-wide"
          >
            IF YOU CAN.
          </motion.h2>
        </div>
        
        <div className="relative flex justify-center items-center mt-20">
          {/* Main Pizza Body (The Base) */}
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] bg-[#E67E22] rounded-full border-[14px] border-[#D35400] shadow-2xl">
            {/* Cheese Layer */}
            <div className="absolute inset-4 bg-yellow-400 rounded-full shadow-inner" />
            
            {/* Toppings on Base */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "absolute w-10 h-10 md:w-16 md:h-16 rounded-full shadow-md z-10",
                  i % 2 === 0 ? "bg-red-700" : "bg-black w-4 h-4 md:w-6 md:h-6"
                )}
                style={{ 
                  top: `${25 + Math.random() * 50}%`, 
                  left: `${25 + Math.random() * 50}%` 
                }}
              />
            ))}
            
            {/* The Draggable Slice (Independent Element) */}
            <motion.div 
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.1}
              onDrag={(e, info) => setDragX(info.offset.x)}
              onDragEnd={() => setDragX(0)}
              animate={{ x: dragX, rotate: dragX / 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#E67E22] cursor-grab active:cursor-grabbing origin-bottom-left z-30 shadow-[10px_-10px_20px_rgba(0,0,0,0.3)]"
              style={{ clipPath: 'polygon(0% 100%, 100% 0%, 100% 100%)' }}
            >
               {/* Slice Cheese */}
               <div className="absolute inset-0 bg-yellow-400" style={{ clipPath: 'polygon(5% 95%, 95% 5%, 95% 95%)' }} />
               {/* Slice Toppings */}
               <div className="absolute inset-0 z-10 flex items-center justify-center -rotate-45 translate-x-12 translate-y-4">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-red-700 rounded-full shadow-lg" />
               </div>
            </motion.div>

            {/* Elastic Cheese Pull Strands */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
               {[10, 0, -10].map((offset, i) => (
                 <motion.path 
                   key={i}
                   d={`M 250 250 L ${250 + dragX} ${250 - dragX/3 + offset} Q ${250 + dragX/1.5} ${250 - dragX/6} 250 250`}
                   stroke="#F1C40F"
                   strokeWidth={8 - Math.abs(offset)/2}
                   strokeLinecap="round"
                   fill="none"
                   transition={{ type: "spring", stiffness: 400, damping: 25, delay: i * 0.02 }}
                   style={{ 
                     opacity: dragX > 20 ? 0.9 : 0,
                     scale: 1 + dragX/1000
                   }}
                 />
               ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sandwich = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const layers = [
    { color: 'bg-[#E6C9A2]', h: 'h-12 md:h-16', rounded: 'rounded-t-[3rem]', label: 'BREAD' },
    { color: 'bg-green-500', h: 'h-4', rounded: '', label: 'LETTUCE' },
    { color: 'bg-red-500', h: 'h-4', rounded: '', label: 'TOMATO' },
    { color: 'bg-yellow-400', h: 'h-6', rounded: '', label: 'CHEESE' },
    { color: 'bg-[#8B4513]', h: 'h-10 md:h-14', rounded: '', label: 'MEAT' },
    { color: 'bg-green-500', h: 'h-4', rounded: '', label: 'LETTUCE' },
    { color: 'bg-red-500', h: 'h-4', rounded: '', label: 'TOMATO' },
    { color: 'bg-[#E6C9A2]', h: 'h-12 md:h-16', rounded: 'rounded-b-[3rem]', label: 'BREAD' }
  ];

  return (
    <section ref={sectionRef} className="bg-brand-orange text-white overflow-hidden">
      <div className="text-center space-y-20 z-10 px-6">
        <div className="space-y-4">
          <h2 className="heading-huge">FAST. FRESH.</h2>
          <motion.h2 
            animate={{ 
              x: [-2, 2, -2],
              rotate: [-1, 1, -1]
            }}
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="heading-huge text-brand-blue"
          >
            NO WAIT.
          </motion.h2>
        </div>
        
        <div className="flex flex-col items-center mt-10">
            <motion.div 
               whileInView={{ scaleY: [1, 0.9, 1.05, 1] }}
               transition={{ delay: 1.2, duration: 0.4 }}
               className="relative w-72 md:w-96 flex flex-col justify-end origin-bottom"
            >
               {layers.map((layer, i) => (
                 <motion.div
                   key={i}
                   initial={{ y: -1200, opacity: 0, scaleY: 2 }}
                   whileInView={{ y: 0, opacity: 1, scaleY: 1 }}
                   viewport={{ once: false, amount: 0.5 }}
                   transition={{ 
                     type: "spring", 
                     stiffness: 600, 
                     damping: 30, 
                     delay: i * 0.08 
                   }}
                   className={`${layer.color} ${layer.h} ${layer.rounded} w-full shadow-2xl border-b-4 border-black/10 flex items-center justify-center`}
                 >
                    {/* Motion Blur Effect during drop (simulated with opacity gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </motion.div>
               ))}
            </motion.div>
        </div>
      </div>

      {/* Speed lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {Array.from({ length: 10 }).map((_, i) => (
           <motion.div
             key={i}
             animate={{ x: [-1000, 1000] }}
             transition={{ repeat: Infinity, duration: 0.2, delay: i * 0.05, ease: "linear" }}
             className="absolute h-1 bg-white"
             style={{ top: `${i * 10}%`, width: '100px' }}
           />
         ))}
      </div>
    </section>
  );
};

const Drinks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const drinkRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="bg-brand-blue text-brand-beige overflow-hidden">
      <div className="text-center space-y-20 z-10 px-6">
        <motion.h2 
          initial={{ filter: "blur(20px)", opacity: 0 }}
          whileInView={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="heading-huge"
        >
          COOL DOWN.
        </motion.h2>
        
        <div ref={drinkRef} className="relative flex justify-center mt-10">
          {/* Glass Overlay with Shine and Condensation */}
          <div className="relative w-72 h-96 md:w-80 md:h-[500px] border-x-[14px] border-b-[28px] border-brand-beige rounded-b-[4rem] glass overflow-hidden flex flex-col justify-end shadow-3xl">
             
             {/* Liquid Layer with Shimmer and Oscillation */}
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: '75%' }}
               animate={{ y: [0, -5, 0] }}
               transition={{ 
                 height: { duration: 1, ease: "circOut" },
                 y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
               }}
               className="absolute bottom-0 left-0 w-full bg-blue-500/40 backdrop-blur-sm group"
             >
                {/* Shimmer inside liquid */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-pulse" />
                
                {/* Tiny bubbles rising continuously */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [450, -50], opacity: [0, 0.6, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: i * 0.8 }}
                    className="absolute w-1 h-1 bg-white/50 rounded-full"
                    style={{ left: `${10 + Math.random() * 80}%` }}
                  />
                ))}
             </motion.div>
             
             {/* Ice Cubes with Gravity/Physics on Scroll */}
             {Array.from({ length: 8 }).map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ y: -800, opacity: 0, rotate: 0 }}
                 whileInView={{ y: 0, opacity: 1, rotate: 45 }}
                 viewport={{ once: false, amount: 0.1 }}
                 transition={{ 
                   type: "spring", 
                   stiffness: 150,
                   damping: 12,
                   delay: 0.5 + i * 0.1
                 }}
                 className="absolute bottom-[15%] w-14 h-14 bg-white/50 rounded-2xl shadow-inner border border-white/20 z-10 flex items-center justify-center backdrop-blur-md"
                 style={{ left: `${5 + i * 11}%`, marginBottom: `${(i % 3) * 20}px` }}
               >
                  <div className="w-10 h-10 border border-white/10 rounded-lg" />
               </motion.div>
             ))}

             {/* Splash Ripple on Impact */}
             <motion.div
               animate={{ scale: [0, 2], opacity: [0, 0.5, 0] }}
               transition={{ repeat: Infinity, duration: 2, delay: 1 }}
               className="absolute top-[25%] left-1/2 -translate-x-1/2 w-64 h-24 bg-blue-300/40 rounded-full blur-3xl z-0"
             />

             {/* Condensation Drops on the outside */}
             <div className="absolute inset-0 pointer-events-none z-50">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    animate={{ y: [0, 30] }}
                    transition={{ 
                      opacity: { delay: 1 + Math.random() * 2 },
                      y: { repeat: Infinity, duration: 4 + Math.random() * 6, ease: "linear" }
                    }}
                    className="absolute w-2 h-5 bg-white/20 rounded-full blur-[1px]"
                    style={{ 
                      top: `${Math.random() * 90}%`, 
                      left: `${Math.random() * 100}%`
                    }}
                  />
                ))}
             </div>
             
             {/* Shine / Reflection */}
             <div className="absolute top-0 left-4 w-4 h-full bg-white/10 blur-md rounded-full" />
             <div className="absolute top-0 right-10 w-8 h-full bg-white/5 blur-xl rounded-full" />
          </div>
        </div>
      </div>

      {/* Background glass glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

const Characters = () => {
  const crew = [
    { name: "PAW-CASSO", role: "CAT", icon: <Cat size={80} /> },
    { name: "BARK-LEY", role: "DOG", icon: <Dog size={80} /> },
    { name: "MEOW-ZART", role: "CAT", icon: <Cat size={80} /> },
    { name: "HUMAN #1", role: "STAFF", icon: <Star size={80} /> },
    { name: "CUPCAKE", role: "PET", icon: <Heart size={80} /> },
    { name: "BEAN", role: "CAT", icon: <Cat size={80} /> },
  ];

  return (
    <section className="bg-brand-beige py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-20 relative z-10">
        <div className="space-y-4">
          <h2 className="heading-huge">THIS IS OUR CREW.</h2>
          <p className="text-punchy text-brand-orange">WE SERVE FRIENDS, NOT CUSTOMERS.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {crew.map((char, i) => (
             <motion.div
               key={i}
               whileHover="hover"
               initial="initial"
               className="relative p-10 bg-white rounded-[3rem] border-4 border-brand-blue shadow-[15px_15px_0px_#0D1B8C] cursor-pointer overflow-hidden group"
             >
                <motion.div 
                  variants={{
                    hover: { y: -10, scale: 1.1, rotate: [0, -5, 5, 0] }
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-brand-orange mb-6 flex justify-center"
                >
                  {char.icon}
                </motion.div>
                
                <h3 className="font-display text-4xl mb-2">{char.name}</h3>
                <p className="text-xs font-bold tracking-widest opacity-40 uppercase">{char.role}</p>

                {/* Blink/Action Animation overlay */}
                <motion.div
                  variants={{
                    hover: { opacity: 1, y: 0, scale: 1 },
                    initial: { opacity: 0, y: 20, scale: 0.5 }
                  }}
                  className="absolute top-6 right-6 text-4xl"
                >
                   {i % 2 === 0 ? "👋" : "✨"}
                </motion.div>

                {/* Subtle Blink Animation for "eyes" (using dots) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                   <motion.div 
                     animate={{ scaleY: [1, 0.1, 1] }} 
                     transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2] }}
                     className="w-2 h-4 bg-brand-blue rounded-full" 
                   />
                   <motion.div 
                     animate={{ scaleY: [1, 0.1, 1] }} 
                     transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2] }}
                     className="w-2 h-4 bg-brand-blue rounded-full" 
                   />
                </div>
             </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="absolute top-10 left-10 rotate-12"><Cat size={150} /></div>
         <div className="absolute bottom-10 right-10 -rotate-12"><Dog size={150} /></div>
         <div className="absolute top-1/2 right-20"><Star size={100} /></div>
      </div>
    </section>
  );
};

const Menu = () => {
  const menuItems = [
    { name: "Cool Cat Latte", price: "$5.50" },
    { name: "Nitro Cold Brew", price: "$6.00" },
    { name: "The Big Meow Burger", price: "$12.00" },
    { name: "Purr-fect Pizza", price: "$14.00" },
    { name: "Catnip Shake", price: "$7.50" },
  ];

  return (
    <section className="bg-brand-beige text-brand-blue py-32 overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-16">
          <div className="relative">
            {/* The Clean Waving Hand Interaction - Layered Behind/Beside */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              animate={{ 
                rotate: [0, 12, -8, 12, 0],
                y: [0, -4, 0],
                scale: [1, 1.05, 1]
              }}
              whileHover={{ 
                scale: 1.15,
                transition: { duration: 0.7 }
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="absolute -right-8 md:-right-20 top-1/2 -translate-y-1/2 text-8xl md:text-[11rem] z-0 select-none opacity-30 md:opacity-90 pointer-events-none"
            >
              👋
              {/* Wave Lines (Motion Lines) */}
              <svg className="absolute -right-10 -top-10 w-24 h-24 pointer-events-none overflow-visible hidden md:block">
                 {[1, 2, 3].map((i) => (
                   <motion.path
                     key={i}
                     d={`M ${15 + i*4} 50 Q ${35 + i*4} 30 ${55 + i*4} 45`}
                     stroke="#0D1B8C"
                     strokeWidth="4"
                     strokeLinecap="round"
                     fill="none"
                     animate={{ opacity: [0, 0.4, 0] }}
                     transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                   />
                 ))}
              </svg>
            </motion.div>

            <h2 className="heading-huge font-black leading-[1.4] flex flex-col gap-4 md:gap-8 relative z-20 pointer-events-none tracking-normal">
              <span>HI</span>
              <span className="text-brand-orange">FRIEND</span>
            </h2>
          </div>
          
          <p className="text-punchy opacity-60 leading-relaxed max-w-xl relative z-10">
            HERE’S WHAT WE’VE GOT.
          </p>
          
          <div className="flex gap-6 mt-8 relative z-10">
             <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
               <ArrowRight size={32} />
             </div>
             <p className="text-sm md:text-base font-bold max-w-[240px] opacity-40 leading-relaxed">
               SCROLL DOWN TO SEE THE FULL LIST OF OUR CRAVINGS.
             </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ rotate: 10, y: 100, opacity: 0 }}
          whileInView={{ rotate: -2, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50 }}
          className="bg-white p-10 md:p-14 rounded-[2rem] shadow-[30px_30px_0px_#0D1B8C10] border-2 border-brand-blue/5 space-y-10 relative"
        >
          {/* Paper texture/corner effect */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-brand-beige rounded-bl-3xl shadow-inner" />
          
          <div className="space-y-2">
            <h3 className="text-5xl font-display text-brand-orange">OUR SPECIALS</h3>
            <p className="text-[10px] font-bold tracking-widest opacity-30 uppercase">Freshly brewed & baked daily</p>
          </div>

          <div className="space-y-6">
            {menuItems.map((item, i) => (
              <div key={i} className="flex justify-between items-baseline group cursor-pointer border-b-2 border-brand-blue/5 pb-4">
                <div className="flex flex-col">
                  <span className="text-xl font-bold group-hover:text-brand-orange transition-colors">{item.name}</span>
                  <span className="text-[10px] opacity-40 font-bold uppercase">Signature Item</span>
                </div>
                <span className="font-display text-3xl text-brand-blue/40 group-hover:text-brand-blue transition-colors">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-between items-center opacity-20">
            <Cat size={24} />
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-brand-blue rounded-full" />
              <div className="w-2 h-2 bg-brand-blue rounded-full" />
              <div className="w-2 h-2 bg-brand-blue rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="bg-brand-blue text-brand-beige">
      <div className="text-center space-y-12 z-10">
        <h2 className="heading-huge">YOU’VE SCROLLED THIS FAR...</h2>
        <p className="text-punchy opacity-80">NOW COME TASTE IT.</p>
        
        <motion.button 
          animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(255,122,0,0)", "0 0 20px rgba(255,122,0,0.5)", "0 0 0px rgba(255,122,0,0)"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-brand-orange text-white px-12 py-6 rounded-full font-display text-4xl tracking-widest hover:scale-110 transition-transform shadow-2xl"
        >
          VISIT US NOW
        </motion.button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40">
        <Cat size={60} />
        <p className="text-xs font-bold tracking-widest mt-2 uppercase">See you soon!</p>
      </div>
    </section>
  );
};

const Grain = () => (
  <div className="grain-overlay pointer-events-none" />
);

// --- Main App ---

export default function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Refresh ScrollTrigger once everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative selection:bg-brand-orange selection:text-white">
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      
      <main id="smooth-wrapper">
        <div id="smooth-content">
          <Hero />
          <IntroVibe />
          <ChaoticFun />
          <Shakes />
          <Burger />
          <Pizza />
          <Sandwich />
          <Drinks />
          <Characters />
          <Menu />
          <FinalCTA />
        </div>
      </main>

      {/* Footer-like small info */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-4 text-brand-blue/40 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
        <MapPin size={12} /> KOCHI, KERALA
        <div className="w-1 h-1 bg-brand-blue/20 rounded-full" />
        EST. 2024
      </div>
      
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 text-brand-blue/40 font-bold text-[10px] tracking-widest uppercase pointer-events-none">
        COOL CAT'S CAFE © 2026
      </div>
    </div>
  );
}
