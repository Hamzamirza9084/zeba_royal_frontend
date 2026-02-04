import React, { useState } from 'react';

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
  }
];

const FilterSection = ({ title, icon, children, isOpen = false }) => (
  <details className="group border border-accent/20 rounded-xl bg-white shadow-sm overflow-hidden" open={isOpen}>
    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-off-white/50 transition-colors list-none">
      <div className="flex items-center gap-3 text-deep-green">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        <span className="text-sm font-bold">{title}</span>
      </div>
      <span className="material-symbols-outlined text-deep-green/40 transition-transform group-open:rotate-180">expand_more</span>
    </summary>
    <div className="p-4 pt-0 border-t border-accent/10 space-y-4 mt-4">
      {children}
    </div>
  </details>
);

const InputGroup = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="block text-[11px] font-bold text-deep-green/60 uppercase mb-1.5">{label}</label>
    <input 
      type={type} 
      className="w-full text-sm rounded-lg border-accent/40 bg-off-white/30 text-deep-green placeholder:text-deep-green/30 focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 transition-all"
      placeholder={placeholder} 
    />
  </div>
);

const SelectGroup = ({ label, options }) => (
  <div>
    <label className="block text-[11px] font-bold text-deep-green/60 uppercase mb-1.5">{label}</label>
    <select className="w-full text-sm rounded-lg border-accent/40 bg-off-white/30 text-deep-green focus:border-primary focus:ring-1 focus:ring-primary py-2 px-3 appearance-none">
      {options.map((opt, i) => <option key={i}>{opt}</option>)}
    </select>
  </div>
);

const CollegeSearch = () => {
  // State for conditional rendering
  const [hasBacklogs, setHasBacklogs] = useState("No");
  const [hasWorkExp, setHasWorkExp] = useState("No");
  const [englishTest, setEnglishTest] = useState("IELTS");

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)] font-sans">
      {/* Sidebar Filters - Updated with Detailed Form */}
      <aside className="w-96 border-r border-accent bg-white dark:bg-background-dark overflow-y-auto custom-scrollbar shadow-sm z-10 hidden md:flex flex-col">
        <div className="p-6 pb-24"> {/* pb-24 for bottom button clearance */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-deep-green text-lg font-bold">Profile Evaluation</h1>
              <p className="text-deep-green/60 text-xs">Enter details to find best matches</p>
            </div>
            <button className="text-deep-green/40 hover:text-deep-green transition-colors text-xs font-bold uppercase tracking-wide">
              Reset
            </button>
          </div>

          <div className="space-y-4">
            
            {/* 1. Nationality & Education Origin */}
            <FilterSection title="Nationality & Origin" icon="public" isOpen={true}>
              <SelectGroup label="Nationality" options={["Select Nationality", "India", "Nigeria", "China", "Philippines", "Vietnam"]} />
              <SelectGroup label="Country of Education" options={["Select Country", "India", "USA", "UK", "Canada"]} />
            </FilterSection>

            {/* 2. Academic Details */}
            <FilterSection title="Academic Details" icon="school">
              <SelectGroup label="Highest Qualification" options={["Bachelor's Degree", "Master's Degree", "Diploma (3 Years)", "High School (12th)"]} />
              <InputGroup label="Degree Name" placeholder="e.g. B.Tech Computer Science" />
              <InputGroup label="University / College" placeholder="e.g. Mumbai University" />
              
              <div className="grid grid-cols-2 gap-3">
                <InputGroup label="Graduation Year" placeholder="YYYY" type="number" />
                <InputGroup label="CGPA / %" placeholder="e.g. 8.5 or 85%" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-deep-green/60 uppercase mb-2">History of Backlogs?</label>
                <div className="flex gap-4 mb-3">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="backlogs" 
                        checked={hasBacklogs === opt}
                        onChange={() => setHasBacklogs(opt)}
                        className="accent-primary" 
                      />
                      <span className="text-sm text-deep-green">{opt}</span>
                    </label>
                  ))}
                </div>
                
                {hasBacklogs === 'Yes' && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <InputGroup label="Number of Backlogs" type="number" placeholder="Total count" />
                  </div>
                )}
              </div>
            </FilterSection>

            {/* 3. English Proficiency */}
            <FilterSection title="English Proficiency" icon="language">
              <div className="mb-4">
                <SelectGroup label="Test Type" options={["IELTS", "PTE", "TOEFL", "Duolingo", "MOI (Medium of Instruction)"]} /> 
                {/* Note: In a real app, onChange here would update 'englishTest' state */}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="col-span-2">
                  <InputGroup label="Overall Score" placeholder="e.g. 6.5" />
                </div>
                <InputGroup label="Listening" placeholder="Score" />
                <InputGroup label="Reading" placeholder="Score" />
                <InputGroup label="Writing" placeholder="Score" />
                <InputGroup label="Speaking" placeholder="Score" />
              </div>
              <InputGroup label="Test Date" type="date" />
            </FilterSection>

            {/* 4. Work Experience */}
            <FilterSection title="Work Experience" icon="work">
              <div>
                <label className="block text-[11px] font-bold text-deep-green/60 uppercase mb-2">Do you have work exp?</label>
                <div className="flex gap-4 mb-3">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="workexp" 
                        checked={hasWorkExp === opt}
                        onChange={() => setHasWorkExp(opt)}
                        className="accent-primary" 
                      />
                      <span className="text-sm text-deep-green">{opt}</span>
                    </label>
                  ))}
                </div>

                {hasWorkExp === 'Yes' && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-3">
                      <InputGroup label="Years" type="number" placeholder="0" />
                      <InputGroup label="Months" type="number" placeholder="0" />
                    </div>
                    <InputGroup label="Field of Work" placeholder="e.g. Software Dev" />
                  </div>
                )}
              </div>
            </FilterSection>

            {/* 5. Course Preferences */}
            <FilterSection title="Preferences" icon="tune">
               <InputGroup label="Intended Course" placeholder="e.g. Data Science" />
               <SelectGroup label="Preferred Intake" options={["Any Intake", "Jan 2025", "May 2025", "Sep 2025"]} />
               
               <div className="mt-2">
                <label className="block text-[11px] font-bold text-deep-green/60 uppercase mb-1.5">Budget (Annual)</label>
                <input type="range" className="w-full h-1.5 bg-accent/40 rounded-lg appearance-none accent-primary mb-2" />
                <div className="flex justify-between text-xs font-bold text-deep-green">
                  <span>$10k</span>
                  <span>$50k+</span>
                </div>
               </div>
            </FilterSection>

          </div>

          {/* Sticky Footer Button for Sidebar */}
          <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-accent/10">
            <button className="w-full bg-primary hover:bg-primary/90 text-deep-green font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">search_check</span>
              Find Eligible Colleges
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-off-white/30 dark:bg-background-dark p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-deep-green">Recommended For You</h2>
              <p className="text-deep-green/70 text-sm">Based on your profile, we found <span className="font-bold text-deep-green">342</span> matches</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-accent/60 bg-white rounded-lg text-sm font-medium text-deep-green hover:bg-deep-green/5 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {colleges.map((college, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-accent/60 shadow-sm hover:shadow-lg transition-all group flex flex-col hover:-translate-y-1">
                <div className="flex justify-end mb-2">
                  <span className="bg-accent/30 text-deep-green text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">{college.type}</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-16 rounded-full bg-off-white flex items-center justify-center border-2 border-accent/30 shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-deep-green text-3xl">{college.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-deep-green font-bold text-lg leading-tight">{college.name}</h4>
                    <div className="flex items-center gap-1 text-deep-green/60 text-xs mt-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {college.location}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-off-white/50 rounded-lg border border-accent/10">
                  <div className="space-y-1">
                    <p className="text-[10px] text-deep-green/50 font-bold uppercase">Min. IELTS</p>
                    <p className="text-deep-green font-bold text-sm">{college.ielts}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-deep-green/50 font-bold uppercase">Tuition</p>
                    <p className="text-deep-green font-bold text-sm">{college.fee}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 flex-1">
                  {college.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-1 bg-off-white border border-accent/30 rounded text-deep-green/80">{tag}</span>
                  ))}
                </div>

                <button className="w-full py-2.5 bg-primary text-deep-green text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2">
                  View Details
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeSearch;