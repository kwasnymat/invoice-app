import React from 'react';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className='py-4 bg-dark text-white-50 sticky-footer fixed-bottom'>
      <div className=' container text-center'>
        <a
          className='footer__info'
          href='https://github.com/baxuu/invoice-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          invoiceApp {new Date().getFullYear()} © baxuu
        </a>
      </div>
    </footer>
  );
};

export default Footer;
