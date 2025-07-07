import React, { useState, useEffect } from "react";

export default function JobMarketplace() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/jobs/all");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        console.log(data)
        setJobs(data.jobs || []);
      } catch (err) {
        setError(err.message || "Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    return (
      (!search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase())) &&
      (!type || job.type === type) &&
      (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
      (!company || job.company === company)
    );
  });

  const uniqueCompanies = [...new Set(jobs.map(j => j.company))];
  const uniqueTypes = [...new Set(jobs.map(j => j.type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col items-center py-12 px-2">
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">Job Marketplace</h1>
      <p className="text-blue-600 mb-8 text-center max-w-xl">Browse and apply for local and foreign jobs. Find the right opportunity for your skills and ambitions.</p>
      {/* Filters */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search jobs or companies..."
          className="flex-1 min-w-[180px] border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border border-blue-200 rounded-lg px-3 py-2 min-w-[120px] text-blue-700"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          type="text"
          placeholder="Location"
          className="border border-blue-200 rounded-lg px-3 py-2 min-w-[120px] text-blue-700"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <select
          className="border border-blue-200 rounded-lg px-3 py-2 min-w-[120px] text-blue-700"
          value={company}
          onChange={e => setCompany(e.target.value)}
        >
          <option value="">All Companies</option>
          {uniqueCompanies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {/* Job Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center text-blue-500 py-12">Loading jobs...</div>
        ) : error ? (
          <div className="col-span-2 text-center text-red-500 py-12">{error}</div>
        ) : filteredJobs.length === 0 ? (
          <div className="col-span-2 text-center text-blue-500 py-12">No jobs found. Try adjusting your filters.</div>
        ) : (
          filteredJobs.map(job => (
            <div key={job._id || job.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-blue-100 hover:shadow-2xl transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <img src={job.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company || "Job")}&background=0D8ABC&color=fff`} alt={job.company} className="w-12 h-12 rounded-full border border-blue-200 object-cover" />
                <div>
                  <h2 className="text-lg font-bold text-blue-800">{job.title}</h2>
                  <p className="text-blue-600 text-sm font-medium">{job.company}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-blue-700 mb-2">
                <span className="bg-blue-100 px-2 py-1 rounded">{job.location}</span>
                <span className="bg-blue-100 px-2 py-1 rounded">{job.type}</span>
                <span className="bg-blue-100 px-2 py-1 rounded">{job.salary}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {(job.tags || []).map(tag => (
                  <span key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">{tag}</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-2">{job.description}</p>
              <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 