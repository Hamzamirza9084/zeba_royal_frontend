import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextType from './TextType';

const UniversityFinder = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fbfcf4] min-h-screen font-sans text-[#1a3b22]">
      
      <main>
        {/* Hero Section */}
        <section className="relative w-full py-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e7f2d7] border border-[#d1e6b5] w-fit">
                <span className="size-2 rounded-full bg-[#1a3b22]"></span>
                <span className="text-xs font-bold uppercase tracking-wide">2026 Admissions Open</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Find Your Future{' '}
                <span className="relative inline-block px-2 italic text-deep-green">
                  {/* Integrated TextType Component */}
                  <TextType 
                    text={["University", "College", "Degree"]} 
                    typingSpeed={100}  
                    deletingSpeed={50}
                    pauseDuration={1500}
                    showCursor={true}  
                    cursorCharacter="|"  
                    variableSpeedEnabled={false}  
                    cursorBlinkDuration={0.5}
                  />
                  {/* Yellow Underline */}
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#f8d548]/60 -z-10 rounded-sm"></span>
                </span>{' '}
                In Seconds.
              </h1>

              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                Explore thousands of accredited programs worldwide with expert guidance on visas, scholarships, and admission requirements.
              </p>
              
              {/* Search Bar Integration */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Search by country or major..." 
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-[#1a3b22] bg-white focus:outline-none focus:ring-4 focus:ring-[#f8d548]/20"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 opacity-50">search</span>
                </div>
                <button 
                  onClick={() => navigate('/colleges')}
                  className="h-14 px-8 bg-[#f8d548] rounded-xl font-bold border-2 border-[#1a3b22] shadow-[4px_4px_0px_0px_rgba(26,59,34,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(26,59,34,1)] transition-all"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-[#e7f2d7] p-8 border border-[#d1e6b5]">
                {/* Updated Image: Classic University Building */}
               <div 
  className="w-full h-full rounded-2xl bg-cover bg-center bg-black/10 mix-blend-multiply" 
  style={{ 
    backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80")' 
  }}
></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#1a3b22]">Most Applied</span>
                    <span className="material-symbols-outlined text-[#1a3b22]">trending_up</span>
                  </div>
                  <p className="text-xl font-bold">University of Toronto</p>
                  <p className="text-sm opacity-60">98% Success Rate for International Students</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 px-6 max-w-[1440px] mx-auto">
           <div className="grid md:grid-cols-2 gap-8">
             {/* Card 1 */}
             <div className="bg-[#e7f2d7] rounded-3xl p-8 flex flex-col gap-6 border border-[#d1e6b5]">
               <div className="size-14 rounded-2xl bg-[#1a3b22] text-[#f8d548] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">language</span>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Global Search</h3>
                 <p className="opacity-80">Access databases for universities in USA, UK, Canada, and 40+ other countries.</p>
               </div>
               <ul className="mt-auto space-y-2 text-sm font-bold">
                 <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check_circle</span> Verified Profiles</li>
                 <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check_circle</span> Real-time Fees</li>
               </ul>
             </div>

             {/* Card 3 (Moved to pos 2 as Card 2 was commented out in your snippet) */}
             <div className="bg-[#e7f2d7] rounded-3xl p-8 flex flex-col gap-6 border border-[#d1e6b5]">
               <div className="size-14 rounded-2xl bg-[#1a3b22] text-[#f8d548] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">history_edu</span>
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Visa Assistance</h3>
                 <p className="opacity-80">Step-by-step documentation help tailored to your specific destination country.</p>
               </div>
               <ul className="mt-auto space-y-2 text-sm font-bold">
                 <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check_circle</span> Document Checklist</li>
                 <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">check_circle</span> Mock Interviews</li>
               </ul>
             </div>
           </div>
        </section>

        {/* Process Section (Deep Green) */}
        <section className="py-20 bg-[#1a3b22] text-[#fbfcf4] rounded-[3rem] mx-4 md:mx-12 lg:mx-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#f8d548]/10 rounded-full blur-3xl"></div>
          <div className="max-w-5xl mx-auto px-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Your roadmap to studying abroad.</h2>
              <div className="space-y-6">
                {[
                  { n: '01', t: 'Profile Evaluation', d: 'Enter your grades and preferences for a customized university shortlist.' },
                  { n: '02', t: 'Apply with Ease', d: 'One-click application process to multiple universities simultaneously.' },
                  { n: '03', t: 'Enrollment Support', d: 'Get help with housing, flights, and pre-departure orientations.' }
                ].map((step) => (
                  <div key={step.n} className="flex gap-6">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#e7f2d7] text-[#1a3b22] flex items-center justify-center font-black">{step.n}</div>
                    <div>
                      <h4 className="text-xl font-bold text-[#f8d548] mb-1">{step.t}</h4>
                      <p className="opacity-70 text-sm">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
               <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white/10">
                  {/* Updated Image: Students Studying */}
                  <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80")' }}
                  ></div>
               </div>
               <div className="absolute -bottom-6 -left-6 bg-[#f8d548] text-[#1a3b22] p-6 rounded-2xl shadow-xl">
                 <p className="text-3xl font-black">2.5k+</p>
                 <p className="text-xs font-bold uppercase">Partner Institutions</p>
               </div>
            </div>
          </div>
        </section>

      <br></br>
      </main>
    </div>
  );
};

export default UniversityFinder;