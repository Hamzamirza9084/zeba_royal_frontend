import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// --- Reusable Styled Components ---

const StyledInput = ({ label, type = "text", placeholder, className, ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">{label}</label>}
    <input 
      type={type} 
      className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green placeholder:text-deep-green/30 focus:outline-none focus:border-deep-green focus:ring-0 transition-colors text-sm font-medium"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

const StyledSelect = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">{label}</label>}
    <div className="relative">
      <select 
        className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green focus:outline-none focus:border-deep-green focus:ring-0 transition-colors text-sm font-medium appearance-none cursor-pointer"
        {...props}
      >
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-deep-green pointer-events-none text-[20px]">
        expand_more
      </span>
    </div>
  </div>
);

// --- Main Admin Component ---

const AdminAddUniversity = () => {
  const navigate = useNavigate();

  // Comprehensive Form State
  const [formData, setFormData] = useState({
    // University Info
    name: "",
    country: "",
    city: "",
    ranking: "",
    website: "",
    
    // Admission Rules
    minCgpa: "",
    acceptedDegrees: "",
    acceptedBackgrounds: "",
    maxBacklogs: "",
    gapAccepted: "No",
    gapLimit: "",
    
    // English Requirements
    englishTests: "",
    minScoreOverall: "",
    minScoreSection: "",
    
    // Course Details
    courseName: "",
    courseLevel: "Postgraduate (PG)",
    duration: "",
    tuitionFee: "",
    intakes: "",
    
    // Additional
    casPriority: "Medium",
    internalProcessing: "No",
    
    tags: [] // Kept for flexible extra tags
  });

  const [tagInput, setTagInput] = useState("");

  // --- SECURITY CHECK: Redirect if not Admin ---
  useEffect(() => {
    const checkAdminStatus = () => {
      const userString = localStorage.getItem('user');
      
      if (!userString) {
        // No user logged in
        alert("Please login as an Admin to access this page.");
        navigate('/login'); // Or '/' depending on your route
        return;
      }

      const user = JSON.parse(userString);

      // Check for token and 'admin' role
      if (!user.token || user.role !== 'admin') {
        alert("Access Denied: You do not have permission to view this page.");
        navigate('/'); // Redirect to landing page
      }
    };

    checkAdminStatus();
  }, [navigate]);
  // ------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const resetForm = () => {
    setFormData({
      name: "", country: "", city: "", ranking: "", website: "",
      minCgpa: "", acceptedDegrees: "", acceptedBackgrounds: "", maxBacklogs: "",
      gapAccepted: "No", gapLimit: "", englishTests: "", minScoreOverall: "", minScoreSection: "",
      courseName: "", courseLevel: "Postgraduate (PG)", duration: "", tuitionFee: "", intakes: "",
      casPriority: "Medium", internalProcessing: "No", tags: []
    });
    setTagInput("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the logged-in user from storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Redundant check (safe practice)
    if (!user || !user.token || user.role !== 'admin') {
      alert("You must be logged in as Admin to do this.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`, // Send token in header
        },
      };

      await axios.post('/api/universities', formData, config);
      
      alert("University Added Successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add university");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-off-white overflow-hidden font-display">
      
      {/* LEFT: Entry Form Area */}
      <div className="w-full lg:w-3/5 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8 pb-32">
          
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-green/10 border border-deep-green/20 w-fit mb-4">
                <span className="material-symbols-outlined text-[18px] text-deep-green">admin_panel_settings</span>
                <span className="text-xs font-bold uppercase tracking-wide text-deep-green">Admin Portal</span>
              </div>
              <h1 className="text-4xl font-extrabold text-deep-green tracking-tight">Add New Program</h1>
              <p className="text-deep-green/60 mt-2 font-medium">Enter detailed admission rules and course information.</p>
            </div>
            <Link to="/admin/applications" className="px-5 py-2.5 rounded-xl bg-deep-green/10 text-deep-green font-bold hover:bg-deep-green/20 transition-colors flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined">assignment</span>
              Manage Applications
            </Link>
            <Link to="/admin/students" className="px-5 py-2.5 rounded-xl bg-deep-green/10 text-deep-green font-bold hover:bg-deep-green/20 transition-colors flex items-center gap-2 whitespace-nowrap">
              <span className="material-symbols-outlined">group</span>
              View Students
            </Link>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* 1. University Information */}
            <section className="bg-white p-6 rounded-2xl border-2 border-light-green/50 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-deep-green mb-6 border-b border-light-green/30 pb-2">
                <span className="material-symbols-outlined">account_balance</span> 
                University Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StyledInput label="University Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. University of Westminster" className="md:col-span-2" />
                <StyledInput label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. UK" />
                <StyledInput label="City" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. London" />
                <StyledInput label="Global Ranking (Optional)" name="ranking" value={formData.ranking} onChange={handleChange} placeholder="e.g. #102 QS" />
                <StyledInput label="Website URL" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." />
              </div>
            </section>

            {/* 2. Course Details */}
            <section className="bg-white p-6 rounded-2xl border-2 border-light-green/50 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-deep-green mb-6 border-b border-light-green/30 pb-2">
                <span className="material-symbols-outlined">school</span> 
                Course Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StyledInput label="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} placeholder="e.g. MSc Data Science" className="md:col-span-2" />
                <StyledSelect label="Course Level" name="courseLevel" value={formData.courseLevel} onChange={handleChange} options={["Postgraduate (PG)", "Undergraduate (UG)", "Diploma", "PhD"]} />
                <StyledInput label="Duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 1 Year" />
                <StyledInput label="Tuition Fee" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} placeholder="e.g. £16,000" />
                <StyledInput label="Intake Availability" name="intakes" value={formData.intakes} onChange={handleChange} placeholder="e.g. January, September" />
              </div>
            </section>

            {/* 3. Admission Rules */}
            <section className="bg-white p-6 rounded-2xl border-2 border-light-green/50 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-deep-green mb-6 border-b border-light-green/30 pb-2">
                <span className="material-symbols-outlined">gavel</span> 
                Admission Rules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <StyledInput label="Min Percentage / CGPA" name="minCgpa" value={formData.minCgpa} onChange={handleChange} placeholder="e.g. 60% or 6.5 CGPA" />
                <StyledInput label="Max Backlogs Allowed" name="maxBacklogs" value={formData.maxBacklogs} onChange={handleChange} type="number" placeholder="e.g. 10" />
                
                <div className="md:col-span-2">
                   <StyledInput label="Accepted Degrees" name="acceptedDegrees" value={formData.acceptedDegrees} onChange={handleChange} placeholder="e.g. B.Tech, BCA, BSc IT" />
                </div>
                <div className="md:col-span-2">
                   <StyledInput label="Accepted Backgrounds" name="acceptedBackgrounds" value={formData.acceptedBackgrounds} onChange={handleChange} placeholder="e.g. IT, CS, Math background only" />
                </div>

                <StyledSelect label="Gap Accepted?" name="gapAccepted" value={formData.gapAccepted} onChange={handleChange} options={["No", "Yes"]} />
                
                <AnimatePresence>
                  {formData.gapAccepted === "Yes" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <StyledInput label="Gap Limit (Years)" name="gapLimit" value={formData.gapLimit} onChange={handleChange} placeholder="e.g. 5 Years" type="number" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* 4. English Requirements */}
            <section className="bg-white p-6 rounded-2xl border-2 border-light-green/50 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-deep-green mb-6 border-b border-light-green/30 pb-2">
                <span className="material-symbols-outlined">language</span> 
                English Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                 <div className="md:col-span-3">
                    <StyledInput label="Accepted Tests" name="englishTests" value={formData.englishTests} onChange={handleChange} placeholder="e.g. IELTS, PTE, TOEFL" />
                 </div>
                 <StyledInput label="Min Overall Score" name="minScoreOverall" value={formData.minScoreOverall} onChange={handleChange} placeholder="e.g. 6.5" />
                 <StyledInput label="Min Section Score" name="minScoreSection" value={formData.minScoreSection} onChange={handleChange} placeholder="e.g. 6.0" className="md:col-span-2" />
              </div>
            </section>

            {/* 5. Additional Info & Tags */}
            <section className="bg-white p-6 rounded-2xl border-2 border-light-green/50 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-deep-green mb-6 border-b border-light-green/30 pb-2">
                <span className="material-symbols-outlined">settings_suggest</span> 
                Additional Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <StyledSelect label="CAS Priority" name="casPriority" value={formData.casPriority} onChange={handleChange} options={["High", "Medium", "Low"]} />
                <StyledSelect label="Internal Processing?" name="internalProcessing" value={formData.internalProcessing} onChange={handleChange} options={["Yes", "No"]} />
              </div>

              {/* Tag System */}
              <div className="flex gap-3 mb-4">
                <StyledInput 
                  placeholder="Add custom tag (e.g. PGWP Eligible)..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                />
                <button 
                  onClick={addTag}
                  type="button" // Prevent form submission
                  className="px-6 rounded-xl bg-deep-green text-white font-bold hover:bg-deep-green/90 transition-colors shadow-lg"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 p-4 bg-off-white/50 rounded-xl border border-light-green/30 min-h-[60px]">
                <AnimatePresence>
                  {formData.tags.length === 0 && <span className="text-deep-green/40 text-sm italic p-1">No custom tags added.</span>}
                  {formData.tags.map(tag => (
                    <motion.span 
                      key={tag}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-light-green rounded-lg text-xs font-bold text-deep-green shadow-sm"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* Sticky Actions Footer */}
            <div className="sticky bottom-0 bg-off-white/95 backdrop-blur-sm py-4 border-t border-deep-green/10 flex items-center gap-4 z-20">
              <button type="submit" className="flex-1 py-4 rounded-xl bg-primary text-deep-green text-lg font-extrabold border-2 border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">save</span>
                Save Program
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="px-8 py-4 rounded-xl border-2 border-deep-green text-deep-green font-bold hover:bg-light-green/20 transition-colors"
              >
                Reset
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* RIGHT: Live Preview Panel */}
      <div className="hidden lg:flex w-2/5 bg-deep-green/5 border-l border-deep-green/10 flex-col items-center justify-center p-10 relative">
        <div className="absolute top-8 left-8">
           <span className="text-xs font-bold uppercase tracking-wide text-deep-green/40">Live Preview Card</span>
        </div>

        {/* Live Card Preview */}
        <motion.div 
           layout
           className="w-full max-w-sm bg-white rounded-2xl border-2 border-light-green p-6 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-light-green/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="size-16 rounded-2xl bg-off-white border border-deep-green/10 flex items-center justify-center shadow-inner text-deep-green">
              <span className="material-symbols-outlined text-3xl">account_balance</span>
            </div>
            <span className="bg-light-green/30 text-deep-green text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-light-green/50">
              {formData.courseLevel.split(' ')[0]}
            </span>
          </div>

          <div className="mb-6 relative z-10">
            <h3 className="text-xl font-extrabold text-deep-green leading-tight mb-1">
              {formData.courseName || "Course Name"}
            </h3>
            <p className="text-sm font-bold text-deep-green/80 mb-2">
              {formData.name || "University Name"}
            </p>
            <div className="flex items-center gap-1.5 text-deep-green/60 text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {formData.city ? `${formData.city}, ${formData.country}` : "City, Country"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-off-white/50 border border-deep-green/5 relative z-10">
            <div>
              <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Requirement</p>
              <p className="text-deep-green font-bold text-sm">{formData.minScoreOverall || "6.5"} ({formData.minScoreSection || "6.0"})</p>
            </div>
            <div>
              <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Tuition</p>
              <p className="text-deep-green font-bold text-sm">{formData.tuitionFee || "$0"}</p>
            </div>
            <div className="col-span-2 pt-2 border-t border-deep-green/10 mt-1">
               <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Intakes</p>
               <p className="text-deep-green font-bold text-xs">{formData.intakes || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8 relative z-10 min-h-[24px]">
              {/* Auto-generated tags based on inputs */}
              {formData.ranking && <span className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">{formData.ranking}</span>}
              {formData.gapAccepted === "Yes" && <span className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">Gap Accepted</span>}
              {/* Custom Tags */}
              {formData.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">{tag}</span>
              ))}
          </div>

          <button className="mt-auto w-full py-3.5 rounded-xl border-2 border-deep-green/10 text-deep-green font-bold bg-gray-50 flex items-center justify-center gap-2 relative z-10 cursor-not-allowed opacity-70">
            View Details
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAddUniversity;