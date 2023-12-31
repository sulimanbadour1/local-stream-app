import React, { useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Footer() {
  // Make the transition from the logo to the top of the page smooth
  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className="h-full">
      <footer
        className="fixed bottom-0 left-0 w-full bg-white/60 text-center
       text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200
       "
      >
        <div
          className="mx-auto w-10 h-10 md:h-12 md:w-12 bg-black rounded-full filter  grayscale-100
        hover:bg-gray-500  transition-all duration-300 ease-in-out"
        >
          <a href="#nav" onClick={handleLogoClick}>
            <img
              className="w-10 h-10 md:h-12 md:w-12 object-contain rounded-full mx-auto"
              src={Logo}
              alt="logo"
            />
          </a>
        </div>
        <p
          className="text-sm rounded-full flex items-center mt-2 mb-2
         text-center font-semibold justify-center md:text-sm p-2"
        >
          Made with ❤️ by Suliman &copy; Oct 2023
        </p>
      </footer>
    </div>
  );
}
