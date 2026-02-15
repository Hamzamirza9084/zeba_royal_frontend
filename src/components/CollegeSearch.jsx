import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- COMPONENTS ---

const StyledInput = ({ label, type = "text", placeholder, className, value, onChange, name, ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">{label}</label>}
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green placeholder:text-deep-green/30 focus:outline-none focus:border-deep-green focus:ring-0 transition-colors text-sm font-medium"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

const StyledSelect = ({ label, options, value, onChange, name, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">{label}</label>}
    <div className="relative">
      <select 
        name={name}
        value={value}
        onChange={onChange}
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

const FilterSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-light-green/50 rounded-2xl bg-white overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-light-green/20 transition-colors"
      >
        <div className="flex items-center gap-3 text-deep-green">
          <div className="size-8 rounded-lg bg-light-green/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </div>
          <span className="text-sm font-bold">{title}</span>
        </div>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="material-symbols-outlined text-deep-green/60"
        >
          expand_more
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 pt-0 space-y-4 border-t border-light-green/30 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted Filter Content to reuse in Mobile Drawer and Desktop Sidebar
const FilterContent = ({ formData, handleChange, setFormData, handleEvaluate, institutions = [] }) => {
  return (
    <div className="space-y-4">
      {/* 6. Program Filters */}
      <FilterSection title="Program Filters" icon="school" defaultOpen={true}>
        <div className="space-y-4">
          
          {/* Dropdowns Group 1 */}
          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Destination" name="destination" value={formData.destination || ""} onChange={handleChange} options={["", "Canada", "Australia", "USA", "UK", "Germany"]} />
             <StyledSelect label="Institution" name="institution" value={formData.institution || ""} onChange={handleChange} options={["", ...institutions]} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
               <div className="flex items-center gap-1 mb-1.5"><label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Institution Type</label><span className="material-symbols-outlined text-[16px] text-deep-green/60" title="Type">info</span></div>
               <select name="institutionType" value={formData.institutionType || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green text-sm font-medium focus:outline-none focus:border-deep-green"><option value="">Select</option><option>University</option><option>College</option></select>
            </div>
             <StyledSelect label="Program Level" name="programLevel" value={formData.programLevel || ""} onChange={handleChange} options={["", "Bachelor's", "Master's", "Diploma"]} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Field of Study" name="fieldOfStudy" value={formData.fieldOfStudy || ""} onChange={handleChange} options={["", "Engineering", "Business", "Health", "Arts"]} />
             <StyledSelect label="Tuition (1st year)" name="tuition" value={formData.tuition || ""} onChange={handleChange} options={["", "Low", "Medium", "High"]} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Intakes" name="intakes" value={formData.intakes || ""} onChange={handleChange} options={["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} />
             <StyledSelect label="Intake Status" name="intakeStatus" value={formData.intakeStatus || ""} onChange={handleChange} options={["", "Open", "Closed"]} />
          </div>

          <div>
             <div className="flex items-center gap-1 mb-1.5"><label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Program Tag</label><span className="material-symbols-outlined text-[16px] text-deep-green/60" title="Tag">info</span></div>
             <select name="programTag" value={formData.programTag || ""} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green text-sm font-medium focus:outline-none focus:border-deep-green"><option value="">Select Tag</option><option>Co-op</option><option>Internship</option></select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4 border-t border-light-green/30">
            {[
              { name: 'pgwp', label: 'Only programs eligible for PGWP', info: 'Post-Graduation Work Permit' },
              { name: 'visaCap', label: 'Exempt from Canadian Visa Cap', info: 'Cap Exemption', badge: 'NEW' },
              { name: 'freeApplications', label: 'Only programs with free applications' },
              { name: 'excludePathway', label: 'Exclude Pathway Programs', info: 'Pathway Exclusion', badge: 'NEW' }
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" name={item.name} checked={formData[item.name] || false} onChange={handleChange} className="w-4 h-4 rounded accent-deep-green cursor-pointer" />
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-deep-green group-hover:text-deep-green/80 transition-colors">{item.label}</span>
                  {item.info && <span className="material-symbols-outlined text-[16px] text-deep-green/50" title={item.info}>info</span>}
                  {item.badge && <span className="px-1.5 py-0.5 bg-primary text-deep-green text-[9px] font-bold rounded-full">{item.badge}</span>}
                </div>
              </label>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-6 pt-4 border-t border-light-green/30">
            {/* Duration */}
            <div>
              <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide block mb-3">Program Duration (months)</label>
              <div className="flex gap-3 items-center">
                <input type="number" value={formData.programDurationMin || 1} onChange={(e) => setFormData(p => ({...p, programDurationMin: +e.target.value}))} className="w-14 px-1 py-1 text-center border-2 border-light-green rounded-lg text-sm font-bold text-deep-green focus:outline-none focus:border-deep-green" />
                <div className="flex-1 relative h-2 bg-light-green/30 rounded-full">
                   <input type="range" min="1" max="96" value={formData.programDurationMin || 1} onChange={(e) => setFormData(p => ({...p, programDurationMin: +e.target.value}))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                   <div className="absolute top-0 h-full bg-deep-green rounded-full" style={{ left: `${((formData.programDurationMin || 1) / 96) * 100}%`, right: `${100 - ((formData.programDurationMax || 96) / 96) * 100}%` }}></div>
                   <input type="range" min="1" max="96" value={formData.programDurationMax || 96} onChange={(e) => setFormData(p => ({...p, programDurationMax: +e.target.value}))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                </div>
                <input type="number" value={formData.programDurationMax || 96} onChange={(e) => setFormData(p => ({...p, programDurationMax: +e.target.value}))} className="w-14 px-1 py-1 text-center border-2 border-light-green rounded-lg text-sm font-bold text-deep-green focus:outline-none focus:border-deep-green" />
              </div>
            </div>

            {/* Study Gap */}
            <div>
               <div className="flex justify-between items-center mb-2"><label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Study Gap (years)</label><span className="text-xs font-bold text-deep-green bg-light-green/30 px-2 py-0.5 rounded">{formData.studyGap || 0}</span></div>
               <input type="range" min="0" max="10" step="0.5" value={formData.studyGap || 0} onChange={(e) => setFormData(p => ({...p, studyGap: +e.target.value}))} className="w-full h-2 bg-light-green/30 rounded-lg appearance-none cursor-pointer accent-deep-green" />
            </div>

            {/* Backlog */}
            <div>
               <div className="flex justify-between items-center mb-2"><label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Backlogs</label><span className="text-xs font-bold text-deep-green bg-light-green/30 px-2 py-0.5 rounded">{formData.backlog || 0}</span></div>
               <input type="range" min="0" max="20" step="1" value={formData.backlog || 0} onChange={(e) => setFormData(p => ({...p, backlog: +e.target.value}))} className="w-full h-2 bg-light-green/30 rounded-lg appearance-none cursor-pointer accent-deep-green" />
            </div>
          </div>

          {/* Student Requirements */}
          <div className="space-y-4 pt-4 border-t border-light-green/30">
             <div className="flex items-center gap-2"><h3 className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Student Requirements</h3><span className="material-symbols-outlined text-[16px] text-deep-green/60">info</span></div>
             <div className="space-y-3">
                <StyledSelect label="Prerequisite Missing" name="prerequisiteMissing" value={formData.prerequisiteMissing || ""} onChange={handleChange} options={["", "None", "Some", "All"]} />
                <StyledSelect label="Background Gap" name="educationBackgroundMissing" value={formData.educationBackgroundMissing || ""} onChange={handleChange} options={["", "None", "Minor", "Major"]} />
             </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleEvaluate}
              className="w-full py-3 bg-primary text-deep-green font-bold rounded-xl border border-deep-green/20 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">calculate</span>
              Calculate Based on Profile
            </button>
          </div>

        </div>
      </FilterSection>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

const CollegeSearch = () => {
  const navigate = useNavigate();
  const [showMobileFilters, setShowMobileFilters] = useState(false); // State for mobile drawer

  // Filter State
  const [formData, setFormData] = useState({
    nationality: "India",
    educationCountry: "India",
    qualification: "Bachelor's Degree",
    degreeName: "",
    collegeName: "",
    gradYear: "",
    cgpa: "",
    backlogs: "No",
    backlogCount: "",
    englishTest: "IELTS",
    scoreL: "",
    scoreR: "",
    scoreW: "",
    scoreS: "",
    scoreOA: "",
    testDate: "",
    workExp: "No",
    workExpYears: "",
    workExpMonths: "",
    workField: "",
    intendedCourse: "",
    fieldStream: "",
    intake: "Any Intake",
    budget: 25000,
    destination: "",
    institution: "",
    institutionType: "",
    programLevel: "",
    fieldOfStudy: "",
    tuition: "",
    intakes: "",
    intakeStatus: "",
    programTag: "",
    pgwp: false,
    visaCap: false,
    freeApplications: false,
    excludePathway: false,
    programDurationMin: 1,
    programDurationMax: 96,
    studyGap: 0,
    backlog: 0,
    prerequisiteMissing: "",
    educationBackgroundMissing: ""
  });

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredColleges, setFilteredColleges] = useState([]);

  // Auth Check
  useEffect(() => {
    const checkStudentStatus = () => {
      const userString = localStorage.getItem('user'); 
      if (!userString) {
        alert("Please login to access this page.");
        navigate('/login'); 
        return;
      }
      const user = JSON.parse(userString);
      // Allow both 'student' and 'user' roles to access
      if (!user.token || (user.role !== 'student' && user.role !== 'user')) {
        alert("Access Denied: You must be logged in as a Student to view this page.");
        navigate('/'); 
      }
    };
    checkStudentStatus();
  }, [navigate]);

  // Fetch Data
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/universities');
        setColleges(data);
        setFilteredColleges(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load universities.");
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  // Pre-fill from Profile
  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        console.log("Loaded Profile for Search:", user); // Debug log

        setFormData(prev => {
          const newData = { ...prev };
          
          // Safer mapping with optional chaining
          if (user.personalInfo?.citizenship) newData.nationality = user.personalInfo.citizenship;
          if (user.education && user.education.length > 0) {
             const edu = user.education[0]; // Assuming most recent is first
             if (edu.country) newData.educationCountry = edu.country;
             if (edu.level) newData.qualification = edu.level;
             // Check for grade/cgpa
             if (edu.grade) newData.cgpa = edu.grade; 
          }
          
          // Map intended destination if available in profile (e.g. from a preferences field if it existed)
          // For now, we only map explicit matches.
          
          return newData;
        });
      }
    } catch (e) { console.error("Error loading profile", e); }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
        const newData = { ...prev, [name]: value };
        
        // Auto-clear dependent filters to avoid conflicts
        if (name === 'destination') {
            newData.institution = ""; 
        }
        
        return newData;
    });
  };

  const handleReset = () => {
    // Reset filters to their initial empty states
    setFormData({
        nationality: "India",
        educationCountry: "India",
        qualification: "Bachelor's Degree",
        degreeName: "",
        collegeName: "",
        gradYear: "",
        cgpa: "",
        backlogs: "No",
        backlogCount: "",
        englishTest: "IELTS",
        scoreL: "",
        scoreR: "",
        scoreW: "",
        scoreS: "",
        scoreOA: "",
        testDate: "",
        workExp: "No",
        workExpYears: "",
        workExpMonths: "",
        workField: "",
        intendedCourse: "",
        fieldStream: "",
        intake: "Any Intake",
        budget: 25000,
        destination: "",
        institution: "",
        institutionType: "",
        programLevel: "",
        fieldOfStudy: "",
        tuition: "",
        intakes: "",
        intakeStatus: "",
        programTag: "",
        pgwp: false,
        visaCap: false,
        freeApplications: false,
        excludePathway: false,
        programDurationMin: 1,
        programDurationMax: 96,
        studyGap: 0,
        backlog: 0,
        prerequisiteMissing: "",
        educationBackgroundMissing: ""
    });
    // Immediately show all colleges again
    setFilteredColleges(colleges);
  };

  const handleApply = async (universityId) => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        alert("Please login to apply.");
        navigate('/login');
        return;
      }
      const user = JSON.parse(userString);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      await axios.post('/api/applications', { universityId }, config);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit application.");
    }
  };

  const handleEvaluate = () => {
    console.log("Evaluating with filters:", formData);
    // Always start filtering from the full list of colleges
    let results = [...colleges];

    // 1. Destination (Country)
    if (formData.destination) {
      results = results.filter(uni => {
        const match = uni.country?.toLowerCase().trim() === formData.destination.toLowerCase().trim();
        return match;
      });
    }

    // 2. Institution Name
    if (formData.institution) {
      results = results.filter(uni => uni.name?.toLowerCase().includes(formData.institution.toLowerCase().trim()));
    }

    // 3. Institution Type
    if (formData.institutionType) {
       // Assuming 'type' field exists or inferring from name
       results = results.filter(uni => 
         uni.name?.toLowerCase().includes(formData.institutionType.toLowerCase()) ||
         uni.type?.toLowerCase() === formData.institutionType.toLowerCase()
       );
    }

    // 4. Program Level
    if (formData.programLevel) {
      results = results.filter(uni => uni.courseLevel?.toLowerCase().includes(formData.programLevel.toLowerCase()));
    }

    // 5. Field of Study
    const courseQuery = formData.fieldOfStudy;
    if (courseQuery) {
      results = results.filter(uni => 
        uni.courseName?.toLowerCase().includes(courseQuery.toLowerCase()) || 
        uni.tags?.some(t => t.toLowerCase().includes(courseQuery.toLowerCase()))
      );
    }

    // 6. Tuition
    if (formData.tuition) {
      results = results.filter(uni => {
        const fee = parseFloat((uni.tuitionFee || "0").replace(/[^0-9.]/g, ''));
        if (formData.tuition === "Low") return fee < 15000;
        if (formData.tuition === "Medium") return fee >= 15000 && fee <= 30000;
        if (formData.tuition === "High") return fee > 30000;
        return true;
      });
    }

    // 7. Intakes
    if (formData.intakes) {
      results = results.filter(uni => uni.intakes?.toLowerCase().includes(formData.intakes.toLowerCase()));
    }

    // 8. Program Tag
    if (formData.programTag) {
      results = results.filter(uni => uni.tags?.includes(formData.programTag));
    }

    // 9. Checkboxes
    if (formData.pgwp) {
      results = results.filter(uni => uni.tags?.includes('PGWP') || uni.pgwp === true || uni.pgwp === 'Yes');
    }

    // 10. Sliders - Study Gap
    if (formData.studyGap > 0) {
      results = results.filter(uni => {
        if (!uni.gapLimit) return true; 
        return parseFloat(formData.studyGap) <= parseFloat(uni.gapLimit);
      });
    }

    // 11. Sliders - Backlog
    if (formData.backlog > 0) {
      results = results.filter(uni => {
        if (!uni.maxBacklogs) return true;
        return parseInt(formData.backlog) <= parseInt(uni.maxBacklogs);
      });
    }

    console.log("Filtered Results:", results.length);
    setFilteredColleges(results);
    setShowMobileFilters(false);
  };

  const getIcon = (uni) => {
    if (uni.name?.toLowerCase().includes('college') || uni.courseLevel?.includes('Diploma')) return 'school';
    if (uni.courseName?.toLowerCase().includes('tech')) return 'computer';
    return 'account_balance';
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-80px)] overflow-hidden bg-off-white font-display relative">
      
      {/* --- MOBILE DRAWER OVERLAY --- */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-deep-green/60 z-40 lg:hidden backdrop-blur-sm"
            />
            
            {/* Sliding Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[350px] bg-off-white z-50 overflow-y-auto flex flex-col shadow-2xl lg:hidden"
            >
              <div className="p-5 flex justify-between items-center border-b border-deep-green/10 bg-white">
                <h2 className="text-xl font-extrabold text-deep-green">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100 text-deep-green transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto">
                 <FilterContent 
                    formData={formData} 
                    handleChange={handleChange} 
                    setFormData={setFormData} 
                    handleEvaluate={handleEvaluate}
                    // Same dynamic filtering for mobile
                    institutions={[...new Set(
                       colleges
                       .filter(c => !formData.destination || c.country?.toLowerCase().trim() === formData.destination.toLowerCase().trim())
                       .map(c => c.name)
                    )].sort()}
                 />
              </div>

              <div className="p-5 border-t border-deep-green/10 bg-white sticky bottom-0">
                <button 
                  onClick={handleEvaluate}
                  className="w-full h-12 bg-primary text-deep-green text-sm font-extrabold rounded-xl border border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">search_check</span>
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      {/* ---------------------------------- */}


      {/* Sidebar - Desktop (Hidden on mobile via 'hidden lg:flex') */}
      <aside className="w-[420px] border-r border-deep-green/10 bg-off-white overflow-y-auto custom-scrollbar hidden lg:flex flex-col z-10">
        <div className="p-6 pb-24 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-deep-green tracking-tight">Profile Match</h1>
              <p className="text-deep-green/60 text-xs font-medium mt-1">Refine criteria to find your fit</p>
            </div>
            <button 
                onClick={handleReset}
                className="size-10 rounded-full hover:bg-light-green/30 flex items-center justify-center transition-colors text-deep-green" 
                title="Reset Filters"
            >
              <span className="material-symbols-outlined">restart_alt</span>
            </button>
          </div>

          {/* Reusing the extracted content */}
          <FilterContent 
             formData={formData} 
             handleChange={handleChange} 
             setFormData={setFormData} 
             handleEvaluate={handleEvaluate}
             // Dynamically filter institutions based on selected Destination
             institutions={[...new Set(
                colleges
                .filter(c => !formData.destination || c.country?.toLowerCase().trim() === formData.destination.toLowerCase().trim())
                .map(c => c.name)
             )].sort()}
          />
        </div>

        <div className="sticky bottom-0 bg-off-white p-6 border-t border-deep-green/10 backdrop-blur-xl bg-opacity-90">
          <button 
            onClick={handleEvaluate}
            className="w-full h-14 bg-primary text-deep-green text-base font-extrabold rounded-xl border border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">search_check</span>
            Evaluate Profile
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-green/30 border border-light-green w-fit mb-3">
                <span className="size-2 rounded-full bg-deep-green animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wide text-deep-green">Live Results</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-deep-green tracking-tight">University Matches</h2>
              <p className="text-deep-green/70 mt-2 font-medium">Found <span className="text-deep-green font-black underline decoration-primary decoration-4 underline-offset-2">{filteredColleges.length}</span> programs based on your profile.</p>
            </div>
            
            <div className="flex gap-3">
               {/* NEW MOBILE FILTER BUTTON */}
               <button 
                 onClick={() => setShowMobileFilters(true)}
                 className="lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-deep-green/10 bg-white text-deep-green font-bold hover:bg-light-green/20 transition-all shadow-sm"
               >
                 <span className="material-symbols-outlined text-[20px]">filter_list</span>
                 Filters
               </button>

               <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-deep-green/10 bg-white text-deep-green font-bold hover:bg-deep-green hover:text-white transition-all shadow-sm hover:shadow-md">
                 <span className="material-symbols-outlined text-[20px]">download</span>
                 <span className="hidden sm:inline">Export PDF</span>
                 <span className="sm:hidden">PDF</span>
               </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-bold border border-red-200">
                {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
             <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined text-4xl text-deep-green animate-spin">refresh</span>
             </div>
          ) : (
             /* Grid */
             <motion.div 
               key={filteredColleges.map(c => c._id).join(',')}
               className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
               initial="hidden"
               animate="show"
               variants={{
                 hidden: { opacity: 0 },
                 show: {
                   opacity: 1,
                   transition: { staggerChildren: 0.1 }
                 }
               }}
             >
               {filteredColleges.map((college, idx) => (
                 <motion.div 
                   key={college._id || idx}
                   variants={{
                     hidden: { opacity: 0, y: 20 },
                     show: { opacity: 1, y: 0 }
                   }}
                   className="bg-white rounded-2xl border-2 border-transparent hover:border-light-green p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden"
                 >
                   <div className="absolute -right-12 -top-12 w-32 h-32 bg-light-green/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div> 

                   <div className="flex justify-between items-start mb-6 relative z-10">
                     <div className="size-16 rounded-2xl bg-off-white border border-deep-green/10 flex items-center justify-center shadow-inner text-deep-green">
                       <span className="material-symbols-outlined text-3xl">{getIcon(college)}</span>
                     </div>
                     <span className="bg-light-green/30 text-deep-green text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-light-green/50">
                       {college.courseLevel || "Program"}
                     </span>
                   </div>

                   <div className="mb-6 relative z-10">
                     <h3 className="text-xl font-extrabold text-deep-green leading-tight mb-2 group-hover:text-deep-green/80 transition-colors">{college.courseName || "Unknown Course"}</h3>
                     <p className="text-sm font-bold text-deep-green/80 mb-2">{college.name}</p>
                     <div className="flex items-center gap-1.5 text-deep-green/60 text-xs font-bold">
                       <span className="material-symbols-outlined text-[16px]">location_on</span>
                       {college.city}, {college.country}
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-off-white/50 border border-deep-green/5 relative z-10">
                     <div>
                       <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Requirement</p>
                       <p className="text-deep-green font-bold text-sm">{college.minScoreOverall ? `${college.minScoreOverall} Overall` : 'N/A'}</p>
                     </div>
                     <div>
                       <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Tuition</p>
                       <p className="text-deep-green font-bold text-sm">{college.tuitionFee || "N/A"}</p>
                     </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                     {college.ranking && (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">
                            {college.ranking}
                        </span>
                     )}
                     {college.intakes && (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">
                            {college.intakes}
                        </span>
                     )}
                     {college.tags && college.tags.map(tag => (
                       <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">
                         {tag}
                       </span>
                     ))}
                   </div>

                   <button 
                     onClick={() => handleApply(college._id)}
                     className="mt-auto w-full py-3.5 rounded-xl border-2 border-deep-green/10 text-deep-green font-bold hover:border-deep-green hover:bg-deep-green hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-md relative z-10"
                   >
                     Apply for Application
                     <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                   </button>
                 </motion.div>
               ))}
             </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CollegeSearch;