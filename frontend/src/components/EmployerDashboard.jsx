import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Contract"];

export default function EmployerDashboard() {
  const [username, setUsername] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    type: JOB_TYPES[0],
    tags: "",
    description: ""
  });
  const [posting, setPosting] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  // Helper: get JWT
  const getToken = () => localStorage.getItem("employer_jwt");

  // Fetch user jobs
  const fetchJobs = async (user) => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/jobs?posted_by=${user}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setJobs(data.jobs || []);
      else setError(data.msg || "Failed to fetch jobs");
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // On mount: check auth and fetch jobs
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/employer/login");
    } else {
      try {
        const decoded = jwtDecode(token);
        // Flask-JWT-Extended default: identity, but sometimes sub or username
        const user = decoded.identity || decoded.sub || decoded.username;
        if (!user) throw new Error();
        setUsername(user);
        fetchJobs(user);
      } catch {
        setUsername("");
        navigate("/employer/login");
      }
    }
    // eslint-disable-next-line
  }, [navigate]);

  // Handle form input
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle job post
  const handlePostJob = async e => {
    e.preventDefault();
    setPosting(true);
    setFormError("");
    try {
      const token = getToken();
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, tags: form.tags.split(",").map(t => t.trim()), posted_by: username })
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ title: "", location: "", salary: "", type: JOB_TYPES[0], tags: "", description: "" });
        fetchJobs(username);
      } else {
        setFormError(data.msg || "Failed to post job");
      }
    } catch (err) {
      setFormError("Server error. Please try again later.");
    } finally {
      setPosting(false);
    }
  };

  // Handle delete
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchJobs(username);
      else alert("Failed to delete job");
    } catch {
      alert("Server error. Please try again later.");
    }
  };

  // Handle edit
  const openEditModal = (job) => {
    setEditJob(job);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditJob(null);
  };
  const handleEditChange = e => {
    setEditJob({ ...editJob, [e.target.name]: e.target.value });
  };
  const handleEditSave = async () => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/jobs/${editJob._id || editJob.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...editJob, tags: editJob.tags.split(",").map(t => t.trim()) })
      });
      if (res.ok) {
        closeModal();
        fetchJobs(username);
      } else {
        alert("Failed to update job");
      }
    } catch {
      alert("Server error. Please try again later.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("employer_jwt");
    navigate("/employer/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-2">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">Welcome, {username}!</h2>
            <p className="text-blue-600">Manage your job postings below.</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Logout
          </button>
        </div>
        {/* Job Posting Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">Post a New Job</h3>
          <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input name="title" value={form.title} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input name="salary" value={form.salary} onChange={handleChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags <span className="text-xs text-gray-400">(comma separated)</span></label>
              <input name="tags" value={form.tags} onChange={handleChange} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {formError && <div className="md:col-span-2 text-red-500 text-sm">{formError}</div>}
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={posting} className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-60">
                {posting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
        {/* My Jobs List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-4">My Posted Jobs</h3>
          {loading ? (
            <div className="text-blue-500 text-center py-8">Loading jobs...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">{error}</div>
          ) : jobs.length === 0 ? (
            <div className="text-blue-500 text-center py-8">No jobs posted yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <div key={job._id || job.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-blue-800 font-bold text-lg">{job.title}</h4>
                      <p className="text-blue-600 text-sm">{job.location} • {job.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(job)} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">Edit</button>
                      <button onClick={() => handleDelete(job._id || job.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Delete</button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{job.salary}</div>
                  <div className="flex flex-wrap gap-2 mb-1">
                    {(job.tags || []).map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="text-gray-700 text-xs mb-1">{job.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Edit Modal */}
      {showModal && editJob && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-blue-700 text-xl">&times;</button>
            <h3 className="text-lg font-semibold text-blue-700 mb-4">Edit Job</h3>
            <div className="grid grid-cols-1 gap-4">
              <input name="title" value={editJob.title} onChange={handleEditChange} className="border border-blue-200 rounded-lg px-3 py-2" />
              <input name="location" value={editJob.location} onChange={handleEditChange} className="border border-blue-200 rounded-lg px-3 py-2" />
              <input name="salary" value={editJob.salary} onChange={handleEditChange} className="border border-blue-200 rounded-lg px-3 py-2" />
              <select name="type" value={editJob.type} onChange={handleEditChange} className="border border-blue-200 rounded-lg px-3 py-2">
                {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input name="tags" value={Array.isArray(editJob.tags) ? editJob.tags.join(", ") : editJob.tags} onChange={handleEditChange} className="border border-blue-200 rounded-lg px-3 py-2" />
              <textarea name="description" value={editJob.description} onChange={handleEditChange} rows={3} className="border border-blue-200 rounded-lg px-3 py-2" />
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
                <button onClick={handleEditSave} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 