import React from "react";
import HeroSection from "./HeroSection";
import { motion } from "framer-motion";

const features = [
  {
    img: "/features/job-market.png",
    title: "Job Marketplace",
    desc: "Explore thousands of local and international job opportunities across sectors like IT, healthcare, engineering, hospitality, and more. Easily filter jobs by location, skill level, or salary range. Whether you're looking for your first job or a career change, we've got something for everyone — from Colombo to the Middle East.",
    link: "/jobs",
  },
  {
    img: "/features/chatbot.png",
    title: "Career Guidance Chatbot",
    desc: "Confused about your career path? Ask our smart chatbot — available in Sinhala, Tamil, and English. Whether you need help writing a CV, choosing a career, or finding the right job, it gives friendly, reliable, and local-language support — anytime, anywhere.",
    link: "/chatbot",
  },
  {
    img: "/features/resume.png",
    title: "Smart Resume Builder",
    desc: "Build a professional CV in minutes, even with no prior experience. Our AI-powered builder guides you step by step — helping you highlight your education, experience, and skills. Choose from modern templates that impress employers and export your resume anytime, even offline.",
    link: "/resume",
  },
  {
    img: "/features/promotion.png",
    title: "Skill Gap Analyzer",
    desc: "Not sure if you're ready for a job? Upload your CV and job link — our AI compares both to find missing skills and gives you personalized tips. Instantly discover what to improve and follow a guided path to close those gaps with relevant learning resources.",
    link: "/skills",
  },
  {
    img: "/features/motivation.png",
    title: "Training Programs",
    desc: "Upskill with trusted learning partners! Get access to both free and paid online/offline courses from leading platforms and local institutions. Learn in-demand skills like software development, digital marketing, English, business, and more — right from your phone.",
    link: "/training",
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, type: "spring", stiffness: 80 },
  }),
};

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const CurvyUnderline = ({ color = "#2563eb" }) => (
  <motion.svg
    viewBox="0 0 180 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-1/2 -translate-x-1/2 bottom-[-0.5em] w-40 h-5 z-0"
    initial={{ pathLength: 0 }}
    whileInView={{ pathLength: 1 }}
    transition={{ duration: 1.1, ease: "easeInOut" }}
    viewport={{ once: true, amount: 0.7 }}
  >
    <motion.path
      d="M3 10 Q 30 2, 60 10 T 120 10 Q 150 18, 177 7"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeroSection />
      {/* About Us Section */}
      <motion.section
        id="about"
        className="w-full bg-gradient-to-br from-blue-50 to-white py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
      >
        <div className="max-w-5xl mx-auto px-4 flex flex-col gap-10 items-center">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            About <span className="text-blue-600">JobConnectLK</span>
            <CurvyUnderline color="#2563eb" />
          </motion.h2>
          <p className="text-blue-700 text-lg md:text-xl text-center max-w-2xl mb-8">
            Our mission is to empower Sri Lanka’s youth and workforce by connecting them to jobs, skills, and opportunities—no matter where they live. We believe in equal access, digital innovation, and the power of community to transform lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {["🌍", "🤝", "🚀"].map((icon, idx) => (
              <motion.div
                key={icon}
                whileHover={{ scale: 1.04, y: -4, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)" }}
                className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center border border-blue-100 transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-3">
                  <span className="text-3xl text-blue-600">{icon}</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-1">
                  {idx === 0 ? "Nationwide Impact" : idx === 1 ? "Community & Partners" : "Innovation & Access"}
                </h3>
                <p className="text-blue-600 text-center text-sm">
                  {idx === 0
                    ? "Serving youth and job seekers in every province, from rural villages to major cities."
                    : idx === 1
                    ? "Partnered with educators, employers, and NGOs to create real opportunities and support."
                    : "Mobile-first, AI-powered, and always evolving to meet the needs of Sri Lanka’s future."}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#contact" className="inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:bg-blue-800 transition text-base md:text-lg">Contact Us</a>
          </div>
        </div>
      </motion.section>
      {/* Features Section */}
      <motion.section
        id="features"
        className="w-full py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-12 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Discover What You Can Do With <span className="text-blue-600">JobConnectLK</span>
            <CurvyUnderline color="#2563eb" />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                whileHover={{ scale: 1.03, y: -3, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)" }}
                className="flex items-start gap-10 p-10 bg-white rounded-2xl shadow-md border border-blue-100 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center shadow-sm">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-black text-sm md:text-base mb-3">
                    {feature.desc}
                  </p>
                  <a href={feature.link} className="text-blue-600 font-semibold hover:underline flex items-center gap-1 group transition w-fit">
                    Explore now <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Benefits Section */}
      <motion.section
        id="benefits"
        className="w-full py-16 bg-gradient-to-br from-blue-50 to-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10 items-center">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Why Choose <span className="text-blue-600">JobConnectLK?</span>
            <CurvyUnderline color="#2563eb" />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
            {[{icon:"⚡",title:"Fast & Easy",desc:"Find jobs, build your CV, and get guidance in just a few clicks—no hassle, no confusion."},{icon:"🔒",title:"Secure & Private",desc:"Your data is protected with industry-standard security. You control your information at all times."},{icon:"🌐",title:"Accessible Anywhere",desc:"Mobile-first design and offline support mean you can use JobConnectLK from any device, anywhere in Sri Lanka."}].map((b, idx) => (
              <motion.div
                key={b.title}
                whileHover={{ scale: 1.05, y: -4, boxShadow: "0 8px 32px 0 rgba(59,130,246,0.10)" }}
                className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center border border-blue-100 transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 mb-3">
                  <span className="text-3xl text-blue-600">{b.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-1">{b.title}</h3>
                <p className="text-blue-600 text-center text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
} 