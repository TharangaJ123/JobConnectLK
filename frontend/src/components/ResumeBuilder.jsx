import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Download, 
  Eye, 
  Plus, 
  Trash2,
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  Paintbrush
} from "lucide-react";
import html2pdf from 'html2pdf.js';

// --- A4 Resume Preview Component ---
function A4ResumePreview({ data, showProgramming, showProjects, bgColor, fontFamily }) {
  // Inline styles for A4 size
  return (
    <div className="bg-white shadow-xl mx-auto my-8" style={{ width: '210mm', height: '297mm', padding: '32px', fontFamily: fontFamily || 'Inter, Arial, sans-serif', fontSize: '13px', color: '#222', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: bgColor || '#fff' }}>
      <div className="flex w-full h-full" style={{ flex: 1 }}>
        {/* Left Column */}
        <div className="w-2/3 pr-8 border-r border-gray-200 flex flex-col" style={{height: '100%'}}>
          {/* Name & Title */}
          <div className="mb-6" style={{minHeight: '60px'}}>
            <h1 className="text-3xl font-bold tracking-wide uppercase" style={{ letterSpacing: '2px' }}>{data.personal.fullName || 'YOUR NAME'}</h1>
            <div className="text-blue-700 font-medium text-lg tracking-widest mb-2 uppercase">{data.personal.title || 'PROFESSIONAL TITLE'}</div>
          </div>
          {/* Profile */}
          <div className="mb-6" style={{minHeight: '70px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">PROFILE</div>
            <div className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{data.personal.summary || 'Write a short professional summary here.'}</div>
          </div>
          {/* Work Experience */}
          <div className="mb-6 flex-1" style={{minHeight: '220px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">WORK EXPERIENCE</div>
            {data.experience.length === 0 ? (
              <div className="text-gray-400 text-xs">No experience added yet.</div>
            ) : (
              data.experience.map((exp, idx) => (
                <div key={exp.id || idx} className="mb-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <span>{exp.startDate ? exp.startDate : '----'} - {exp.endDate ? exp.endDate : 'Present'}</span>
                    <span className="mx-1">•</span>
                    <span className="uppercase tracking-wide">{exp.company}</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900 mt-1 mb-1">{exp.title}</div>
                  <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
                    {(exp.points || []).length === 0 ? <li className="text-gray-400">No points added.</li> : exp.points.map((point, i) => <li key={i} style={{ whiteSpace: 'pre-line' }}>{point}</li>)}
                  </ul>
                </div>
              ))
            )}
          </div>
          {/* Projects (optional, IT only) */}
          {showProjects && (
            <div className="mb-6" style={{minHeight: '80px'}}>
              <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">PROJECTS</div>
              {(!data.projects || data.projects.length === 0) ? (
                <div className="text-gray-400 text-xs">No projects added yet.</div>
              ) : (
                data.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="mb-2">
                    <div className="font-semibold text-xs text-blue-800">{proj.title}</div>
                    <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
                      {(proj.points || []).length === 0 ? <li className="text-gray-400">No points added.</li> : proj.points.map((point, i) => <li key={i} style={{ whiteSpace: 'pre-line' }}>{point}</li>)}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
          {/* Spacer to push content to top if not enough content */}
          <div style={{flex: 0, minHeight: 0, flexGrow: 0, flexShrink: 1}}></div>
        </div>
        {/* Right Column */}
        <div className="w-1/3 pl-8 flex flex-col" style={{height: '100%'}}>
          {/* Contact */}
          <div className="mb-6" style={{minHeight: '70px'}}>
            <div className="flex flex-col gap-1 text-xs text-gray-700">
              <div className="flex items-center gap-2"><span>📞</span>{data.personal.phone || 'Phone'}</div>
              <div className="flex items-center gap-2"><span>✉️</span>{data.personal.email || 'Email'}</div>
              <div className="flex items-center gap-2"><span>📍</span>{data.personal.location || 'Location'}</div>
              <div className="flex items-center gap-2"><span>🌐</span>{data.personal.linkedin || 'LinkedIn/Website'}</div>
            </div>
          </div>
          {/* Education */}
          <div className="mb-6" style={{minHeight: '110px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">EDUCATION</div>
            {data.education.length === 0 ? (
              <div className="text-gray-400 text-xs">No education added yet.</div>
            ) : (
              data.education.map((edu, idx) => (
                <div key={edu.id || idx} className="mb-3">
                  <div className="font-semibold text-xs text-gray-800">{edu.institution}</div>
                  <div className="text-xs text-gray-600">{edu.degree}</div>
                  <div className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</div>
                  {edu.gpa && <div className="text-xs text-gray-400">GPA: {edu.gpa}</div>}
                </div>
              ))
            )}
          </div>
          {/* Skills */}
          <div className="mb-6" style={{minHeight: '80px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">SKILLS</div>
            <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
              {data.skills.length === 0 ? <li className="text-gray-400">No skills added yet.</li> : data.skills.map((skill, idx) => <li key={skill.id || idx}>{skill.name}</li>)}
            </ul>
          </div>
          {/* Programming Languages & Frameworks (optional, right side) */}
          {showProgramming && (
            <div className="mb-6" style={{minHeight: '60px'}}>
              <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">PROGRAMMING LANGUAGES & FRAMEWORKS</div>
              <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
                {(data.programming || []).length === 0 ? <li className="text-gray-400">None added</li> : data.programming.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          )}
          {/* TOOLS section */}
          <div className="mb-6" style={{minHeight: '60px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">TOOLS</div>
            <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
              {(data.tools || []).length === 0 ? <li className="text-gray-400">None added</li> : data.tools.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
          {/* Languages */}
          <div className="mb-6" style={{minHeight: '60px'}}>
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">LANGUAGES</div>
            <ul className="list-disc list-inside text-xs text-gray-700 pl-2">
              <li>English</li>
              <li>Other</li>
            </ul>
          </div>
          {/* Spacer to push content to top if not enough content */}
          <div style={{flex: 0, minHeight: 0, flexGrow: 0, flexShrink: 1}}></div>
          {/* REFERENCES section */}
          <div className="mt-6">
            <div className="font-bold text-gray-600 tracking-widest text-xs mb-1">REFERENCES</div>
            {(data.references && data.references.length > 0) ? (
              <ul className="list-none text-xs text-gray-700 pl-0">
                {data.references.map((ref, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold">{ref.name}</span>{ref.position && `, ${ref.position}`}<br/>
                    <span>{ref.company}</span><br/>
                    <span className="text-gray-500">{ref.contact}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 text-xs">Available upon request</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      summary: ""
    },
    experience: [],
    education: [],
    skills: []
  });

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    points: [], // changed from description
  });
  const [currentExpPoint, setCurrentExpPoint] = useState("");

  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    gpa: ""
  });

  const [newSkill, setNewSkill] = useState("");
  const [field, setField] = useState("");
  const [programming, setProgramming] = useState([]);
  const [newProgramming, setNewProgramming] = useState("");
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", points: [] });
  const [currentProjectPoint, setCurrentProjectPoint] = useState("");
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState("");
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', position: '', company: '', contact: '' });
  const previewRef = React.useRef();
  const [resumeBgColor, setResumeBgColor] = useState('#ffffff');
  const [resumeFont, setResumeFont] = useState('Inter, Arial, sans-serif');

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id: Date.now() }]
      }));
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        points: [],
      });
      setCurrentExpPoint("");
    }
  };

  const addExperiencePoint = () => {
    if (currentExpPoint.trim()) {
      setNewExperience(prev => ({
        ...prev,
        points: [...prev.points, currentExpPoint.trim()]
      }));
      setCurrentExpPoint("");
    }
  };

  const removeExperiencePoint = (idx) => {
    setNewExperience(prev => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== idx)
    }));
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id: Date.now() }]
      }));
      setNewEducation({
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        gpa: ""
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkill.trim(), id: Date.now() }]
      }));
      setNewSkill("");
    }
  };

  const addProgramming = () => {
    if (newProgramming.trim()) {
      setProgramming(prev => [...prev, newProgramming.trim()]);
      setNewProgramming("");
    }
  };
  const removeProgramming = (idx) => {
    setProgramming(prev => prev.filter((_, i) => i !== idx));
  };

  const addProject = () => {
    if (newProject.title.trim()) {
      setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
      setNewProject({ title: "", points: [] });
      setCurrentProjectPoint("");
    }
  };
  const addProjectPoint = () => {
    if (currentProjectPoint.trim()) {
      setNewProject(prev => ({
        ...prev,
        points: [...prev.points, currentProjectPoint.trim()]
      }));
      setCurrentProjectPoint("");
    }
  };
  const removeProjectPoint = (idx) => {
    setNewProject(prev => ({
      ...prev,
      points: prev.points.filter((_, i) => i !== idx)
    }));
  };
  const removeProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addTool = () => {
    if (newTool.trim()) {
      setTools(prev => [...prev, newTool.trim()]);
      setNewTool("");
    }
  };
  const removeTool = (idx) => {
    setTools(prev => prev.filter((_, i) => i !== idx));
  };

  const addReference = () => {
    if (newReference.name.trim() && newReference.company.trim()) {
      setReferences(prev => [...prev, { ...newReference, id: Date.now() }]);
      setNewReference({ name: '', position: '', company: '', contact: '' });
    }
  };
  const removeReference = (id) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
  };

  const removeItem = (type, id) => {
    setResumeData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const downloadResume = () => {
    if (previewRef.current) {
      html2pdf()
        .set({
          margin: 0,
          filename: 'Resume_2025.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(previewRef.current)
        .save();
    }
  };

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Star },
    { id: "appearance", label: "Appearance", icon: Paintbrush },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-blue-100 py-6 px-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Smart Resume Builder</h1>
              <p className="text-blue-600 text-sm">Create a professional CV step-by-step</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              // Download always enabled
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto p-4">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8"
        >
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeSection === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personal.fullName}
                      onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                    <input
                      type="text"
                      value={resumeData.personal.title}
                      onChange={(e) => updatePersonalInfo("title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Software Engineer, Marketing Specialist"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personal.phone}
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+94 71 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) => updatePersonalInfo("location", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Colombo, Sri Lanka"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={resumeData.personal.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                  <textarea
                    value={resumeData.personal.summary}
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief professional summary..."
                  />
                </div>
                {/* References input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">References</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      className="border border-blue-200 rounded-lg p-2 text-blue-700"
                      placeholder="Name"
                      value={newReference.name}
                      onChange={e => setNewReference(r => ({ ...r, name: e.target.value }))}
                    />
                    <input
                      type="text"
                      className="border border-blue-200 rounded-lg p-2 text-blue-700"
                      placeholder="Position"
                      value={newReference.position}
                      onChange={e => setNewReference(r => ({ ...r, position: e.target.value }))}
                    />
                    <input
                      type="text"
                      className="border border-blue-200 rounded-lg p-2 text-blue-700"
                      placeholder="Company"
                      value={newReference.company}
                      onChange={e => setNewReference(r => ({ ...r, company: e.target.value }))}
                    />
                    <input
                      type="text"
                      className="border border-blue-200 rounded-lg p-2 text-blue-700"
                      placeholder="Contact Info (email/phone)"
                      value={newReference.contact}
                      onChange={e => setNewReference(r => ({ ...r, contact: e.target.value }))}
                    />
                  </div>
                  <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded-lg mb-2" onClick={addReference}>Add Reference</button>
                  <div className="flex flex-col gap-2">
                    {references.map(ref => (
                      <div key={ref.id} className="flex items-center gap-2 bg-blue-50 rounded p-2">
                        <span className="text-xs text-blue-800 flex-1">{ref.name} - {ref.position} at {ref.company} ({ref.contact})</span>
                        <button type="button" className="text-red-500 hover:underline text-xs" onClick={() => removeReference(ref.id)}>&times;</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">Field/Industry</label>
                  <select
                    className="w-full border border-blue-200 rounded-lg p-2 text-blue-700"
                    value={field}
                    onChange={e => setField(e.target.value)}
                  >
                    <option value="">Select your field</option>
                    <option value="it">Information Technology (IT)</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {field === "it" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-blue-700 mb-1">Programming Languages & Frameworks <span className="text-xs text-gray-400">(optional)</span></label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          className="flex-1 border border-blue-200 rounded-lg p-2 text-blue-700"
                          placeholder="e.g. JavaScript, React, Python"
                          value={newProgramming}
                          onChange={e => setNewProgramming(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addProgramming(); } }}
                        />
                        <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded-lg" onClick={addProgramming}>Add</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {programming.map((item, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                            {item}
                            <button type="button" className="ml-1 text-blue-500 hover:text-red-500" onClick={() => removeProgramming(idx)}>&times;</button>
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Projects input (optional) */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-blue-700 mb-1">Projects <span className="text-xs text-gray-400">(optional)</span></label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          className="flex-1 border border-blue-200 rounded-lg p-2 text-blue-700"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                        />
                        <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded-lg" onClick={addProject}>Add</button>
                      </div>
                      {/* Project Points Input */}
                      <textarea
                        className="w-full border border-blue-200 rounded-lg p-2 text-blue-700 mb-2"
                        placeholder="Enter a bullet point (can be multi-line)..."
                        value={currentProjectPoint}
                        onChange={e => setCurrentProjectPoint(e.target.value)}
                        rows="2"
                      />
                      <button type="button" className="mb-2 px-3 py-1 bg-blue-600 text-white rounded-lg" onClick={addProjectPoint}>Add Point</button>
                      <div className="flex flex-col gap-2 mb-2">
                        {newProject.points.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-blue-50 rounded p-2">
                            <span className="text-xs text-blue-800 whitespace-pre-line flex-1">{point}</span>
                            <button type="button" className="text-red-500 hover:underline text-xs" onClick={() => removeProjectPoint(idx)}>&times;</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        {projects.map((proj, idx) => (
                          <div key={proj.id} className="flex items-center gap-2 bg-blue-50 rounded p-2">
                            <span className="font-medium text-blue-800 text-xs">{proj.title}</span>
                            <ul className="list-disc list-inside text-xs text-slate-500 flex-1 pl-4">
                              {(proj.points || []).length === 0 ? <li className="text-gray-400">No points added.</li> : proj.points.map((point, i) => <li key={i} style={{ whiteSpace: 'pre-line' }}>{point}</li>)}
                            </ul>
                            <button type="button" className="text-red-500 hover:underline text-xs" onClick={() => removeProject(proj.id)}>&times;</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {/* Tools input (always visible) */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">Tools <span className="text-xs text-gray-400">(e.g. Figma, Jira, Photoshop)</span></label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 border border-blue-200 rounded-lg p-2 text-blue-700"
                      placeholder="e.g. Figma, Jira, Photoshop"
                      value={newTool}
                      onChange={e => setNewTool(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTool(); } }}
                    />
                    <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded-lg" onClick={addTool}>Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((item, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        {item}
                        <button type="button" className="ml-1 text-blue-500 hover:text-red-500" onClick={() => removeTool(idx)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Work Experience</h3>
                
                {/* Existing Experience */}
                {resumeData.experience.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                      <button
                        onClick={() => removeItem("experience", exp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.company} • {exp.location}</p>
                    <p className="text-gray-500 text-xs">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                    <ul className="list-disc list-inside text-xs text-gray-700 pl-2 mt-2">
                      {(exp.points || []).length === 0 ? (
                        <li className="text-gray-400">No points added.</li>
                      ) : (
                        exp.points.map((point, i) => (
                          <li key={i} style={{ whiteSpace: 'pre-line' }}>{point}</li>
                        ))
                      )}
                    </ul>
                  </motion.div>
                ))}

                {/* Add New Experience */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">Add New Experience</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newExperience.title}
                        onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                        placeholder="Job Title"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                        placeholder="Company"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={newExperience.location}
                      onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                      placeholder="Location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="month"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="month"
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                        disabled={newExperience.current}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newExperience.current}
                        onChange={(e) => setNewExperience({...newExperience, current: e.target.checked})}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Currently working here</span>
                    </label>
                    {/* Experience Points Input */}
                    <div>
                      <label className="block text-sm font-medium text-blue-700 mb-1">Description Points</label>
                      <textarea
                        value={currentExpPoint}
                        onChange={e => setCurrentExpPoint(e.target.value)}
                        rows="2"
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a bullet point (can be multi-line)..."
                      />
                      <button type="button" className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg" onClick={addExperiencePoint}>Add Point</button>
                      <div className="flex flex-col gap-2 mt-2">
                        {newExperience.points.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-blue-50 rounded p-2">
                            <span className="text-xs text-blue-800 whitespace-pre-line flex-1">{point}</span>
                            <button type="button" className="text-red-500 hover:underline text-xs" onClick={() => removeExperiencePoint(idx)}>&times;</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addExperience}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Experience
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Education</h3>
                
                {/* Existing Education */}
                {resumeData.education.map((edu) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                      <button
                        onClick={() => removeItem("education", edu.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">{edu.institution} • {edu.location}</p>
                    <p className="text-gray-500 text-xs">{edu.startDate} - {edu.current ? "Present" : edu.endDate}</p>
                    {edu.gpa && <p className="text-gray-700 text-sm mt-1">GPA: {edu.gpa}</p>}
                  </motion.div>
                ))}

                {/* Add New Education */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">Add New Education</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                        placeholder="Degree"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                        placeholder="Institution"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={newEducation.location}
                      onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                      placeholder="Location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="month"
                        value={newEducation.startDate}
                        onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="month"
                        value={newEducation.endDate}
                        onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
                        disabled={newEducation.current}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={newEducation.current}
                          onChange={(e) => setNewEducation({...newEducation, current: e.target.checked})}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">Currently studying</span>
                      </label>
                      <input
                        type="text"
                        value={newEducation.gpa}
                        onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
                        placeholder="GPA (optional)"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addEducation}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Education
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Skills</h3>
                
                {/* Existing Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resumeData.skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill.name}
                      <button
                        onClick={() => removeItem("skills", skill.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Add New Skill */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeSection === "appearance" && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Appearance</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">Resume Background Color</label>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="color"
                      value={resumeBgColor}
                      onChange={e => setResumeBgColor(e.target.value)}
                      className="w-8 h-8 p-0 border-0 bg-transparent cursor-pointer"
                      aria-label="Pick resume background color"
                    />
                    {/* Preset color options */}
                    {['#ffffff', '#f8fafc', '#f1f5f9', '#e0e7ef', '#fef9c3', '#fce7f3'].map(color => (
                      <button
                        key={color}
                        type="button"
                        className={`w-6 h-6 rounded-full border-2 ${resumeBgColor === color ? 'border-blue-600' : 'border-gray-200'}`}
                        style={{ background: color }}
                        onClick={() => setResumeBgColor(color)}
                        aria-label={`Set background color ${color}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Choose a background color for your resume preview.</span>
                </div>
                {/* Font selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-blue-700 mb-1">Resume Font</label>
                  <select
                    className="w-full border border-blue-200 rounded-lg p-2 text-blue-700"
                    value={resumeFont}
                    onChange={e => setResumeFont(e.target.value)}
                  >
                    <option value="Inter, Arial, sans-serif">Inter (Default)</option>
                    <option value="Arial, Helvetica, sans-serif">Arial</option>
                    <option value="Roboto, Arial, sans-serif">Roboto</option>
                    <option value="'Times New Roman', Times, serif">Times New Roman</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Verdana, Geneva, sans-serif">Verdana</option>
                    <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
                    <option value="'Courier New', Courier, monospace">Courier New</option>
                  </select>
                  <span className="text-xs text-gray-500">Choose a font for your resume preview.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        {/* Live Preview Section */}
        <div className="flex flex-col items-center">
          <div ref={previewRef}>
            <A4ResumePreview data={{ ...resumeData, programming, projects, tools, references }} showProgramming={field === "it"} showProjects={field === "it"} bgColor={resumeBgColor} fontFamily={resumeFont} />
          </div>
        </div>
      </div>
    </div>
  );
} 