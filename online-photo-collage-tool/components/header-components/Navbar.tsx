"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { headerCTAButton, logo } from "@/data/headerdata";
import Navmenu from "./Navmenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <nav className="flex justify-between items-center py-6 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          {logo.text}
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          <Navmenu />
        </ul>

        {/* CTA Button */}
        <Button
          type="button"
          className={`hidden md:block font-medium bg-${headerCTAButton.color}`}
        >
          {headerCTAButton.text}
        </Button>

        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <FiX size={28} />
          </button>
        </div>

        {/* Sidebar Links and CTA Button */}
        <div className="flex flex-col p-6 space-y-6">
          <ul className="flex flex-col gap-5">
            <Navmenu />
          </ul>
          <Button
            type="button"
            className={`w-full font-medium bg-${headerCTAButton.color}`}
            onClick={toggleMenu}
          >
            {headerCTAButton.text}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
