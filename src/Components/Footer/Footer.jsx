import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <>
      <footer className='footer px-5 text p-3'>
        <h2>Get Fluffy app</h2>
        <p>A 𝐝𝐞𝐬𝐬𝐞𝐫𝐭 for your cheeks</p>
        <p>Go Follow instagram page
        <Link to='https://www.instagram.com/fluffycosmetics.eg?igsh=MTV4bWxkaHYxb21wNQ==' target='_blank' className="text-success mx-2"><FontAwesomeIcon icon={faInstagram} size="2x" /></Link>
        </p>
        <hr className='border-top border-white'/>
        <div className='d-flex align-items-center'>
          <h4>Payment Partners</h4>
          <Link to='https://pay.amazon.com/' target='_blank'><i className="fa-brands fa-amazon-pay mx-2 text-success"></i></Link>
          <Link to='https://www.mastercard.us/en-us.html' target='_blank'><i className="fa-brands fa-cc-mastercard mx-2 text-success"></i></Link>
          <Link to='https://www.paypal.com/eg/home' target='_blank'><i className="fa-brands fa-cc-paypal mx-2 text-success"></i></Link>
        </div>
      </footer>
    </>
  );
}