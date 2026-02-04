import React from 'react';

const LandingPage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-light-green/30 border border-light-green w-fit">
              <span className="size-2 rounded-full bg-deep-green"></span>
              <span className="text-xs font-semibold uppercase tracking-wide text-deep-green dark:text-light-green">New batches starting soon</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-deep-green dark:text-white tracking-tight">
              Achieve Your Dream <span className="relative inline-block z-10 px-2 italic">IELTS Score<span className="absolute bottom-2 left-0 w-full h-3 bg-primary/60 -z-10 rounded-sm"></span></span> With Us.
            </h1>
            <p className="text-lg md:text-xl text-deep-green/80 dark:text-off-white/80 leading-relaxed max-w-lg">
              Comprehensive preparation courses, expert guidance, and proven strategies to help you reach Band 8+ in your first attempt.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-deep-green text-base font-bold shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] transition-all border border-deep-green">
                Start Free Trial
              </button>
              <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-transparent text-deep-green dark:text-white text-base font-bold border border-deep-green dark:border-white hover:bg-deep-green/5 dark:hover:bg-white/10 transition-colors">
                View Courses
              </button>
            </div>
          </div>
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-light-green group">
            <div className="absolute inset-0 bg-deep-green/10 mix-blend-multiply z-10"></div>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Student focused on IELTS exam preparation with books and laptop" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgFiM0XCZLFlQdLn0Hr5TLL3SxU_V1GqP37qU_MrbP_jQxmSAtb-rtuYVx5ZVLSbDPUrr9rHbOawcq1hqgYiLjRfFBR2tAZ6_ttTYNXuSbT-7jF_ypK1E2UPNfWqsahMU1fwWDyhPeO3m9Hp2KWisYMqpdSgz6ct4YGTCvn525r7J_uLdcfjB4nrw6yLMAwwxYfN7lS94RTWSXQu1zashMD489nBExXtgZ8Vn13bjmbkuHha933mG-Ybc5H7OH6MXIz6DG2PG-OKgW")' }}>
            </div>
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-off-white/95 dark:bg-background-dark/95 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-deep-green dark:text-primary">Recent Success</span>
                <span className="material-symbols-outlined text-deep-green dark:text-primary">arrow_outward</span>
              </div>
              <p className="text-lg font-bold text-deep-green dark:text-white">Band 8.5 Achieved</p>
              <p className="text-sm text-deep-green/70 dark:text-off-white/70">Academic Module • Cambridge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Logos Section */}
      <section className="w-full py-10 border-y border-deep-green/10 bg-light-green/20 dark:bg-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <p className="text-sm font-semibold text-deep-green/60 dark:text-off-white/60 mb-8 uppercase tracking-widest">Trusted by students aiming for top universities</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-8 w-24 bg-deep-green/20 rounded dark:bg-white/20"></div>
            <div className="h-8 w-24 bg-deep-green/20 rounded dark:bg-white/20"></div>
            <div className="h-10 w-10 bg-deep-green/20 rounded-full dark:bg-white/20"></div>
            <div className="h-8 w-24 bg-deep-green/20 rounded dark:bg-white/20"></div>
            <div className="h-8 w-24 bg-deep-green/20 rounded dark:bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-16 items-start md:items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-deep-green dark:text-white mb-6 leading-tight">
              Everything you need to <span className="text-deep-green/40 dark:text-white/40">ace the test.</span>
            </h2>
            <p className="text-lg text-deep-green/80 dark:text-off-white/80 max-w-lg">
              Our comprehensive curriculum covers Listening, Reading, Writing, and Speaking modules with personalized attention.
            </p>
          </div>
          <a className="group flex items-center gap-2 text-deep-green dark:text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary hover:border-deep-green transition-all" href="#">
            See All Features
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-light-green rounded-2xl p-8 flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-14 rounded-xl bg-deep-green text-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-deep-green">Expert Coaching</h3>
              <p className="text-deep-green/80 font-medium">Learn directly from certified IELTS trainers who have helped thousands achieve their goals.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-deep-green/10">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> 1-on-1 Sessions
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Live Webinars
                </li>
              </ul>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="bg-off-white border-2 border-light-green rounded-2xl p-8 flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-14 rounded-xl bg-primary text-deep-green flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-3xl">quiz</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-deep-green">Practice Tests</h3>
              <p className="text-deep-green/80">Full-length mock tests that simulate the real exam environment with timer integration.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-deep-green/10">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Real-time Scoring
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Detailed Analytics
                </li>
              </ul>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="bg-light-green rounded-2xl p-8 flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="size-14 rounded-xl bg-deep-green text-primary flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-3xl">edit_note</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-deep-green">Writing Feedback</h3>
              <p className="text-deep-green/80 font-medium">Submit your essays and get detailed corrections, band estimation, and improvement tips.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-deep-green/10">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Grammar Check
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-deep-green">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> Band Estimation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-deep-green text-off-white overflow-hidden rounded-3xl mx-4 md:mx-12 lg:mx-20 relative">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-light-green/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              We help you unlock global opportunities.
            </h2>
            <div className="space-y-6">
              {[
                { num: '01', title: 'Assess', desc: 'Take a free diagnostic test to identify your current level and areas for improvement.' },
                { num: '02', title: 'Prepare', desc: 'Follow a personalized study plan with interactive video lessons and targeted practice.' },
                { num: '03', title: 'Succeed', desc: 'Walk into the exam hall with confidence and achieve your desired band score.' }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="min-w-12 h-12 rounded-full bg-light-green text-deep-green flex items-center justify-center font-bold text-lg">{step.num}</div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">{step.title}</h4>
                    <p className="text-off-white/80">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-background-dark/50">
              <div className="w-full h-full bg-cover bg-center" data-alt="Student studying on laptop in a library" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCj5v_BN2ZtR-UeZLD5kjrqlvIt18VMkVkzlhvtmAiFY6JXn1bpSYrQhfnZuw3pRBgSmEpVZ1GYhteSkHogFRu9kg6DsXRU7IM8CkN0gZsdiK3eDm4VwatV65XuNFAM7Yfa9pSdK8KuLLgvfXGwaVnbHL6iwmz_beCD3oRzTlvGZRTGMG9B5ygWcZaYb6o27XXCqLFa5zjoQwodM5lS0MJrsvsYtcKxxClGZNKoymiJEGJWERvCSfMD4ubuHAWMvZS0LDLnj6777FBm")' }}></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-deep-green p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
              <p className="text-3xl font-black">50k+</p>
              <p className="text-sm font-bold uppercase">Students Placed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto text-center">
        <div className="bg-off-white border border-deep-green/10 rounded-3xl p-10 md:p-20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-deep-green via-light-green to-primary"></div>
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-8 items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-deep-green dark:text-background-dark tracking-tight">
              Ready to check your <span className="text-transparent bg-clip-text bg-gradient-to-r from-deep-green to-primary">readiness?</span>
            </h2>
            <p className="text-lg md:text-xl text-deep-green/70 dark:text-background-dark/80">
              Start a free diagnostic test today and know exactly where you stand before the big day.
            </p>
            <button className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-deep-green text-lg font-bold hover:scale-105 transition-transform shadow-lg">
              Start Diagnostic Test
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;