import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const enrollData = [
  {
    title: "Data Analysts & Research Professionals",
    description: "Seeking to strengthen quantitative skills for evidence-based analysis, forecasting, and impact evaluation.",
    icon: "📊",
    iconBg: "bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.2),inset_0_1px_2px_rgba(255,255,255,0.2)]"
  },
  {
    title: "Graduate Students",
    description: "Aspiring to careers in public policy, governance, or advanced data analytics.",
    icon: "🎓",
    iconBg: "bg-gradient-to-br from-purple-400/20 to-fuchsia-500/20 text-purple-300 border border-purple-400/30 shadow-[0_0_30px_rgba(168,85,247,0.2),inset_0_1px_2px_rgba(255,255,255,0.2)]"
  },
  {
    title: "Researchers & Practitioners",
    description: "Development practitioners working with public datasets and social impact metrics.",
    icon: "🔍",
    iconBg: "bg-gradient-to-br from-blue-400/20 to-indigo-500/20 text-blue-300 border border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.2),inset_0_1px_2px_rgba(255,255,255,0.2)]"
  },
  {
    title: "Social Entrepreneurs",
    description: "Innovators designing data-driven interventions for social good.",
    icon: "💡",
    iconBg: "bg-gradient-to-br from-emerald-400/20 to-teal-500/20 text-emerald-300 border border-emerald-400/30 shadow-[0_0_30px_rgba(16,185,129,0.2),inset_0_1px_2px_rgba(255,255,255,0.2)]"
  }
];

export default function WhoShouldEnroll() {
  const containerRef = useRef(null);
  
  // Track scroll progress within the container for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress into height percentage for the line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="py-20 md:py-32 px-6 md:px-12 relative overflow-hidden font-sans min-h-screen">

      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-900/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Heading Section */}
      <div className="max-w-6xl mx-auto text-center mb-16 md:mb-24 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black text-white mb-2 tracking-tighter drop-shadow-lg">
          Who Should <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 ml-3 md:ml-0">
            Enroll?
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mt-6 shadow-[0_0_15px_rgba(251,146,60,0.5)]"></div>
      </div>

      {/* Timeline Section */}
      <div ref={containerRef} className="max-w-5xl mx-auto relative z-10 pb-20">
        
        {/* Background Dark Line */}
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full hidden md:block"></div>
        <div className="absolute left-[30px] top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full md:hidden"></div>
        
        {/* Animated Fill Line */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-[30px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-600 -translate-x-1/2 rounded-full origin-top z-10 hidden md:block shadow-[0_0_15px_rgba(251,146,60,0.8)]"
        ></motion.div>
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-[30px] top-0 w-[2px] bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-600 -translate-x-1/2 rounded-full origin-top z-10 md:hidden shadow-[0_0_15px_rgba(251,146,60,0.8)]"
        ></motion.div>

        {/* Glowing Head (Fire Effect) that moves with the line */}
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-[30px] md:left-1/2 w-3 h-6 bg-orange-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block blur-[3px] shadow-[0_0_20px_8px_rgba(249,115,22,0.9)]"
        ></motion.div>
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-[30px] md:left-1/2 w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2 z-30 hidden md:block shadow-[0_0_8px_2px_rgba(253,224,71,1)]"
        ></motion.div>
        
        {/* Mobile Head */}
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-[30px] w-3 h-6 bg-orange-400 rounded-full -translate-x-1/2 -translate-y-1/2 z-20 md:hidden blur-[3px] shadow-[0_0_20px_8px_rgba(249,115,22,0.9)]"
        ></motion.div>
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-[30px] w-1.5 h-1.5 bg-yellow-200 rounded-full -translate-x-1/2 -translate-y-1/2 z-30 md:hidden shadow-[0_0_8px_2px_rgba(253,224,71,1)]"
        ></motion.div>

        {/* Timeline Items */}
        <div className="flex flex-col gap-16 md:gap-24 relative z-20">
          {enrollData.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                     {/* Node on the line */}
                <motion.div 
                  initial={{ borderColor: "#22d3ee", backgroundColor: "#040816", scale: 1, boxShadow: "0 0 15px rgba(34,211,238,0.8)" }}
                  whileInView={{ borderColor: "#f97316", backgroundColor: "#facc15", scale: 1.5, boxShadow: "0 0 30px rgba(249,115,22,1)" }}
                  viewport={{ once: false, margin: "-48% 0px -48% 0px" }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[30px] md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 z-30 hidden md:block border-[3px]"
                ></motion.div>
                <motion.div 
                  initial={{ borderColor: "#22d3ee", backgroundColor: "#040816", scale: 1, boxShadow: "0 0 15px rgba(34,211,238,0.8)" }}
                  whileInView={{ borderColor: "#f97316", backgroundColor: "#facc15", scale: 1.5, boxShadow: "0 0 30px rgba(249,115,22,1)" }}
                  viewport={{ once: false, margin: "-48% 0px -48% 0px" }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[30px] w-5 h-5 rounded-full -translate-x-1/2 z-30 md:hidden border-[3px]"
                ></motion.div>

                {/* Card Container (Slides in once) */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full pl-[70px] md:pl-0 md:w-1/2 flex ${isLeft ? 'md:justify-end md:pr-12 lg:pr-24' : 'md:justify-start md:pl-12 lg:pl-24'}`}
                >
                  {/* Inner Card (Scales and highlights when touched by fire in the center) */}
                  <motion.div 
                    initial={{ opacity: 0.4, scale: 0.9, filter: "grayscale(60%)" }}
                    whileInView={{ opacity: 1, scale: 1.05, filter: "grayscale(0%)" }}
                    viewport={{ once: false, margin: "-48% 0px -48% 0px" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="relative group cursor-pointer w-full max-w-[560px]"
                  >
                    
                    {/* Hover Glow Effect Behind Card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Main Card Element */}
                    <div className="relative bg-[#0a0f1e]/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-[#0c1325]/90 transition-all duration-500 flex flex-col sm:flex-row gap-6 items-start">
                      
                      {/* Icon */}
                      <div className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${item.iconBg}`}>
                        {item.icon}
                      </div>

                      {/* Content */}
                      <div className="pt-2">
                        <h3 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-3 md:mb-4 leading-tight tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light group-hover:text-zinc-300 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
