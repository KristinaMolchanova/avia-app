import React from 'react';
import './../styles/Header.scss';
import AviaLogo from './../assets/images/Logo.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={AviaLogo} alt="svg" />
      </a>
    </header>
  );
};

export default Header;
