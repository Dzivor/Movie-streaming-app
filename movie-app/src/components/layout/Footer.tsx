import { NavLink } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Stream<span className="text-red-600">Vibe</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your ultimate destination for streaming movies and shows. Discover
              thousands of titles across all genres and enjoy unlimited
              entertainment.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Home Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Home</h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Devices
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Movies & Shows */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Movies & Shows
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/Movies"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Genres
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Movies"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Trending
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Movies"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  New Releases
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Movies"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Popular
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/Support"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <a
                  href="mailto:support@streamvibe.com"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <NavLink
                  to="/Support"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Support"
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300 text-sm"
                >
                  Plans
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} StreamVibe. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a
                href="/terms"
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/cookies"
                className="text-gray-500 hover:text-red-500 transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
