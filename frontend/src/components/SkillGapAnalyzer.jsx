import React, { useState } from "react";
import { UploadCloud, ChevronDown, ChevronUp, FileText, Briefcase, Target, TrendingUp, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

export default function SkillGapAnalyzer() {
  const [cvFile, setCvFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({ matched: true, missing: true, suggestions: true });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
    setResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!cvFile || !jobDescription) {
      setError("Please upload your CV and paste the job description.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);
      formData.append("job_description", jobDescription);
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // Parse the raw output containing JSON in markdown code blocks
      const rawOutput = data.raw_output || data;
      const jsonString = rawOutput.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(jsonString);

      setResult(parsedData);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.08),transparent_50%)] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-start py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Target className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Skill Gap Analyzer
            </h1>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Leverage AI-powered analysis to identify skill gaps and receive personalized recommendations for your career advancement
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-6xl mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Use flex and min-h-full to ensure equal height */}
            {/* CV Upload Card */}
            <div className="group flex flex-col min-h-full">
              <div className="flex flex-col flex-1 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 overflow-hidden min-h-full">
                <div className="p-8 flex flex-col flex-1 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Upload Your CV</h3>
                      <p className="text-sm text-slate-500">PDF, DOCX, or TXT format</p>
                    </div>
                  </div>
                  <div className="relative flex-1 flex flex-col justify-center">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.txt" 
                      className="hidden" 
                      id="cv-upload" 
                      onChange={handleFileChange} 
                    />
                    <label 
                      htmlFor="cv-upload" 
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer bg-slate-50/50 group-hover:bg-blue-50/50"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                          <UploadCloud size={32} className="text-blue-600" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-slate-700">
                            {cvFile ? cvFile.name : "Drop your CV here or click to browse"}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            {cvFile ? "File selected" : "Maximum file size: 10MB"}
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* Job Description Card */}
            <div className="group flex flex-col min-h-full">
              <div className="flex flex-col flex-1 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 overflow-hidden min-h-full">
                <div className="p-8 flex flex-col flex-1 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Briefcase className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Job Description</h3>
                      <p className="text-sm text-slate-500">Paste the complete job posting</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
          <textarea
                      rows={8}
                      className="w-full h-full rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                      placeholder="Paste the job description here including requirements, responsibilities, and qualifications..."
                      value={jobDescription}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mb-12">
          <button
            className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg tracking-wide disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            onClick={handleAnalyze}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <TrendingUp size={20} />
              {loading ? "Analyzing..." : "Analyze Skill Gap"}
            </div>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-4xl mb-8">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={24} />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="w-full max-w-6xl">
          {loading && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-12 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                    <Target className="text-white" size={32} />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing Your Profile</h3>
                  <p className="text-slate-600">Our AI is comparing your CV with the job requirements...</p>
                </div>
              </div>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-8">
              {/* Matched Skills Section */}
              {result.matched && (
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-green-50/50 transition-all duration-200"
                    onClick={() => toggleSection('matched')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <CheckCircle className="text-green-600" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-slate-800">Matched Qualifications</h3>
                        <p className="text-sm text-slate-500">Skills that align with the job requirements</p>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                          {result.matched.length}
                        </span>
                        {openSections.matched ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections.matched ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-3">
                        {result.matched.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 rounded-xl text-sm font-medium border border-green-200 hover:shadow-md transition-all duration-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Missing Skills Section */}
              {result.missing && (
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-amber-50/50 transition-all duration-200"
                    onClick={() => toggleSection('missing')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-xl">
                        <AlertCircle className="text-amber-600" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-slate-800">Missing Qualifications</h3>
                        <p className="text-sm text-slate-500">Skills that could strengthen your application</p>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">
                          {result.missing.length}
                        </span>
                        {openSections.missing ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections.missing ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-3">
                        {result.missing.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 rounded-xl text-sm font-medium border border-amber-200 hover:shadow-md transition-all duration-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions Section */}
              {result.suggestions && (
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-blue-50/50 transition-all duration-200"
                    onClick={() => toggleSection('suggestions')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Lightbulb className="text-blue-600" size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-slate-800">Improvement Suggestions</h3>
                        <p className="text-sm text-slate-500">Actionable recommendations for your CV</p>
                      </div>
                      <div className="ml-auto flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                          {result.suggestions.length}
                        </span>
                        {openSections.suggestions ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                      </div>
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections.suggestions ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                      <div className="flex flex-wrap gap-3">
                        {result.suggestions.map((item, idx) => (
                          <span key={idx} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-xl text-sm font-medium border border-blue-200 hover:shadow-md transition-all duration-200">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Raw Output Section */}
              {result.raw_output && (
                <div className="bg-slate-50/70 backdrop-blur-sm rounded-3xl shadow-lg border border-slate-200/50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-slate-200 rounded-xl">
                        <span className="text-slate-600 text-lg">🤖</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">AI Analysis Output</h3>
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-4 overflow-x-auto">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap">{result.raw_output}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !result && !error && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-16 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-slate-100 rounded-2xl">
                  <Target className="text-slate-400" size={48} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Ready to Analyze</h3>
                  <p className="text-slate-600 max-w-md">
                    Upload your CV and paste the job description to get started with your personalized skill gap analysis
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 