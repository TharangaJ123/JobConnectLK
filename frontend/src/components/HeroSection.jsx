import React from "react";
import { motion } from "framer-motion";
import { Search, Bot, Target, FileText } from 'lucide-react';

const featureTags = [
  { label: "Job Marketplace", icon: <Search size={20} />, top: "15%", left: "70%" },
  { label: "AI Guidance", icon: <Bot size={20} />, top: "35%", left: "88%" },
  { label: "Skill Gap Analysis", icon: <Target size={20} />, top: "60%", left: "88%" },
  { label: "Smart Resume Builder", icon: <FileText size={20} />, top: "80%", left: "75%" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen h-screen flex flex-col justify-between bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-14 relative z-10">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 max-w-xl text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight tracking-tight drop-shadow-xl">
            Let’s Connect Sri Lanka’s Youth<br />
            <span className="text-blue-500 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">To Jobs & Opportunities</span>
          </h1>
          <p className="text-lg md:text-2xl text-blue-700 font-medium mb-10 max-w-lg leading-relaxed">
            A mobile-first platform for job seekers, employers, and educators. AI-powered career guidance, skill gap analysis, and more.
          </p>
          <div className="flex gap-4 mb-8">
            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.98 }}
              href="#features"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-base md:text-lg"
            >
              Get Started
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-block border-2 border-blue-500 text-blue-600 font-semibold px-8 py-3 rounded-full shadow-md bg-white hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 transition text-base md:text-lg"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
        {/* Right: Image + Feature Tags */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex items-center justify-center mt-12 md:mt-0 relative min-h-[340px]"
        >
          {/* Soft Blue Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-200/40 blur-3xl rounded-full z-0" style={{ filter: 'blur(32px)' }} />
          {/* Image and tags wrapper */}
          <div className="relative w-auto md:w-[34rem] h-96 md:h-[34rem] flex items-center justify-center">
            
            {/* Floating Feature Tags on image */}
            {featureTags.map((tag, i) => (
              <motion.div
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.04, boxShadow: "0 4px 24px 0 rgba(59,130,246,0.10)" }}
                className="absolute flex items-center px-4 py-2 bg-white rounded-full shadow-xl text-black font-semibold text-base whitespace-nowrap min-w-[8rem] min-h-[2.5rem]"
                style={{
                  top: tag.top,
                  left: tag.left,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="absolute -top-3 -left-2 flex items-center justify-center w-10 h-10 rounded-full bg-sky-600 text-lg text-white shadow border-2 border-white z-10">
                  {tag.icon}
                </span>
                <span className="font-semibold text-black text-base leading-none pl-6">{tag.label}</span>
              </motion.div>
            ))}

            <img
              src="/emp.png"
              alt="AI Career Guidance"
              className="w-full h-full object-contain drop-shadow-2xl relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 