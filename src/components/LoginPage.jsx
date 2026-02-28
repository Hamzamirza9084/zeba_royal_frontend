import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const LoginPage = () => {
  const navigate = useNavigate();

  // 1. Initialize State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // 2. Function to handle typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data && response.data.token) {
        // Save user info and token to local storage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Success Toast with Redirect callback
        toast.success("Login Successful! Redirecting...", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          onClose: () => {
            // Redirect based on role after toast closes
            if (response.data.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/colleges');
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Invalid Email or Password";

      // Error Toast
      toast.error(errMsg, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen bg-off-white font-display text-deep-green overflow-hidden flex">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Left Section: Visual & Branding (Hidden on mobile) */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-light-green/20">
        <div className="relative z-20 flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-lg  text-primary">
            <img src="../../public/Images/svglogo.svg" alt="Anvora logo" className="w-8 h-8 object-contain" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Anvora.</h1>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-white flex items-center justify-center p-12">
            <img src="/Images/svglogo.svg" alt="Anvora Hero Logo" className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
          </div>

          <div className="mt-12 text-center max-w-sm">
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              "We have successfully guided over 1,000<sup>+</sup> students to their top universities."
            </h2>
            <p className="text-deep-green/70 font-medium">Join over 1,000 students achieving their goals.</p>
          </div>
        </div>

        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
      </section>

      {/* Right Section: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 ">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="size-10 flex items-center justify-center rounded-lg  text-primary">
              <img src="/Images/svglogo.svg" alt="Anvora logo" className="w-8  h-8 object-contain" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">Anvora.</h2>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight mb-2">Welcome back</h2>
            <p className="text-deep-green/60 font-medium">Log in to continue your preparation journey.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="email">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-light-green focus:border-deep-green outline-none transition-all bg-off-white/30"
                id="email"
                placeholder="name@example.com"
                type="email"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold" htmlFor="password">Password</label>
                <a className="text-xs font-bold hover:text-primary transition-colors" href="#">Forgot Password?</a>
              </div>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-light-green focus:border-light-green outline-none transition-all bg-off-white/30"
                id="password"
                placeholder="••••••••"
                type="password"
                required
              />
            </div>

            <button
              className="w-full h-14 bg-primary text-deep-green font-extrabold rounded-xl border border-deep-green shadow-[4px_4px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(52,121,40,1)] transition-all"
              type="submit"
            >
              Login to Dashboard
            </button>
          </form>

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