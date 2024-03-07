"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaUsersCog } from "react-icons/fa";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="w-full flex z-50">
      <nav className="w-full flex flex-row justify-between mt-2">
        <div className="flex justify-center flex-row">
          <Image
            src="/logo.svg" // Update the path to your logo
            alt="logo"
            width={40}
            height={44}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-white">Anime Vault</h1>
        </div>

        {/* Hamburger menu button */}
        <div className="flex flex-row justify-end gap-4 md:hidden">
          <FaBars
            style={{ fontSize: "25px", cursor: "pointer" }}
            // onClick={toggleMenu}
          />
        </div>

        {/* Navigation links */}
        <div
          className={`md:flex flex-row gap-4 ${showMenu ? "block" : "hidden"}`}
        >
          <ul>Explore</ul>
          <ul>New Animes</ul>
          <ul>Genre</ul>
          <ul>
            <span>
              <FaUsersCog style={{ fontSize: "25px" }} />
            </span>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
