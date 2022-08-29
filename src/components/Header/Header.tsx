import * as React from 'react';
import JabatoLogo from '../../images/jabato-logo.svg';
import * as styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.link}>
        <JabatoLogo className={styles.logo}></JabatoLogo>
      </a>
    </header>
  );
};

export default Header;
