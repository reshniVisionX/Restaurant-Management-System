import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className="footer-content">
          <div className="footer-section about">
            <h2>About Us</h2>
            <p>We are a company dedicated to providing the best services to our customers. Our mission is to deliver high-quality products that meet the needs of our clients.</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/orders">Orders</a></li>
              <li><a href="/history">History</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Contact Us</h2>
            <p>Email: info@savorgreen.com</p>
            <p>Phone: +123 456 7890</p>
           
          </div>
          <div className="footer-section support">
            <h2>Help & Support</h2>
            <ul>
              <li><a href="/">FAQs</a></li>
              <li><a href="/">Customer Support</a></li>
              <li><a href="/">Contact Form</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2024 Company. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
