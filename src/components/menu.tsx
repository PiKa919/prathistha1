"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { label: 'Aurum', path: '/aurum' },
  { label: 'Olympus', path: '/sports' },
  { label: 'Verve', path: '/verve' },
  {
    label: 'Teams',
    path: '/team',
    submenu: [
      { label: 'Student Council', path: '/team' },
      { label: 'Extended Teams', path: '/team/extended' },
      { label: 'Faculty', path: '/team/faculty' }
    ]
  },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Contact Us', path: '/contact' }
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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      {item.submenu ? (
        <div 
          onClick={handleClick} 
          className={`nav-link ${item.submenu ? 'has-submenu' : ''}`}
        >
          {item.label}
          {item.submenu && isMobile && (
            <span className={`dropdown-arrow ${isHovered ? 'open' : ''}`}>▼</span>
          )}
        </div>
      ) : (
        <Link href={item.path} className="nav-link" onClick={onItemClick}>
          {item.label}
        </Link>
      )}
      
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'unset' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="nav-wrapper">
            <div className="logo-section">
              <a href="https://www.sakec.ac.in" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/assets/logos/sakec_white.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="logo-image"
                />
              </a>
              <div className="logo-placeholder">
                <Link href="/team">
                <Image
                  src="/assets/logos/sc_logo.png"
                  alt="Student council Logo"
                  width={60}
                  height={60}
                  className="logo-image"
                />
                </Link>
              </div>
              <Link href="/">
              <div className="logo-text-container">
                <h1 className="logo-text">Pratishtha</h1>
                <span className="logo-subtext">sakecfest</span>
              </div>
              </Link>
            </div>

            <div className="nav-items">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>

            <button 
              className="mobile-menu-button" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item, index) => (
            <NavItem 
              key={index} 
              item={item} 
              isMobile 
              onItemClick={closeMobileMenu}
            />
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

        .nav-container {
          background-color: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 50;
          transition: all 0.3s ease;
        }

        .nav-container.scrolled {
          background-color: rgba(0, 0, 0, 0.95);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
          gap: 1.5rem;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 0.5rem;
          position: relative;
          min-width: 120px;
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
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        :global(.nav-item) {
          position: relative;
        }

        :global(.nav-link) {
          padding: 0.5rem 1rem;
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
          font-family: Arial, sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          width: calc(100% - 2rem);
        }

        :global(.nav-link:hover) {
          color: goldenrod;
        }

        :global(.dropdown-arrow) {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        :global(.dropdown-arrow.open) {
          transform: rotate(180deg);
        }

        :global(.dropdown-menu) {
          position: absolute;
          top: 100%;
          left: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95) 0%,
            rgba(20, 20, 20, 0.95) 100%
          );
          min-width: 200px;
          padding: 0.75rem 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(8px);
          margin-top: 0.5rem;
          animation: dropdownAnimation 0.2s ease-out forwards;
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

        :global(.dropdown-item:hover) {
          background: rgba(218, 165, 32, 0.1);
          color: goldenrod;
        }

        .mobile-menu-button {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 12px;
          z-index: 1000;
        }

        .hamburger {
          width: 28px;
          height: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: white;
          transition: all 0.3s ease;
          transform-origin: left;
          border-radius: 2px;
        }

        .hamburger.open span:first-child {
          transform: rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:last-child {
          transform: rotate(-45deg);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 60vh;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.98) 0%,
            rgba(20, 20, 20, 0.98) 100%
          );
          backdrop-filter: blur(8px);
          z-index: 40;
          padding: 5rem 1rem 1rem 1rem;
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
          display: none;
          overflow-y: auto;
        }

        .mobile-menu-overlay.open {
          transform: translateX(0);
        }

        @media (max-width: 767px) {
          .nav-items {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .mobile-menu-overlay {
            display: block;
          }

          :global(.nav-item.mobile) {
            margin: 1rem 0;
          }

          :global(.nav-link.has-submenu) {
            justify-content: space-between;
          }

          :global(.dropdown-menu.mobile) {
            position: relative;
            background: transparent;
            box-shadow: none;
            margin-left: 1rem;
            padding: 0.5rem 0;
            animation: none;
          }

          :global(.dropdown-item) {
            padding: 0.75rem 1rem;
            font-size: 1.1rem;
          }
        }

        @keyframes dropdownAnimation {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Menu;