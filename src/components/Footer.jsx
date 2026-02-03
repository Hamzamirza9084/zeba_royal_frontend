import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-dark text-off-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-primary">
            <div className="size-6 flex items-center justify-center rounded bg-primary text-deep-green">
              <span className="material-symbols-outlined text-[16px]">school</span>
            </div>
            <h2 className="text-lg font-bold">IELTS Prep.</h2>
          </div>
          <p className="text-off-white/60 text-sm leading-relaxed">
            Empowering students worldwide to achieve their study abroad dreams with top-notch IELTS preparation.
          </p>
          <div className="flex gap-4 mt-2">
            <a className="text-off-white/60 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-off-white/60 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-primary">Company</h3>
          <ul className="flex flex-col gap-4 text-off-white/70">
            <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Success Stories</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Instructors</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Blog</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-primary">Courses</h3>
          <ul className="flex flex-col gap-4 text-off-white/70">
            <li><a className="hover:text-white transition-colors" href="#">Academic Module</a></li>
            <li><a className="hover:text-white transition-colors" href="#">General Training</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Speaking Masterclass</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Writing Correction</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6 text-primary">Support</h3>
          <p className="text-off-white/70 mb-4">help@ieltsprep.com</p>
          <p className="text-off-white/70 mb-6">+1 (555) 987-6543</p>
          <div className="flex gap-3">
            <a className="size-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-deep-green transition-all" href="#">
              <span className="material-symbols-outlined text-xl">share</span>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-off-white/40">
        <p>© 2024 IELTS Prep Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-white" href="#">Privacy Policy</a>
          <a className="hover:text-white" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;