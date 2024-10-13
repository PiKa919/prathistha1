"use client";

import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import './footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Signed up with:', email);
    setEmail('');
  };

  const quickLinks: string[] = ['Home', 'Events', 'Schedule', 'Sponsors'];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">Prathistha 2024</h3>
            <p className="footer-description">Experience the future of education and entertainment at our annual college festival.</p>
            <div className="social-links">
              {['Facebook', 'Twitter', 'Instagram'].map((platform) => (
                <Link href="#" key={platform} className="social-link">
                  {platform === 'Facebook' && <Facebook className="social-icon" />}
                  {platform === 'Twitter' && <Twitter className="social-icon" />}
                  {platform === 'Instagram' && <Instagram className="social-icon" />}
                  <span className="sr-only">{platform}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Quick Links</h3>
            <ul className="quick-links">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link href="#" className="quick-link">
                    <span className="quick-link-arrow">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">Contact Us</h3>
            <ul className="contact-list">
              {[
                { icon: MapPin, text: 'Mahavir Education Trust`s Chowk, Waman Tukaram Patil Marg, Next to Dukes Co., Chembur, Mumbai - 400 088.' },
                { icon: Phone, text: '022-25580854' },
                { icon: Mail, text: 'prathistha@sakec.ac.in' },
              ].map(({ icon: Icon, text }, index) => (
                <li key={index} className="contact-item">
                  <Icon className="contact-icon" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-subtitle">College Map</h3>
            <div className="map-container">
              <img
                src="/footer/maps.jpg"
                alt="College Fest Map"
                className="map-image"
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
          <p>&copy; 2024 Prathistha. All rights reserved.</p>
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