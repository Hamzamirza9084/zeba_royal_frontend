import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Utility Functions ---

// Generate intake options for 2 years from current date
const generateIntakeOptions = () => {
  const intakes = [];
  const currentDate = new Date();
  const startMonth = currentDate.getMonth(); // 0-11
  const startYear = currentDate.getFullYear();
  
  // Generate intakes for 24 months (2 years) from now
  for (let i = 0; i < 24; i++) {
    const month = (startMonth + i) % 12;
    const year = startYear + Math.floor((startMonth + i) / 12);
    
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    intakes.push(`${monthName} ${year}`);
  }
  
  return intakes;
};

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
const FilterContent = ({ formData, handleChange, setFormData, handleEvaluate, institutions = [], destinations = [], programLevels = [], fieldOfStudies = [] }) => {
  return (
    <div className="space-y-4">
      {/* 6. Program Filters */}
      <FilterSection title="Program Filters" icon="school" defaultOpen={true}>
        <div className="space-y-4">
          
          {/* Dropdowns Group 1 */}
          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Destination" name="destination" value={formData.destination || ""} onChange={handleChange} options={["", ...destinations]} />
             <StyledSelect label="Institution" name="institution" value={formData.institution || ""} onChange={handleChange} options={["", ...institutions]} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Program Level" name="programLevel" value={formData.programLevel || ""} onChange={handleChange} options={["", ...programLevels]} />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <StyledSelect label="Field of Study" name="fieldOfStudy" value={formData.fieldOfStudy || ""} onChange={handleChange} options={["", ...fieldOfStudies]} />
          </div>

          <div>
             <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide block mb-3">Fees (1st year)</label>
             <div className="flex gap-3 items-center">
                <input type="number" value={formData.tuitionMin || 0} onChange={(e) => setFormData(p => ({...p, tuitionMin: +e.target.value}))} className="w-20 px-1 py-1 text-center border-2 border-light-green rounded-lg text-sm font-bold text-deep-green focus:outline-none focus:border-deep-green" />
                <div className="flex-1 relative h-2 bg-light-green/30 rounded-full">
                   <input type="range" min="0" max="100000" value={formData.tuitionMin || 0} onChange={(e) => setFormData(p => ({...p, tuitionMin: +e.target.value}))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                   <div className="absolute top-0 h-full bg-deep-green rounded-full" style={{ left: `${((formData.tuitionMin || 0) / 100000) * 100}%`, right: `${100 - ((formData.tuitionMax || 100000) / 100000) * 100}%` }}></div>
                   <input type="range" min="0" max="100000" value={formData.tuitionMax || 100000} onChange={(e) => setFormData(p => ({...p, tuitionMax: +e.target.value}))} className="absolute w-full h-full opacity-0 cursor-pointer z-10" />
                </div>
                <input type="number" value={formData.tuitionMax || 100000} onChange={(e) => setFormData(p => ({...p, tuitionMax: +e.target.value}))} className="w-20 px-1 py-1 text-center border-2 border-light-green rounded-lg text-sm font-bold text-deep-green focus:outline-none focus:border-deep-green" />
             </div>
          </div>

          <div>
             <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide block mb-3">Intakes</label>
             <div className="flex gap-2 mb-3">
                <select value={formData._intakeInput || ""} onChange={(e) => setFormData(p => ({...p, _intakeInput: e.target.value}))} className="flex-1 px-3 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green focus:outline-none focus:border-deep-green text-sm font-medium">
                   <option value="">Select intake...</option>
                   {generateIntakeOptions().map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
                <button onClick={(e) => {
                   e.preventDefault();
                   if (formData._intakeInput && !formData.intakes.includes(formData._intakeInput)) {
                     setFormData(p => ({...p, intakes: [...p.intakes, p._intakeInput], _intakeInput: ""}));
                   }
                }} className="px-4 py-2.5 bg-deep-green text-white font-bold rounded-xl hover:bg-deep-green/80 transition-colors text-sm">
                   Add
                </button>
             </div>
             <div className="flex flex-wrap gap-2 p-3 bg-off-white/50 rounded-xl border border-light-green/30 min-h-[50px]">
                {formData.intakes.length === 0 && <span className="text-deep-green/40 text-xs italic p-1">No intakes selected yet.</span>}
                {formData.intakes.map(intake => (
                   <motion.span key={intake} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-light-green rounded-lg text-xs font-bold text-deep-green shadow-sm">
                     {intake}
                     <button type="button" onClick={() => setFormData(p => ({...p, intakes: p.intakes.filter(i => i !== intake)}))} className="hover:text-red-500 transition-colors ml-1">
                       <span className="material-symbols-outlined text-[14px]">close</span>
                     </button>
                   </motion.span>
                ))}
             </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
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
    programLevel: "",
    fieldOfStudy: "",
    tuitionMin: 0,
    tuitionMax: 100000,
    intakes: [],
    _intakeInput: "",
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
        programLevel: "",
        fieldOfStudy: "",
        tuitionMin: 0,
        tuitionMax: 100000,
        intakes: [],
        _intakeInput: "",
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

    // 3. Program Level
    if (formData.programLevel) {
      results = results.filter(uni => uni.courseLevel?.toLowerCase().includes(formData.programLevel.toLowerCase()));
    }

    // 4. Field of Study
    if (formData.fieldOfStudy) {
      results = results.filter(uni => 
        uni.fieldOfStudy?.toLowerCase().trim() === formData.fieldOfStudy.toLowerCase().trim()
      );
    }

    // 5. Tuition (Fees Range)
    if (formData.tuitionMin !== undefined || formData.tuitionMax !== undefined) {
      results = results.filter(uni => {
        const fee = parseFloat((uni.tuitionFee || "0").replace(/[^0-9.]/g, ''));
        const minFee = formData.tuitionMin || 0;
        const maxFee = formData.tuitionMax || 100000;
        return fee >= minFee && fee <= maxFee;
      });
    }

    // 6. Intakes
    if (formData.intakes && formData.intakes.length > 0) {
      results = results.filter(uni => {
        const uniIntakes = Array.isArray(uni.intakes) ? uni.intakes : (uni.intakes ? uni.intakes.split(',').map(i => i.trim()) : []);
        return formData.intakes.some(selectedIntake => 
          uniIntakes.some(uniIntake => uniIntake.toLowerCase().trim() === selectedIntake.toLowerCase().trim())
        );
      });
    }

    // 7. Program Tag
    if (formData.programTag) {
      results = results.filter(uni => uni.tags?.includes(formData.programTag));
    }

    // 8. Checkboxes
    if (formData.pgwp) {
      results = results.filter(uni => uni.tags?.includes('PGWP') || uni.pgwp === true || uni.pgwp === 'Yes');
    }

    // 9. Sliders - Study Gap
    if (formData.studyGap > 0) {
      results = results.filter(uni => {
        if (!uni.gapLimit) return true; 
        return parseFloat(formData.studyGap) <= parseFloat(uni.gapLimit);
      });
    }

    // 10. Sliders - Backlog
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
                    destinations={[...new Set(colleges.map(c => c.country).filter(Boolean))].sort()}
                    programLevels={[...new Set(colleges.map(c => c.courseLevel).filter(Boolean))].sort()}
                    fieldOfStudies={[...new Set(colleges.map(c => c.fieldOfStudy).filter(Boolean))].sort()}
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
             destinations={[...new Set(colleges.map(c => c.country).filter(Boolean))].sort()}
             programLevels={[...new Set(colleges.map(c => c.courseLevel).filter(Boolean))].sort()}
             fieldOfStudies={[...new Set(colleges.map(c => c.fieldOfStudy).filter(Boolean))].sort()}
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
                   className="bg-white rounded-2xl border border-deep-green/10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                 >
                   {/* Header Section */}
                   <div className="p-6 pb-4 flex justify-between items-start gap-4 border-b border-deep-green/5">
                     <div className="flex gap-4 flex-1">
                       {/* University Icon */}
                       <div className="size-12 rounded-lg bg-off-white border border-deep-green/10 flex items-center justify-center flex-shrink-0">
                         <span className="material-symbols-outlined text-deep-green text-2xl">apartment</span>
                       </div>
                       {/* University Info */}
                       <div className="flex-1">
                         <h4 className="text-sm font-bold text-deep-green">{college.name || "Unknown University"}</h4>
                         <p className="text-xs text-deep-green/60">{college.city || ""}{college.city && college.country ? ", " : ""}{college.country || ""}</p>
                       </div>
                     </div>
                   </div>

                   {/* Course Info */}
                   <div className="px-6 pt-4 pb-3">
                     <p className="text-[10px] font-bold text-deep-green/50 uppercase tracking-wider mb-1">{college.courseLevel || "Program Level"}</p>
                     <h3 className="text-lg font-extrabold text-deep-green uppercase leading-tight">{college.courseName || "Unknown Course"}</h3>
                   </div>

                   {/* Tags */}
                   {college.tags && college.tags.length > 0 && (
                     <div className="px-6 pb-4 flex flex-wrap gap-2">
                       {college.tags.slice(0, 3).map((tag, i) => (
                         <span key={i} className="inline-flex items-center gap-1 text-[11px] font-bold text-deep-green/70">
                           <span className="material-symbols-outlined text-[14px]">
                             {tag.includes('Scholarship') ? 'school' : tag.includes('Demand') ? 'trending_up' : 'verified'}
                           </span>
                           {tag}
                         </span>
                       ))}
                     </div>
                   )}

                   <div className="px-6 border-t border-deep-green/5">
                     {/* Info Rows */}
                     <div className="py-4 space-y-3">
                       <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-deep-green/50 uppercase">Duration</span>
                         <span className="text-sm font-bold text-deep-green">{college.duration || "N/A"}</span>
                       </div>
                       <div className="flex justify-between items-center border-t border-deep-green/5 pt-3">
                         <span className="text-xs font-bold text-deep-green/50 uppercase">App Fee</span>
                         <span className="text-sm font-bold text-teal-600">Free Waiver</span>
                       </div>
                       <div className="flex justify-between items-center border-t border-deep-green/5 pt-3">
                         <span className="text-xs font-bold text-deep-green/50 uppercase">Success Chance</span>
                         <div className="flex items-center gap-1.5">
                           <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                           <span className="text-sm font-bold text-teal-600">High</span>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Requirement & Tuition Box */}
                   <div className="mx-6 my-4 p-4 bg-light-green/20 border border-light-green/50 rounded-xl">
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <p className="text-[10px] font-bold text-deep-green/60 uppercase tracking-wider mb-2">Requirement</p>
                         <p className="text-base font-extrabold text-deep-green">{college.minScoreOverall || "N/A"}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-deep-green/60 uppercase tracking-wider mb-2">Tuition (1st yr)</p>
                         <p className="text-base font-extrabold text-deep-green">{college.tuitionFee || "N/A"}</p>
                       </div>
                     </div>
                   </div>

                   {/* Available Intakes */}
                   <div className="px-6 py-4 border-t border-deep-green/5">
                     <p className="text-[10px] font-bold text-deep-green/50 uppercase tracking-wider mb-3">Available Intakes</p>
                     <div className="flex gap-3">
                       {college.intakes ? (
                         typeof college.intakes === 'string' ? (
                           college.intakes.split(',').slice(0, 3).map((intake, i) => (
                             <span key={i} className="px-4 py-2 bg-off-white border border-deep-green/10 rounded-lg text-xs font-bold text-deep-green">
                               {intake.trim()}
                             </span>
                           ))
                         ) : (
                           Array.isArray(college.intakes) && college.intakes.slice(0, 3).map((intake, i) => (
                             <span key={i} className="px-4 py-2 bg-off-white border border-deep-green/10 rounded-lg text-xs font-bold text-deep-green">
                               {intake}
                             </span>
                           ))
                         )
                       ) : (
                         <span className="px-4 py-2 bg-off-white border border-deep-green/10 rounded-lg text-xs font-bold text-deep-green/60">
                           Check availability
                         </span>
                       )}
                     </div>
                   </div>

                   {/* Action Buttons */}
                   <div className="px-6 py-5 flex gap-3 items-center">
                     <button 
                       onClick={() => handleApply(college._id)}
                       className="flex-1 py-3 text-deep-green font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                       style={{ backgroundColor: '#cca34a' }}
                       onMouseEnter={(e) => e.target.style.backgroundColor = '#b8933d'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#cca34a'}
                     >
                       Apply Now
                       <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                     </button>
                     <button className="text-deep-green/40 hover:text-red-500 transition-colors p-2">
                       <span className="material-symbols-outlined text-2xl">favorite_border</span>
                     </button>
                   </div>
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