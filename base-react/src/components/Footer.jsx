import React from "react";

const Footer = () => {
  return (
    // <footer className="bg-blue-600 mt-8">
    <footer className="bg-violet-800 mt-8">

      <div className="max-w-screen-xl mx-auto px-4 py-6 md:flex md:items-center md:justify-between">
        {/* Footer Text */}
        <span className="text-sm text-white">
          © 2025 ClimateEd. All Rights Reserved.
        </span>

        {/* Footer Links */}
        <div className="flex mt-4 space-x-6 md:mt-0">
          <a
            href="#"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
