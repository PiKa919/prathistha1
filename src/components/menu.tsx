"use client"
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { 
    label: 'Yuva',
    path: '/yuva'
  },
  { 
    label: 'Aurum',
    path: '/aurum'
  },
  { 
    label: 'Olympus',
    path: '/sports/'
  },
  { 
    label: 'Verve',
    path: '/verve'
  },
  {
    label: 'Teams',
    path: '/team',
    submenu: [
      { label: 'Student Council', path: '/team' },
      { label: 'Extended Teams', path: '/team/extended' },
      { label: 'Faculty', path: '/team/faculty' }
    ]
  },
  { 
    label: 'Sponsors',
    path: '/sponsors'
  },
  { 
    label: 'Contact Us',
    path: '/contact'
  }
];

interface MenuItem {
  label: string;
  path: string;
  submenu?: MenuItem[];
}

const NavItem = ({ item }: { item: MenuItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300); // 300ms delay before hiding
  };

  return (
    <div 
      className="nav-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={item.path} className="nav-link">
        {item.label}
      </Link>
      
      {item.submenu && isHovered && (
        <div className="dropdown-menu">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.path}
              className="dropdown-item"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  return (
    <>
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-wrapper">
            {/* Logo Section */}
            <div className="logo-section">
              <Link href="/">
                <Image
                  src="/assets/logos/sakec_white.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="logo-image"
                />
              </Link>
              <div className="logo-placeholder">
                <Image
                  src="/assets/logos/sc_logo.png"
                  alt="Student council Logo"
                  width={60}
                  height={60}
                  className="logo-image"
                />
              </div>
              <div className="logo-text-container">
                <h1 className="logo-text">Prathistha</h1>
                <span className="logo-subtext">sakecfest</span>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="nav-items">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="mobile-menu">
              <button className="mobile-menu-button">
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @font-face {
          font-family: 'MAEL';
          src: url('/fonts/MAEL____.TTF') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500&family=Righteous&display=swap');

        .nav-container {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 50;
        }

        .nav-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4rem;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1.5rem; /* Increased gap between items */
        }

        .logo-image {
          height: 2.5rem;
          width: auto;
        }

        .logo-placeholder {
          display: flex;
          align-items: center;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 0.5rem;
          position: relative;
          min-width: 120px; /* Ensure enough width for the subtext */
        }

        .logo-text {
          font-family: 'MAEL', sans-serif;
          color: goldenrod;
          font-size: 1.75rem;
          line-height: 1;
          margin: 0;
        }

        .logo-subtext {
          font-family: 'MAEL', sans-serif;
          color: goldenrod;
          font-size: 0.8rem;
          letter-spacing: 1px;
          position: absolute;
          right: 0;
          bottom: -0.8rem;
        }

        .nav-items {
          display: none;
        }

        @media (min-width: 768px) {
          .nav-items {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }

          .mobile-menu {
            display: none;
          }
        }

        :global(.nav-item) {
          position: relative;
        }

        :global(.nav-link) {
          padding: 0.5rem 1rem;
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
          font-family: Arial, sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }

        :global(.nav-link::after) {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: goldenrod;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        :global(.nav-link:hover::after) {
          width: calc(100% - 2rem); /* Subtracting padding from both sides */
        }

        :global(.nav-link:hover) {
          color: goldenrod;
        }

        :global(.dropdown-menu) {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: rgba(0, 0, 0, 0.9);
          min-width: 200px;
          padding: 0.75rem 0;
          box-shadow: 0 4px 15px -1px rgba(0, 0, 0, 0.2);
          animation: dropdownAnimation 0.2s ease-out forwards;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          margin-top: 0.5rem;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        :global(.dropdown-item) {
          display: block;
          padding: 0.75rem 1.25rem;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: Arial, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        :global(.dropdown-item:first-child) {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        :global(.dropdown-item:last-child) {
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .mobile-menu-button {
          color: white;
          padding: 0.5rem;
        }

        @keyframes dropdownAnimation {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </>
  );
};

export default Menu;