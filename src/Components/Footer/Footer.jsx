import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
// import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-300 text-base-content">
      {/* Top Section */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        {/* Logo & Website Name */}
        <div className="flex items-center gap-3">
          {/* <img
            src={Logo}
            alt="Digital Life Lessons Logo"
            className="w-12 h-12"
          /> */}
          <span className="text-xl! font-bold!">Digital Life Lessons</span>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: info@digitallifelessons.com</p>
          <p>Phone: +880 1234 567890</p>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <a href="/terms" className="block hover:underline">
            Terms & Conditions
          </a>
          <a href="/privacy" className="block hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center border-t border-base-200 pt-4">
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by
          Digital Life Lessons
        </p>
      </div>
    </footer>
  );
};

export default Footer;
