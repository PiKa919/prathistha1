"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import "./menu.css";

const menuLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/sports', label: 'Sports' },
  { path: '/gallery', label: 'Gallery' }
];

const Menu = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set up GSAP animations
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: -100 });
      gsap.set('.menu-link-item, .menu-info, .menu-preview', { opacity: 0, y: 20 });
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      containerRef.current?.classList.add('open');
      // Open menu animation
      gsap.to(overlayRef.current, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' });
      gsap.to('.menu-link-item', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 });
      gsap.to('.menu-info, .menu-preview', { opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
    } else {
      containerRef.current?.classList.remove('open');
      // Close menu animation
      gsap.to(overlayRef.current, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' });
      gsap.to('.menu-link-item, .menu-info, .menu-preview', { opacity: 0, y: 20, duration: 0.3 });
    }
  };

  // GSAP animation for link hover
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      color: isEnter ? '#ff0000' : '#000000', // Change to your desired hover color
      duration: 0.3
    });
  };

  return (
    <div className={`menu-container ${isMenuOpen ? 'open' : ''}`} ref={containerRef}>
      <div className='menu-bar'>
        <div className='menu-logo' style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '10px'
        }}>
          {/* SAKEC Logo */}
          <Image 
            src="/assets/logos/sakec.svg" 
            alt="SAKEC Logo" 
            width={50} 
            height={50} 
          />
          
          {/* Separator */}
          <div style={{
            width: '1px', 
            height: '30px', 
            backgroundColor: 'goldenrod'
          }} />
          
          {/* Prathistha Logo */}
          <Image 
            src="/assets/logos/Prathistha.png" 
            alt="Prathistha Logo" 
            width={50} 
            height={50} 
          />
          
          {/* Prathistha Text with Subscript */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              lineHeight: '1.2'
            }}
          >
            <span style={{ 
              fontFamily: 'MAEL, sans-serif', 
              color: 'goldenrod',
              fontSize: '1.5rem'
            }}>
              Prathistha
            </span>
            <span style={{ 
              fontSize: '0.6rem', 
              color: 'goldenrod',
              marginTop: '-3px'
            }}>
              SAKECFEST
            </span>
          </Link>
        </div>
        <div className='menu-open' onClick={toggleMenu}>
          ☰
        </div>
      </div>
      
      {/* Rest of the component remains the same as previous version */}
      <div className='menu-overlay' ref={overlayRef}>
        <div className='menu-overlay-bar'>
          <div className='menu-logo'>
            <Link 
              href="/" 
              style={{ 
                fontFamily: 'MAEL, sans-serif', 
                color: 'goldenrod' 
              }}
            >
              Prathistha
            </Link>
          </div>
          <div className='menu-close' onClick={toggleMenu}>
          </div>
        </div>
        <div className='menu-close-icon' onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className='menu-copy'>
          <div className="menu-links">
            {menuLinks.map((link, index) => (
              <div className="menu-link-item" key={index}>
                <div className="menu-link-item-holder" onClick={toggleMenu}>
                  <Link 
                    href={link.path} 
                    className='menu-link'
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-info">
            <div className="menu-link-col">
              <a href="https://www.sakec.ac.in/" target="_blank" rel="noopener noreferrer">X &#8599;</a>
              <a href="https://www.instagram.com/pratishtha_sakecfest/" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Linkedin &#8599;</a>
              <a href="https://www.youtube.com/@PRATISHTHATheSAKECFest" target="_blank" rel="noopener noreferrer">Youtube &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>info@prathistha@sakec.ac.in</p>
              <p>1234567891</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;