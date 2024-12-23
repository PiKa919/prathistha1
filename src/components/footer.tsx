"use client";

import React from 'react';
import Link from "next/link";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import Image from 'next/image';
import './footer.css';

const Footer: React.FC = () => {
  const quickLinks: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'SAKEC', href: 'https://www.sakec.ac.in' },
    { name: 'Team', href: '/team' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Timeline', href: '/timeline' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">Prathistha 2024</h3>
            <p className="footer-description">Experience the future of education and entertainment at our Annual College Symposium.</p>
            <div className="social-links">
              {[
                { platform: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/sakecfestpratishtha/' },
                { platform: 'Youtube', icon: Youtube, url: 'https://www.youtube.com/@sakecprathistha' },
                { platform: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/pratishtha_sakecfest/' }
              ].map(({ platform, icon: Icon, url }) => (
                <Link href={url} key={platform} className="social-link" target="_blank" rel="noopener noreferrer">
                  <Icon className="social-icon" />
                  <span className="sr-only">{platform}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-section" style={{ zIndex: 1 }}>
            <h3 className="footer-subtitle">Quick Links</h3>
            <ul className="quick-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="quick-link" 
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="quick-link-arrow">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Contact Us</h3>
            <ul className="contact-list">
              {[
                { 
                  icon: MapPin, 
                  text: 'Mahavir Education Trust`s Chowk, Waman Tukaram Patil Marg, Next to Dukes Co., Chembur, Mumbai - 400 088.' 
                },
                { 
                  icon: Phone, 
                  text: '022-25580854',
                  href: 'tel:022-25580854'
                },
                { 
                  icon: Mail, 
                  text: 'prathistha@sakec.ac.in',
                  href: 'mailto:student.council@sakec.ac.in'
                },
              ].map(({ icon: Icon, text, href }, index) => (
                <li key={index} className="contact-item">
                  <Icon className="contact-icon" />
                  {href ? (
                    <a href={href} className="contact-link" target="_blank" rel="noopener noreferrer">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">College Map</h3>
            <div className="map-container">              
              <Image
                src="/footer/maps.jpg"
                alt="College Fest Map"
                className="map-image"
                width={400} // Specify the width
                height={300} // Specify the height
              />
              <div className="map-overlay">
                <Link href='https://maps.app.goo.gl/KyxuvcPRUVorssZS6' target='_blank'>
                  <button className="map-button">
                    View Full Map
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Prathistha. All rights reserved.</p>
          <div className="footer-links">
            <Link href="#" className="footer-link">Privacy Policy</Link>
            <Link href="#" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
