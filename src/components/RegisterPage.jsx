import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="bg-off-white font-display text-deep-green min-h-screen">
      <main className="w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Section: Branding & Features */}
        <section className="hidden lg:flex w-1/2 bg-deep-green p-12 lg:p-20 flex-col justify-between relative overflow-hidden sticky top-0 h-screen">
          <div className="absolute top-0 right-0 w-64 h-64 bg-light-green/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full -ml-48 -mb-48"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary mb-16">
              <div className="size-10 flex items-center justify-center rounded-xl bg-primary text-deep-green">
                <span className="material-symbols-outlined text-[24px]">school</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-off-white">IELTS Prep.</h1>
            </div>

            <div className="space-y-12">
              <h2 className="text-5xl font-extrabold text-off-white leading-tight">
                Start your journey to a <span className="text-primary">high band score</span> today.
              </h2>
              <div className="space-y-8">
                {[
                  { icon: 'assignment_turned_in', title: 'Free Diagnostic Test', desc: 'Identify your strengths and weaknesses with our comprehensive assessment.' },
                  { icon: 'groups', title: 'Expert Community', desc: 'Join 50,000+ students and certified trainers in active learning groups.' },
                  { icon: 'verified_user', title: 'Proven Strategies', desc: 'Access materials that helped 92% of students reach Band 7.5+.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 items-start">
                    <div className="size-12 shrink-0 rounded-full bg-light-green/20 flex items-center justify-center border border-light-green/30">
                      <span className="material-symbols-outlined text-light-green">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-light-green mb-1">{item.title}</h3>
                      <p className="text-off-white/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-12">
            <p className="text-off-white/50 text-sm">© 2024 IELTS Prep Platform.</p>
          </div>
        </section>

        {/* Right Section: Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-off-white">
          <div className="w-full max-w-xl flex flex-col gap-8">
            <div className="lg:hidden flex items-center gap-3 text-deep-green mb-4">
              <div className="size-8 flex items-center justify-center rounded-lg bg-deep-green text-primary">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">IELTS Prep.</h2>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold text-deep-green">Create Account</h2>
              <p className="text-deep-green/60 font-medium">Join the thousands of students already preparing with us.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="md:col-span-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-deep-green/40 mb-2 border-b border-light-green pb-2">Basic Information</h3>
              </div>
              
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-bold text-deep-green/80 ml-1">Full Name</label>
                <input className="w-full px-4 py-3 rounded-xl border-2 border-light-green bg-white focus:ring-0 focus:border-deep-green transition-colors" placeholder="John Doe" type="text" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-deep-green/80 ml-1">Email Address</label>
                <input className="w-full px-4 py-3 rounded-xl border-2 border-light-green bg-white focus:ring-0 focus:border-deep-green transition-colors" placeholder="john@example.com" type="email" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-deep-green/80 ml-1">Phone Number</label>
                <input className="w-full px-4 py-3 rounded-xl border-2 border-light-green bg-white focus:ring-0 focus:border-deep-green transition-colors" placeholder="+1 (555) 000-0000" type="tel" />
              </div>

           

              

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-bold text-deep-green/80 ml-1">Password</label>
                <input className="w-full px-4 py-3 rounded-xl border-2 border-light-green bg-white focus:ring-0 focus:border-deep-green transition-colors" placeholder="••••••••" type="password" />
              </div>

              <div className="md:col-span-2">
                <button className="w-full h-14 bg-primary text-deep-green font-bold text-lg rounded-xl shadow-[0px_4px_0px_0px_#347928] hover:translate-y-[2px] hover:shadow-[0px_2px_0px_0px_#347928] active:translate-y-[4px] active:shadow-none transition-all mt-4">
                  Create Account
                </button>
              </div>
            </form>

            <div className="flex flex-col gap-6 items-center">
              <p className="text-deep-green/60 text-sm">
                Already have an account? 
                <Link to="/login" className="font-bold text-deep-green hover:text-primary transition-colors ml-1 underline decoration-primary decoration-2 underline-offset-4">Log in instead</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;