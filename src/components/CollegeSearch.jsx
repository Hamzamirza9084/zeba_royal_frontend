import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const colleges = [
  {
    name: "University of Toronto",
    location: "Toronto, Canada",
    type: "Public University",
    ielts: "6.5 Overall",
    fee: "$45,000 / year",
    tags: ["Top 100 QS", "Research", "Sep 2025"],
    icon: "account_balance"
  },
  {
    name: "Humber College",
    location: "Toronto, Canada",
    type: "College",
    ielts: "6.0 Overall",
    fee: "$18,000 / year",
    tags: ["PGWP Eligible", "Co-op Options", "Jan/Sep"],
    icon: "school"
  },
  {
    name: "University of Westminster",
    location: "London, UK",
    type: "University",
    ielts: "6.5 Overall",
    fee: "£16,000 / year",
    tags: ["Central London", "Business Focus", "Sep 2025"],
    icon: "account_balance"
  },
  {
    name: "Seneca Polytechnic",
    location: "Toronto, Canada",
    type: "College",
    ielts: "6.0 Overall",
    fee: "$17,500 / year",
    tags: ["Tech Focus", "Applied Arts", "Jan 2025"],
    icon: "computer"
  }
];

// Reusable Input Component
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

// Reusable Select Component
const StyledSelect = ({ label, options, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">{label}</label>}
    <div className="relative">
      <select 
        className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green focus:outline-none focus:border-deep-green focus:ring-0 transition-colors text-sm font-medium appearance-none cursor-pointer"
        {...props}
      >
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-deep-green pointer-events-none text-[20px]">
        expand_more
      </span>
    </div>
  </div>
);

// Animated Accordion Section
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

const CollegeSearch = () => {
  const [hasBacklogs, setHasBacklogs] = useState("No");
  const [hasWorkExp, setHasWorkExp] = useState("No");
  const [englishTest, setEnglishTest] = useState("IELTS");

  return (
    <div className="flex flex-1 h-[calc(100vh-80px)] overflow-hidden bg-off-white font-display">
      
      {/* Sidebar - Desktop */}
      <aside className="w-[420px] border-r border-deep-green/10 bg-off-white overflow-y-auto custom-scrollbar hidden lg:flex flex-col z-10">
        <div className="p-6 pb-24 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-deep-green tracking-tight">Profile Match</h1>
              <p className="text-deep-green/60 text-xs font-medium mt-1">Refine criteria to find your fit</p>
            </div>
            <button className="size-10 rounded-full hover:bg-light-green/30 flex items-center justify-center transition-colors text-deep-green" title="Reset Filters">
              <span className="material-symbols-outlined">restart_alt</span>
            </button>
          </div>

          <div className="space-y-4">
            
            {/* 1. Nationality & Origin */}
            <FilterSection title="Nationality & Origin" icon="public" defaultOpen={true}>
              <StyledSelect label="Nationality" options={["India", "Nigeria", "China", "Vietnam", "Philippines"]} />
              <StyledSelect label="Country of Education" options={["India", "USA", "UK", "Canada"]} />
            </FilterSection>

            {/* 2. Academic Details */}
            <FilterSection title="Academic History" icon="school">
              <StyledSelect label="Highest Qualification" options={["Bachelor's Degree", "Master's Degree", "Diploma", "High School (12th)"]} />
              <StyledInput label="Degree Name" placeholder="e.g. B.Tech Computer Science" />
              <StyledInput label="University / College" placeholder="e.g. Mumbai University" />
              
              <div className="grid grid-cols-2 gap-3">
                <StyledInput label="Grad. Year" type="number" placeholder="2024" />
                <StyledInput label="CGPA / %" placeholder="8.5 or 85%" />
              </div>
              
              {/* Backlogs Toggle */}
              <div className="pt-2">
                <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide block mb-2">History of Backlogs?</label>
                <div className="flex gap-2 bg-white p-1 rounded-xl border-2 border-light-green w-fit">
                  {['No', 'Yes'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setHasBacklogs(opt)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hasBacklogs === opt 
                          ? 'bg-deep-green text-primary shadow-sm' 
                          : 'text-deep-green hover:bg-light-green/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
                <AnimatePresence>
                  {hasBacklogs === 'Yes' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <StyledInput label="Number of Backlogs" type="number" placeholder="Total count" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FilterSection>

            {/* 3. English Proficiency */}
            <FilterSection title="English Proficiency" icon="translate" defaultOpen={true}>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-deep-green/80 ml-1 uppercase tracking-wide">Test Type</label>
                    <div className="relative">
                    <select 
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-light-green bg-white text-deep-green focus:outline-none focus:border-deep-green focus:ring-0 transition-colors text-sm font-medium appearance-none cursor-pointer"
                        onChange={(e) => setEnglishTest(e.target.value)}
                        value={englishTest}
                    >
                        {["IELTS", "PTE", "TOEFL", "Duolingo", "Medium of Instruction (MOI)"].map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-deep-green pointer-events-none text-[20px]">
                        expand_more
                    </span>
                    </div>
                </div>

                {/* Show scores only if not MOI, or if you want to allow scores for MOI too, keep it. Usually MOI doesn't have band scores. */}
                {englishTest !== "Medium of Instruction (MOI)" && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="space-y-3"
                    >
                        <div className="grid grid-cols-5 gap-2 items-end">
                            <div className="col-span-1"><StyledInput label="L" placeholder="-" className="text-center px-1" /></div>
                            <div className="col-span-1"><StyledInput label="R" placeholder="-" className="text-center px-1" /></div>
                            <div className="col-span-1"><StyledInput label="W" placeholder="-" className="text-center px-1" /></div>
                            <div className="col-span-1"><StyledInput label="S" placeholder="-" className="text-center px-1" /></div>
                            <div className="col-span-1"><StyledInput label="OA" placeholder="-" className="text-center bg-light-green/20 border-deep-green" /></div>
                        </div>
                        <StyledInput label="Test Date" type="date" />
                    </motion.div>
                )}
              </div>
            </FilterSection>

            {/* 4. Work Experience */}
            <FilterSection title="Work Experience" icon="work">
                <div>
                    <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide block mb-2">Do you have Work Exp?</label>
                    <div className="flex gap-2 bg-white p-1 rounded-xl border-2 border-light-green w-fit mb-4">
                        {['No', 'Yes'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setHasWorkExp(opt)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            hasWorkExp === opt 
                                ? 'bg-deep-green text-primary shadow-sm' 
                                : 'text-deep-green hover:bg-light-green/30'
                            }`}
                        >
                            {opt}
                        </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {hasWorkExp === 'Yes' && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 overflow-hidden"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <StyledInput label="Years" type="number" placeholder="0" />
                                <StyledInput label="Months" type="number" placeholder="0" />
                            </div>
                            <StyledInput label="Field of Work" placeholder="e.g. Software Development" />
                        </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </FilterSection>

            {/* 5. Course Preferences */}
            <FilterSection title="Course Preferences" icon="tune" defaultOpen={true}>
                <StyledInput label="Intended Course" placeholder="e.g. Data Science" />
                <StyledInput label="Field / Stream" placeholder="e.g. Computer Science" />
                
                <StyledSelect label="Preferred Intake" options={["Any Intake", "Jan 2025", "May 2025", "Sep 2025"]} />
                
                <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-deep-green/80 uppercase tracking-wide">Budget Range (Annual)</label>
                        <span className="text-xs font-bold text-deep-green bg-light-green/30 px-2 py-0.5 rounded">Max: $25k</span>
                    </div>
                    <input 
                        type="range" 
                        min="5000" 
                        max="50000" 
                        step="1000"
                        className="w-full h-2 bg-light-green/30 rounded-lg appearance-none cursor-pointer accent-deep-green" 
                    />
                    <div className="flex justify-between text-[10px] font-bold text-deep-green/50 mt-1">
                        <span>$5k</span>
                        <span>$50k+</span>
                    </div>
                </div>
            </FilterSection>

          </div>
        </div>

        {/* Sticky Sidebar Footer */}
        <div className="sticky bottom-0 bg-off-white p-6 border-t border-deep-green/10 backdrop-blur-xl bg-opacity-90">
          <button className="w-full h-14 bg-primary text-deep-green text-base font-extrabold rounded-xl border border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2">
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
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-green/30 border border-light-green w-fit mb-3">
                <span className="size-2 rounded-full bg-deep-green animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wide text-deep-green">Live Results</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-deep-green tracking-tight">University Matches</h2>
              <p className="text-deep-green/70 mt-2 font-medium">Found <span className="text-deep-green font-black underline decoration-primary decoration-4 underline-offset-2">342</span> programs based on your profile.</p>
            </div>
            
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-deep-green/10 bg-white text-deep-green font-bold hover:bg-deep-green hover:text-white transition-all shadow-sm hover:shadow-md">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export PDF
            </button>
          </div>

          {/* Grid */}
          <motion.div 
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
            {colleges.map((college, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="bg-white rounded-2xl border-2 border-transparent hover:border-light-green p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative overflow-hidden"
              >
                {/* Decorative blob on hover */}
               <div className="absolute -right-12 -top-12 w-32 h-32 bg-light-green/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div> 

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="size-16 rounded-2xl bg-off-white border border-deep-green/10 flex items-center justify-center shadow-inner text-deep-green">
                    <span className="material-symbols-outlined text-3xl">{college.icon}</span>
                  </div>
                  <span className="bg-light-green/30 text-deep-green text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-light-green/50">
                    {college.type}
                  </span>
                </div>

                <div className="mb-6 relative z-10">
                  <h3 className="text-xl font-extrabold text-deep-green leading-tight mb-2 group-hover:text-deep-green/80 transition-colors">{college.name}</h3>
                  <div className="flex items-center gap-1.5 text-deep-green/60 text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {college.location}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-off-white/50 border border-deep-green/5 relative z-10">
                  <div>
                    <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Requirement</p>
                    <p className="text-deep-green font-bold text-sm">{college.ielts}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-deep-green/40 font-black uppercase tracking-wider mb-1">Tuition</p>
                    <p className="text-deep-green font-bold text-sm">{college.fee}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {college.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-white border border-deep-green/10 rounded-md text-deep-green/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-auto w-full py-3.5 rounded-xl border-2 border-deep-green/10 text-deep-green font-bold hover:border-deep-green hover:bg-deep-green hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-md relative z-10">
                  Apply for Application
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CollegeSearch;