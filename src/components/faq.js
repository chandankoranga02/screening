import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What is the duration and format of the program?",
    answer: "The program spans 24 weeks of intensive, project-based learning. It is delivered through a hybrid model, featuring live interactive sessions on weekends and self-paced, high-quality video modules during the week.",
    icon: "⏱️"
  },
  {
    question: "Do I need prior coding experience in Python or R?",
    answer: "While basic programming knowledge is helpful, it is not strictly required. The curriculum begins with a comprehensive foundations module that brings everyone up to speed on Python, R, and essential mathematical concepts before diving into advanced data models.",
    icon: "💻"
  },
  {
    question: "How is this program different from a typical Data Science bootcamp?",
    answer: "Unlike standard bootcamps that focus solely on generic machine learning algorithms, our program is specifically tailored for rigorous Quantitative Research. We emphasize statistical validity, causal inference, and real-world econometric applications alongside modern AI tools.",
    icon: "🚀"
  },
  {
    question: "What kind of projects will I build during the course?",
    answer: "You will build a diverse portfolio of industry-grade projects. This includes developing predictive pricing models, conducting large-scale A/B testing analysis, building spatial computing data structures, and deploying your own end-to-end data pipelines.",
    icon: "📊"
  },
  {
    question: "Is there career support or placement assistance after completion?",
    answer: "Yes! We provide extensive career support including 1-on-1 resume reviews, mock technical interviews with industry veterans, and direct referrals to our network of hiring partners in quantitative finance and tech sectors.",
    icon: "🤝"
  }
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#040816] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden font-sans min-h-screen">
      
      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Animated Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
            Frequently Asked <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Questions
            </span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Everything you need to know about the Quantitative Research & Data Science Program.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full mt-8 shadow-[0_0_15px_rgba(192,38,211,0.5)]"></div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4 md:space-y-6">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                key={index}
                className={`relative group rounded-3xl overflow-hidden transition-all duration-500 ${isActive ? 'bg-[#0a0f1e]/90 shadow-[0_0_40px_rgba(192,38,211,0.15)] border-purple-500/30' : 'bg-[#0a0f1e]/40 hover:bg-[#0a0f1e]/60 border-white/5'} border backdrop-blur-md`}
              >
                
                {/* Clickable Header */}
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`text-2xl md:text-3xl transition-transform duration-500 ${isActive ? 'scale-110' : 'grayscale'}`}>
                      {faq.icon}
                    </div>
                    <h3 className={`text-lg md:text-xl font-medium transition-colors duration-300 pr-4 ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Animated Chevron / Plus-Minus Icon */}
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? 'bg-purple-500/20 border-purple-500/50 text-purple-400 rotate-180' : 'bg-white/5 border-white/10 text-zinc-400 group-hover:bg-white/10'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                {/* Animated Dropdown Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0 text-zinc-400 text-base md:text-lg leading-relaxed font-light pl-[88px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}
