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

const NavItem = ({ item, isMobile, onItemClick }: { item: MenuItem; isMobile?: boolean; onItemClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsHovered(!isHovered);
    }
    if (onItemClick && (!item.submenu || isMobile)) {
      onItemClick();
    }
  };

  return (
    <div 
      className={`nav-item ${isMobile ? 'mobile' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick} className="nav-link">
        {item.label}
      </div>
      
      {item.submenu && (isHovered || (isMobile && isHovered)) && (
        <div className={`dropdown-menu ${isMobile ? 'mobile' : ''}`}>
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.path}
              className="dropdown-item"
              onClick={onItemClick}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

            {/* Desktop Navigation Items */}
            <div className="nav-items">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" onClick={toggleMobileMenu}>
              <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item, index) => (
            <NavItem key={index} item={item} isMobile onItemClick={closeMobileMenu} />
          ))}
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
          display: none;
          background: linear-gradient(
            135deg,
            rgba(40, 40, 40, 0.95) 0%,
            rgba(20, 20, 20, 0.95) 100%
          );
          border: none;
          cursor: pointer;
          padding: 12px;
          z-index: 1000; // Increased z-index to stay on top
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
          position: fixed; // Changed to fixed
          top: 1rem;
          right: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .hamburger {
          width: 28px;  // Slightly larger
          height: 24px;  // Slightly larger
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 3px;  // Slightly thicker lines
          width: 100%;
          background-color: white;
          transition: all 0.3s ease;
          border-radius: 2px;  // Rounded edges
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(10.5px) rotate(45deg);  // Adjusted for new size
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-10.5px) rotate(-45deg);  // Adjusted for new size
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 4rem;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(8px);
          z-index: 40;
          padding: 1rem;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          display: none;
        }

        .mobile-menu-overlay.open {
          transform: translateX(0);
        }

        @media (max-width: 767px) {
          .nav-items {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;  // Fixed width
            height: 48px;  // Fixed height for consistent touch target
            margin-right: -8px;  // Offset the padding
          }

          .mobile-menu-button:active {
            background: linear-gradient(
              135deg,
              rgba(50, 50, 50, 0.95) 0%,
              rgba(30, 30, 30, 0.95) 100%
            );
            transform: scale(0.95);
          }

          .mobile-menu-overlay {
            z-index: 999; // Just below the menu button
            top: 0;
            padding-top: 5rem;
          }

          .mobile-menu-overlay {
            display: block;
          }

          :global(.nav-item.mobile) {
            margin: 1rem 0;
          }

          :global(.nav-item.mobile .nav-link) {
            font-size: 1.25rem;
            padding: 0.75rem 1rem;
          }

          :global(.dropdown-menu.mobile) {
            position: relative;
            background: transparent;
            box-shadow: none;
            margin-left: 1rem;
            animation: none;
          }

          :global(.dropdown-menu.mobile .dropdown-item) {
            padding: 0.5rem 1rem;
            font-size: 1.1rem;
          }
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