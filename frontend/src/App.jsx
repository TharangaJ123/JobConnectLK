import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import JobMarketplace from "./components/JobMarketplace";
import ResumeBuilder from "./components/ResumeBuilder";
import SkillGapAnalyzer from "./components/SkillGapAnalyzer";
import CareerChatbot from "./components/CareerChatbot";
import TrainingPrograms from "./components/TrainingPrograms";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import EmployerLogin from "./components/EmployerLogin";
import EmployerSignup from "./components/EmployerSignup";
import EmployerDashboard from "./components/EmployerDashboard";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobMarketplace />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/skills" element={<SkillGapAnalyzer />} />
        <Route path="/chatbot" element={<CareerChatbot />} />
        <Route path="/training" element={<TrainingPrograms />} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/signup" element={<EmployerSignup />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
