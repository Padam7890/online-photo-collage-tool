import React, { useState } from "react";
import { Button } from "./ui/button";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and Close icons
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {" "}
      <nav className="flex justify-between items-center py-6">
        {/* Logo */}
        <Link href="#" className="text-xl font-bold">
          MyLogo
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-8">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Contct</Link>
          </li>
          <li>
            <Link href="#">Terms</Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Button type="button" className="hidden md:block font-medium">
          Try It Now
        </Button>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FiMenu size={28} />
          </button>
        </div>
      </nav>
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button Positioned in Top-Right Corner */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <FiX size={28} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col items-start p-6 space-y-6">
          <a href="#" className="text-lg font-medium" onClick={toggleMenu}>
            Home
          </a>
          <a href="#" className="text-lg font-medium" onClick={toggleMenu}>
            About
          </a>
          <a href="#" className="text-lg font-medium" onClick={toggleMenu}>
            Contact
          </a>
          <a href="#" className="text-lg font-medium" onClick={toggleMenu}>
            Terms
          </a>
          <Button
            type="button"
            className="w-full mt-4 font-medium"
            onClick={toggleMenu}
          >
            Try It Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
