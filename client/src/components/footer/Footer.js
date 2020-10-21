import React from 'react';

import './Footer.scss';

const Footer = () => {
  const socialLinks = [
    {
      name: 'fa fa-facebook-square',
      href: 'https://www.facebook.com/playsportusa1/',
    },
    {
      name: 'fa fa-instagram',
      href: 'https://www.instagram.com/playsportusa1/',
    },
    {
      name: 'fa fa-youtube-play',
      href: 'https://www.youtube.com/channel/UCChDfRK8jPXg0MBuyoBa10g',
    },
  ];

  const renderSocialLinks = () =>
    socialLinks.map(({ name, href }) => (
      <li className='list-inline-item' key={name}>
        <a
          className='list__redirection'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className={name} />
        </a>
      </li>
    ));

  return (
    <footer className='py-4 bg-dark text-white-50 sticky-footer'>
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
