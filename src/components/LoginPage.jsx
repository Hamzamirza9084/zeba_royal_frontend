import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-off-white font-display text-deep-green overflow-hidden flex">
      {/* Left Section: Visual & Branding (Hidden on mobile) */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-light-green/20">
        <div className="relative z-20 flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-lg bg-deep-green text-primary">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">IELTS Prep.</h1>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-[#E6E2D3] flex items-center justify-center">
             {/* Decorative Elements matching your screenshot style */}
             <div className="absolute top-10 right-10 w-40 h-40 bg-[#F5B5C5] rounded-full opacity-80"></div>
             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#F28C44] rounded-t-full"></div>
             <div className="relative z-10 text-6xl rotate-12">🌿</div>
          </div>
          
          <div className="mt-12 text-center max-w-sm">
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              "Your dream score is just a few practice sessions away."
            </h2>
            <p className="text-deep-green/70 font-medium">Join over 50,000 students achieving their goals.</p>
          </div>
        </div>

        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
      </section>

      {/* Right Section: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 ">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="size-10 flex items-center justify-center rounded-lg bg-deep-green text-primary">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">IELTS Prep.</h2>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Welcome back</h2>
            <p className="text-deep-green/60 font-medium">Log in to continue your preparation journey.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="email">Email Address</label>
              <input 
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-light-green focus:border-deep-green outline-none transition-all bg-off-white/30" 
                id="email" 
                placeholder="name@example.com" 
                type="email" 
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold" htmlFor="password">Password</label>
                <a className="text-xs font-bold hover:text-primary transition-colors" href="#">Forgot Password?</a>
              </div>
              <input 
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-light-green focus:border-light-green outline-none transition-all bg-off-white/30" 
                id="password" 
                placeholder="••••••••" 
                type="password" 
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                className="size-4 rounded border-gray-300 text-deep-green focus:ring-light-green" 
                id="remember" 
                type="checkbox" 
              />
              <label className="text-sm font-medium text-deep-green/70" htmlFor="remember">Remember for 30 days</label>
            </div>

            <button 
              className="w-full h-14 bg-primary text-deep-green font-extrabold rounded-xl border border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] transition-all"
              type="submit"
            >
              Login to Dashboard
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-deep-green/40 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-gray-100 hover:bg-gray-50 transition-colors font-bold text-sm">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-gray-100 hover:bg-gray-50 transition-colors font-bold text-sm">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
              Facebook
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-deep-green/60">
            Don't have an account? 
            <Link to="/register" className="ml-1 font-bold text-deep-green hover:text-primary transition-colors underline decoration-primary decoration-2 underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;