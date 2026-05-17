import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicExperience() {
  const sequenceRef = useRef(null);
  const canvasRef = useRef(null);
  const frameCount = 240;
  const images = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // Overall scroll progress for the 500vh sequence container
  const { scrollYProgress: sequenceProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  /*
    ==========================================
    HERO ANIMATIONS (0% to 5%)
    ==========================================
  */
  // Hero completely disappears quickly so it doesn't overlap the frames motion
  const heroOpacity = useTransform(sequenceProgress, [0, 0.05], [1, 0]);
  const heroY = useTransform(sequenceProgress, [0, 0.05], [0, -100]);
  const heroScale = useTransform(sequenceProgress, [0, 0.05], [1, 0.95]);
  const heroDisplay = useTransform(sequenceProgress, (val) => val > 0.05 ? "none" : "flex");

  /*
    ==========================================
    ROBOT CANVAS ANIMATIONS (5% to 100%)
    ==========================================
  */
  // Canvas fades in strictly AFTER the hero fades out (starting at 5%)
  const canvasOpacity = useTransform(sequenceProgress, [0.05, 0.1], [0, 1]);
  const canvasDisplay = useTransform(sequenceProgress, (val) => val < 0.04 ? "none" : "block");
  
  // Animation frames mapped from 5% to 100% of the sequence
  const currentFrame = useTransform(sequenceProgress, [0.05, 1], [0, frameCount - 1]);

  /*
    ==========================================
    LEFT SIDE MOTION TEXT ANIMATIONS
    ==========================================
  */
  // Text 1 (10% to 35%)
  const text1Opacity = useTransform(sequenceProgress, [0.1, 0.15, 0.3, 0.35], [0, 1, 1, 0]);
  const text1Y = useTransform(sequenceProgress, [0.1, 0.35], [30, -30]);

  // Text 2 (35% to 65%)
  const text2Opacity = useTransform(sequenceProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const text2Y = useTransform(sequenceProgress, [0.35, 0.65], [30, -30]);

  // Text 3 (65% to 95%)
  const text3Opacity = useTransform(sequenceProgress, [0.65, 0.7, 0.9, 0.95], [0, 1, 1, 0]);
  const text3Y = useTransform(sequenceProgress, [0.65, 0.95], [30, -30]);

  /*
    ==========================================
    LOAD FRAMES
    ==========================================
  */
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === frameCount) {
        setLoaded(true);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const fileName = String(i).padStart(3, "0");
      img.src = `/frames/ezgif-frame-${fileName}.jpg`;

      img.onload = handleLoad;

      img.onerror = () => {
        console.error("Failed to load frame:", `/frames/ezgif-frame-${fileName}.jpg`);
      };

      loadedImages.push(img);
    }
    images.current = loadedImages;
  }, []);

  /*
    ==========================================
    DRAW FRAMES
    ==========================================
  */
  useEffect(() => {
    if (!loaded) return;

    const unsubscribe = currentFrame.on("change", (latest) => {
      const frameIndex = Math.floor(latest);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      const img = images.current[frameIndex];
      if (!img || !context) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Make the image cover the entire canvas (fullscreen)
      const scale = Math.max(
         canvas.width / img.width,
         canvas.height / img.height
      );

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      // Center the image
      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      context.drawImage(img, x, y, newWidth, newHeight);
    });

    return () => unsubscribe();
  }, [loaded, currentFrame]);

  return (
    <div className="relative">
      {/* 
        SEQUENCE 1: HERO & ROBOT CANVAS (Sticky Scroll)
      */}
      <div ref={sequenceRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* BACKGROUND GLOW FOR WHOLE SECTION */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-[900px] h-[900px] bg-purple-600/20 rounded-full blur-[220px]" />
          </div>

          {/* HERO SECTION */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroY,
              scale: heroScale,
              display: heroDisplay
            }}
            className="absolute inset-0 z-20 flex-col items-center justify-center text-center px-6 pointer-events-none"
          >
            <div className="relative mt-[20vh]">
              {/* GLOW AROUND LOGO */}
              <div className="absolute inset-0 bg-purple-500/20 blur-[120px] rounded-full scale-125" />

              <motion.img
                src="https://iisppr.in/webimg/logo-removebg-preview_06272023080455.png"
                alt="IISPPR Logo"
                draggable="false"
                className="relative mx-auto w-[260px] md:w-[420px] lg:w-[520px] object-contain drop-shadow-[0_0_70px_rgba(139,92,246,0.45)] select-none"
                animate={{
                  rotateY: [0, 360],
                  y: [0, -12, 0],
                }}
                transition={{
                  rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>

            <div className="translate-y-10">
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] max-w-6xl drop-shadow-2xl mx-auto">
                International Institute of
                <br />
                SDGS & Public Policy
                <br />
                Research
              </h1>

              <p className="mt-8 text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Building the future of innovation, AI learning, sustainability,
                leadership, and public policy research.
              </p>
            </div>
          </motion.div>

          {/* LEFT SIDE TEXT ANIMATIONS (Overlay on top of frames) */}
          <div className="absolute top-0 left-0 w-full md:w-[45%] h-full flex flex-col justify-end pb-[15vh] md:pb-0 md:justify-center items-center md:items-start p-6 md:p-8 md:pl-24 z-20 pointer-events-none text-center md:text-left">
            
            <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute flex flex-col items-center md:items-start w-full px-6 md:px-0">
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                Advanced<br className="hidden md:block" /> Robotics<br className="hidden md:block" /> Integration
              </h3>
              <p className="text-zinc-300 text-lg md:text-xl lg:text-2xl max-w-md leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] font-light">
                Exploring the frontiers of AI-driven automation and seamless human-machine synergy.
              </p>
            </motion.div>

            <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute flex flex-col items-center md:items-start w-full px-6 md:px-0">
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-cyan-400 mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                Holographic<br className="hidden md:block" /> Interfaces
              </h3>
              <p className="text-zinc-300 text-lg md:text-xl lg:text-2xl max-w-md leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] font-light">
                Interact with multidimensional data models designed for the next era of spatial computing.
              </p>
            </motion.div>

            <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute flex flex-col items-center md:items-start w-full px-6 md:px-0">
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-purple-400 mb-4 md:mb-6 leading-[1.1] md:leading-[0.9] tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                Future of<br className="hidden md:block" /> Learning
              </h3>
              <p className="text-zinc-300 text-lg md:text-xl lg:text-2xl max-w-md leading-relaxed drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] font-light">
                Immersive environments built for rapid skill acquisition and strategic foresight.
              </p>
            </motion.div>

          </div>

          {/* ROBOT CANVAS & GLOW OVERLAYS */}
          {loaded && (
            <>
              {/* THE CANVAS */}
              <motion.canvas
                ref={canvasRef}
                style={{ 
                  opacity: canvasOpacity, 
                  display: canvasDisplay,
                  filter: "brightness(1.1) contrast(1.1)"
                }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              />
              
              {/* SHADOW / FADE EFFECT (Mobile: Bottom up | Desktop: Left right) */}
              <motion.div 
                style={{ opacity: canvasOpacity, display: canvasDisplay }}
                className="absolute z-[12] pointer-events-none bg-gradient-to-t md:bg-gradient-to-r from-[#040816] via-[#040816]/60 to-transparent w-full h-full bottom-0 md:top-0" 
              />
              
              {/* BOTTOM FADE FOR SMOOTH TRANSITION TO NEXT SECTION */}
              <motion.div 
                style={{ opacity: canvasOpacity, display: canvasDisplay }}
                className="absolute bottom-0 left-0 right-0 h-[20vh] md:h-[30vh] z-[12] pointer-events-none bg-gradient-to-t from-[#040816] via-[#040816]/70 to-transparent" 
              />

              {/* THEME COLOR BLEND OVERLAY */}
              <motion.div 
                style={{ opacity: canvasOpacity, display: canvasDisplay }}
                className="absolute inset-0 z-[12] pointer-events-none bg-[#040816]/30 mix-blend-multiply" 
              />
            </>
          )}
        </div>
      </div>

      {/* 
        SEQUENCE 2: FINAL REVEAL TEXT & BUTTON (Normal Flow, Below Frames)
      */}
      <div className="relative min-h-[50vh] flex flex-col items-center justify-center gap-8 pb-10 pt-10 px-6 -mt-20 md:-mt-32 z-20">
        
        {/* TORCH GLOW FROM BELOW (Light Yellow/Orange) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full md:w-[700px] h-[400px] bg-yellow-500/10 rounded-[100%] blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[200px] bg-orange-400/10 rounded-[100%] blur-[80px] pointer-events-none z-0" />

        {/* FINAL REVEAL TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] z-10"
        >
          <h2 className="text-white text-4xl md:text-6xl lg:text-8xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter">
            Quantitative Research
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              & Data Science Program
            </span>
          </h2>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <button className="relative group px-10 md:px-12 py-4 md:py-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-lg md:text-xl font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] cursor-pointer">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl transition-opacity duration-500" />
            
            <span className="relative flex items-center gap-3">
              Enroll Now 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
